from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
import os
from google.cloud import texttospeech
from pydub import AudioSegment

# ✅ Google Cloud Credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "voice_ai_key.json"

# ✅ Initialize FastAPI
app = FastAPI()

# ✅ Initialize TTS client
tts_client = texttospeech.TextToSpeechClient()

# ✅ Route for TTS
@app.post("/api/tts")
async def generate_tts(request: Request):
    data = await request.json()
    text = data.get("text", "")

    if not text:
        return {"error": "No text provided"}

    # TTS Synthesis
    synthesis_input = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        name="en-US-Wavenet-F",
        ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
    )
    audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)

    response = tts_client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )

    # Save to file
    output_path = "response.mp3"
    with open(output_path, "wb") as out:
        out.write(response.audio_content)

    return FileResponse(output_path, media_type="audio/mpeg", filename="response.mp3")
