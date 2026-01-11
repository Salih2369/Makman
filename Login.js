import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../js/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await loginRequest(email, password);

    if (data.token) {
      localStorage.setItem('makman_token', data.token);
      navigate('/dashboard');
    } else {
      alert("عذراً، بيانات الدخول غير صحيحة");
    }
  };

  return (
    <div className="auth-page">
      <div className="glass-card auth-card">
        <h2 style={{ color: 'var(--accent-cyan)', fontSize: '2rem' }}>تسجيل الدخول</h2>

        <form className="auth-form" onSubmit={handleLogin}>
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

          <button type="submit" className="btn-register btn-full">دخول</button>
        </form>

        <p className="link-muted" onClick={() => navigate('/register')}>
          ليس لديك حساب؟ انضم إلينا الآن
        </p>
      </div>
    </div>
  );
};

export default Login;
