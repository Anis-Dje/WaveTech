import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def get_auth_token():
    """Get authentication token by logging in"""
    login_data = {
        "username": "admin",  # Change this to your superuser username
        "password": "admin"   # Change this to your superuser password
    }
    
    response = requests.post(f"{BASE_URL}/api/auth/login/", json=login_data)
    if response.status_code == 200:
        return response.json().get('access')
    else:
        print(f"Login failed: {response.status_code} - {response.text}")
        return None

def test_cart_with_auth():
    print("Testing Cart API with Authentication...")
    
    # Get authentication token
    token = get_auth_token()
    if not token:
        print("Failed to get authentication token. Please check your login credentials.")
        return
    
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    # Test 1: Get empty cart
    print("\n1. Testing GET cart (empty):")
    response = requests.get(f"{BASE_URL}/api/cart/", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json() if response.status_code == 200 else response.text}")
    
    # Test 2: Add item to cart
    print("\n2. Testing POST - Add item to cart:")
    cart_data = {
        "product": 1,
        "quantity": 2
    }
    response = requests.post(f"{BASE_URL}/api/cart/", json=cart_data, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json() if response.status_code in [200, 201] else response.text}")
    
    # Test 3: Get cart with items
    print("\n3. Testing GET cart (with items):")
    response = requests.get(f"{BASE_URL}/api/cart/", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json() if response.status_code == 200 else response.text}")

if __name__ == "__main__":
    test_cart_with_auth()