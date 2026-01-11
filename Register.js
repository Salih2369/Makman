import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../js/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = await registerRequest(email, password);

    if (data.message) {
      alert("تم التسجيل بنجاح! يرجى تسجيل الدخول");
      navigate('/login');
    } else {
      alert("عذراً، هذا الحساب موجود مسبقاً");
    }
  };

  return (
    <div className="auth-page">
      <div className="glass-card auth-card">
        <h2 style={{ color: 'var(--accent-cyan)', fontSize: '2rem' }}>إنشاء حساب جديد</h2>

        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-register btn-full">تسجيل الحساب</button>
        </form>

        <p className="link-muted" onClick={() => navigate('/login')}>
          تمتلك حساباً؟ سجل دخولك
        </p>
      </div>
    </div>
  );
};

export default Register;
