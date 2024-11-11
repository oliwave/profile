# Use the official Python image from the Docker Hub
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the image
COPY requirements.txt requirements.txt

# Install dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port that your application runs on (if applicable)
EXPOSE 5001

# Command to run the application (adjust as needed)
CMD ["python", "main.py"]
