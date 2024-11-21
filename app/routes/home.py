from flask import Blueprint, render_template, session, redirect, url_for

# Create a blueprint
home_bp = Blueprint('home', __name__)

@home_bp.route('/', methods=['GET'])
def list():
    if 'user' not in session:
        return redirect(url_for('auth.login'))

    return render_template('list.html')

@home_bp.route('/user/<string:user_id>', methods=['GET'])
def profile(user_id: str):
    if 'user' not in session:
        return redirect(url_for('auth.login'))

    return render_template('profile.html', user_id=user_id)
