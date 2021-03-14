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
    username = data['username']
    users = add_to_db(username)
    #Checking to see if the user is X or O.
    if users.index(data['user']) == 0:
        updated_user = DB.session.query(
            models.Person).filter_by(username=data['user']).first()
        updated_user.letter = 'X'
        DB.session.add(updated_user)
        DB.session.commit()
    elif users.index(data['user']) == 1:
        updated_user = DB.session.query(
            models.Person).filter_by(username=data['user']).first()
        updated_user.letter = 'O'
        DB.session.add(updated_user)
        DB.session.commit()
    #Order the scores in descening order.
    ordered_scores = DB.session.query(models.Person).order_by(
        models.Person.score.desc())
    ordered_users = ordered_append(ordered_scores)
    #Send everything back to the client
    SOCKETIO.emit('login', {
        'users': users,
        'ordered_users': ordered_users
    },
                  broadcast=True,
                  include_self=True)

def add_to_db(user):
    """This function is purely just for adding the user to the db"""
    new_user = models.Person(username=user, score=100)
    DB.session.add(new_user)
    DB.session.commit()
    all_people = models.Person.query.all()
    users = regular_append(all_people)
    return users

@SOCKETIO.on('logout')
def on_logout(data):
    """Currently deletes user from db but this needs
    to be redone."""
    user = DB.session.query(models.Person).filter_by(username=data).first()
    DB.session.delete(user)
    DB.session.commit()
    return data['username']

#Increments/Decrements the winner/loser. Sends back the new list.
@SOCKETIO.on('winner')
def on_winner(data):
    """Tells everybody who's won, and returns updated scores."""
    winner = DB.session.query(
        models.Person).filter_by(username=data['username'])
    if data['status'] == 'winner':
        winner.score += 1

    elif data['status'] == 'loser':
        winner.score -= 1

    DB.session.add(winner)
    DB.session.commit()
    ordered_scores = DB.session.query(models.Person).order_by(
        models.Person.score.desc())
    for score in ordered_scores:
        print(score.score)
    ordered_users = ordered_append(ordered_scores)
    SOCKETIO.emit('winner', {'ordered_users': ordered_users},
                  broadcast=True,
                  include_self=True)
    return ordered_users
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
    return data['message']
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
    arr = sum_of_arrays(data['message'], PREVIOUS_ARR)
    data['message'] = arr
    SOCKETIO.emit('tictactoe', data, broadcast=True, include_self=False)
    PREVIOUS_ARR = arr

def sum_of_arrays(arr1, arr2):
    """This function is purely for comparing if the previously held array is greater
    than the one currently passed. This is to prevent a new user who logged in
    from ruining the game"""
    sum1 = 0
    sum2 = 0
    for i in range(0, 9):
        if arr1[i] == 'X' or arr1[i] == 'O':
            sum1 += 1
        if arr2[i] == 'X' or arr2[i] == 'O':
            sum2 += 1
    if sum1 > sum2:
        return arr1
    return arr2
def regular_append(query_arr):
    """This function is just for appending to an array
    called users that gets returned"""
    users = []
    for person in query_arr:
        users.append(person.username)
    return users
def ordered_append(object_arr):
    """This function is for appending objects to array
    in ordered fashion."""
    ordered_users = []
    for score in object_arr:
        ordered_users.append({
            'username': score.username,
            'score': score.score,
            'letter': score.letter})
    return ordered_users
# Note we need to add this line so we can import APP in the python shell
if __name__ == "__main__":
    # Note that we don't call APP.run anymore. We call socketio.run with APP arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
