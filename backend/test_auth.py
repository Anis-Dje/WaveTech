import requests

url = "http://localhost:8000/api/auth/jwt/create/"
data = {
    "username": "abdeldjallilramoul23@gmail.com",  # Changed from 'email' to 'username'
    "password": "djallilxd26"
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    if response.status_code == 200:
        tokens = response.json()
        print(f"Access Token: {tokens.get('access')}")
        print(f"Refresh Token: {tokens.get('refresh')}")
except Exception as e:
    print(f"Error: {e}")