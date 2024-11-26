import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './homepage.jsx';
import Health from './health.jsx';
import Chat from './chat.jsx';
import About from './about.jsx';
import ComInfo from './com_info.jsx';
import Message from './message.jsx';

export function UserRoutes() {
  return (
    <Routes>
      <Route path="homepage" element={<Homepage />} />
      <Route path="health" element={<Health />} />
      <Route path="chat" element={<Chat />} />
      <Route path="about" element={<About />} />
      <Route path="com_info" element={<ComInfo />} />
      <Route path="message" element={<Message />} />
      
      {/* Default route for user redirects to homepage */}
      <Route path="/" element={<Navigate to="homepage" />} />

      {/* Fallback route for unmatched paths */}
      <Route path="*" element={<Navigate to="homepage" />} />
    </Routes>
  );
}

