# ✉️ Email Reply AI

> An AI-powered email assistant that generates context-aware email replies using **Google Gemini**, with a **Spring Boot backend**, **React frontend**, and **Chrome extension for Gmail**.

[![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge\&logo=openjdk)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1-6DB33F?style=for-the-badge\&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-TypeScript-61DAFB?style=for-the-badge\&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge\&logo=vite)](https://vite.dev/)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=for-the-badge\&logo=google)](https://ai.google.dev/)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge\&logo=googlechrome)](https://developer.chrome.com/docs/extensions/)

## 🚀 Overview

**Email Reply AI** is a full-stack AI application designed to make replying to emails faster and easier.

Instead of manually writing every response, users can provide an email and select a preferred tone. The application sends the request to a Spring Boot backend, which communicates with Google's Gemini API and returns an AI-generated reply.

The project also includes a Chrome extension that integrates directly with **Gmail**, allowing users to generate replies directly from the Gmail compose interface.

### ✨ What it does

* 📝 Accepts email content as input
* 🎭 Supports different response tones
* 🤖 Generates replies using Google Gemini
* 📋 Allows generated replies to be copied
* 🔄 Supports reply regeneration
* 📧 Integrates directly with Gmail through a Chrome extension
* ⚡ Provides a dedicated React web interface
* 🔐 Keeps the Gemini API key on the backend rather than exposing it to the frontend

---

## 🖥️ Live Demo

**Web Application:**
https://darling-crisp-5f96b7.netlify.app/

**Source Code:**
https://github.com/anuPhoenixbis/Email-Reply-AI

> The web interface is deployed separately from the Spring Boot backend. The Chrome extension communicates with the backend API to generate replies.

---

## 📸 Screenshots

### Web Application

The React frontend provides a clean interface for entering email content, selecting a response tone, and viewing the generated reply.

![Email Reply AI Web App](https://raw.githubusercontent.com/anuPhoenixbis/Email-Reply-AI/main/screenshots/web-app.png)

### Gmail Integration

The Chrome extension adds an **AI Reply** button directly to the Gmail compose interface.

![Gmail AI Reply](https://raw.githubusercontent.com/anuPhoenixbis/Email-Reply-AI/main/screenshots/gmail-extension.png)

> Add the two screenshots to a `screenshots/` directory if you want these images to render directly in the README.

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │       Gmail         │
                    │                     │
                    │   Compose Window    │
                    └──────────┬──────────┘
                               │
                               │ Email content
                               ▼
                    ┌─────────────────────┐
                    │  Chrome Extension   │
                    │                     │
                    │  Manifest V3        │
                    │  Content Script     │
                    └──────────┬──────────┘
                               │
                               │ HTTP POST
                               ▼
                 ┌───────────────────────────┐
                 │      Spring Boot API      │
                 │                           │
                 │  Controller               │
                 │       ↓                   │
                 │  EmailGeneratorService    │
                 │       ↓                   │
                 │  WebClient                │
                 └────────────┬──────────────┘
                              │
                              │ Gemini API
                              ▼
                 ┌───────────────────────────┐
                 │       Google Gemini       │
                 │                           │
                 │     Prompt Processing     │
                 │            ↓              │
                 │     Generated Reply       │
                 └────────────┬──────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Chrome Extension   │
                    │                     │
                    │ Insert reply into   │
                    │ Gmail compose box   │
                    └─────────────────────┘
```

---

## 📂 Project Structure

```text
Email-Reply-AI/
│
├── email-writer-sb/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/email/writer_sb/
│   │       │       ├── Service/
│   │       │       ├── config/
│   │       │       ├── controller/
│   │       │       └── dtos/
│   │       │
│   │       └── resources/
│   │           └── application.yaml
│   │
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── email-writer-frontend/
│   └── email-writer-frontend/
│       ├── public/
│       ├── src/
│       ├── package.json
│       ├── vite.config.ts
│       └── tsconfig.json
│
└── email-writer-ext/
    ├── content.js
    ├── content.css
    └── manifest.json
```

The backend is containerized with a multi-stage Docker build and uses Java 21.

---

# 🛠️ Tech Stack

## Backend

* **Java 21**
* **Spring Boot 4.1**
* Spring Web MVC
* Spring WebFlux
* `WebClient`
* Lombok
* Maven
* Docker

The backend uses Spring WebMVC for the REST API and WebClient/WebFlux to communicate with Gemini. The project is configured for Java 21.

## AI

* **Google Gemini API**
* Gemini Interactions API
* Prompt-based email generation

The backend keeps the Gemini API credentials server-side and sends prompts to Gemini through the Spring Boot service.

## Frontend

* **React**
* **TypeScript**
* **Vite**
* Tailwind CSS
* daisyUI

The frontend is a standalone web interface deployed on Netlify.

## Chrome Extension

* Chrome Extension Manifest V3
* JavaScript
* Content Scripts
* Gmail DOM integration

The extension is configured to run on Gmail and inject an AI Reply action into the compose interface.

---

# ⭐ Features

## 1. AI Email Generation

Provide an email and let Gemini generate an appropriate response.

Example:

```text
Input:

Hi Anubhav,

Can we schedule a meeting sometime next week to discuss the project?

Best,
John
```

The AI can generate:

```text
Hi John,

Absolutely. I'd be happy to discuss the project. Please let me know
what time works best for you next week.

Best regards,
Anubhav
```

---

## 2. Tone Selection

The frontend allows the user to select a preferred response tone.

Supported tones include options such as:

* Professional
* Formal
* Friendly
* Casual
* Apologetic
* Confident

The selected tone is incorporated into the prompt sent to Gemini.

---

## 3. Gmail Integration

The Chrome extension adds an **AI Reply** button to Gmail's compose interface.

When clicked:

```text
Gmail
  ↓
Extract email content
  ↓
Send request to Spring Boot
  ↓
Gemini generates reply
  ↓
Receive generated response
  ↓
Insert response into Gmail compose box
```

The extension uses a Gmail content script and observes Gmail's dynamically changing DOM to detect compose elements.

---

## 4. Copy & Regenerate

The web application provides controls to:

* Copy the generated response
* Regenerate the response
* Try different tones

---

# 🔌 API

## Generate Email Reply

### Endpoint

```http
POST /email/generate
```

### Request

```json
{
  "emailContent": "Hi, can we schedule a meeting tomorrow?",
  "tone": "Professional"
}
```

### Response

```text
Hi,

Absolutely. I'd be happy to schedule a meeting tomorrow.
Please let me know what time works best for you.

Best regards,
Anubhav
```

---

# ⚙️ Local Setup

## Prerequisites

Make sure you have:

* Java 21
* Maven
* Node.js
* npm
* Google Gemini API key
* Google Chrome

---

## 1. Clone the Repository

```bash
git clone https://github.com/anuPhoenixbis/Email-Reply-AI.git

cd Email-Reply-AI
```

---

# 🖥️ Backend Setup

Navigate to the Spring Boot project:

```bash
cd email-writer-sb
```

Configure your Gemini credentials using environment variables.

Example:

```yaml
gemini:
  url: https://generativelanguage.googleapis.com/v1beta/interactions
  apikey: ${GEMINI_API_KEY}
```

Set your API key:

### Windows PowerShell

```powershell
$env:GEMINI_API_KEY="your_api_key"
```

### Linux/macOS

```bash
export GEMINI_API_KEY="your_api_key"
```

Run the application:

```bash
./mvnw spring-boot:run
```

Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend will start on:

```text
http://localhost:8080
```

---

# 🌐 Frontend Setup

Navigate to:

```bash
cd email-writer-frontend/email-writer-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Vite development server will provide the local frontend URL.

---

# 🧩 Chrome Extension Setup

Navigate to:

```text
email-writer-ext/
```

Then:

1. Open Chrome.
2. Navigate to `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the `email-writer-ext` directory.
6. Open Gmail.
7. Open or compose an email.
8. Click **AI Reply**.

The extension uses Manifest V3 and is configured for Gmail pages.

---

# 🔐 Environment Variables

Never commit your Gemini API key to GitHub.

Use:

```text
GEMINI_API_KEY=your_gemini_api_key
```

The backend reads the key from the environment.

For production deployments, configure the environment variable directly in your hosting provider.

---

# 🐳 Docker

The backend already includes a multi-stage Dockerfile.

Build the image:

```bash
docker build -t email-reply-ai-backend .
```

Run it:

```bash
docker run -p 8080:8080 \
  -e GEMINI_API_KEY=your_api_key \
  email-reply-ai-backend
```

The Docker build uses a Maven + Eclipse Temurin 21 build stage and a lightweight Java 21 runtime stage.

---

# 🚀 Deployment

The project is designed as three independently deployable components:

```text
GitHub Repository
       │
       ├── email-writer-sb
       │        ↓
       │     Render
       │
       ├── email-writer-frontend
       │        ↓
       │     Netlify
       │
       └── email-writer-ext
                ↓
          Chrome Extension
```

### Backend

The Spring Boot backend can be deployed as a Docker-based web service.

### Frontend

The React frontend is deployed on Netlify.

### Extension

The Chrome extension can be loaded locally as an unpacked extension during development and can later be packaged/published through the Chrome Web Store.

---

# 🔄 Request Flow

When using the web application:

```text
User
 │
 │ Email + Tone
 ▼
React Frontend
 │
 │ POST /email/generate
 ▼
Spring Boot
 │
 │ Build Prompt
 ▼
Gemini API
 │
 │ Generated Response
 ▼
Spring Boot
 │
 ▼
React
 │
 ▼
Generated Email
```

When using Gmail:

```text
User opens Gmail
        │
        ▼
Chrome Extension
        │
        ▼
Detect Gmail compose window
        │
        ▼
Extract email content
        │
        ▼
Click "AI Reply"
        │
        ▼
Spring Boot API
        │
        ▼
Google Gemini
        │
        ▼
Generated Reply
        │
        ▼
Insert into Gmail compose box
```

---

# 🧠 Prompt Engineering

The backend constructs a structured prompt containing:

```text
Role:
You are an AI email assistant.

Task:
Generate a reply to the following email.

Email:
<email content>

Tone:
<selected tone>

Output requirements:
Return only the email response.
Do not add explanations or additional text.
```

This keeps the model focused on producing a directly usable email response rather than an explanation of the generated text.

---

# 🔒 Security Considerations

The Gemini API key is **not intended to be exposed in the frontend or Chrome extension**.

The recommended architecture is:

```text
React / Chrome Extension
          │
          ▼
     Spring Boot
          │
          │ API key kept server-side
          ▼
      Gemini API
```

For production:

* Store secrets as environment variables.
* Do not commit `.env` files containing credentials.
* Restrict CORS to trusted frontend/extension origins.
* Add rate limiting before exposing the API publicly.
* Validate incoming email content.
* Consider authentication for public deployments.

---

# 📌 Current Limitations

* Gmail DOM selectors may need updates if Gmail changes its UI.
* AI-generated responses should be reviewed before sending.
* The current extension is focused on Gmail.
* Public backend endpoints should use authentication/rate limiting before large-scale deployment.
* Gemini API availability and model names may change over time.

---

# 🛣️ Future Improvements

Planned improvements could include:

* [ ] Chrome Web Store publication
* [ ] User authentication
* [ ] Streaming Gemini responses
* [ ] More advanced tone controls
* [ ] Custom user instructions
* [ ] Reply length control
* [ ] Multiple response suggestions
* [ ] Email thread/context awareness
* [ ] Better Gmail DOM handling
* [ ] Rate limiting
* [ ] Request validation
* [ ] Response caching
* [ ] Usage analytics
* [ ] Dark/light theme selection
* [ ] Support for Outlook and other email providers

---

# 🎯 What I Learned

This project was built to explore the integration of **Generative AI with a production-style web application**.

Key areas covered:

* Building REST APIs with Spring Boot
* Calling external AI APIs using `WebClient`
* Working with Google's Gemini API
* Prompt engineering
* React + TypeScript frontend development
* Tailwind CSS and daisyUI
* Chrome Extension Manifest V3
* Gmail DOM manipulation
* Cross-Origin Resource Sharing (CORS)
* Environment-based configuration
* Dockerizing a Spring Boot application
* Deploying frontend and backend independently
* Connecting a browser extension to a backend API

---

# 👨‍💻 Author

**Anubhav Biswas**

Computer Science Engineering Student
Interested in Backend Development, AI/GenAI, System Design and Software Engineering.

---

## ⭐ If you found this project interesting

Feel free to explore the repository, try the application, or contribute improvements.

**Built with ☕ Java, ⚛️ React, 🧠 Gemini and a lot of debugging.**
