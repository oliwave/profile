from flask import Flask

def create_app(app):

    # Import blueprints
    from .routes.home import home_bp
    from .routes.api.user import user_bp

    # Register blueprints
    app.register_blueprint(home_bp)
    app.register_blueprint(user_bp, url_prefix='/api')
    
    return app
