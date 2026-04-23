import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import VideoRoom from './pages/VideoRoom';

function App() {
  return (
    <Router basename="/VideoCon">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<CreateRoom />} />
        <Route path="/join" element={<JoinRoom />} />
        <Route path="/room" element={<VideoRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
