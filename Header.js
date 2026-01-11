import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('makman_token');
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('makman_token');
    navigate('/');
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            الرئيسية
          </NavLink>
          <NavLink to="/subscription" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            الاشتراكات
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              لوحة التحكم
            </NavLink>
          )}
        </nav>
      </div>

      <div className="nav-btns">
        {isLoggedIn ? (
          <>
            <button className="btn-login" onClick={() => navigate('/dashboard')}>لوحة التحكم</button>
            <button className="btn-register" onClick={handleLogout}>تسجيل خروج</button>
          </>
        ) : (
          <>
            <button className="btn-login" onClick={() => navigate('/login')}>تسجيل دخول</button>
            <button className="btn-register" onClick={() => navigate('/register')}>إنشاء حساب</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
