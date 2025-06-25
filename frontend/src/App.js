import React, { useState } from 'react';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDescription('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const res = await fetch('http://localhost:5000/api/describe', {
        method: 'POST',
        body: formData,
      });
       const data = await res.json();
    console.log("Response from backend:", data);  // <-- Add this

    if (res.ok && data.description) {
      setDescription(data.description);
    } else {
      setDescription(`Error: ${data.error || 'Failed to generate description.'}`);
    }
  } catch (err) {
    setDescription(`Error: ${err.message}`);
  }
  setLoading(false);
};

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f7f7f7',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ marginBottom: 24 }}>Clothing Describer</h1>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: 32,
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        minWidth: 320
      }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: 12 }}
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              width: 200,
              height: 200,
              objectFit: 'cover',
              borderRadius: 8,
              marginBottom: 12,
              border: '1px solid #eee'
            }}
          />
        )}
        <button
          type="submit"
          disabled={!selectedImage || loading}
          style={{
            padding: '10px 24px',
            borderRadius: 6,
            border: 'none',
            background: '#222',
            color: '#fff',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Describing...' : 'Generate Description'}
        </button>
        {description && (
          <div style={{
            marginTop: 16,
            background: '#f0f0f0',
            padding: 16,
            borderRadius: 8,
            width: '100%',
            textAlign: 'center'
          }}>
            {description}
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
