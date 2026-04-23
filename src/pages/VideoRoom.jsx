import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
  ControlBar,
} from '@livekit/components-react';
import '@livekit/components-styles';

const VideoRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, pin, isHost } = location.state || {};

  // You'll get this from your LiveKit Cloud dashboard
  const serverUrl = import.meta.env.VITE_LIVEKIT_URL || 'wss://your-project.livekit.cloud';

  if (!token) {
    return (
      <div className="container flex-center" style={{ minHeight: '100vh' }}>
        <div className="glass-card">
          <p>Invalid session. Please join again.</p>
          <button onClick={() => navigate('/')}>Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100vw', background: '#020617', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header Bar */}
      <div style={{ 
        padding: '1rem 2rem', 
        background: 'rgba(15, 23, 42, 0.8)', 
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--glass-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h3 style={{ margin: 0, fontWeight: 600 }}>VideoCon</h3>
          <div style={{ padding: '0.2rem 0.6rem', background: 'var(--primary)', borderRadius: '6px', fontSize: '0.8rem' }}>
            {isHost ? 'TEACHER' : 'STUDENT'}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <small className="text-dim">Class PIN</small>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'white', letterSpacing: '2px' }}>{pin}</div>
          </div>
        </div>
      </div>

      {/* LiveKit Video Room */}
      <div style={{ flex: 1, position: 'relative' }}>
        <LiveKitRoom
          video={true}
          audio={true}
          token={token}
          serverUrl={serverUrl}
          onDisconnected={() => navigate('/')}
          data-lk-theme="default"
          style={{ height: '100%' }}
        >
          <VideoConference />
          <RoomAudioRenderer />
        </LiveKitRoom>
      </div>
    </div>
  );
};

export default VideoRoom;
