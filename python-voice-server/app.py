from fastapi import FastAPI, HTTPException
from google.cloud import texttospeech
from fastapi.responses import StreamingResponse
import io
import os

# Set up Google Cloud Text-to-Speech client
print("GOOGLE_TTS_CREDENTIALS =", os.environ.get("GOOGLE_TTS_CREDENTIALS"))

tts_client = texttospeech.TextToSpeechClient()
print("✅ Google TTS Client Created Successfully!")

# Initialize FastAPI app
app = FastAPI()

# ✅ Add this small route to test if server is working
@app.get("/")
async def root():
    return {"message": "Voice TTS server is running!"}

@app.post("/api/tts")
async def text_to_speech(text: str):
    if not text:  # If no text is provided, return an error
        raise HTTPException(status_code=400, detail="Text is required for TTS")

    # Prepare the request for TTS
    synthesis_input = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US", name="en-US-Wavenet-F", ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
    )
    audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)

    # Get the audio content from Google Cloud TTS
    try:
        response = tts_client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in TTS conversion: {str(e)}")

    # Return the audio as a streaming response
    audio_stream = io.BytesIO(response.audio_content)
    return StreamingResponse(audio_stream, media_type="audio/mp3")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
