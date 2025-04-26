import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || prompt.trim() === '') {
    return res.status(400).json({ error: 'Prompt non fornito.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",   // 👈 cambio qui
      messages: [
        {
          role: "system",
          content: "Agisci come un biologo. Scrivi una descrizione scientifica accurata di un animale immaginario basandoti sulla descrizione fornita. Includi habitat, alimentazione, comportamento e caratteristiche fisiche."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    });

    const description = completion.choices[0].message.content.trim();
    res.status(200).json({ description });
  } catch (error) {
    console.error('Errore nella generazione della descrizione:', error);
    res.status(500).json({ error: error.message || 'Errore interno' });
  }
}

