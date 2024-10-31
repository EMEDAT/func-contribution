const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Base64 Encode API!</h1>
    <p>Use <a href="/functions/base64Encode">/functions/base64Encode</a> for encoding.</p>
    <p>Access your function routes:</p>
    <ul>
      <li>For documentation, go to <a href="/functions/base64Encode">/functions/base64Encode</a> (GET request).</li>
      <li>To encode a string, send a POST request to <a href="/functions/base64Encode">/functions/base64Encode</a> with a JSON body like <code>{"input": "Hello, world"}</code>.</li>
    </ul>
  `);
});

app.post('/functions/base64Encode', async (req, res) => {
  const { input } = req.body;
  if (!input) {
    return res.status(400).send({ error: "Input is required" });
  }
  try {
    const output = Buffer.from(input).toString('base64');
    res.send({ output });
  } catch (error) {
    console.error('Encoding error:', error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get('/functions/base64Encode', (req, res) => {
  res.json({
    name: "base64Encode",
    description: "Encode anything to base64",
    input: {
      type: "string",
      description: "Input the data you'd like to encode to base64",
      example: "Hello, world"
    },
    output: {
      type: "string",
      description: "Base64 encoded string",
      example: "SGVsbG8sIHdvcmxk"
    }
  });
});

// Export app for Vercel deployment
module.exports = app;
