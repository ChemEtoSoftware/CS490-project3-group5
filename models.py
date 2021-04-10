"""Class for user and bookmark template"""
from app import DB

class Bookmark(DB.Model):
    """Can create a Bookmark with username and event_id"""
    id = DB.Column(DB.ForeignKey('user.id'), DB.String(80), primary_key=True, nullable=False)
    event_id = DB.Column(DB.String(80), unique=False, nullable=False)

    def __repr__(self):
        return '<Bookmark %r>' % self.username