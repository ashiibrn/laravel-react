// router_tech.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomepageTech from './homepage_techside.jsx';
import AboutTech from './about_tech.jsx';
import ComInfoTech from './com_info_tech.jsx';
import Reports_Display from './reports_display.jsx';
import Message_Tech from './message_tech.jsx';
import HealthTech from './health_tech.jsx';

export function TechRoutes() {
  return (
    <Routes>
      <Route path="homepage_tech" element={<HomepageTech />} />

      <Route path="health_tech" element={<HealthTech />} />
      <Route path="com_info_tech" element={<ComInfoTech />} />
      <Route path="reports_display" element={<Reports_Display/>}/>
      <Route path="message_tech" element={<Message_Tech/>}/>
      <Route path="about_tech" element={<AboutTech />} />
      
      {/* Default route for tech users redirects to homepage */}
      <Route path="/" element={<Navigate to="homepage_tech" />} />

      {/* Fallback route for unmatched paths */}
      <Route path="*" element={<Navigate to="homepage_tech" />} />
    </Routes>
  );
}
