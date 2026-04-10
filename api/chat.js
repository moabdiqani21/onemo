export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userMsg, version } = req.body;
    if (!userMsg) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    
    if (!API_KEY) {
        return res.status(500).json({ error: 'API key is not configured in .env' });
    }

    const modelVersion = version === '1.5' ? 'gemini-1.5-flash' : 'gemini-2.5-flash';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelVersion}:generateContent?key=${API_KEY}`;

    let prompt = `You are the AI assistant for ONEMO, a premium brand based in Istanbul, Türkiye. 
You offer full-service clothing manufacturing, techpack making, web designing, photoshoots, and global shipping. 
Our contact email is Onemoclu6@gmail.com and our location is Istanbul. whe can buıld your brand from scratch
Keep your answers brief, friendly, helpful, and use HTML tags like <strong> or <br> for formatting and line breaks. 
Customer asks: "${userMsg}"`;

    if (version === '1.5') {
        prompt = `You are the AI assistant for ONEMO, a premium brand based in Istanbul. 
You offer full-service clothing manufacturing, techpack making, photoshoots, and global shipping. 
Our contact email is Onemoclu6@gmail.com and our location is Istanbul. 
Keep your answers brief, friendly, helpful, and use HTML tags like <strong> or <br> for formatting 
Customer asks: "${userMsg}"`;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        if (data && data.candidates && data.candidates.length > 0) {
            const responseText = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ response: responseText });
        } else {
            return res.status(500).json({ error: 'Invalid response format from Gemini' });
        }
    } catch (err) {
        console.error('Gemini API Error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
