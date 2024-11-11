from flask import Blueprint, render_template

# Create a blueprint
home_bp = Blueprint('home', __name__)

@home_bp.route('/', methods=['GET'])
def get_users():
    return render_template('index.html')