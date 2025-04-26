import { useState } from 'react';

export default function Home() {
  const [animalDescription, setAnimalDescription] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    try {
      const [descriptionRes, imageRes] = await Promise.all([
        fetch('/api/generate-description', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: animalDescription })
        }),
        fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: animalDescription })
        })
      ]);

      const descriptionData = await descriptionRes.json();
      const imageData = await imageRes.json();

      setGeneratedDescription(descriptionData.description);
      setImageUrl(imageData.imageUrl);
    } catch (error) {
      console.error("Errore nella generazione:", error);
      alert("Errore nella generazione.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Generatore di Animali Fantastici</h1>
      <textarea
        rows="4"
        placeholder="Descrivi il tuo animale..."
        value={animalDescription}
        onChange={(e) => setAnimalDescription(e.target.value)}
        style={{ width: "80%", margin: "1rem 0" }}
      />
      <br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generazione in corso..." : "Genera"}
      </button>

      {generatedDescription && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Descrizione Scientifica</h2>
          <p>{generatedDescription}</p>
        </div>
      )}

      {imageUrl && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Immagine Generata</h2>
          <img src={imageUrl} alt="Animal" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}
