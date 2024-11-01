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
      response = `Thank you for reaching out regarding: "${message}". We appreciate your message and will ensure it receives the attention it deserves. Your inquiry is important to us, and we will follow up promptly.`;
      break;
    case 'empathetic':
      response = `I understand how you feel about: "${message}". We recognize the challenges you might be facing, and we’re here to support you. Please let us know how we can assist further.`;
      break;
    case 'concise':
      response = `We’ve received your message: "${message}" and will respond accordingly. Thank you for your inquiry.`;
      break;
    case 'friendly':
      response = `Hey there! Thanks for reaching out with: "${message}"! We appreciate your message and will get back to you shortly. 😊`;
      break;
    case 'encouraging':
      response = `We’re excited to assist you with: "${message}"! Your goals are important to us, and we’ll do everything we can to support you. Let’s tackle this together!`;
      break;
    case 'reassuring':
      response = `Rest assured, we’re on top of your concern about: "${message}"! Your concerns are valid, and we’re committed to providing you with the best possible service.`;
      break;
    case 'persuasive':
      response = `We believe our solutions can really help you with: "${message}". Let’s discuss how we can work together effectively!`;
      break;
    case 'inquisitive':
      response = `That’s an interesting point regarding: "${message}"! We’d love to hear more about your thoughts and see how we can align our solutions with your needs.`;
      break;
    case 'thankful':
      response = `Thank you for your message about: "${message}"! We appreciate your engagement and look forward to collaborating with you on this matter.`;
      break;
    case 'collaborative':
      response = `Great to hear from you! We value teamwork and are eager to share ideas and work towards our common goals regarding: "${message}".`;
      break;
    case 'informative':
      response = `Thank you for your inquiry about: "${message}"! Here’s some detailed information on the topic.`;
      break;
    case 'directive':
      response = `To move forward effectively regarding: "${message}", please follow these steps:`;
      break;
    case 'supportive':
      response = `We’re here to help! If you need any assistance regarding: "${message}", feel free to ask. Together, we can find a solution.`;
      break;
    case 'casual':
      response = `Hey! Just wanted to drop a quick note to say we’re on it regarding: "${message}". Thanks for your patience!`;
      break;
    default:
      response = `Thank you for your message about: "${message}". We’ll do our best to assist you and ensure your needs are met.`;
  }

  // Send the dynamic response
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
  "message": "Your specific message here",
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