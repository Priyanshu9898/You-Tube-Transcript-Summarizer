from summarizer import Summarizer

# Create an instance of the Summarizer model
model = Summarizer()

# Provide the text you want to summarize
body = "The message you're seeing is a warning, not an error. It's saying that some weights from the pre-trained BERT model aren't being used because they're not needed for this specific task (text summarization). This is expected behavior and shouldn't prevent your code from running.The line Text body that you want to summarize with BERT seems to be a placeholder text. It should be replaced with the actual text you want to summarize, which in your case is the YouTube video transcript.If you're still not getting a summary, it could be because the transcript is too short or doesn't contain enough information for the BERT model to generate a meaningful summary. You could try testing your code with a longer or more detailed transcript to see if that resolves the issue.If the problem persists, please provide more details about the issue, such as any error messages you're seeing or how the output differs from what you're expecting."

# Call the model with the text to get the summary
summary = model(body)

# Print the summary
print("summary: ", summary)
