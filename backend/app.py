from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

# import db & models
from models import db, ExampleModel

app = Flask(__name__.split('.')[0])
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db"
db.init_app(app)
ma = Marshmallow(app)

#Menu Item Class
class MenuItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __init__(self, name):
        self.name = name

#Menu Item Schema
class MenuItemSchema(ma.Schema):
    class Meta:
        fields=('id', 'name')

#Init schema
menu_item_schema = MenuItemSchema()
menu_items_schema = MenuItemSchema(many=True)

#create a menu item
@app.route('/menu-item', methods=['POST'])
def add_menu_item():
    name = request.json['name']

    new_menu_item = MenuItem(name)
    db.session.add(new_menu_item)
    db.session.commit()

    return menu_item_schema.jsonify(new_menu_item)

#get all menu items
@app.route('/menu-item', methods=['GET'])
def get_menu_items():
    all_menu_items = MenuItem.query.all()
    result = menu_items_schema.dump(all_menu_items)
    return jsonify(result)


@app.route("/api/example", methods=["GET", "POST", "PUT", "DELETE"])
def ExampleEndpoint():
    result = db.session.query(ExampleModel).filter(ExampleModel.number > 1)
    
    return {
        "results": [(dict(row.items())) for row in result]
    }, 200

with app.app_context():
	db.create_all()

if __name__ == "__main__":
    app.run()
