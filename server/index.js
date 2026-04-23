const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { AccessToken } = require('livekit-server-sdk');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// In-memory storage for PINs and their corresponding room names
// Map: PIN -> RoomName
const activeRooms = new Map();

// Helper to generate a unique 6-digit PIN
const generatePIN = () => {
  let pin;
  do {
    pin = Math.floor(100000 + Math.random() * 900000).toString();
  } while (activeRooms.has(pin));
  return pin;
};

// POST /api/create-room
app.post('/api/create-room', async (req, res) => {
  const { participantName } = req.body;
  
  if (!participantName) {
    return res.status(400).json({ error: 'Participant name is required' });
  }

  const pin = generatePIN();
  const roomName = `room-${pin}`;
  activeRooms.set(pin, roomName);

  // Create token for the teacher (host)
  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: participantName,
    }
  );
  at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
  
  const token = await at.toJwt();

  console.log(`Room created: ${roomName} with PIN: ${pin}`);
  
  res.json({ pin, token, roomName });
});

// POST /api/join-room
app.post('/api/join-room', async (req, res) => {
  const { pin, participantName } = req.body;

  if (!pin || !participantName) {
    return res.status(400).json({ error: 'PIN and Participant name are required' });
  }

  const roomName = activeRooms.get(pin);
  if (!roomName) {
    return res.status(404).json({ error: 'Invalid PIN or class not found' });
  }

  // Create token for the student
  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: participantName,
    }
  );
  at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });

  const token = await at.toJwt();

  console.log(`User ${participantName} joined room: ${roomName}`);

  res.json({ token, roomName });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
