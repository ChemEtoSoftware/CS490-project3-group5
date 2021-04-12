"""This program is used for incorporating Models from PostresQL"""
# from app import DB

def get_users(DB):
    '''This function is designed to define class User for DB'''
    class Users(DB.Model):
        """Can create a Person with username and score. Letter won't be used"""
        id = DB.Column(DB.String(80), primary_key=True)
        email = DB.Column(DB.String(80), unique=True, nullable=False)
        firstName = DB.Column(DB.String, unique=False, nullable=False)
        familyName = DB.Column(DB.String(80), unique=False, nullable=False)
        imageURL = DB.Column(DB.String(80), unique=False, nullable=True)
    
        def __repr__(self):
            '''This function returns the users class'''
            return '<User %r>' % self.firstName
    return Users