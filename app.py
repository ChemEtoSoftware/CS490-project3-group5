# pylint: disable=W0702,R1705
"""
    This module is specifically for creating a database that stores tictactoe player scores,
    as well as allowing them the chance to play each other.
"""
import os
import hashlib
import json
import requests
from flask import Flask, json, request, session, send_from_directory
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from engineio.payload import Payload
from ratelimit import limits, sleep_and_retry
from ratelimiter import RateLimiter
from geopy.geocoders import Nominatim
from uszipcode import SearchEngine


#Prevents server overload
Payload.max_decode_packets = 200
load_dotenv(find_dotenv())  # This is to load your env variables from .env

APP = Flask(__name__, static_folder='./build/static')
APP.secret_key = os.urandom(24)
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
DB = SQLAlchemy(APP)
# from models import Comments
import models
if __name__ == "__main__":
    DB.create_all()
Users = models.get_users(DB)
Bookmarks = models.get_bookmarks(DB)
LikesDislikes = models.get_likes_dislikes(DB)
Comments = models.get_comments(DB)

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})

SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)

ACTIVE_USER_SOCKET_PAIRS = dict()
PREVIOUS_ARR = ["", "", "", "", "", "", "", "", ""]
LIST_OF_ACTIVE_USERS = []
RATE_LIMITER = RateLimiter(max_calls=1, period=1)

USER_STATE = ''

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

@APP.route('/location', methods=['POST'])
def get_lat_long():
    """ get user location """
    global USER_STATE
    location_json = request.get_json()
    if len(location_json) == 2:
        latitude = location_json.get('lat')
        longitude = location_json.get('long')
        geolocator = Nominatim(user_agent="EventGuru")
        coordinates = "" + str(latitude) + " " + str(longitude)
        location = geolocator.reverse(coordinates)
        print(location.address)
        location_list = location.address.split(", ")
        print(location_list)
        zip_code = location_list[-2]
        searchengine = SearchEngine(simple_zipcode=True)
        zipcode = searchengine.by_zipcode(zip_code)
        zipcode_dict = zipcode.to_dict()
        USER_STATE = zipcode_dict["state"]
        print(zipcode_dict["state"])
        return zipcode_dict
    else:
        USER_STATE = ""
        return USER_STATE

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
    global USER_STATE
    #to send query request to TicketMaster API
    '''keyword = session.get("keyword", None)
    postalcode = session.get("postalcode", None)
    radius = session.get("radius", None)
    startdate = session.get("startdate", None)
    enddate = session.get("enddate", None)
    city = session.get("city", None)
    statecode = session.get("statecode", None)
    countrycode = session.get("countrycode", None)'''
    redurl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey={}'.format(APIKEY)
    redurl += "&stateCode={}".format(USER_STATE)
    print("GOT LOCATION:", USER_STATE)
    '''if keyword:
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
        redurl += "&countryCode={}".format(countrycode)'''
    req = requests.get(redurl)
    jsontext = req.json()
    return jsontext



@SOCKETIO.on('create_bookmark')
def on_bookmark(data):
    '''This function is for adding
    a bookmark to the DB, or for
    removing it.'''
    socket_id = data['id']
    pair = ACTIVE_USER_SOCKET_PAIRS[socket_id]
    user_id = pair['ID']
    print(user_id)
    bookmarked_event_id = data['eventID']
    exists = DB.session.query(Bookmarks).filter_by(
        clientId=user_id, event_id=bookmarked_event_id).first()
    if exists is None:
        new_bookmarked_event_id = Bookmarks(clientId=user_id, event_id=bookmarked_event_id)
        DB.session.add(new_bookmarked_event_id)
        DB.session.commit()
    else:
        DB.session.delete(exists)
        DB.session.commit()
    list_of_bookmarks = DB.session.query(Bookmarks).filter_by(clientId=user_id)
    for bookmark in list_of_bookmarks:
        print(bookmark.event_id)
    return list_of_bookmarks

@SOCKETIO.on('retrieve_bookmarks')
@sleep_and_retry
@limits(calls=5, period=1)
def retrieve_bookmarks(data):
    '''This function is for retrieving a
    bookmark from the DB'''
    print("Inside function")
    socket_id = data
    pair = ACTIVE_USER_SOCKET_PAIRS[socket_id]
    user_id = pair['ID']
    event_ids = []
    event_details = []
    bookmarked_events = DB.session.query(Bookmarks).filter_by(clientId=user_id)
    for bookmark in bookmarked_events:
        event_ids.append(bookmark.event_id)
    redurl = 'https://app.ticketmaster.com/discovery/v2/events/'
    for i_d in event_ids:
        with RATE_LIMITER:
            print("Inside loop")
            redurl += i_d
            redurl += '.json?apikey={}'.format(APIKEY)
            req = requests.get(redurl)
            jsontext = req.json()
            event_details.append(jsontext)
            redurl = 'https://app.ticketmaster.com/discovery/v2/events/'
    SOCKETIO.emit('retrieve_bookmarks', event_details, broadcast=False, include_self=True)

@SOCKETIO.on('disconnect')
def on_disconnect():
    """Simply shows who's disconnected, nothing more."""
    print('User disconnected!')

def generate_comment_list(existing_comments):
    ''' generate list of formatted existing comments to send to client'''
    send_list_pairs = []
    if existing_comments:
        send_list_pairs.append('True')
        for comm in existing_comments:
            comm_name = comm.username
            comm_text = comm.text
            send_list_pairs.append(comm_name+': '+comm_text)
    else:
        send_list_pairs.append('None')
        print('No comments exist for event')
    return send_list_pairs

@SOCKETIO.on('Eventload')
def load_event(data):
    """Event clicked, use data to load comments + user data and emit to component"""
    # data = clientId, eventId, uniqueID
    # use clientId to load commenting user's photo and name
    comment_user_data = ACTIVE_USER_SOCKET_PAIRS[data["uniqueID"]] # ID, Name, Image (+imageAddon)
    # use eventId to load existing comments associated with that event
    comment_user_data['eventId'] = data["eventId"]
    existing_comments = Comments.query.filter_by(event_id=data["eventId"])
    # send existing comment obj to helper func, returning formatted array of comments
    send_list_pairs = generate_comment_list(existing_comments)
    comment_user_data["comments"] = send_list_pairs
    print(comment_user_data)
    SOCKETIO.emit('EventLoad', comment_user_data, broadcast=False, include_self=True)
    print('EMITTING EVENTLOAD')

@SOCKETIO.on('comment')
def comment_submit(data):
    """on receipt of new comment, update db
    send new list to clients that are displaying current eventID"""
    global ACTIVE_USER_SOCKET_PAIRS
    # load information from data emit
    event_id = data["eventID"] # eventID associated with comment
    text = data["comment"] # comment text
    event_id = data["eventID"] # eventID associated with comment
    client_id = data["clientId"] # clientId who made the comment
    # load user data from socketID of client
    comment_user_data = ACTIVE_USER_SOCKET_PAIRS[data["socketID"]] # ID, Name, Image
    name = comment_user_data["Name"]
    # generate new list of comments to send to clients
    existing_comments = db_add_comment(client_id, text, event_id, name)
    comment_user_data = dict()
    send_list_pairs = generate_comment_list(existing_comments)
    comment_user_data["comments"] = send_list_pairs
    comment_user_data["eventID"] = event_id
    # emit updated comment list to user
    # SOCKETIO.emit('EventLoad', comment_user_data, broadcast=False, include_self=True)
    SOCKETIO.emit('Comment', comment_user_data, broadcast=False, include_self=True)
    print(comment_user_data)
    print(Comments.query.all())

def db_add_comment(client_id, text, event_id, name):
    """ returns queried list of comments """
    # Create client object and save in DB
    head = client_id  # head should be comment ID of comment above
    tail = '0' # tail should be commentID of comment below this individual comment
    depth = 0 # this is the depth level (indent level) of this comment
    # depth can be found recursively looking at head until you reach depth 0,
    # to find the new depth of threaded comments
    comment_data = Comments(
        commentId=generate_comment_id(text, event_id, client_id),
        event_id=event_id,
        username=name,
        text=text,
        head=head,
        tail=tail,
        depth=depth)
    # add comment to comment DB
    DB.session.add(comment_data)
    DB.session.commit()
    return Comments.query.filter_by(event_id=event_id)

def generate_comment_id(comment, event_id, client_id):
    ''' Generate unique comment ID '''
    mix = hashlib.md5()
    line = comment+event_id+client_id
    line = line.encode('utf-8')
    mix.update(line)
    comment_id = str(int(mix.hexdigest(), 16))[0:12]
    return comment_id

@SOCKETIO.on('Login')
def on_login(data):
    '''Receives login emit and uploads user data to database'''
    global LIST_OF_ACTIVE_USERS
    global ACTIVE_USER_SOCKET_PAIRS
    all_users = Users.query.all()
    print("Data Recieved: \n", data)
    if data["googleId"][-7:] in all_users:
        all_users = db_add_user(data)
    else:
        print("Returning User: ", data)
    # add googleId to list and dict of active users
    LIST_OF_ACTIVE_USERS.append(data["googleId"][-7:])
    ACTIVE_USER_SOCKET_PAIRS[data["socketID"]] = {
        "ID":data["googleId"][-7:],
        "Name":data["givenName"],
        "Image":data["imageUrl"],
    }
    print("Current Users: \n")
    for item in all_users:
        print(item)

def db_add_user(data):
    '''Helper function for mocking data'''
    # ID does not exist in DB, add to DB
    # truncate image url length to avoid string overflow in DB
    truncate_len = len("'https://lh3.googleusercontent.com")
    truncated_imgurl = data["imageUrl"][truncate_len:]
    print("NEW IMAGE URL: ", truncated_imgurl)
    # init user data received from client into obj
    # id is a string of length 7 which is maximum integer size
    user_data = Users(
        id=data["googleId"][-7:],
        email=data["email"],
        firstName=data["givenName"],
        familyName=data["familyName"],
        imageURL=truncated_imgurl,
        )
    # add user to DB and commit
    DB.session.add(user_data)
    DB.session.commit()
    return Users.query.all() #returns queried users (ids)

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

@SOCKETIO.on('dislike_event')
def on_dislike_event(data):
    '''when server listens to events like/dislike button being clicked'''
    events, likes, dislikes = db_events()
    current_event = data['eventID']
    #print(current_event)
    print(data['isLiked'])
    if current_event in events:
        curr_event = DB.session.query(LikesDislikes).get(data['eventID'])
        if data['isLiked'] is True:
            curr_event.likes = curr_event.likes + 1
            DB.session.commit()
        elif data['isLiked'] is False:
            curr_event.dislikes = curr_event.dislikes + 1
            DB.session.commit()
        events, likes, dislikes = db_events() #should be updated like/dislike
        SOCKETIO.emit('update_likes_dislikes', {'likes': str(curr_event.likes), 'dislikes': str(curr_event.dislikes)}) # pylint: disable=line-too-long
    else:
        if data['isLiked'] is True:
            like_event = LikesDislikes(eventID=data['eventID'], likes=1, dislikes=0)
            DB.session.add(like_event)
            DB.session.commit()
            events.append(current_event)
            print(like_event)
        elif data['isLiked'] is False:
            dislike_event = LikesDislikes(eventID=data['eventID'], likes=0, dislikes=1)
            DB.session.add(dislike_event)
            DB.session.commit()
            events.append(current_event)
            print(dislike_event)
        print("This is the new data " + str(events) + str(likes) + str(dislikes))
        SOCKETIO.emit('update_likes_dislikes', {'likes': [curr_event.likes], 'dislikes': [curr_event.dislikes]}) # pylint: disable=line-too-long
def db_events():
    '''to access the events, likes, dislikes for every eventID'''
    print("Inside db_events")
    events = []
    likes = []
    dislikes = []
    #all_people = models.Users.query.all()
    #all_events = DB.session.query(LikesDislikes)
    all_events = LikesDislikes.query.all()
    DB.session.commit()
    print(all_events)  # [<LikesDislikes 'admin'>, <LikesDislikes 'guest'>]
    for event in all_events:
        events.append(event.eventID)
        likes.append(event.likes)
        dislikes.append(event.dislikes)
    return events, likes, dislikes
@SOCKETIO.on('request_data')
def on_request_data(data):
    '''to load up initial DB data to client'''
    print("inside request data")
    events, likes, dislikes = db_events()
    current_event = data['eventID']
    if current_event in events:
        #print("This event exists {}".format(current_event))
        curr_event = DB.session.query(LikesDislikes).get(data['eventID'])
        SOCKETIO.emit('show_likes_dislikes', {'likes': str(curr_event.likes), 'dislikes': str(curr_event.dislikes)}) # pylint: disable=line-too-long
    else:
        initialize_event = LikesDislikes(eventID=data['eventID'], likes=0, dislikes=0)
        DB.session.add(initialize_event)
        DB.session.commit()
        events.append(current_event)
        #print(initialize_event)
        SOCKETIO.emit('show_likes_dislikes', {'likes': str(curr_event.likes), 'dislikes': str(curr_event.dislikes)}) # pylint: disable=line-too-long
    # SOCKETIO.emit('show_likes_dislikes',
    # { 'likes': str(curr_event.likes), 'dislikes': str(curr_event.dislikes) })
    return events, likes, dislikes
def add_event_id(event_id):
    '''for unit testing: adding an event to database'''
    new_event = LikesDislikes(eventID=event_id, likes=0, dislikes=0)
    DB.session.add(new_event)
    DB.session.commit()
    all_events = LikesDislikes.query.all()
    events = []
    for event in all_events:
        events.append(event.eventID)
    return events
def mock_on_likes_dislikes(event_id):
    '''for unit testing: mocking the likes and dislikes numbers'''
    event_id = DB.session.query(LikesDislikes).get(event_id)
    event_id.likes = event_id.likes + 1
    DB.session.commit()
    event_id = DB.session.query(LikesDislikes).get(event_id)
    event_id.dislikes = event_id.dislikes + 1
    DB.session.commit()
    return [ event_id.likes, event_id.dislikes]
# Note we need to add this line so we can import APP in the python shell
if __name__ == "__main__":
    # Note that we don't call APP.run anymore. We call socketio.run with APP arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
