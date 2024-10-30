const express = require('express');
const router = express.Router();

router.use(express.json());

// POST endpoint for base64 encoding
router.post('/', (req, res) => {
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

// GET endpoint for base64 encoding description
router.get('/', (req, res) => {
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

module.exports = router; // Export the router
