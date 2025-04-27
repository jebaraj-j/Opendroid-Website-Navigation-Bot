// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { SessionsClient } = require('@google-cloud/dialogflow');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001; // Default to 3001

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Dialogflow client setup
const keyPath = path.join(__dirname, 'keys', 'droid-navigation-key.json');
const sessionClient = new SessionsClient({ keyFilename: keyPath });
const projectId = 'droid-bot-rlrv'; // Replace with your Dialogflow project ID

// Dialogflow API endpoint
app.post('/api/dialogflow', async (req, res) => {
  const { text } = req.body; // safer destructuring
  if (!text) {
    return res.status(400).json({ error: 'Missing "text" field in request body.' });
  }

  const sessionId = uuidv4();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const dialogflowRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(dialogflowRequest);
    const result = responses[0]?.queryResult;

    const fulfillmentText = result?.fulfillmentText || "No response from Dialogflow.";
    const payload = result?.fulfillmentMessages?.find(msg => msg.payload)?.payload?.fields || null;

    res.json({
      fulfillmentText,
      payload,
    });
  } catch (error) {
    console.error('Dialogflow Error:', error);
    res.status(500).json({ error: 'Failed to connect to Dialogflow.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend server running at: http://localhost:${PORT}`);
});
