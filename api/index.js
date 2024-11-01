const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Function to analyze the message and determine the response tone
const analyzeMessage = (message) => {
  if (message.includes('urgent') || message.includes('asap')) {
    return { tone: 'professional', response: 'We understand the urgency of your request. Rest assured, we will prioritize this matter.' };
  } else if (message.includes('thanks') || message.includes('appreciate')) {
    return { tone: 'thankful', response: 'Thank you for your kind words! We are here to assist you.' };
  } else if (message.includes('help') || message.includes('support')) {
    return { tone: 'supportive', response: 'We’re here to help! Please let us know what you need assistance with.' };
  } else if (message.includes('hello') || message.includes('hi')) {
    return { tone: 'friendly', response: 'Hey there! Thanks for reaching out! 😊 How can we assist you today?' };
  } else {
    return { tone: 'neutral', response: 'Thank you for your message. We appreciate your communication.' };
  }
};

// Main Contextual Response Function (POST request)
app.post('/functions/generateResponse', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send({ error: "The 'message' field is required." });
  }

  const { tone, response } = analyzeMessage(message);

  // You can also make use of the tone variable to customize the response further
  res.send({ response: `${response} Your original message was: "${message}"` });
});

// GET request for documentation on the /functions/generateResponse endpoint
app.get('/functions/generateResponse', (req, res) => {
  res.send(`
    <h1>Generate Response Function</h1>
    <p>This endpoint generates responses based on the content of the provided message.</p>
    <p><strong>To use this endpoint:</strong></p>
    <ul>
      <li>Send a <strong>POST</strong> request to <code>/functions/generateResponse</code></li>
      <li>Include JSON data with a "message" field in the request body:</li>
    </ul>
    <pre><code>{
  "message": "Can I get assistance with my account?"
}</code></pre>
    <p>The API will analyze the message and generate a unique response based on its content.</p>
  `);
});

// Root route for API documentation
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Contextual Response API!</h1>
    <p>This API helps you generate unique responses based on your messages.</p>

    <h2>Endpoint</h2>
    <p><strong>POST <a href="/functions/generateResponse">/functions/generateResponse</a></strong></p>
    <ul>
      <li>Input JSON: <code>{ "message": "Your message here" }</code></li>
      <li>The API analyzes the message and returns a tailored response.</li>
    </ul>
  `);
});

// Export app for Vercel deployment
module.exports = app;
