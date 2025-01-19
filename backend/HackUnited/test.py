import requests
import json

url = "http://127.0.0.1:5000/get-routes"
headers = {"Content-Type": "application/json"}

data = {
    "start": [-79.380085, 43.654380]
    ,
    "destination": [-79.420085, 43.674380]
}

response = requests.post(url, headers=headers, json=data)

if response.status_code == 200:
    print("Response:", response.json())
else:
    print("Error:", response.status_code, response.text)
