// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { SessionsClient } = require('@google-cloud/dialogflow');
const textToSpeech = require('@google-cloud/text-to-speech');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;  // Using one port (you can change if needed)

app.use(cors());
app.use(bodyParser.json());

// Initialize Dialogflow and TTS clients with the same key
const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const sessionClient = new SessionsClient({ keyFilename: credentialsPath });
const ttsClient = new textToSpeech.TextToSpeechClient({ keyFilename: credentialsPath });

const projectId = 'droid-bot-rlrv';  // Your project ID

// ===== Dialogflow Route =====
app.post('/api/dialogflow', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });

  const sessionId = uuidv4();
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: { text, languageCode: 'en-US' },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0]?.queryResult;
    res.json({
      fulfillmentText: result?.fulfillmentText || '',
      payload: result?.fulfillmentMessages?.find(msg => msg.payload)?.payload?.fields || null,
    });
  } catch (error) {
    console.error('Dialogflow Error:', error);
    res.status(500).json({ error: 'Dialogflow failed' });
  }
});

// ===== TTS Route =====
app.post('/api/tts', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing text' });

  const request = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await ttsClient.synthesizeSpeech(request);
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.audioContent);
  } catch (error) {
    console.error('TTS Error:', error);
    res.status(500).json({ error: 'TTS failed' });
  }
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`Available routes:`);
  console.log(`- POST /api/dialogflow`);
  console.log(`- POST /api/tts`);
});
