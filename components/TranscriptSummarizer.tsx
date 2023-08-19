"use client";

import axios from "axios";
import React, { useState } from "react";
import clipboardCopy from "clipboard-copy";
import { toast } from 'react-hot-toast';

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
      setTranscript(""); // Clear transcript
      setSummary("");
      return;
    }

    setLoading(true);
    setError("");
    
    setTranscript(""); // Clear transcript
    setSummary("");

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };
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
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-6 text-black">
        YouTube Transcript Summarizer
      </h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="videoLink"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              YouTube Video Link:
            </label>
            <input
              id="videoLink"
              type="text"
              value={videoLink}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full border-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-black"
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
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-black mt-8 font-bold mb-2">
                Transcript:
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-black mt-8 mb-2 cursor-pointer hover:text-blue-500" 
                onClick={() => {
                  clipboardCopy(transcript);
                  toast("Transcript Copied to Clipboard!", {
                    icon: "👏",
                    style: {
                      borderRadius: "10px",
                      background: "#333",
                      color: "#fff",
                    },
                  });
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
              </svg>
            </div>

            <div className=" text-black max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-indigo-100">
              <p className="text-gray-800 break-words">{transcript}</p>
            </div>
          </>
        )}
        {summary && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-black mt-8 font-bold mb-2">
                Summary:
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-black mt-8 mb-2 cursor-pointer hover:text-blue-500" 
                onClick={() => {
                  clipboardCopy(summary);
                  toast("Summary Copied to Clipboard!", {
                    icon: "👏",
                    style: {
                      borderRadius: "10px",
                      background: "#333",
                      color: "#fff",
                    },
                  });
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
              </svg>
            </div>

            <div className=" text-black max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-indigo-100">
              <p className="text-gray-800 break-words">{summary}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TranscriptSummarizer;
