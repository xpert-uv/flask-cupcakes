"""Flask app for Cupcakes"""
from flask import Flask, request, render_template, jsonify, redirect
from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://postgres:ghimire@localhost/store_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['SECRET_KEY'] = "intermidate flask"

connect_db(app)
db.create_all()


@app.route('/')
def index():
    return render_template("home.html")


@app.route('/api/cupcakes')
def list_cupcakes():
    all_cc = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=all_cc)


@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    new_cc = Cupcake(flavor=request.json['flavor'], size=request.json['size'],
                     rating=request.json['rating'], image=(request.json['image'] or None))
    db.session.add(new_cc)
    db.session.commit()
    return jsonify(cupcake=new_cc.serialize())


@app.route('/api/cupcakes/<int:id>')
def get_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    return jsonify(cupcake=cupcake.serialize())


@app.route('/api/cupcakes/<int:id>', methods=['PATCH'])
def update_cupcake(id):
    cc = Cupcake.query.get_or_404(id)
    cc.flavor = request.json.get('flavor', cc.flavor)
    cc.size = request.json.get('size', cc.size)
    cc.rating = request.json.get('rating', cc.rating)
    db.session.commit()
    return jsonify(cupcake=cc.serialize())


@app.route('/api/cupcakes/<int:id>', methods=['DELETE'])
def delete_todos(id):
    cc = Cupcake.query.get_or_404(id)
    db.session.delete(cc)
    db.session.commit()
    return jsonify(message="Deleted")
