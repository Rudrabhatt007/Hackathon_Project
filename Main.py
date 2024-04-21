from flask import Flask, request, redirect, url_for, jsonify, render_template
import os
import whisper
import json
import quiz

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def func():
    model = whisper.load_model("base")
    result = model.transcribe("output.mp3")
    with open("transcript.txt", "w") as f:  # Open a text file for writing
        f.write(result["text"])
    quiz.quiz()
    return ""

if __name__ == "__main__":
    app.run(debug=True)