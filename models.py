"""Creates person to insert into database"""
from app import DB


class Person(DB.Model):
    """Template for person"""
    id = DB.Column(DB.Integer, primary_key=True)
    username = DB.Column(DB.String(80), unique=True, nullable=False)
    score = DB.Column(DB.Integer, unique=False, nullable=False)
    letter = DB.Column(DB.String(1), unique=False, nullable=True)

    def __repr__(self):
        return '<Person %r>' % self.username
        