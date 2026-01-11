import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './components/Header';
import ToastProvider from './components/ToastProvider';

import Home from './pages/Home';
import Subscription from './pages/Subscription';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import Demo from './pages/Demo';
import Onboarding from './pages/Onboarding';
import Settings from './pages/Settings';

import './css/style.css';

import { getToken, getUser, initTheme, getFeatureFlags } from './js/auth';

const RequireAuth = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
};

const RequireOnboarding = ({ children }) => {
  const token = getToken();
  const u = getUser();
  if (!token) return <Navigate to="/login" replace />;
  if (!u?.onboardingComplete) return <Navigate to="/onboarding" replace />;
  return children;
};

const pageAnim = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

const RouteShell = ({ children }) => (
  <motion.div variants={pageAnim} initial="initial" animate="animate" exit="exit">
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const flags = getFeatureFlags();

  return (
    <main className="app-shell">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<RouteShell><Home /></RouteShell>} />
          <Route path="/subscription" element={<RouteShell><Subscription /></RouteShell>} />
          <Route path="/demo" element={flags.demo ? <RouteShell><Demo /></RouteShell> : <Navigate to="/" replace />} />

          <Route path="/login" element={<RouteShell><Login /></RouteShell>} />
          <Route path="/register" element={<RouteShell><Register /></RouteShell>} />

          <Route
            path="/onboarding"
            element={
              <RequireAuth>
                <RouteShell><Onboarding /></RouteShell>
              </RequireAuth>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RequireOnboarding>
                <RouteShell><Dashboard /></RouteShell>
              </RequireOnboarding>
            }
          />

          <Route
            path="/settings"
            element={
              <RequireOnboarding>
                <RouteShell><Settings /></RouteShell>
              </RequireOnboarding>
            }
          />

          <Route path="*" element={<div className="notfound">الصفحة غير موجودة</div>} />
        </Routes>
      </AnimatePresence>
    </main>
  );
};

function App() {
  const [boot, setBoot] = useState(true);

  useEffect(() => {
    initTheme();
    const t = setTimeout(() => setBoot(false), 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <Router>
      <ToastProvider>
        {/* Lightweight boot overlay */}
        {boot && (
          <div className="app-boot">
            <div className="boot-dot" />
            <div className="boot-dot" />
            <div className="boot-dot" />
          </div>
        )}

        <Header />
        <AnimatedRoutes />
      </ToastProvider>
    </Router>
  );
}

export default App;
