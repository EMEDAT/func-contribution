const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(`
<h1>Welcome to the Base64 Encode API!</h1>
<p>This API allows you to encode strings into Base64 format.</p>

<h2>Functionality Overview</h2>
<p>You can access the encoding function at the following route:</p>
<ul>
  <li><strong>Encoding Endpoint:</strong> Use <a href="/functions/base64Encode">/functions/base64Encode</a> to encode your string.</li>
</ul>

<h2>Accessing Function Routes</h2>
<p>Here’s how to interact with the Base64 Encode function:</p>
<ul>
  <li><strong>Get Function Documentation:</strong> Send a <code>GET</code> request to <a href="/functions/base64Encode">/functions/base64Encode</a> to retrieve documentation about the encoding function, including input requirements and output details.</li>
  <li><strong>Perform Encoding:</strong> To encode a string, send a <code>POST</code> request to <a href="/functions/base64Encode">/functions/base64Encode</a> with the JSON body containing your input. For example:</li>
</ul>

<pre><code>{
  "input": "Hello, world!"
}</code></pre>

<p>The response will provide the Base64 encoded string.</p>
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
