# ONEMO

**A Full-Stack E-commerce and Manufacturing Web Platform**

## Project Description

ONEMO is a comprehensive digital platform developed for a premium apparel and full-service manufacturing brand based in Istanbul, Türkiye. Designed to be highly performant and accessible, the platform bridges the gap between high-end fashion e-commerce and B2B manufacturing services. 

Rather than relying on heavy front-end frameworks, the platform is built leveraging lightweight Vanilla HTML, CSS, and JavaScript to guarantee extremely fast load times and a premium user experience with custom animations. Furthermore, it integrates a sophisticated AI-powered customer support backend utilizing the Gemini API to autonomously answer client inquiries regarding sizing, manufacturing timelines, global shipping, and returns.

## Key Technical Features

- **Performance-Driven Frontend:** Fully responsive, zero-dependency frontend prioritizing speed.
- **Serverless AI Integration:** Built-in Vercel serverless function (`/api/chat.js`) that securely communicates with Google's Gemini LLM to provide 24/7 intelligent customer assistance.
- **FormSubmit Backend:** Headless email integration for B2B contact and factory inquiries without the need for a dedicated mail server.
- **Local Express Stand-in:** A custom Node.js Express wrapper allows developers to simulate the Vercel serverless environment locally without requiring cloud authentication or proprietary CLI tools.

## Running the Project Locally

Because the project relies on server-side logic for the AI chatbot to function while keeping API keys secure, it requires a local server.

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A valid Gemini API Key.

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/moabdiqani21/onemo.git
   cd onemo
   ```

2. **Install Dependencies:**
   Install the required packages used for the local development server:
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Open the `.env` file in the root directory and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the Local Server:**
   ```bash
   node server.js
   ```

5. **View the Site:**
   Open `http://localhost:3000` in your web browser.

## Deployment

This repository is optimized for deployment on **Vercel**. 
The `vercel.json` configuration file ensures that the Node.js function within the `/api` directory is deployed automatically as a serverless function endpoint while the root directory is treated as a static frontend.

## License

© 2025 ONEMO. All rights reserved.
