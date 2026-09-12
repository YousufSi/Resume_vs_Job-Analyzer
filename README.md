# Resume Match Analyzer

An AI-powered tool that compares a resume against a job description and returns a match score, strengths, gaps, and improvement suggestions — powered by Google's Gemini API.

🔗 **Live demo:** http://18.218.230.45:3000

## Why I Built This

Built to apply full-stack development, cloud deployment, and applied AI in a single project — with proper security practices around API key handling and network configuration.

## Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** HTML, CSS, vanilla JavaScript
- **AI:** Google Gemini API
- **Cloud:** Deployed on AWS EC2 (Ubuntu), managed with PM2
- **Security:** See `SECURITY.md` for details on API key handling, network configuration, and least-privilege setup

## Run Locally

```bash
npm install
cp .env.example .env
# add your Gemini API key to .env
npm start
```

Visit `http://localhost:3000`.

## Architecture

```
Browser (HTML/JS)
      |
      v
Express server (server.js)
      |
      v
Google Gemini API
```

Deployed on a single AWS EC2 instance, with a security group restricting SSH access to a single trusted IP and exposing only the ports required for the app to function.
