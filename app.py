from flask import Flask, render_template
import json
import os
app = Flask(__name__)

@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/portfolio')
def portfolio():
    with open("projects.json", "r") as f:
        projects = json.load(f)
    return render_template('portfolio.html', projects=projects)

@app.route('/contact')
def contact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)