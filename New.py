# from flask import Flask, request, redirect, url_for, jsonify, render_template
# import os
# import whisper
# import json

# app = Flask(__name__)

# @app.route('/', methods=['GET', 'POST'])
# def transcribe():
#     if request.method == 'POST':
#         file = request.files['file']
#         if file:
#             model = whisper.load_model("base")
#             transcript = model.transcribe("audio.mp3")
#             return jsonify(transcript["text"])

# if __name__ == "__main__":
#     app.run(debug=True)