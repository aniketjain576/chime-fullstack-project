from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

# import db & models
from models import db, MenuItem, Tag

app = Flask(__name__.split('.')[0])
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db"
db.init_app(app)
ma = Marshmallow(app)


#Menu Item Schema
class MenuItemSchema(ma.Schema):
    class Meta:
        fields=('id', 'name', 'tag')

#Init schema
menu_item_schema = MenuItemSchema()
menu_items_schema = MenuItemSchema(many=True)

class TagSchema(ma.Schema):
    class Meta:
        fields=('id', 'tagName')

tag_schema = TagSchema()
tags_schema = TagSchema(many=True)


#create a menu item
@app.route('/menu-item', methods=['POST'])
def add_menu_item():
    name = request.json['name']
    tag = request.json['tag']

    new_menu_item = MenuItem(name, tag)
    db.session.add(new_menu_item)
    db.session.commit()

    return menu_item_schema.jsonify(new_menu_item)

#get all menu items
@app.route('/menu-item', methods=['GET'])
def get_menu_items():
    all_menu_items = MenuItem.query.all()
    result = menu_items_schema.dump(all_menu_items)
    return jsonify(result)


#create a tag
@app.route('/tag', methods=['POST'])
def add_tag():
    tagName = request.json['tagName']

    new_tag = Tag(tagName)
    db.session.add(new_tag)
    db.session.commit()

    return tag_schema.jsonify(new_tag)

#get all tags
@app.route('/tag', methods=['GET'])
def get_tags():
    all_tags = Tag.query.all()
    result = tags_schema.dump(all_tags)
    return jsonify(result)



with app.app_context():
	db.create_all()

if __name__ == "__main__":
    app.run()
