import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
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
    console.error(error);
    res.status(500).json({ error: "Errore nella generazione della descrizione" });
  }
}
