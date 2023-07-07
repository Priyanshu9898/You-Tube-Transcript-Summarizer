"use client";

import axios from "axios";
import React, { useState } from "react";

const TranscriptSummarizer: React.FC = () => {
  const [videoLink, setVideoLink] = useState("");
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoLink(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = videoLink.split("v")[1]?.slice(1);

    if (!videoId) {
      setError("Invalid YouTube video link");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/summarize", {
        videoId,
      });
      const { transcript, summary } = response.data;
      setTranscript(transcript);
      setSummary(summary);
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">YouTube Transcript Summarizer</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="videoLink"
              className="block text-sm font-medium text-gray-700"
            >
              YouTube Video Link:
            </label>
            <input
              id="videoLink"
              type="text"
              value={videoLink}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {transcript && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Transcript:</h2>
            <p className="text-gray-800 break-words">{transcript}</p>
          </div>
        )}
        {summary && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Summary:</h2>
            <p className="text-gray-800 break-words">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptSummarizer;
