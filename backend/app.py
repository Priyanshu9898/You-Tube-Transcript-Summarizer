from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='http://localhost:3001')

@app.route("/")
def home():
    return "<h1>Home</h1>"

@app.route('/api/summarize', methods=['POST'])
def summarize():
    video_Id = request.json['videoId']

    print(video_Id)

    transcript = YouTubeTranscriptApi.get_transcript(video_Id)

    print(transcript)

    text = ' '.join([line['text'] for line in transcript])

    summarizer = pipeline('summarization')
    summary = summarizer(text, max_length=100, min_length=30, do_sample=False)[0]['summary_text']

    return jsonify({
        'transcript': text,
        'summary': summary
    })

if __name__ == '__main__':
    app.run(debug=True)
