import logging
import os
from app.config import initEnv
from app.db.mongo import MongoDB
from flask import Flask, render_template

app = Flask(__name__)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

@app.route('/list')
def list_page():
    return render_template('list.html')

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    initEnv()
    
    mongo = MongoDB()
    mongo.connect()
    
    enalbe_debug = True if os.getenv("DEBUG") == "True" else False

    app.run(debug=enalbe_debug, host='0.0.0.0', port=os.getenv("PORT"))
