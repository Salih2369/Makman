import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import { clearAuth, getUser, getTheme, setTheme, getFeatureFlags } from '../js/auth';

const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const token = localStorage.getItem('makman_token');
  const user = getUser();
  const flags = getFeatureFlags();

  const [theme, setThemeState] = useState(getTheme());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logout = () => {
    clearAuth();
    navigate('/');
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    setTheme(next);
  };

  const statusLabel = 'Live';
  const statusType = 'ok'; // ok | beta | warn

  return (
    <header className={`main-header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="nav-left">
        <NavLink to="/" className="logo-container">
          <span className="logo-text">مكمن</span>

          <motion.img
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={logo}
            alt="مكمن"
            className="logo-img"
          />

          {/* Status Badge */}
          <span className={`status-badge status-${statusType}`}>{statusLabel}</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>الرئيسية</NavLink>
          <NavLink to="/subscription" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>الاشتراكات</NavLink>

          {flags.demo && (
            <NavLink to="/demo" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>تجربة</NavLink>
          )}

          {token && (
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>لوحة التحكم</NavLink>
          )}

          {token && flags.settings && (
            <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>الإعدادات</NavLink>
          )}
        </nav>
      </div>

      <div className="nav-btns">
        {/* Theme Toggle */}
        <button className="icon-btn" onClick={toggleTheme} title="تبديل المظهر">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {token ? (
          <>
            <button className="btn-login btn-ripple" onClick={() => navigate('/dashboard')}>لوحة التحكم</button>
            <button className="btn-register btn-ripple" onClick={logout}>تسجيل خروج</button>
          </>
        ) : (
          <>
            <button className="btn-login btn-ripple" onClick={() => navigate('/login')}>تسجيل دخول</button>
            <button className="btn-register btn-ripple" onClick={() => navigate('/register')}>إنشاء حساب</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
