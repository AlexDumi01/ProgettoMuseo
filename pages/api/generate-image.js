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
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Realizza un'illustrazione dettagliata e colorata di questo animale immaginario: ${prompt}`,
      n: 1,
      size: "1024x1024"
    });

    res.status(200).json({ imageUrl: response.data[0].url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore nella generazione dell'immagine" });
  }
}
