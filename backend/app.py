import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import time

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/process-text', methods=['POST'])
def process_text():
    try:
        request_body = request.data

        # Decode the request body if needed (assuming UTF-8 encoding)
        decoded_body = request_body.decode('utf-8')

        

        # Get the current Unix millisecond timestamp
        timestamp_ms = int(time.time() * 1000)
        filename = fr'test_{timestamp_ms}.json'

        prettified_body = json.dumps(json.loads(decoded_body), indent=4)
        print('Decoded Request Body:', decoded_body)

        # Save the decoded body to a file
        with open(filename, 'w') as file:
            file.write(decoded_body)

        # Git commands to commit and push changes
        subprocess.run(['git', 'add', filename])
        subprocess.run(['git', 'commit', '-m', 'Added file'])
        subprocess.run(['git', 'push'])

        return decoded_body
    except Exception as e:
        return f'Error parsing request body: {str(e)}'

if __name__ == '__main__':
    app.run(debug=True)