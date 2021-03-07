import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv()) # This is to load your env variables from .env


app = Flask(__name__, static_folder='./build/static')
# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
import models
db.create_all()



cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

previous_arr = ["", "", "", "", "", "", "", "", ""]

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

@socketio.on('connect')
def on_connect():
    print('User connected!')
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

@socketio.on('login')
def on_login(data):
    new_user = models.Person(username=data['user'],score=100)
    
    db.session.add(new_user)
    db.session.commit()
    all_people = models.Person.query.all()
    users = []
    ordered_users = []
    for person in all_people:
        users.append(person.username)
    ordered_scores = db.session.query(models.Person).order_by(models.Person.score.desc())
    for score in ordered_scores:
        ordered_users.append({'username' : score.username , 'score' : score.score})
    print(ordered_users)
    print("These are the users", users)
    socketio.emit('login', {'users' : users, 'ordered_users' : ordered_users}, broadcast=True, include_self=True)

@socketio.on('logout')
def on_logout(data):
    user = models.Person.query.filter_by(username=data).first()
    db.session.delete(user)
    db.session.commit()
    
    
@socketio.on('letter')
def letter(data):
    user = db.session.query(models.Person).filter_by(username=data['username']).first()
    user.letter = data['letter']
    db.session.add(user)
    db.session.commit()
    users = models.Person.query.all()
    print(users)
    
# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
#This function makes sure that a user who logs in later, after the game's already started, can't modify the board, and that they receive an up-to-date board.
@socketio.on('tictactoe')
def on_tictactoe(data): # data is whatever arg you pass in your emit call on client
    global previous_arr
    if(data['message'] == ["", "", "", "", "", "", "", "", ""]):
        previous_arr = data['message']
        socketio.emit('tictactoe', data, broadcast=True, include_self=False)
        return
    sum1 = 0
    sum2 = 0
    print(str(data['message']))
    for i in range(0, 9):
        if(previous_arr[i] == 'X' or previous_arr[i] == 'O'):
            sum1 += 1
        if(data['message'][i] == 'X' or data['message'][i] == 'O'):
            sum2 += 1
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    if(sum1 > sum2):
        socketio.emit('tictactoe', {'message' : previous_arr, 'nxt' : data['nxt']}, broadcast=True, include_self=False)
    else:
        socketio.emit('tictactoe', data, broadcast=True, include_self=False)
        previous_arr = data['message']

# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
# Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )