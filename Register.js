import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../js/api';
import { setUser } from '../js/auth';
import { useToast } from '../components/ToastProvider';

const Register = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = await registerRequest(email, password);

    if (data?.message) {
      // Create profile now, onboarding next
      setUser({
        email,
        role: 'manager',
        onboardingComplete: false,
        companyName: '',
        businessType: 'coffee',
        branches: 1,
        firstBranch: '',
      });

      toast.success('تم إنشاء الحساب', 'الآن أكمل تهيئة الحساب.');
      navigate('/onboarding');
    } else {
      toast.error('تعذر التسجيل', 'هذا الحساب موجود مسبقًا أو حدث خطأ في السيرفر.');
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="glass-card auth-card">
        <h2 className="auth-title">إنشاء حساب جديد</h2>
        <p className="auth-sub">ابدأ خلال دقيقة واحدة.</p>

        <form onSubmit={handleRegister} className="auth-form">
          <label className="field-label">البريد الإلكتروني</label>
          <input type="email" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label className="field-label">كلمة المرور</label>
          <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" className="btn-register btn-ripple btn-full" disabled={loading}>
            {loading ? 'جاري إنشاء الحساب...' : 'تسجيل الحساب'}
          </button>
        </form>

        <p className="link-muted" onClick={() => navigate('/login')}>تمتلك حساباً؟ سجل دخولك</p>
      </div>
    </div>
  );
};

export default Register;
