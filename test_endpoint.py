import requests

url = "http://127.0.0.1:8000/vaccination-drives/"
payload = {
    "title": "Test Drive",
    "location": "Some Place",
    "drive_date": "2024-03-08",
    "drive_time_raw": "10:00 AM"
}

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
