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
        self.client = self.connect()

    def connect(self):
        # Create a new client and connect to the server
        client = MongoClient(uri, server_api=ServerApi('1'))

        # Send a ping to confirm a successful connection
        try:
            client.admin.command('ping')
            print("Pinged your deployment. You successfully connected to MongoDB!")
            client = client['profile']
        except Exception as e:
            print(f"The MONGODB_URI: {os.getenv("MONGODB_URI")}")
            print(f"Failed to connect to MongoDB: {e}")
            
        return client
