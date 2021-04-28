"""Class for user and bookmark template"""

#from app import DB

def get_users(d_b):
    """This function fetches users table.
    Prevents a cyclical import"""
    class Users(d_b.Model):
        """Can create a Person with username and score. Letter won't be used"""
        id = d_b.Column(d_b.String(80), primary_key=True)
        email = d_b.Column(d_b.String(80), unique=True, nullable=False)
        firstName = d_b.Column(d_b.String, unique=False, nullable=False)
        familyName = d_b.Column(d_b.String(80), unique=False, nullable=False)
        imageURL = d_b.Column(d_b.String(80), unique=False, nullable=True)
        def __repr__(self):
            '''This function returns the users class'''
            return '<User %r>' % self.id
    return Users
def get_bookmarks(d_b):
    """Fetches Bookmarks Table"""
    class Bookmarks(d_b.Model):
        """Can create a Bookmark with username and event_id"""
        id = d_b.Column(d_b.Integer, primary_key=True)
        clientId = d_b.Column(d_b.String(80), unique=False, nullable=False)
        event_id = d_b.Column(d_b.String(80), unique=False, nullable=False)
        def __repr__(self):
            return '<Bookmark %r>' % self.id
    return Bookmarks
'''    
class LikesDislikes(DB.Model):
    eventID = DB.Column(DB.String(80), primary_key=True)
    likes = DB.Column(DB.Integer, nullable=False)
    dislikes = DB.Column(DB.Integer, nullable=False)
    def __repr__(self):
        return '<LikesDislikes %r>' % self.eventID
'''

def get_likes_dislikes(d_b):
    class LikesDislikes(d_b.Model):
        eventID = d_b.Column(d_b.String(80), primary_key=True)
        likes = d_b.Column(d_b.Integer, nullable=False)
        dislikes = d_b.Column(d_b.Integer, nullable=False)
        def __repr__(self):
            return '<LikesDislikes %r>' % self.eventID
    return LikesDislikes
