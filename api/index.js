const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Main Contextual Response Function
app.post('/functions/generateResponse', async (req, res) => {
  const { message, tone } = req.body;

  if (!message || !tone) {
    return res.status(400).send({ error: "Both 'message' and 'tone' are required." });
  }

  let response;

  switch (tone.toLowerCase()) {
    case 'professional':
      response = `Thank you for reaching out. We appreciate your message and will ensure it receives the attention it deserves. ${message}`;
      break;
    case 'empathetic':
      response = `I understand how you feel and appreciate your patience. Please know we’re here to help. ${message}`;
      break;
    case 'concise':
      response = `We’ve received your message and will respond accordingly. ${message}`;
      break;
    case 'friendly':
      response = `Hey there! Thanks for your message! We’ll get back to you soon. 😊 ${message}`;
      break;
    default:
      response = `Thank you for your message. We’ll do our best to assist. ${message}`;
  }

  res.send({ response });
});

app.get('/', (req, res) => {
  res.send(`
<h1>Welcome to the Contextual Response API!</h1>
<p>This API helps you generate responses in various tones.</p>

<h2>Endpoint</h2>
<p><strong>POST /functions/generateResponse</strong></p>
<ul>
  <li>Input JSON: { "message": "Your message here", "tone": "desired tone" }</li>
  <li>Supported tones: "Professional", "Empathetic", "Concise", "Friendly"</li>
</ul>
`);
});

// Export app for Vercel deployment
module.exports = app;
