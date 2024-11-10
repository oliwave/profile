import logging
import os
import threading
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = os.getenv("MONGODB_URI")

class MongoDB:
    
    _instance_lock = threading.Lock()
    _unique_instance = None

    def __new__(cls):
        with cls._instance_lock:
            if cls._unique_instance is None:
                cls._unique_instance = super(MongoDB, cls).__new__(cls)
                cls._unique_instance.__init__()

        return cls._unique_instance
    
    def __init__(self):
        self.client = None

    def connect(self):
        # Create a new client and connect to the server
        self.client = MongoClient(uri, server_api=ServerApi('1'))

        # Send a ping to confirm a successful connection
        try:
            self.client.admin.command('ping')
            logging.info("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            logging.critical(f"Failed to connect to MongoDB: {e}")