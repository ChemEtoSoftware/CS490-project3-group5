"""Class for user and bookmark template"""
from app import DB

class Users(DB.Model):
    """Can create a Person with username and score. Letter won't be used"""
    id = DB.Column(DB.String(80), primary_key=True)
    email = DB.Column(DB.String(80), unique=True, nullable=False)
    firstName = DB.Column(DB.String, unique=False, nullable=False)
    familyName = DB.Column(DB.String(80), unique=False, nullable=False)
    imageURL = DB.Column(DB.String(80), unique=False, nullable=True)
    def __repr__(self):
        '''This function returns the users class'''
        return '<User %r>' % self.id
class Bookmarks(DB.Model):
    """Can create a Bookmark with username and event_id"""
    id = DB.Column(DB.Integer, primary_key=True)
    clientId = DB.Column(DB.String(80), unique=False, nullable=False)
    event_id = DB.Column(DB.String(80), unique=False, nullable=False)
    def __repr__(self):
        return '<Bookmark %r>' % self.id
