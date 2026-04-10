# System Architecture

The ONEMO platform is engineered as a decoupled, hybrid architecture combining a static frontend with a serverless backend. This ensures maximum page delivery speed while retaining dynamic data processing capabilities.

---

## 1. High-Level System Overview

```mermaid
graph TD
    User["👤 User / Browser"]

    subgraph Frontend["Frontend (Static HTML/CSS/JS)"]
        Index["index.html"]
        About["about.html"]
        Gallery["gallery.html"]
        Contact["contact.html"]
        Support["support.html + Chat UI"]
    end

    subgraph Backend["Backend"]
        direction TB
        API["⚡ /api/chat.js\nServerless Function"]
        Env[".env\nAPI Key Store"]
    end

    subgraph Integrations["Third-Party Integrations"]
        Gemini["🤖 Google Gemini API\n(LLM)"]
        FormSubmit["📧 FormSubmit\n(Email Delivery)"]
    end

    User -->|"Navigate pages"| Frontend
    Support -->|"POST /api/chat"| API
    API -->|"Read key"| Env
    API -->|"Prompt + Key"| Gemini
    Gemini -->|"AI Response"| API
    API -->|"JSON Response"| Support
    Contact -->|"HTML Form POST"| FormSubmit
    FormSubmit -->|"Email"| Admin["📬 Admin Email\nOnemoclu6@gmail.com"]
```

---

## 2. AI Chatbot Data Flow

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant FE as support.html (JS)
    participant API as /api/chat.js
    participant ENV as .env File
    participant G as Google Gemini API

    U->>FE: Types message, clicks Send
    FE->>FE: Appends "User" bubble to DOM
    FE->>API: POST /api/chat<br/>{ userMsg, version }
    API->>ENV: Reads GEMINI_API_KEY
    API->>API: Constructs brand-aware prompt
    API->>G: POST generateContent<br/>{ prompt, config }
    G-->>API: 200 OK — AI response text
    API-->>FE: 200 OK — { response: "..." }
    FE->>FE: Renders "ONEMO" chat bubble with HTML
    FE->>U: Displays final AI reply
```

---

## 3. Local vs Production Routing

```mermaid
graph LR
    subgraph Local["💻 Local Development"]
        direction TB
        NPM["npm start"]
        Express["server.js\n(Express.js)"]
        StaticLocal["Static Files\n(HTML/CSS/JS)"]
        APILocal["/api/chat handler\n(imported module)"]
        NPM --> Express
        Express -->|"express.static()"| StaticLocal
        Express -->|"app.all('/api/chat')"| APILocal
    end

    subgraph Production["☁️ Production (Vercel)"]
        direction TB
        VEdge["Vercel Edge Network"]
        StaticCDN["Static Assets\n(CDN Cached)"]
        Serverless["Serverless Function\n/api/chat.js"]
        VEdge -->|"Static routes"| StaticCDN
        VEdge -->|"/api/* routes"| Serverless
    end

    Browser["🌐 Browser"] --> Local
    Browser --> Production
```

---

## 4. Directory Structure

```mermaid
graph TD
    Root["📁 / (Root)"]

    Root --> ServerJS["📄 server.js\nLocal Dev Server"]
    Root --> PackageJSON["📄 package.json\nNPM Config"]
    Root --> VercelJSON["📄 vercel.json\nCloud Routing Rules"]
    Root --> DotEnv["🔒 .env\nSecret API Keys"]
    Root --> ReadmeMD["📄 README.md"]
    Root --> ArchMD["📄 architecture.md"]

    Root --> PagesGroup["📄 HTML Pages"]
    PagesGroup --> IndexHTML["index.html\n(Landing Page)"]
    PagesGroup --> AboutHTML["about.html"]
    PagesGroup --> GalleryHTML["gallery.html"]
    PagesGroup --> ContactHTML["contact.html"]
    PagesGroup --> SupportHTML["support.html\n(Chat UI)"]

    Root --> APIDir["📁 /api"]
    APIDir --> ChatJS["chat.js\nAI Route Handler"]

    Root --> CSSDir["📁 /css"]
    CSSDir --> StyleCSS["style.css\nGlobal Stylesheet"]

    Root --> JSDir["📁 /js"]
    JSDir --> MainJS["main.js\nFrontend Logic"]

    Root --> GalleryDir["📁 /GALLERY"]
    GalleryDir --> Images["🖼️ PIC1–7.jpeg"]
```

---

## 5. Frontend Page Architecture

```mermaid
graph LR
    Index["🏠 index.html\nHero · Lookbook\nManufacturing · Newsletter"]
    About["📖 about.html\nBrand Story\nIstanbul Heritage"]
    Gallery["🖼️ gallery.html\nPhoto Grid\nLightbox Overlay"]
    Contact["✉️ contact.html\nForm · FAQ\nFormSubmit Integration"]
    Support["🤖 support.html\nAI Chatbot\nHelp Center"]

    SharedCSS["🎨 css/style.css\nDesign System\nCSS Variables · Animations"]
    SharedJS["⚙️ js/main.js\nIntersectionObserver\nCursor · Scroll FX"]

    Index & About & Gallery & Contact & Support -->|"imports"| SharedCSS
    Index & About & Gallery & Contact & Support -->|"imports"| SharedJS
```

---

## 6. Tech Stack Overview

```mermaid
mindmap
  root((ONEMO Stack))
    Frontend
      HTML5
        Semantic Markup
        Multi-page Routing
      CSS3
        Custom Properties
        Grid & Flexbox
        Keyframe Animations
      Vanilla JS
        IntersectionObserver
        Fetch API
        DOM Manipulation
      Google Fonts
        Playfair Display
        Inter
    Backend
      Node.js
        server.js Local Dev
        api/chat.js Handler
      Express.js
        Static Serving
        API Routing
      dotenv
        Environment Variables
    Cloud
      Vercel
        CDN Static Hosting
        Serverless Functions
    Integrations
      Google Gemini API
        gemini-1.5-flash
        gemini-2.5-flash
      FormSubmit
        Email Delivery
```
