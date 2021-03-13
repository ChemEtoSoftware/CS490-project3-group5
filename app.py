"""
    This module is specifically for creating a database that stores tictactoe player scores,
    as well as allowing them the chance to play each other.
"""
import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from engineio.payload import Payload


Payload.max_decode_packets = 200

load_dotenv(find_dotenv())  # This is to load your env variables from .env

APP = Flask(__name__, static_folder='./build/static')
# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)
# IMPORTANT: This must be AFTER creating DB variable to prevent
# circular import issues

import models

DB.create_all()

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})

SOCKETIO = SocketIO(APP,
                    CORS_allowed_origins="*",
                    json=json,
                    manage_session=False)

PREVIOUS_ARR = ["", "", "", "", "", "", "", "", ""]


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    """Fetches the file. Hooks server up to client"""
    return send_from_directory('./build', filename)


@SOCKETIO.on('connect')
def on_connect():
    """Simply shows who's connected. Nothing more"""
    print('User connected!')


@SOCKETIO.on('disconnect')
def on_disconnect():
    """Simply shows who's disconnected, nothing more."""
    print('User disconnected!')


@SOCKETIO.on('login')
def on_login(data):
    """Pushes the user into the database, initially with
    a score of 100. Also sets Player X, Player O and Spectators.
    Also orders the users by score and returns that to Display
    in LeaderBoard."""
    new_user = models.Person(username=data['user'], score=100)
    DB.session.add(new_user)
    DB.session.commit()
    all_people = models.Person.query.all()
    users = []
    ordered_users = []
    for person in all_people:
        users.append(person.username)

    #Checking to see if the user is X or O.
    if users.index(data['user']) == 0:
        updated_user = DB.session.query(
            models.Person).filter_by(username=data['user']).first()
        updated_user.letter = 'X'
        print(updated_user.username, updated_user.letter)
        DB.session.add(updated_user)
        DB.session.commit()
    elif users.index(data['user']) == 1:
        updated_user = DB.session.query(
            models.Person).filter_by(username=data['user']).first()
        updated_user.letter = 'O'
        print(updated_user.username, updated_user.letter)
        DB.session.add(updated_user)
        DB.session.commit()

    #Order the scores in descening order.
    ordered_scores = DB.session.query(models.Person).order_by(
        models.Person.score.desc())
    for score in ordered_scores:
        ordered_users.append({
            'username': score.username,
            'score': score.score,
            'letter': score.letter
        })
    print(ordered_users)
    print("These are the users", users)

    #Send everything back to the client
    SOCKETIO.emit('login', {
        'users': users,
        'ordered_users': ordered_users
    },
                  broadcast=True,
                  include_self=True)


@SOCKETIO.on('logout')
def on_logout(data):
    """Currently deletes user from db but this needs
    to be redone."""
    user = DB.session.query(models.Person).filter_by(username=data).first()
    DB.session.delete(user)
    DB.session.commit()


#Increments/Decrements the winner/loser. Sends back the new list.
@SOCKETIO.on('winner')
def on_winner(data):
    """Tells everybody who'se won, and returns updated scores."""
    ordered_users = []
    winner = DB.session.query(
        models.Person).filter_by(username=data['username']).first()
    if data['status'] == 'winner':
        winner.score += 1

    elif data['status'] == 'loser':
        winner.score -= 1

    DB.session.add(winner)
    DB.session.commit()
    print(winner.score)

    ordered_scores = DB.session.query(models.Person).order_by(
        models.Person.score.desc())
    for score in ordered_scores:
        ordered_users.append({
            'username': score.username,
            'score': score.score,
            'letter': score.letter
        })
    print(ordered_users)
    SOCKETIO.emit('winner', {'ordered_users': ordered_users},
                  broadcast=True,
                  include_self=True)
#Just tells all users to change their
#currentWinner state to null upon one
#clicking the reset button.
@SOCKETIO.on('reset')
def on_reset(data):
    """Resets game board, clears winner field."""
    if data['message'] == 1:
        SOCKETIO.emit('reset', {'message': True},
                      broadcast=True,
                      include_self=False)
# When a client emits the event 'chat' to the server,
# this function is run.
# 'chat' is a custom event name that we just decided
#This function makes sure that a user who logs in later,
#after the game's already started, can't modify the board,
#and that they receive an up-to-date board.
@SOCKETIO.on('tictactoe')
def on_tictactoe(data):
    """
    Creates board, keeps it up to date.
    """
    # data is whatever arg you pass in your emit call on client
    global PREVIOUS_ARR
    if data['message'] == ["", "", "", "", "", "", "", "", ""]:
        PREVIOUS_ARR = data['message']
        SOCKETIO.emit('tictactoe', data, broadcast=True, include_self=False)
        return
    sum1 = 0
    sum2 = 0
    print(str(data['message']))
    for i in range(0, 9):
        if PREVIOUS_ARR[i] == 'X' or PREVIOUS_ARR[i] == 'O':
            sum1 += 1
        if data['message'][i] == 'X' or data['message'][i] == 'O':
            sum2 += 1
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    if sum1 > sum2:
        SOCKETIO.emit('tictactoe', {
            'message': PREVIOUS_ARR,
            'nxt': data['nxt']
        },
                      broadcast=True,
                      include_self=False)
    else:
        SOCKETIO.emit('tictactoe', data, broadcast=True, include_self=False)
        PREVIOUS_ARR = data['message']


# Note we need to add this line so we can import APP in the python shell
if __name__ == "__main__":
    # Note that we don't call APP.run anymore. We call socketio.run with APP arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
