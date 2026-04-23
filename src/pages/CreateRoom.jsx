import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name) return;

    setLoading(true);
    setError('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

    try {
      const response = await fetch(`${backendUrl}/api/create-room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participantName: name }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to the video room with the token and PIN
        navigate('/room', { state: { token: data.token, pin: data.pin, isHost: true } });
      } else {
        setError(data.error || 'Failed to create room');
      }
    } catch (err) {
      setError('Server connection failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex-center" style={{ minHeight: '100vh' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '450px' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-dim)', marginBottom: '1.5rem', cursor: 'pointer' }}
        >
          ← Back
        </button>
        
        <h2>Start a New Class</h2>
        <p className="text-dim">Set up your virtual classroom in seconds.</p>

        <form onSubmit={handleCreate} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Your Name</label>
            <input 
              type="text" 
              placeholder="e.g. Prof. Smith" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {error && <p style={{ color: '#f87171', fontSize: '0.9rem', margin: 0 }}>{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '1rem' }}
          >
            {loading ? 'Creating...' : 'Launch Classroom'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
