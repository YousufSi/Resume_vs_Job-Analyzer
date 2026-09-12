require('dotenv').config();
const express = require('express');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

if (!process.env.GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY is not set. Check your .env file.');
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/analyze', async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({ error: 'Both resume and job description are required.' });
    }

    const prompt = `You are a career advisor helping a college student. Compare the RESUME to the JOB DESCRIPTION below.
Respond ONLY with valid JSON, no markdown formatting, no backticks, using exactly this structure:

{
  "matchScore": <a number from 0 to 100>,
  "strengths": ["<short phrase>", "<short phrase>", "<short phrase>"],
  "gaps": ["<short phrase>", "<short phrase>", "<short phrase>"],
  "suggestions": ["<short actionable suggestion>", "<short actionable suggestion>", "<short actionable suggestion>"]
}

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const text = response.text;
    const cleaned = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    res.json(parsed);
  } catch (err) {
    console.error('Error analyzing:', err);
    res.status(500).json({ error: 'Something went wrong analyzing the resume. Please try again.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});