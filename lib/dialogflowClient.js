// lib/dialogflowClient.js
const { SessionsClient } = require('@google-cloud/dialogflow');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import UUID to generate unique session IDs

// Load key path from environment variable
const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const sessionClient = new SessionsClient({ keyFilename: keyPath });

// Load project ID from the key file
const key = require(keyPath);
const projectId = key.project_id;

// Function to send message to Dialogflow and get the response
const sendToDialogflow = async (text, sessionId = uuidv4()) => {
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  const languageCode = 'en-US';

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text,
        languageCode,
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    console.log(`Detected intent: ${result.intent.displayName}`);
    console.log(`Response: ${result.fulfillmentText}`);

    // Check if there is a navigation payload to send back
    const payload = result.payload || {};
    if (payload.navigate) {
      // Send the navigation signal to the frontend
      return { fulfillmentText: result.fulfillmentText, payload: { navigate: payload.navigate } };
    }

    return { fulfillmentText: result.fulfillmentText, payload: {} };
  } catch (err) {
    console.error('ERROR:', err);
    return { fulfillmentText: 'Error occurred while processing your request.', payload: {} };
  }
};

module.exports = { sendToDialogflow };
