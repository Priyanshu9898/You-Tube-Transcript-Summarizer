from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)

summarizer = pipeline('summarization')


def summarizeText(result):
    num_iters = int(len(result)/1000)
    summarized_text = []
    for i in range(0, num_iters + 1):
        start = 0
        start = i * 1000
        end = (i + 1) * 1000
        print("input text \n" + result[start:end])
        out = summarizer(result[start:end])
        out = out[0]
        out = out['summary_text']
        print("Summarized text\n"+out)
        summarized_text.append(out)

    print(summarized_text)

    return summarized_text


@app.route("/")
def home():
    return "<h1>Hello World!</h1>"


@app.route('/api/summarize', methods=['POST'])
def summarize():

    youtube_video_id = request.json['videoId']

    print("YouTube video Id", youtube_video_id)

    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(youtube_video_id)

    except Exception as e:
        app.logger.error(f"Error in fetching transcript: {str(e)}")
        return jsonify(error=str(e)), 500

    full_transcript = " ".join([x['text'] for x in transcript_list])

    try:

        # print("Transcript: ", full_transcript)

        summarized_text = summarizeText(full_transcript)

        print(type(summarized_text))


        print("Summary", summarized_text[0])

        return jsonify({
            'transcript': full_transcript,
            'summary': summarized_text[0]
        })

    except Exception as e:

        app.logger.error(f"Error in summarization: {str(e)}")
        return jsonify(error=str(e)), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
