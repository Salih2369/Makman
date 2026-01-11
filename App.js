import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './components/Header';
import Home from './pages/Home';
import Subscription from './pages/Subscription';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const RequireAuth = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('makman_token');
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const pageAnim = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } }
};

const RouteShell = ({ children }) => {
  return (
    <motion.div variants={pageAnim} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  return (
    <main className="app-shell">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<RouteShell><Home /></RouteShell>} />
          <Route path="/subscription" element={<RouteShell><Subscription /></RouteShell>} />
          <Route path="/login" element={<RouteShell><Login /></RouteShell>} />
          <Route path="/register" element={<RouteShell><Register /></RouteShell>} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <RouteShell><Dashboard /></RouteShell>
              </RequireAuth>
            }
          />
          <Route path="*" element={<div className="notfound">الصفحة غير موجودة</div>} />
        </Routes>
      </AnimatePresence>
    </main>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  return (
    <Router>
      {loading && (
        <div className="app-loader">
          <div className="loader-card">
            <div className="loader-logo">مكمن</div>
            <div className="loader-bar"><span /></div>
            <div className="loader-sub">Loading…</div>
          </div>
        </div>
      )}

      <Header />
      <AppRoutes />
    </Router>
  );
}

export default App;

