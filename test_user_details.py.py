import requests

def fetch_user_details(user_id):
    url = f"http://example.com/api/users/{user_id}"
    response = requests.get(url)
    return response.json() if response.status_code == 200 else None

def display_user_details(user_details):
    if user_details:
        print(f"User: {user_details['name']}")
        print(f"Email: {user_details['email']}")
        print(f"Address: {user_details['address']}")
    else:
        print("User details not found.")
