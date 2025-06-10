from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/consumer")
def consumer():
    return render_template("consumer.html")

@app.route("/asset")
def asset():
    return render_template("asset.html")

if __name__ == "__main__":
    app.run(debug=True)