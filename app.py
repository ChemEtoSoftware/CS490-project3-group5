import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__, static_folder='./build/static')

cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

users=[]

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
    users.append(data)
    print("These are the users",users)
    socketio.emit('login', users, broadcast=True, include_self=True)

@socketio.on('logout')
def on_logout(data):
    users.remove(data)
    print(users)
    print(data)
    socketio.emit('logout', data, broadcast=True, include_self=True)

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('tictactoe')
def on_tictactoe(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('tictactoe',  data, broadcast=True, include_self=False)

socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    debug=True
)