import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoom = () => {
  const [pin, setPin] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!pin || !name) return;

    setLoading(true);
    setError('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

    try {
      const response = await fetch(`${backendUrl}/api/join-room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, participantName: name }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/room', { state: { token: data.token, pin, isHost: false } });
      } else {
        setError(data.error || 'Invalid PIN');
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

        <h2>Join a Class</h2>
        <p className="text-dim">Enter the PIN shared by your teacher.</p>

        <form onSubmit={handleJoin} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Class PIN</label>
            <input 
              type="text" 
              placeholder="e.g. 123456" 
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              style={{ fontSize: '1.5rem', letterSpacing: '0.5rem', textAlign: 'center' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Your Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name" 
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
            {loading ? 'Joining...' : 'Enter Classroom'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
