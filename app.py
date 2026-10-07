from flask import Flask, send_from_directory

app = Flask(__name__, static_folder=".")

@app.get("/")
def home():
    return send_from_directory(".", "index.html")

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
