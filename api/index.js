const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Modified main function to match func.live format
app.post('/functions/toneFlow', async (req, res) => {
  const { input } = req.body;

  if (!input || !input.message || !input.tone) {
    return res.status(400).send({ 
      output: { error: "Both 'message' and 'tone' are required in the input object." }
    });
  }

  const { message, tone } = input;
  let response;

  // Handling specific inquiry first
  if (message.toLowerCase().includes("can i get assistance with my account")) {
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
        response = `Rest assured, we're here to help you with your account. Please share what you need assistance with.`;
        break;
      case 'persuasive':
        response = `We're eager to assist you! Our team is ready to provide the best support for your account. Just let us know how we can help!`;
        break;
      case 'inquisitive':
        response = `I'd love to help! What specific assistance do you need with your account?`;
        break;
      case 'thankful':
        response = `Thank you for reaching out! We're here to help with your account. Please tell us what you need!`;
        break;
      case 'collaborative':
        response = `Let's work together on this! We're here to assist you with your account. What do you need help with?`;
        break;
      case 'informative':
        response = `We can definitely assist you with your account. Please provide the details of your inquiry so we can assist you effectively.`;
        break;
      case 'directive':
        response = `Please let us know exactly what assistance you require for your account so we can help you right away.`;
        break;
      case 'supportive':
        response = `We're here for you! Please share the details of your account issue, and we'll work through it together.`;
        break;
      case 'casual':
        response = `No worries! Just let us know what you need help with regarding your account, and we'll take care of it!`;
        break;
      default:
        response = `Absolutely! We are here to assist you with your account. Please provide more details about the assistance you need.`;
    }
  } else {
    switch (tone.toLowerCase()) {
      case 'professional':
        response = `Thank you for reaching out. We appreciate your message and will ensure it receives the attention it deserves. Your inquiry is important to us, and we will follow up promptly.`;
        break;
      case 'empathetic':
        response = `I understand how you feel and appreciate your patience. We recognize the challenges you might be facing, and we're here to support you. Please let us know how we can assist further.`;
        break;
      case 'concise':
        response = `We've received your message and will respond accordingly. Thank you for your inquiry.`;
        break;
      case 'friendly':
        response = `Hey there! Thanks for reaching out! We appreciate your message and will get back to you shortly. 😊`;
        break;
      case 'encouraging':
        response = `We're excited to assist you! Your goals are important to us, and we'll do everything we can to support you. Let's tackle this together!`;
        break;
      case 'persuasive':
        response = `Your inquiry is important to us, and we're ready to assist you in every way possible. How can we help you today?`;
        break;
      case 'inquisitive':
        response = `What can we assist you with today? We're here to help!`;
        break;
      case 'thankful':
        response = `Thank you for your message! We value your communication and will respond as soon as possible.`;
        break;
      case 'collaborative':
        response = `We appreciate your inquiry! Let's work together to find the best solution for your needs.`;
        break;
      case 'informative':
        response = `Thank you for reaching out. We're here to provide you with the information you need, so feel free to ask!`;
        break;
      case 'directive':
        response = `Please provide us with specific details about your inquiry so we can assist you effectively.`;
        break;
      case 'supportive':
        response = `We're here to support you! Please let us know what you need, and we'll help you through it.`;
        break;
      case 'casual':
        response = `Thanks for reaching out! Just let us know what you need, and we'll take care of it!`;
        break;
      default:
        response = `Thank you for your message. We'll do our best to assist you and ensure your needs are met.`;
    }
  }

  // Modified response format to match func.live requirements
  res.send({ 
    output: {
      response,
      originalMessage: message
    }
  });
});

// Modified GET endpoint documentation to reflect new input/output format
app.get('/functions/toneFlow', (req, res) => {
  res.send(`
    <h1>ToneFlow Response Generator</h1>
    <p>This endpoint generates responses based on the given tone.</p>
    <p><strong>To use this endpoint:</strong></p>
    <ul>
      <li>Send a <strong>POST</strong> request to <code>/functions/toneFlow</code></li>
      <li>Include JSON data with an "input" object containing "message" and "tone" fields:</li>
    </ul>
    <pre><code>{
  "input": {
    "message": "Can I get assistance with my account?",
    "tone": "Empathetic"
  }
}</code></pre>
    <p><strong>Response format:</strong></p>
    <pre><code>{
  "output": {
    "response": "Generated response text",
    "originalMessage": "Your original message"
  }
}</code></pre>
    <p>Supported tones include: <strong>Professional</strong>, <strong>Empathetic</strong>, <strong>Concise</strong>, <strong>Friendly</strong>, <strong>Encouraging</strong>, <strong>Reassuring</strong>, <strong>Persuasive</strong>, <strong>Inquisitive</strong>, <strong>Thankful</strong>, <strong>Collaborative</strong>, <strong>Informative</strong>, <strong>Directive</strong>, <strong>Supportive</strong>, <strong>Casual</strong>.</p>
  `);
});

// Updated root route documentation
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the ToneFlow API!</h1>
    <p>This API generates responses in various tones based on your input message.</p>

    <h2>Endpoint</h2>
    <p><strong>POST <a href="/functions/toneFlow">/functions/toneFlow</a></strong></p>
    <p>Input format:</p>
    <pre><code>{
  "input": {
    "message": "Your message here",
    "tone": "desired tone"
  }
}</code></pre>
    <p>Output format:</p>
    <pre><code>{
  "output": {
    "response": "Generated response",
    "originalMessage": "Your original message"
  }
}</code></pre>
    <p>Supported tones include: <strong>Professional</strong>, <strong>Empathetic</strong>, <strong>Concise</strong>, <strong>Friendly</strong>, <strong>Encouraging</strong>, <strong>Reassuring</strong>, <strong>Persuasive</strong>, <strong>Inquisitive</strong>, <strong>Thankful</strong>, <strong>Collaborative</strong>, <strong>Informative</strong>, <strong>Directive</strong>, <strong>Supportive</strong>, <strong>Casual</strong>.</p>
  `);
});

module.exports = app;