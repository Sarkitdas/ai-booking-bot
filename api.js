require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

console.log('OpenRouter API Key:', process.env.OPENROUTER_API_KEY ? '✅ Loaded' : '❌ Missing');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serves your index.html and frontend files

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: 'google/gemma-3-4b-it:free',
        prompt: userMessage,
        max_tokens: 200
      })
    });

    const data = await response.json();

    console.log('OpenRouter response:', data);

    if (data.choices && data.choices[0] && data.choices[0].text) {
      res.json({ reply: data.choices[0].text });
    } else {
      res.status(500).json({ error: 'No valid response from OpenRouter' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch from OpenRouter' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
