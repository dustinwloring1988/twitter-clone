import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Notifications } from './pages/Notifications';
import { Messages } from './pages/Messages';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { DemoLoginPage } from './pages/DemoLoginPage';
import { UserView } from './pages/UserView';
import { useAccessibility } from './hooks/useAccessibility';
import { ThemeInitializer } from './components/ThemeInitializer';

export default function App() {
  const { reduceMotion, increaseContrast, getFontSizeClass } = useAccessibility();

  return (
    <>
      <ThemeInitializer />
      <div 
        className={getFontSizeClass()}
        data-reduce-motion={reduceMotion}
        data-increase-contrast={increaseContrast}
      >
        <Router>
          <Routes>
            <Route path="/demo-login" element={<DemoLoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="messages" element={<Messages />} />
              <Route path="profile" element={<Profile />} />
              <Route path="user/:handle" element={<UserView />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/demo-login" replace />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}