from flask import Flask

def create_app(app):

    # Import blueprints
    from .routes.home import home_bp
    from .routes.auth import auth_bp
    from .routes.api.user import user_bp

    # Register blueprints
    app.secret_key = 'your_secret_key'
    app.register_blueprint(home_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp, url_prefix='/api')
    
    return app
