const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Main Contextual Response Function (POST request)
app.post('/functions/generateResponse', async (req, res) => {
  const { message, tone } = req.body;

  if (!message || !tone) {
    return res.status(400).send({ error: "Both 'message' and 'tone' are required." });
  }

  let response;

  switch (tone.toLowerCase()) {
    case 'professional':
      response = `Thank you for reaching out. We appreciate your message and will ensure it receives the attention it deserves. Your inquiry is important to us, and we will follow up promptly. ${message}`;
      break;
    case 'empathetic':
      response = `I understand how you feel and appreciate your patience. We recognize the challenges you might be facing, and we’re here to support you. Please let us know how we can assist further. ${message}`;
      break;
    case 'concise':
      response = `We’ve received your message and will respond accordingly. Thank you for your inquiry. ${message}`;
      break;
    case 'friendly':
      response = `Hey there! Thanks for reaching out! We appreciate your message and will get back to you shortly. 😊 ${message}`;
      break;
    case 'encouraging':
      response = `We’re excited to assist you! Your goals are important to us, and we’ll do everything we can to support you. Let’s tackle this together! ${message}`;
      break;
    case 'reassuring':
      response = `Rest assured, we’re on top of this! Your concerns are valid, and we’re committed to providing you with the best possible service. ${message}`;
      break;
    case 'persuasive':
      response = `We believe our solutions can really help you achieve your goals. Let’s discuss how we can work together effectively! ${message}`;
      break;
    case 'inquisitive':
      response = `That’s an interesting point! We’d love to hear more about your thoughts and see how we can align our solutions with your needs. ${message}`;
      break;
    case 'thankful':
      response = `Thank you for your message! We appreciate your engagement and look forward to collaborating with you on this matter. ${message}`;
      break;
    case 'collaborative':
      response = `Great to hear from you! We value teamwork and are eager to share ideas and work towards our common goals. ${message}`;
      break;
    case 'informative':
      response = `Thank you for your inquiry! Here’s some detailed information on the topic. ${message}`;
      break;
    case 'directive':
      response = `To move forward effectively, please follow these steps: ${message}`;
      break;
    case 'supportive':
      response = `We’re here to help! If you need any assistance, feel free to ask. Together, we can find a solution. ${message}`;
      break;
    case 'casual':
      response = `Hey! Just wanted to drop a quick note to say we’re on it. Thanks for your patience! ${message}`;
      break;
    default:
      response = `Thank you for your message. We’ll do our best to assist you and ensure your needs are met. ${message}`;
  }
  

  res.send({ response });
});

// GET request for documentation on the /functions/generateResponse endpoint
app.get('/functions/generateResponse', (req, res) => {
  res.send(`
    <h1>Generate Response Function</h1>
    <p>This endpoint generates responses based on the given tone.</p>
    <p><strong>To use this endpoint:</strong></p>
    <ul>
      <li>Send a <strong>POST</strong> request to <code>/functions/generateResponse</code></li>
      <li>Include JSON data with "message" and "tone" fields in the request body:</li>
    </ul>
    <pre><code>{
  "message": "Can I get assistance with my account?",
  "tone": "Empathetic"
}</code></pre>
    <p>Supported tones include: <strong>Professional</strong>, <strong>Empathetic</strong>, <strong>Concise</strong>, and <strong>Friendly</strong>.</p>
  `);
});

// Root route for API documentation
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Contextual Response API!</h1>
    <p>This API helps you generate responses in various tones.</p>

    <h2>Endpoint</h2>
    <p><strong>POST <a href="/functions/generateResponse">/functions/generateResponse</a></strong></p>
    <ul>
      <li>Input JSON: <code>{ "message": "Your message here", "tone": "desired tone" }</code></li>
      <li>Supported tones: "Professional", "Empathetic", "Concise", "Friendly"</li>
    </ul>
  `);
});

// Export app for Vercel deployment
module.exports = app;