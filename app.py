# pylint: disable=W0702
"""
    This module is specifically for creating a database that stores tictactoe player scores,
    as well as allowing them the chance to play each other.
"""
import os
from flask import Flask, json, request, session, send_from_directory
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from engineio.payload import Payload
import requests
#from helpers import ordered_append, sum_of_arrays, add_to_db

#Prevents server overload
Payload.max_decode_packets = 200

load_dotenv(find_dotenv())  # This is to load your env variables from .env

APP = Flask(__name__, static_folder='./build/static')
APP.secret_key = os.urandom(24)
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)
import models
if __name__ == "__main__":
    DB.create_all()
Users = models.get_users(DB)
# Bookmarks = models.get_bookmarks(DB)

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})

SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)

ALL_USERS = Users.query.all()
ACTIVE_USER_SOCKET_PAIRS = dict()
PREVIOUS_ARR = ["", "", "", "", "", "", "", "", ""]
LIST_OF_ACTIVE_USERS = []
@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    """Fetches the file. Hooks server up to client"""
    return send_from_directory('./build', filename)

SEARCH_URL = "https://app.ticketmaster.com/discovery/v2/events.json"
APIKEY = os.getenv("APIKEY")
@APP.route('/api/post', methods=['POST'])
def api_post():
    '''keyword read sent from the front-end'''
    login_json = request.get_json()
    keyword = login_json.get('keyword')
    postalcode = login_json.get('postalcode')
    radius = login_json.get('radius')
    startdate = login_json.get('startdate')
    enddate = login_json.get('enddate')
    city = login_json.get('city')
    statecode = login_json.get('statecode')
    countrycode = login_json.get('countrycode')
    print(keyword)
    print(postalcode)
    print(radius)
    print(startdate)
    print(enddate)
    print(city)
    print(statecode)
    print(countrycode)
    session["keyword"] = keyword
    session["postalcode"] = postalcode
    session["radius"] = radius
    session["startdate"] = startdate
    session["enddate"] = enddate
    session["city"] = city
    session["statecode"] = statecode
    session["countrycode"] = countrycode

    redurl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey={}'.format(APIKEY)
    if keyword:
        redurl += "&keyword={}".format(keyword)
    if postalcode:
        redurl += "&postalCode={}".format(postalcode)
    if radius:
        redurl += "&radius={}".format(radius)
    if startdate:
        startdate += "T00:00:00Z"
        redurl += "&startDateTime={}".format(startdate)
    if enddate:
        enddate += "T23:59:59Z"
        redurl += "&endDateTime={}".format(enddate)
    if city:
        redurl += "&city={}".format(city)
    if statecode:
        redurl += "&stateCode={}".format(statecode)
    if countrycode:
        redurl += "&countryCode={}".format(countrycode)
    req = requests.get(redurl)
    jsontext = req.json()
    return jsontext
    #print(keyword)
    #return keyword

@SOCKETIO.on('connect')
def on_connect():
    """Simply shows who's connected. Nothing more"""
    '''redurl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey={}'.format(APIKEY)
    req = requests.get(redurl)
    jsontext = req.json()
    print('User connected!')
    SOCKETIO.emit('start', jsontext)'''
    print('User connected!')
    session["keyword"] = ""
    session["postalcode"] = ""
    session["radius"] = ""
    session["startdate"] = ""
    session["enddate"] = ""
    session["city"] = ""
    session["statecode"] = ""
    session["countrycode"] = ""
    print("Emitting Credentials to Client")
    SOCKETIO.emit('credInfo', os.getenv('GOOGLE_CLIENT_ID'), broadcast=False, include_self=True)

@SOCKETIO.on('apiSearch')
def search(data):
    """api search"""
    print("got search")
    keyword = data['keyword']
    postalcode = data['postalcode']
    radius = data['radius']
    startdate = data['startdate']
    enddate = data['enddate']
    city = data['city']
    statecode = data['statecode']
    countrycode = data['countrycode']
    print(keyword)
    print(postalcode)
    print(radius)
    print(startdate)
    print(enddate)
    print(city)
    print(statecode)
    print(countrycode)
    redurl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey={}'.format(APIKEY)
    if keyword:
        redurl += "&keyword={}".format(keyword)
    if postalcode:
        redurl += "&postalCode={}".format(postalcode)
    if radius:
        redurl += "&radius={}".format(radius)
    if startdate:
        startdate += "T00:00:00Z"
        redurl += "&startDateTime={}".format(startdate)
    if enddate:
        enddate += "T23:59:59Z"
        redurl += "&endDateTime={}".format(enddate)
    if city:
        redurl += "&city={}".format(city)
    if statecode:
        redurl += "&stateCode={}".format(statecode)
    if countrycode:
        redurl += "&countryCode={}".format(countrycode)
    req = requests.get(redurl)
    jsontext = req.json()
    return jsontext
    #print(keyword)
    #return keyword

# @SOCKETIO.on('apiSearch')
# def search(data):
#     """api search"""
#     print("got search")
#     keyword = data['keyword']
#     postalcode = data['postalcode']
#     radius = data['radius']
#     startdate = data['startdate']
#     enddate = data['enddate']
#     city = data['city']
#     statecode = data['statecode']
#     countrycode = data['countrycode']
#     print(keyword)
#     print(postalcode)
#     print(radius)
#     print(startdate)
#     print(enddate)
#     print(city)
#     print(statecode)
#     print(countrycode)
#     redurl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey={}'.format(APIKEY)
#     if keyword:
#         redurl += "&keyword={}".format(keyword)
#     if postalcode:
#         redurl += "&postalCode={}".format(postalcode)
#     if radius:
#         redurl += "&radius={}".format(radius)
#     if startdate:
#         startdate += "T00:00:00Z"
#         redurl += "&startDateTime={}".format(startdate)
#     if enddate:
#         enddate += "T23:59:59Z"
#         redurl += "&endDateTime={}".format(enddate)
#     if city:
#         redurl += "&city={}".format(city)
#     if statecode:
#         redurl += "&stateCode={}".format(statecode)
#     if countrycode:
#         redurl += "&countryCode={}".format(countrycode)
#     req = requests.get(redurl)
#     jsontext = req.json()
#     try:
#         print(jsontext["_embedded"])
#         SOCKETIO.emit('apiResult', jsontext, broadcast=True, include_self=True)
#     except:
#         print("false")
#         SOCKETIO.emit('error', jsontext, broadcast=True, include_self=True)

@APP.route('/api', methods=['GET'])
def api():
    """api search"""
    #to send query request to TicketMaster API
    keyword = session.get("keyword", None)
    postalcode = session.get("postalcode", None)
    radius = session.get("radius", None)
    startdate = session.get("startdate", None)
    enddate = session.get("enddate", None)
    city = session.get("city", None)
    statecode = session.get("statecode", None)
    countrycode = session.get("countrycode", None)
    redurl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey={}'.format(APIKEY)
    if keyword:
        redurl += "&keyword={}".format(keyword)
    if postalcode:
        redurl += "&postalCode={}".format(postalcode)
    if radius:
        redurl += "&radius={}".format(radius)
    if startdate:
        startdate += "T00:00:00Z"
        redurl += "&startDateTime={}".format(startdate)
    if enddate:
        enddate += "T23:59:59Z"
        redurl += "&endDateTime={}".format(enddate)
    if city:
        redurl += "&city={}".format(city)
    if statecode:
        redurl += "&stateCode={}".format(statecode)
    if countrycode:
        redurl += "&countryCode={}".format(countrycode)
    req = requests.get(redurl)
    jsontext = req.json()
    return jsontext



# @SOCKETIO.on('bookmarked')
# def on_bookmark(data):
#     ''' on bookmark run function'''
    # user_id = data.user_id
    # bookmarked_event_id = data.event_id
    # new_bookmarked_event_id = models.Bookmark(id=user_id, event_id=bookmarked_event_id)
    # DB.session.add(new_bookmarked_event)
    # DB.session.commit()
    # return "success"

@APP.route('/api/bookmark', methods=['POST'])
def get_bookmarks():
    '''This function gives the user's list of
    bookmarks to the front end'''
    bookmark_json = request.get_json()
    user_id = bookmark_json.get('user_id')
    print(user_id)
@SOCKETIO.on('disconnect')
def on_disconnect():
    """Simply shows who's disconnected, nothing more."""
    print('User disconnected!')

@SOCKETIO.on('Login')
def on_login(data):
    '''Receives login emit and uploads user data to database'''
    global ALL_USERS
    global LIST_OF_ACTIVE_USERS
    print("Data Recieved: \n", data)
    if data["googleId"][-7:] in ALL_USERS:
        # ID does not exist in DB, add to DB
        # truncate image url length to avoid string overflow in DB
        truncate_len = len("'https://lh3.googleusercontent.com")
        truncated_imgurl = data["imageUrl"][truncate_len:]
        # init user data received from client into obj
        # id is a string of length 7 which is maximum integer size
        user_data = Users(
            id=data["googleId"][-7:],
            email=data["email"],
            firstName=data["givenName"],
            familyName=data["familyName"],
            imageURL=truncated_imgurl
            )
        # add user to DB and commit
        DB.session.add(user_data)
        DB.session.commit()
        ALL_USERS = Users.query.all()
    # add googleId to list and dict of active users
    LIST_OF_ACTIVE_USERS.append(data["googleId"][-7:])
    ACTIVE_USER_SOCKET_PAIRS[data["socketID"]] = {
        "ID":data["googleId"][-7:],
        "Name":data["givenName"],
    }
    print("Current Users: \n")
    for item in ALL_USERS:
        print(item)

@SOCKETIO.on('Logout')
def on_logout(data):
    '''Receives logout emit and removes user session'''
    global ACTIVE_USER_SOCKET_PAIRS
    # find Name and googleId array using socketID as index
    user_pair = ACTIVE_USER_SOCKET_PAIRS[data["socketID"]]
    # remove user from list_of_sctive_users, and active_user_socket_pairs
    LIST_OF_ACTIVE_USERS.remove(user_pair["ID"])
    ACTIVE_USER_SOCKET_PAIRS.pop(data["socketID"])
    print("Logging out user ", user_pair["Name"])

# Note we need to add this line so we can import APP in the python shell
if __name__ == "__main__":
    # Note that we don't call APP.run anymore. We call socketio.run with APP arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
    