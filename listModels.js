require('dotenv').config();
const fetch = require('node-fetch');

async function listModels() {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
      }
    });

    const data = await response.json();
    console.log('Available models:', data);
  } catch (error) {
    console.error('Error fetching models:', error);
  }
}

listModels();
