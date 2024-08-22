from flask import Flask, render_template
app = Flask(__name__, template_folder="./templates", static_folder="./static")

@app.route("/")
def hello_world():
    with app.app_context():
        return render_template("client-site.html")
        

if "__main__" == __name__:
    app.run()
