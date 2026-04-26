# e-Class: An app for online classes. Developed at IST.

A modern, high-fidelity video conferencing application designed for educational environments. Built with React, Vite, and LiveKit, **e-Class** provides a seamless, light-themed experience with a focus on usability and classroom management.

---
Demo link: https://askubaid.github.io/e-Class/

## ✨ Key Features

### 🏢 Classroom Management
- **Role-Based Access:** Dedicated interfaces for **Teachers** and **Students**.
- **Secure PIN Access:** Simple and secure joining process using unique class PINs.
- **Header Status:** Real-time role and session identification (Institute of Space Technology Islamabad).

### 📹 High-Quality Video Room
- **Native LiveKit Integration:** Robust video and audio delivery using LiveKit Cloud.
- **Dynamic Layouts:**
  - **Grid View:** Automatic multi-user grid for standard discussions.
  - **Focus Mode:** One-click maximization of any participant's video.
  - **Screen Share Focus:** Automatic prominence for shared content with sideline carousels for participants.
- **Classroom Controls:** Full control over camera, microphone, and screen sharing.

### 💬 WhatsApp-Style Custom Chat
- **Premium UI:** WhatsApp-inspired light theme with beige backgrounds and intuitive message bubbles.
- **Smart Alignment:** Self-messages on the right, others on the left.
- **Rich Details:** Includes user avatars, centered usernames below avatars, and real-time timestamps.
- **Unread Notifications:** A vibrant red notification badge on the chat toggle keeps participants updated on new messages without needing the chat window open.

### 🎨 Premium Design & Aesthetics
- **Light Theme:** A clean, professional Facebook-inspired aesthetic using soft whites, grays, and brand blues.
- **Glassmorphism:** Elegant glass-card effects on the landing and joining pages.
- **Responsive Layout:** Fully optimized for desktop and mobile classroom experiences.

---

## 🛠️ Technology Stack

- **Frontend:** React 18 + Vite
- **Styling:** Vanilla CSS (Custom Design System)
- **Communication:** LiveKit SDK (WebRTC)
- **Deployment:** GitHub Pages / Render

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- LiveKit Cloud Account (URL and Keys)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/askubaid/e-Class.git
   ```
2. Install dependencies for both frontend and backend:
   ```bash
   npm install
   cd server && npm install
   ```
3. Configure Environment Variables:
   - **Frontend** (Root `.env`):
     ```env
     VITE_LIVEKIT_URL=wss://your-project.livekit.cloud
     VITE_BACKEND_URL=http://localhost:3001
     ```
   - **Backend** (`server/.env`):
     ```env
     PORT=3001
     LIVEKIT_API_KEY=your_api_key
     LIVEKIT_API_SECRET=your_api_secret
     LIVEKIT_URL=wss://your-project.livekit.cloud
     ```
4. Run the application:
   ```bash
   # Run frontend (Root)
   npm run dev

   # Run backend (Server folder)
   cd server && node index.js
   ```

---

## ⚠️ Limitations

This project utilizes free tiers for its infrastructure. Please note the following limitations:

### 🎙️ LiveKit Cloud (Free Tier)
- **Maximum 100 Concurrent Connections:** Across the entire project.
- **5,000 WebRTC Minutes per Month:** A 60-minute class with 10 students consumes 600 minutes.
- **50 GB Monthly Data Transfer:** Depends heavily on camera usage and screen sharing.

### ⚙️ Render Backend (Free Tier)
- **Service Spin-Down:** The backend server automatically goes to sleep after 15 minutes of inactivity.
- **Cold Starts:** The first request after a spin-down can take 30-60 seconds to respond.
- **Usage Limit:** 750 free instance hours per month.

### 🌐 GitHub Pages (Frontend Hosting)
- **Soft Bandwidth Limit:** 100 GB per month.
- **Site Size Limit:** Maximum 1 GB.
- **Deployment Timeout:** Deployments may timeout if they take longer than 10 minutes.

If these limits are exceeded (especially LiveKit minutes), the service may become temporarily unavailable until the monthly cycle resets.

---

## 📄 License
Created for educational purposes at the Institute of Space Technology (IST).
