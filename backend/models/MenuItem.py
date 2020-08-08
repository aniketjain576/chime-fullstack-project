from sqlalchemy import Column, Integer

from .Base import db

#Menu Item Class
class MenuItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    tag = db.Column(db.String)

    def __init__(self, name, tag):
        self.name = name
        self.tag = tag

