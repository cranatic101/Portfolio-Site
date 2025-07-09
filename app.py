from flask import Flask, render_template, jsonify, request
from flask_mail import Mail, Message
import json
import os

app = Flask(__name__)

with open('config.json') as config_file:
    config = json.load(config_file)
 
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'suhaasvellanki07@gmail.com'          # your Gmail address
app.config['MAIL_PASSWORD'] = config.get("EMAIL_APP_PASSWORD")     # your Gmail App Password
app.config['MAIL_DEFAULT_SENDER'] = 'suhaasvellanki07@gmail.com'    # same as your username

mail = Mail(app)
 
@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/portfolio')
def portfolio():
    with open("projects.json", "r") as f:
        projects = json.load(f)
        print(projects)
    return render_template('portfolio.html', projects=projects)

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/send_email', methods=['POST'])
def send_email():
    print("test")
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message_content = data.get('message')

    msg = Message(
        subject=f"New message from {name}",
        sender=app.config['MAIL_USERNAME'],
        recipients=['suhaasvellanki07@gmail.com'],
        body=f"From: {name} <{email}>\n\nMessage:\n{message_content}"
    )

    try:
        mail.send(msg)
        return jsonify({"success": True}), 200
    except Exception as e:
        print(f"Error: {e}")

        #
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/items', methods = ["GET","POST"])
def items():
    return render_template('test.html', items = [1,2,3,4])


if __name__ == '__main__':
    app.run(debug=True)