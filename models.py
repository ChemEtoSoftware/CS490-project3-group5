"""Class for person template"""
from app import DB

class Person(DB.Model):
    """Can create a Person with username and score. Letter won't be used"""
    id = DB.Column(DB.Integer, primary_key=True)
    username = DB.Column(DB.String(80), unique=True, nullable=False)
    score = DB.Column(DB.Integer, unique=False, nullable=False)
    letter = DB.Column(DB.String(1), unique=False, nullable=True)

    def __repr__(self):
        return '<Person %r>' % self.username
