const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// OpenAI API key
const API_KEY = process.env.OPENAI_API_KEY;

// Route to handle chatbot requests
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Call the OpenAI API
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userMessage }],
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const botMessage = response.data.choices[0].message.content;
        res.json({ botMessage });

    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).send('Error processing request');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
