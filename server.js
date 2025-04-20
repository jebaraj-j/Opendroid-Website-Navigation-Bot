const express = require('express');
const bodyParser = require('body-parser');
const { SessionsClient } = require('@google-cloud/dialogflow');
const path = require('path');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 3001; // You can change this port if needed

// Use CORS to allow requests from your frontend (React app)
app.use(cors());
app.use(bodyParser.json());

// Initialize Dialogflow SessionsClient with your credentials
const keyPath = path.join(__dirname, 'keys/droid-navigation-key.json');
const sessionClient = new SessionsClient({ keyFilename: keyPath });

const projectId = 'droid-bot-rlrv'; // Replace with your actual project ID
const { v4: uuidv4 } = require('uuid');

// API endpoint to handle Dialogflow requests
app.post('/api/dialogflow', async (req, res) => {
  const text = req.body.text;
  const sessionId = uuidv4(); // Generate a unique session ID for each request
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    // Extract the fulfillment text and the payload (if available)
    const fulfillmentText = result.fulfillmentText;
    const payload = result.fulfillmentMessages.find(msg => msg.payload)?.payload || null;

    // Send the response with both fulfillment text and payload
    res.json({
      fulfillmentText,
      payload: payload ? payload.fields : null,  // Forward the payload fields if they exist
    });
  } catch (err) {
    console.error('Dialogflow Error:', err); // ADD THIS
    res.status(500).send('Error occurred while processing your request.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
