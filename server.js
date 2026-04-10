import express from 'express';
import dotenv from 'dotenv';
import chatHandler from './api/chat.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve all static HTML/CSS/JS files from the root directory
app.use(express.static('.', { extensions: ['html'] }));
app.use(express.json());

// Mock Vercel serverless handler endpoint for the chatbot
app.all('/api/chat', async (req, res) => {
    try {
        await chatHandler(req, res);
    } catch (e) {
        console.error('API Error:', e);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Local development server running at http://localhost:${PORT}`);
    console.log(`- Web interface: http://localhost:${PORT}`);
    console.log(`- AI chatbot endpoint: http://localhost:${PORT}/api/chat`);
    console.log(`\nNote: Make sure your .env file has a valid GEMINI_API_KEY!`);
});
