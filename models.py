"""Class for user and bookmark template"""
# from app import d_b

def get_users(d_b):
    '''This function is designed to define class User for d_b'''
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
    '''This function defines the Bookmarks Class in our d_b.'''
    class Bookmark(d_b.Model):
        """Can create a Bookmark with username and event_id"""
        id = d_b.Column( d_b.String(80), d_b.ForeignKey('user.id'), primary_key=True, nullable=False)
        event_id = d_b.Column(d_b.String(80), unique=False, nullable=False)
        def __repr__(self):
            return '<Bookmark %r>' % self.id
    return Bookmark
