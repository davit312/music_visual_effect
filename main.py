import flask
from flask import Flask

app = Flask(__name__)

@app.route('/')
@app.route('/<path:filename>')
def index(filename=''):
    filename = filename or 'index.html'
    return flask.send_from_directory('.', filename)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)


