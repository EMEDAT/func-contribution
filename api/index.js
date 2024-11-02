const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const toneResponses = {
  professional: {
    account: "Absolutely! We are here to assist you with your account. Please provide more details about the assistance you need.",
    general: "Thank you for reaching out. We appreciate your message and will ensure it receives prompt attention."
  },
  empathetic: {
    account: "Of course! We understand how important this is. Please let us know what assistance you need with your account.",
    general: "I understand how you feel and appreciate your patience. We're here to support you."
  },
  concise: {
    account: "Sure! How can we assist you with your account?",
    general: "Message received. We'll respond shortly."
  },
  friendly: {
    account: "Hey there! We're here to help you with your account. Just let us know what you need! 😊",
    general: "Hi! Thanks for reaching out! We'll get back to you soon! 😊"
  },
  encouraging: {
    account: "Absolutely! We're excited to help you with your account. Let us know how we can assist you!",
    general: "We're excited to assist you! Your goals are important to us, and we'll do everything we can to support you."
  },
  reassuring: {
    account: "Rest assured, we're here to help you with your account. Please share what you need assistance with.",
    general: "Thank you for your message. We'll do our best to assist you and ensure your needs are met."
  },
  persuasive: {
    account: "We're eager to assist you! Our team is ready to provide the best support for your account. Just let us know how we can help!",
    general: "Your inquiry is important to us, and we're ready to assist you in every way possible. How can we help you today?"
  },
  inquisitive: {
    account: "I'd love to help! What specific assistance do you need with your account?",
    general: "What can we assist you with today? We're here to help!"
  },
  thankful: {
    account: "Thank you for reaching out! We're here to help with your account. Please tell us what you need!",
    general: "Thank you for your message! We value your communication and will respond as soon as possible."
  },
  collaborative: {
    account: "Let's work together on this! We're here to assist you with your account. What do you need help with?",
    general: "We appreciate your inquiry! Let's work together to find the best solution for your needs."
  },
  informative: {
    account: "We can definitely assist you with your account. Please provide the details of your inquiry so we can assist you effectively.",
    general: "Thank you for reaching out. We're here to provide you with the information you need, so feel free to ask!"
  },
  directive: {
    account: "Please let us know exactly what assistance you require for your account so we can help you right away.",
    general: "Please provide us with specific details about your inquiry so we can assist you effectively."
  },
  supportive: {
    account: "We're here for you! Please share the details of your account issue, and we'll work through it together.",
    general: "We're here to support you! Please let us know what you need, and we'll help you through it."
  },
  casual: {
    account: "No worries! Just let us know what you need help with regarding your account, and we'll take care of it!",
    general: "Thanks for reaching out! Just let us know what you need, and we'll take care of it!"
  }
};

// POST endpoint for generating responses
app.post('/functions/toneFlow', async (req, res) => {
  const { input } = req.body;

  if (!input || !input.message || !input.tone) {
    return res.status(400).send({
      output: { error: "Both 'message' and 'tone' are required." }
    });
  }

  const { message, tone } = input;
  const toneKey = tone.toLowerCase();
  const isAccountQuery = message.toLowerCase().includes("can i get assistance with my account");

  const response = toneResponses[toneKey]?.[isAccountQuery ? 'account' : 'general'] ||
    "Thank you for your message. We'll do our best to assist you.";

  res.send({
    output: {
      response,
      originalMessage: message
    }
  });
});

// GET endpoint for documentation - Updated it to match required format
app.get('/functions/toneFlow', (req, res) => {
  res.json({
    name: "ToneFlow",
    description: "Generates responses in different tones based on input message",
    input: {
      type: "object",
      description: "Input object containing message and desired tone",
      example: {
        message: "Can I get assistance with my account",
        tone: "professional"
      },
      properties: {
        message: {
          type: "string",
          description: "The message to be processed"
        },
        tone: {
          type: "string",
          description: "The desired tone for the response",
          enum: [
            "professional",
            "empathetic",
            "concise",
            "friendly",
            "encouraging",
            "reassuring",
            "persuasive",
            "inquisitive",
            "thankful",
            "collaborative",
            "informative",
            "directive",
            "supportive",
            "casual"
          ]
        }
      }
    },
    output: {
      type: "object",
      description: "Generated response with original message",
      example: {
        response: "Absolutely! We are here to assist you with your account. Please provide more details about the assistance you need.",
        originalMessage: "Can I get assistance with my account"
      },
      properties: {
        response: {
          type: "string",
          description: "The generated response in the requested tone"
        },
        originalMessage: {
          type: "string",
          description: "The original input message"
        }
      }
    }
  });
});

// Root route redirects to function documentation
app.get('/', (req, res) => {
  res.redirect('/functions/toneFlow');
});

module.exports = app;