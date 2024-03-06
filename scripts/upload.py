import sys
import requests

sys.stdout.flush()
lines = sys.stdin.readlines()
content = "\n".join(lines)

domain = "https://ta.trc.lol" 

if __name__ == "__main__":
    url = domain + '/uploads'
    payload = {
        'user': 'user',
        'content': content
    }

    try:
        response = requests.post(url, json=payload)
        if response.status_code == 200:
            print("Uploading output successful.")
        else:
            print("Uploading failed with status code:", response.status_code)
    except requests.exceptions.RequestException as e:
        print("An error occurred:", e)
