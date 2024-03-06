import sys
import http.client
import json
from urllib.parse import urlparse

domain = "https://ta-api.trc.lol"

def post_request(url, payload):
    parsed_url = urlparse(url)
    hostname = parsed_url.hostname
    path = parsed_url.path

    if parsed_url.scheme == 'https':
        conn = http.client.HTTPSConnection(hostname)
    else:
        conn = http.client.HTTPConnection(hostname)

    headers = {
        'Content-Type': 'application/json',
    }

    conn.request("POST", path, body=json.dumps(payload), headers=headers)
    response = conn.getresponse()
    conn.close()

    return response

if __name__ == "__main__":
    sys.stdout.flush()
    lines = sys.stdin.readlines()
    content = "\n".join(lines)

    settings_file = open("settings.json", "r")
    settings = json.load(settings_file)

    url = domain + '/uploads'
    payload = {
        'user': settings["ubit"],
        'content': content
    }

    try:
        response = post_request(url, payload)
        if response.status == 200:
            print("Uploading output successful.")
        else:
            print("Uploading failed with status code:", response.status)
    except Exception as e:
        print("An error occurred:", e)
