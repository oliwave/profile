import logging

from bson import ObjectId
from flask import Blueprint, jsonify, request
from app.db.mongo import MongoDB

# Create a blueprint
user_bp = Blueprint('user', __name__)

db = MongoDB().client
users_collection = db['users']  # Collection name

@user_bp.route('/user/<string:user_id>', methods=['GET'])
def get_user(user_id: str):
    """
    Get a user by their ID.
    """
    
    user = users_collection.find_one({'_id': ObjectId(user_id)})
    user['_id'] = str(user['_id'])

    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404

@user_bp.route('/users', defaults={'start': 1, 'amount': 10})
@user_bp.route('/users/<int:start>/<int:end>/', methods=['GET'])
def list_user(start: int, amount: int):
    """
    List users from start index with given amount.
    """
    
    users = list(users_collection.find().skip(start).limit(amount))
    
    for user in users:
        user['_id'] = str(user['_id'])

    return jsonify(users)

@user_bp.route('/user', methods=['POST'])
def create_user():
    """
    Create a user.
    """

    # Get data from the request
    user_data = request.json  # Assumes JSON payload
    if not user_data:
        return jsonify({"error": "No data provided"}), 400
    
    user = users_collection.find_one({"email": user_data["email"]})
    
    if user:
        return jsonify({"message": "The user already exists!", "user": str(user_data)}), 404

    # Insert user data into MongoDB
    result = users_collection.insert_one(user_data)
    return jsonify({"message": "User added", "user_id": str(result.inserted_id)})
