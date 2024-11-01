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

  // Handle specific inquiry first
  if (message.toLowerCase().includes("can i get assistance with my account")) {
    // Use tone to modify the response style
    switch (tone.toLowerCase()) {
      case 'professional':
        response = `Absolutely! We are here to assist you with your account. Please provide more details about the assistance you need.`;
        break;
      case 'empathetic':
        response = `Of course! We understand how important this is. Please let us know what assistance you need with your account.`;
        break;
      case 'concise':
        response = `Sure! How can we assist you with your account?`;
        break;
      case 'friendly':
        response = `Hey there! We're here to help you with your account. Just let us know what you need! 😊`;
        break;
      case 'encouraging':
        response = `Absolutely! We're excited to help you with your account. Let us know how we can assist you!`;
        break;
      case 'reassuring':
        response = `Rest assured, we’re here to help you with your account. Please share what you need assistance with.`;
        break;
      // Add other tones as necessary...
      default:
        response = `Absolutely! We are here to assist you with your account. Please provide more details about the assistance you need.`;
    }
  } else {
    // Handle other messages based on tone
    switch (tone.toLowerCase()) {
      case 'professional':
        response = `Thank you for reaching out. We appreciate your message and will ensure it receives the attention it deserves. Your inquiry is important to us, and we will follow up promptly.`;
        break;
      case 'empathetic':
        response = `I understand how you feel and appreciate your patience. We recognize the challenges you might be facing, and we’re here to support you. Please let us know how we can assist further.`;
        break;
      case 'concise':
        response = `We’ve received your message and will respond accordingly. Thank you for your inquiry.`;
        break;
      case 'friendly':
        response = `Hey there! Thanks for reaching out! We appreciate your message and will get back to you shortly. 😊`;
        break;
      case 'encouraging':
        response = `We’re excited to assist you! Your goals are important to us, and we’ll do everything we can to support you. Let’s tackle this together!`;
        break;
      // Add other tones as necessary...
      default:
        response = `Thank you for your message. We’ll do our best to assist you and ensure your needs are met.`;
    }
  }

  // Include the user's message for context if needed
  res.send({ response, originalMessage: message });
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
    <p>Supported tones include: <strong>Professional</strong>, <strong>Empathetic</strong>, <strong>Concise</strong>, <strong>Friendly</strong>, <strong>Encouraging</strong>, <strong>Reassuring</strong>, <strong>Persuasive</strong>, <strong>Inquisitive</strong>, <strong>Thankful</strong>, <strong>Collaborative</strong>, <strong>Informative</strong>, <strong>Directive</strong>, <strong>Supportive</strong>, <strong>Casual</strong>.</p>
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
      <li>Supported tones include: <strong>Professional</strong>, <strong>Empathetic</strong>, <strong>Concise</strong>, <strong>Friendly</strong>, <strong>Encouraging</strong>, <strong>Reassuring</strong>, <strong>Persuasive</strong>, <strong>Inquisitive</strong>, <strong>Thankful</strong>, <strong>Collaborative</strong>, <strong>Informative</strong>, <strong>Directive</strong>, <strong>Supportive</strong>, <strong>Casual</strong>.</li>
    </ul>
  `);
});

// Export app for Vercel deployment
module.exports = app;