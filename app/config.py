import logging
import os
from pathlib import Path
from dotenv import load_dotenv
def initEnv() -> None:

  # Get the environment type (e.g., 'development' or 'production')
  env = os.getenv('ENV', 'dev')  # Default to 'development' if ENV is not set
  
  logging.info(f"The current environment is: {env}")
  
  # Construct the file path for the desired .env file
  dotenv_file = f'.env.{env}'
  dotenv_path = Path(f'./{dotenv_file}')

  load_dotenv(dotenv_path=dotenv_path)
