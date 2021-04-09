"""
    This module is specifically for creating a database that stores tictactoe player scores,
    as well as allowing them the chance to play each other.
"""
import os
from flask import Flask, json, request, session
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
# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)
# IMPORTANT: This must be AFTER creating DB variable to prevent
# circular import issues
#import models

#DB.create_all()

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})

SOCKETIO = SocketIO(APP,
                    CORS_allowed_origins="*",
                    json=json,
                    manage_session=False)

PREVIOUS_ARR = ["", "", "", "", "", "", "", "", ""]
LIST_OF_ACTIVE_USERS = []


'''
@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    """Fetches the file. Hooks server up to client"""
    return send_from_directory('./build', filename)
'''

SEARCH_URL = "https://app.ticketmaster.com/discovery/v2/events.json"
APIKEY = os.getenv("APIKEY")
@APP.route('/api/post', methods=['POST'])
def api_post():
    '''keyword read sent from the front-end'''
    login_json = request.get_json()
    keyword = login_json.get('keyword')
    postalcode = login_json.get('postalCode')
    startdate = login_json.get('startDate')
    enddate = login_json.get('endDate')
    city = login_json.get('city')
    statecode = login_json.get('startCode')
    session["keyword"] = keyword
    session["postalCode"] = postalcode
    session["startDate"] = startdate
    session["endDate"] = enddate
    session["city"] = city
    session["stateCode"] = statecode
    #print(keyword)
    return keyword

@SOCKETIO.on('connect')
def on_connect():
    """Simply shows who's connected. Nothing more"""
    print('User connected!')

@APP.route('/api', methods=['GET'])
def api():
    '''to send query request to TicketMaster API'''
    keyword = session.get("keyword", None)
    postalcode = session.get("postalcode", None)
    startdate = session.get("startdate", None)
    enddate = session.get("enddate", None)
    city = session.get("city", None)
    statecode = session.get("statecode", None)
    print(keyword)
    print(postalcode)
    print(startdate)
    print(enddate)
    print(city)
    print(statecode)
    redurl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey={}'.format(APIKEY)
    if keyword:
        redurl += "&keyword={}".format(keyword)
    if postalcode:
        redurl += "&postalCode={}".format(postalcode)
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
    req = requests.get(redurl)
    jsontext = req.json()
    return jsontext

@SOCKETIO.on('disconnect')
def on_disconnect():
    """Simply shows who's disconnected, nothing more."""
    print('User disconnected!')
# Note we need to add this line so we can import APP in the python shell
if __name__ == "__main__":
    # Note that we don't call APP.run anymore. We call socketio.run with APP arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
