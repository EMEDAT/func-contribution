const express = require('express');
const cors = require('cors');
const nlp = require('@nlpjs/nlp'); // Import NLP library

const app = express();
app.use(express.json());
app.use(cors());

const nlpManager = new nlp.NlpManager({ languages: ['en'] });

// Improved training data for tone detection
const trainingData = [
  { text: 'I need assistance with this issue.', tone: 'supportive' },
  { text: 'Can you help me out?', tone: 'supportive' },
  { text: 'I’m struggling with this, can you assist?', tone: 'empathetic' },
  { text: 'I’m having trouble using your service.', tone: 'empathetic' },
  { text: 'Thank you so much for your help!', tone: 'thankful' },
  { text: 'I appreciate your support and assistance.', tone: 'thankful' },
  { text: 'Please follow up with me about this issue.', tone: 'directive' },
  { text: 'I need you to take action on this immediately.', tone: 'directive' },
  { text: 'Just a quick message to check in.', tone: 'friendly' },
  { text: 'Hey, could you give me a hand with this?', tone: 'friendly' },
  { text: 'Thank you for getting back to me so quickly.', tone: 'professional' },
  { text: 'I appreciate the prompt response.', tone: 'professional' },
  { text: 'I want to understand how your service works.', tone: 'inquisitive' },
  { text: 'Could you explain this feature to me?', tone: 'inquisitive' },
  { text: 'Let’s work together to solve this.', tone: 'collaborative' },
  { text: 'I’m open to ideas on how we can improve.', tone: 'collaborative' },
  { text: 'I am very pleased with your service.', tone: 'encouraging' },
  { text: 'Your support has been amazing!', tone: 'encouraging' },
  { text: 'I need just the essential details.', tone: 'concise' },
  { text: 'Can you keep the answer brief?', tone: 'concise' },
  { text: 'Thank you for taking the time to help.', tone: 'thankful' },
  { text: 'I’m grateful for your assistance.', tone: 'thankful' },
];

// Add training data to the NLP model
for (const { text, tone } of trainingData) {
  nlpManager.addDocument('en', text, tone);
}

// Train the NLP model
async function trainNlp() {
  await nlpManager.train();
  nlpManager.save();
}
trainNlp(); // Train the model at server startup

// Responses based on detected tones
const toneResponses = {
  professional: "Thank you for reaching out. We appreciate your message and will ensure it receives the attention it deserves.",
  empathetic: "I understand how you feel and appreciate your patience. We’re here to support you.",
  concise: "We’ve received your message and will respond accordingly. Thank you.",
  friendly: "Hey there! Thanks for reaching out! We’ll get back to you shortly. 😊",
  supportive: "We’re here to help! Feel free to ask for any assistance.",
  thankful: "Thank you for your message! We appreciate your engagement.",
  directive: "To move forward effectively, please follow these steps.",
  inquisitive: "That’s an interesting point! We’d love to hear more about your thoughts.",
  collaborative: "Great to hear from you! We value teamwork and are eager to share ideas.",
  encouraging: "We’re excited to assist you! Let’s tackle this together!",
};

// Main Contextual Response Function (POST request)
app.post('/functions/generateResponse', async (req, res) => {
  const { message, tone } = req.body;

  // If a tone is provided, use it directly
  if (tone && toneResponses[tone.toLowerCase()]) {
    return res.send({ response: toneResponses[tone.toLowerCase()], originalMessage: message });
  }

  // Detect tone automatically if not provided
  const nlpResult = await nlpManager.process('en', message);
  const detectedTone = nlpResult.intent;

  // Send response based on detected tone
  const response = toneResponses[detectedTone] || "Thank you for your message. We’ll do our best to assist you.";
  res.send({ response, detectedTone, originalMessage: message });
});

// Root route for API documentation
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Contextual Response API!</h1>
    <p>This API helps you generate responses in various tones based on the message content.</p>
  `);
});

// Export app for Vercel deployment
module.exports = app;