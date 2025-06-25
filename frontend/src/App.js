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

  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    setDescription('');
    setLoading(false);
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
      if (res.ok) {
        setDescription(data.description);
      } else {
        setDescription(`Error: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      setDescription(`Error: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, Arial, sans-serif'
    }}>
      <h1 style={{
        marginBottom: 24,
        color: '#3730a3',
        letterSpacing: 1,
        fontWeight: 800,
        fontSize: 36,
        textShadow: '0 2px 8px #e0e7ff'
      }}>
        👕 Clothing Describer
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: 36,
          borderRadius: 18,
          boxShadow: '0 4px 24px rgba(55,48,163,0.10)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          minWidth: 340,
          maxWidth: 380,
        }}
      >
        <label
          htmlFor="file-upload"
          style={{
            background: '#6366f1',
            color: '#fff',
            padding: '10px 22px',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 16,
            boxShadow: '0 2px 8px #e0e7ff',
            transition: 'background 0.2s',
            marginBottom: 8,
            border: 'none',
            outline: 'none',
            display: 'inline-block'
          }}
        >
          {selectedImage ? 'Change Image' : 'Upload Image'}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </label>
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              width: 220,
              height: 220,
              objectFit: 'cover',
              borderRadius: 12,
              marginBottom: 8,
              border: '2px solid #6366f1',
              boxShadow: '0 2px 12px #e0e7ff'
            }}
          />
        )}
        <div style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'center' }}>
          <button
            type="submit"
            disabled={!selectedImage || loading}
            style={{
              padding: '10px 24px',
              borderRadius: 8,
              border: 'none',
              background: loading ? '#a5b4fc' : '#3730a3',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px #e0e7ff',
              transition: 'background 0.2s'
            }}
          >
            {loading ? (
              <span>
                <span className="spinner" style={{
                  display: 'inline-block',
                  width: 18,
                  height: 18,
                  border: '3px solid #fff',
                  borderTop: '3px solid #6366f1',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: 8,
                  verticalAlign: 'middle'
                }} />
                Describing...
              </span>
            ) : 'Generate Description'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={loading && !selectedImage}
            style={{
              padding: '10px 18px',
              borderRadius: 8,
              border: 'none',
              background: '#e0e7ff',
              color: '#3730a3',
              fontWeight: 600,
              fontSize: 16,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px #e0e7ff',
              transition: 'background 0.2s'
            }}
          >
            Reset
          </button>
        </div>
        {description && (
          <div style={{
            marginTop: 18,
            background: description.startsWith('Error') ? '#fee2e2' : '#f1f5f9',
            color: description.startsWith('Error') ? '#b91c1c' : '#22223b',
            padding: 18,
            borderRadius: 10,
            width: '100%',
            textAlign: 'center',
            fontSize: 17,
            fontWeight: 500,
            boxShadow: '0 2px 8px #e0e7ff'
          }}>
            {description}
          </div>
        )}
      </form>
      {/* Spinner keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}

export default App;
