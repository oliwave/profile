from flask import Blueprint, session, redirect, url_for, request, render_template, jsonify
from app.db.mongo import MongoDB

# Create a blueprint
auth_bp = Blueprint('auth', __name__)

db = MongoDB().client
users_collection = db['users']  # Collection name

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_data = request.json
        email = user_data["email"]
        password = user_data["password"]
        
        user = users_collection.find_one({"email": email})
        
        if not user:
            # return redirect(url_for('auth.signup'))
            return jsonify({"error": "No such user"}), 400

        # Replace with real authentication logic
        if email == user['email'] and password == user['password']:
            session['user'] = email  # Store user in session
            return redirect(url_for('home.list'))

        return jsonify({"error": "Invalid credentials"}), 401

    return render_template('login.html')

@auth_bp.route('/signup', methods=['GET'])
def signup():
    return render_template('signup.html')

@auth_bp.route('/logout', methods=['GET'])
def logout():
    session.pop('user', None)  # Clear session
    return redirect(url_for('auth.login'))
