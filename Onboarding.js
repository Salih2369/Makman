import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, setUser } from '../js/auth';

const Onboarding = () => {
  const navigate = useNavigate();
  const u = getUser();

  const [businessType, setBusinessType] = useState(u?.businessType || 'coffee');
  const [companyName, setCompanyName] = useState(u?.companyName || '');
  const [branches, setBranches] = useState(u?.branches || 1);
  const [firstBranch, setFirstBranch] = useState(u?.firstBranch || '');

  const save = (e) => {
    e.preventDefault();
    const next = {
      ...(u || {}),
      companyName,
      businessType,
      branches: Number(branches),
      firstBranch,
      onboardingComplete: true,
    };
    setUser(next);
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="glass-card auth-card">
        <h2 className="auth-title">تهيئة حسابك</h2>
        <p className="auth-sub">خلّنا نجهز لوحة التحكم بناءً على نشاطك.</p>

        <form className="auth-form" onSubmit={save}>
          <label className="field-label">اسم الشركة</label>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="مثال: Makman Co."
            required
          />

          <label className="field-label">نوع النشاط</label>
          <select className="select" value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
            <option value="store">متجر</option>
            <option value="coffee">كوفي</option>
            <option value="market">سوبرماركت</option>
            <option value="company">شركة / مؤسسة</option>
          </select>

          <label className="field-label">عدد الفروع</label>
          <input
            type="number"
            min="1"
            max="200"
            value={branches}
            onChange={(e) => setBranches(e.target.value)}
            required
          />

          <label className="field-label">اسم أول فرع</label>
          <input
            value={firstBranch}
            onChange={(e) => setFirstBranch(e.target.value)}
            placeholder="مثال: فرع العليا"
            required
          />

          <button className="btn-register btn-ripple btn-full" type="submit">إنهاء الإعداد</button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
