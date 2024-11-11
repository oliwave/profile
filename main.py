import os
from app.config import initEnv
from app.db.mongo import MongoDB
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    initEnv()
    
    mongo = MongoDB()
    mongo.connect()
    
    enalbe_debug = True if os.getenv("DEBUG") == "True" else False

    app.run(debug=enalbe_debug, host='0.0.0.0', port=os.getenv("PORT"))
