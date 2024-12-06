import logging
import os
from app.config import initEnv
from app.db.mongo import MongoDB
from flask import Flask
from app import create_app

logging.basicConfig(
    level=logging.INFO,  # Set the logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    format='%(asctime)s - %(levelname)s - %(message)s',  # Log format
    handlers=[
        logging.StreamHandler()  # Output logs to console (stdout)
    ]
)

app = create_app(Flask(__name__, template_folder="./templates"))

if __name__ == '__main__':
    initEnv()
    
    enalbe_debug = True if os.getenv("DEBUG") == "True" else False

    print("Hello World!")

    app.run(debug=enalbe_debug, host='0.0.0.0', port=os.getenv("PORT"))
