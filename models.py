"""Class for user and bookmark template"""
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

def get_comments(d_b):
    """ defines comment table"""
    class Comments(d_b.model):
        """creates a comment"""
        commentId = d_b.Column(d_b.String(80), primary_key=True)
        event_id = d_b.Column(d_b.String(80), nullable=False)
        text = d_b.Column(d_b.String(150), nullable=False)
        head = d_b.Column(d_b.String(80), nullable=True)
        tail = d_b.Column(d_b.String(80),nullable=True)
        depth = d_b.Column(d_b.Integer, nullable=False)
        def __repr__(self):
            return '<Comment %r>' % self.commentId
    return Comments