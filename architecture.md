# System Architecture

The ONEMO platform is engineered as a decoupled, hybrid architecture combining a static frontend with a serverless backend. This ensures maximum page delivery speed while retaining dynamic data processing capabilities.

## High-Level Overview

1. **Client Tier (Frontend):** Vanilla web technologies served statically.
2. **Compute Tier (Backend API):** Serverless architecture acting as middleware for AI interactions.
3. **Third-Party Integrations:** LLM Providers and Email delivery systems.

---

## 1. Frontend Architecture

The frontend is purposefully built without heavy frameworks (like React or Vue) to achieve optimal Core Web Vitals. It utilizes an event-driven Vanilla JavaScript model.

- **Routing:** Handled via multi-page HTML documents (`index.html`, `about.html`, `gallery.html`, etc.).
- **Styling (`css/style.css`):** Utilizes CSS-Grid and Flexbox extensively. Custom CSS variables (CSS root) are used for theming (typography, primary colors) ensuring strict design consistency.
- **Interactions (`js/main.js`):** Uses the `IntersectionObserver` API heavily for scroll-based reveal animations, minimizing main-thread blocking operations. 

## 2. Backend & API Architecture

The dynamic capabilities of the site are isolated within the `/api/` directory.

### Production (Vercel Serverless)
In a production cloud environment, the `vercel.json` file dictates that the application acts as a standard static site, while any requests sent to `/api/*` are intercepted by **Vercel Edge/Serverless Functions**.
- `api/chat.js` is the primary handler. It is a secure, server-side Node.js environment.
- **Security:** This abstraction ensures that sensitive credentials, specifically `GEMINI_API_KEY`, are securely retained on the server and never exposed to the client's browser.

### Development (Express Node.js)
To avoid the friction of installing proprietary cloud CLIs, a custom Node.js Express server (`server.js`) handles local development:
1. Emulates the Vercel static routing using `express.static()`.
2. Intercepts `POST` requests to `/api/chat` and manually invokes the `chatHandler` function imported directly from the `api/chat.js` module.
3. Injects environment variables from the local `.env` file using the `dotenv` package.

## 3. Data Flow & Integrations

### AI Chatbot Flow
1. User types a message in the UI on `support.html`.
2. Frontend JavaScript captures the string and fires an asynchronous `fetch` `POST` request with a JSON payload to `/api/chat`.
3. The serverless function receives the payload, grabs the `GEMINI_API_KEY` from the system environment, and formulates a strict, brand-aware prompt instructing the AI on how to respond.
4. The serverless function makes its own external `POST` request to the Google Gemini API.
5. Google Gemini returns the natural language response to the Vercel server.
6. The Vercel server standardizes the JSON response and pipes it back to the client.
7. Frontend JavaScript creates a DOM element and injects the AI's response into the chat UI.

### Contact Pipeline
A backend-less approach is used for immediate customer contact forms via FormSubmit:
1. User submits the form on `contact.html`.
2. Form action `POST`s directly to `https://formsubmit.co/`.
3. FormSubmit processes the form inputs and forwards the structured entry to the registered admin email (`Onemoclu6@gmail.com`).

---

## 4. Directory Structure Map

```text
/ (Root)
│
├── server.js             # Local Dev REST Server (Express)
├── package.json          # Node dependency configuration
├── vercel.json           # Cloud deployment routing rules
├── .env                  # Secret variable storage
│
├── index.html            # Core landing entrypoint
├── about.html            # Static route
├── contact.html          # Static route
├── gallery.html          # Static route
├── support.html          # Static route with Chat UI
│
├── /api
│   └── chat.js           # Serverless Node.js Route Handler
│
├── /css
│   └── style.css         # Global Stylesheet
│
├── /js
│   └── main.js           # Frontend DOM/Event logic
│
└── /GALLERY              # Image Asset Directory
```
