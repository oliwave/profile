import logging
from bson import ObjectId, errors
from flask import Blueprint, jsonify, request, session, redirect, render_template, url_for
from app.db.mongo import MongoDB

# Create a blueprint
user_bp = Blueprint('user', __name__)

db = MongoDB().client
users_collection = db['users']  # Collection name

@user_bp.route('/user/<string:user_id>', methods=['GET', 'PUT'])
def get_user(user_id: str):
    """
    Get a user by their ID.
    """

    if 'user' not in session:
        return redirect(url_for('auth.login'))

    id = None
    try: 
        id = ObjectId(user_id)
    except errors.InvalidId:
        return jsonify({"error": "Invalid user ID format"}), 400

    
    if request.method == 'GET':
        
        user = users_collection.find_one({'_id': id})
        user['_id'] = str(user['_id'])
        del user['password']

        if user:
            return jsonify(user)
        else:
            return jsonify({"error": "User not found"}), 404

    elif request.method == 'PUT':
    
        user_data = request.json
        user = users_collection.find_one({'_id': id})
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        if "email" in user_data and user_data["email"] != user["email"]:
            return jsonify({"error": "Cannot change user Email!"}), 404        
        
        if "password" in user_data:
            return jsonify({"error": "Update password must use `old_password` and `new_password` fields!"}), 404        
        
        if "new_password" in user_data and "old_password" in user_data:
            if user_data["old_password"] != user["password"]:
                return jsonify({ "error": "Must provide the correct old password before updating"}), 404

            if not passPassworddLen(user_data["new_password"]):
                return jsonify({
                    "error": "The new password must at least has 10 characters",
                    "data": {"new_password": user_data["new_password"]}
                }), 404
            
            new_pass = user_data["new_password"]
            del user_data["new_password"]
            del user_data["old_password"]
            user_data["password"] = new_pass
        
        result = users_collection.update_one(
            {"_id": id},
            {"$set": user_data}
        )
        
        return jsonify({"message": "User updated", "user_id": str(result)})

@user_bp.route('/users', defaults={'start': 0, 'amount': 10})
@user_bp.route('/users/<int:start>/<int:amount>/', methods=['GET'])
def list_user(start: int, amount: int):
    """
    List users from start index with given amount.
    """
    
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    
    users = list(users_collection.find().skip(start).limit(amount))
    
    for user in users:
        user['_id'] = str(user['_id'])
        del user['password']

    return jsonify(users)

@user_bp.route('/user', methods=['POST'])
def create_user():
    """
    Create a user.
    """

    if 'user' in session:
        return jsonify({"error": "logout and create new user"}), 400

    # Get data from the request
    user_data = request.json  # Assumes JSON payload
    if not user_data:
        return jsonify({"error": "No data provided"}), 400
    elif not "password" in user_data or not "email" in user_data or not "name" in user_data:
        return jsonify({"error": "Password, email or username is empty!"}), 400

    if not isBUEmail(user_data["email"]):
        return jsonify({"error": "Only allow BU students to join!"}), 400
    
    if not passPassworddLen(user_data["password"]):
        return jsonify({"error": "Password must at least has 10 characters"}), 400

    user = users_collection.find_one({"email": user_data["email"]})
    
    if user:
        return jsonify({"error": "The user already exists!", "user": str(user_data)}), 400

    # Insert user data into MongoDB
    result = users_collection.insert_one(user_data)
    
    return redirect(url_for("auth.login"))

def isBUEmail(email: str) -> bool:
    return "@bu.edu" in email

def passPassworddLen(password: str) -> bool:
    return len(password) >= 10
