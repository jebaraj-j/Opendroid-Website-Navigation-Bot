// app/api/chat/route.js
import { sendToDialogflow } from '@/lib/dialogflowClient';

export async function POST(req) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
      });
    }

    const reply = await sendToDialogflow(message);

    return new Response(JSON.stringify({ reply }), {
      status: 200,
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
}
