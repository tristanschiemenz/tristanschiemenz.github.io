from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

names = []
counter = 0

@app.route('/names', methods=['GET', 'POST'])
def handle_names():
    global counter
    if request.method == 'POST':
        name = request.json.get('name')
        if name:
            names.append(name)
            counter += 1
        return jsonify(counter=counter, names=names)
    elif request.method == 'GET':
        return jsonify(counter=counter, names=names)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
