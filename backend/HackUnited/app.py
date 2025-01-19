from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS package
from safety import main

app = Flask(__name__)
CORS(app)  # Allow all domains to access the Flask API

@app.route("/", methods=["GET"])
def home():
    return "Welcome to the home route!"

@app.route("/get-routes", methods=["POST"])
def process_coords():
    # Get the JSON data from the request
    data = request.get_json()
    print('hi')
    
    # Extract 'start' and 'destination' from the data
    origin = data.get("start")
    destination = data.get("destination")
    
    # Ensure both 'start' and 'destination' exist and are not empty
    if not origin or not destination:
        return jsonify({"error": "Both 'start' and 'destination' must be provided"}), 400
    
    # Extract latitude and longitude from the 'start' and 'destination' fields
    print(origin, destination)
    # Call the method from main.py (your existing logic)
    result = main(origin, destination)
    
    # Return the result as JSON
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
