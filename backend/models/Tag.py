from sqlalchemy import Column, Integer

from .Base import db

#Menu Item Class
class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tagName = db.Column(db.String)

    def __init__(self, tagName):
        self.tagName = tagName

