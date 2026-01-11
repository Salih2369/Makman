import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../js/api';
import { setToken, getUser, setUser } from '../js/auth';
import { useToast } from '../components/ToastProvider';

const Login = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = await loginRequest(email, password);

    if (data?.token) {
      setToken(data.token);

      // if no user profile exists, create a sensible default
      const existing = getUser();
      if (!existing) {
        setUser({
          email,
          role: 'manager',
          onboardingComplete: false,
          companyName: '',
          businessType: 'coffee',
          branches: 1,
          firstBranch: '',
        });
      }

      toast.success('تم تسجيل الدخول', 'مرحبًا بك في مكمن!');
      const u = getUser();
      navigate(u?.onboardingComplete ? '/dashboard' : '/onboarding');
    } else {
      toast.error('فشل تسجيل الدخول', 'البيانات غير صحيحة أو السيرفر غير متصل.');
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="glass-card auth-card">
        <h2 className="auth-title">تسجيل الدخول</h2>
        <p className="auth-sub">أدخل بياناتك للوصول للوحة التحكم.</p>

        <form className="auth-form" onSubmit={handleLogin}>
          <label className="field-label">البريد الإلكتروني</label>
          <input type="email" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label className="field-label">كلمة المرور</label>
          <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" className="btn-register btn-ripple btn-full" disabled={loading}>
            {loading ? 'جاري الدخول...' : 'دخول'}
          </button>
        </form>

        <p className="link-muted" onClick={() => navigate('/register')}>ليس لديك حساب؟ انضم إلينا الآن</p>
      </div>
    </div>
  );
};

export default Login;
