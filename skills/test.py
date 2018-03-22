import requests

url = "https://cdetsng.cisco.com/wsapi/LTS-5.0/api/bug/CSCun66310/note/Release-note"

headers = {
    'Authorization': "OAuth oauth_consumer_key=\"8f21b566-3ba1-4aa8-a629-e109f6c1bbb2\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1521760724\",oauth_nonce=\"QQniicDwLyO\",oauth_version=\"1.0\",oauth_signature=\"NEoMFSzF6Ow7%2FUufWt5j294ybh0%3D\"",
    'Cache-Control': "no-cache",
    'Postman-Token': "2b351fca-b12f-4c86-90b7-9d1b09c95f48"
    }

response = requests.request("GET", url, headers=headers)

print(response.text)
