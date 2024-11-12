from flask import Blueprint, render_template

# Create a blueprint
home_bp = Blueprint('home', __name__)

@home_bp.route('/', defaults={'page': 'index'})
@home_bp.route('/<page>', methods=['GET'])
def get_users(page: str):
    return render_template(f'{page}.html')
