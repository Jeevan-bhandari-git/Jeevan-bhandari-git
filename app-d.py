import os
import datetime
import wikipedia
import requests
import re
from flask import Flask , render_template, request, jsonify
from flask_cors import CORS
from chatgui import get_response

app = Flask(__name__)
CORS(app)

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    #if any(x in text for x in ["-who ", "-what "] ) or "'," not in get_response(text) :
    #print(request.get_json().get("message"))
    #print(get_response( text ))

    if len(get_response(text))!=2 :
        response = get_response(text)
        message = {"answer": response}
    else:
        response, urls = get_response( text )
        message = {"answer": response, "urls": urls}
        #print("message")

    return jsonify(message)

@app.post("/wishme")
def wishme():
    hour=datetime.datetime.now().hour
    if hour >= 0 and hour < 12:
        stalk = "Good Morning!"
    elif hour >= 12 and hour < 18:
        stalk = "Good Afternoon!"
    else:
        stalk= "Good Evening!"
    message = {"greets": stalk}
    return jsonify(message)


@app.post("/g1bot")
def g1bot():
    textg = request.get_json().get("message")
    #url_ = "https://www.google.com/search?q= " + textg
    info=''
    if any(x in textg for x in ["who ", "what "]):
        person = textg.replace('who is ', '').replace('what is ', '')
        try:
            info = wikipedia.summary(person, 1)
        except wikipedia.exceptions.PageError:
            info='Perhaps I didn’t understand your question correctly.'
    message = {"botg": info}
    return jsonify(message)


if __name__ == "__main__":
    app.run(debug=True)
