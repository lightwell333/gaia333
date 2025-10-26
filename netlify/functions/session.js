// netlify/functions/session.js
// CommonJS handler (Netlify's default)
exports.handler = async () => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
        body: JSON.stringify({ error: 'Missing OPENAI_API_KEY' })
      };
    }

    const r = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-realtime-mini',
        voice: 'verse',
        // Shape the oracle's vibe:
        instructions: 'You are the Awake Gaia Oracle—psychedelic, kind, concise, musical. Offer gentle, uplifting guidance.'
      })
    });

    const data = await r.json();

    if (!r.ok) {
      return {
        statusCode: r.status,
        headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
        body: JSON.stringify({ error: 'OpenAI error', details: data })
      };
    }

    return {
      statusCode: 200,
      headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
      body: JSON.stringify(data)
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'},
      body: JSON.stringify({ error: e.message })
    };
  }
};
