from flask import Flask, render_template, jsonify, request
import requests
import random
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

api_key = os.getenv('API_KEY')

app = Flask(__name__)

# exerciseDB API
API_KEY = api_key

# RapidAPI headers
headers = {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
}

# List of chores for random selection
chores = [
    'CLEAN THE DISHES',
    'VACCUUM YOUR HOME',
    'DO THE LAUNDRY',
    'EMPTY THE BINS',
    'TIDY YOUR DESK'
]

# Function to fetch a random exercise from the exerciseDB API
def get_random_exercise():
    try:
        url = "https://exercisedb.p.rapidapi.com/exercises"
        querystring = {"limit": "10"} 
        response = requests.get(url, headers=headers, params=querystring)
        response.raise_for_status()
        exercises = response.json()
        exercise = random.choice(exercises)
        exercise_name = exercise['name'].upper()
        exercise['name'] = exercise_name
        return exercise
    except requests.exceptions.RequestException as e:
        return None

# Define route for the AJAX request for getting a random chore / exercise
@app.route('/get_task', methods=['POST'])
def get_task():
    exercise = get_random_exercise()
    chore = random.choice(chores)
    return jsonify({'exercise': exercise, 'chore': chore})

# Define route for the homepage
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)
