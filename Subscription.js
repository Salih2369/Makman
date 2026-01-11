import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getUser, setUser } from '../js/auth';
import { useToast } from '../components/ToastProvider';

const Subscription = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const isLoggedIn = !!getToken();
  const u = getUser();

  const handleSelectPlan = (plan) => {
    if (!isLoggedIn) {
      toast.info('اختيار الخطة', `لقد اخترت ${plan}. سجل دخولك لإكمال الاشتراك.`);
      navigate('/login');
      return;
    }

    setUser({ ...(u || {}), plan });
    toast.success('تم اختيار الخطة', `شكرًا لاختيارك ${plan}!`);
    navigate('/dashboard');
  };

  return (
    <div className="page-wrap">
      <div className="page-head">
        <h1 className="page-title">باقات مكمن</h1>
        <p className="page-sub">اختر الخطة المناسبة لنمو أعمالك وتطوير متجرك</p>
      </div>

      <div className="pricing-grid">
        <div className="pricing-card">
          <h2 className="plan-title">الباقة التجريبية</h2>
          <div className="price">مجاناً</div>
          <ul className="feature-list">
            <li>فرع واحد فقط</li>
            <li>تحليلات أساسية</li>
            <li>تنبيهات عبر الإيميل</li>
          </ul>
          <button className="btn-login btn-ripple btn-full" onClick={() => handleSelectPlan('الباقة التجريبية')}>ابدأ الآن</button>
        </div>

        <div className="pricing-card popular">
          <div className="badge-popular">الأكثر رواجاً</div>
          <h2 className="plan-title">باقة الأعمال</h2>
          <div className="price">$99 <small>/شهر</small></div>
          <ul className="feature-list">
            <li>حتى 5 فروع</li>
            <li>تحليلات متقدمة بالذكاء الاصطناعي</li>
            <li>تنبيهات فورية (SMS/WhatsApp)</li>
            <li>دعم فني 24/7</li>
          </ul>
          <button className="btn-register btn-ripple btn-full" onClick={() => handleSelectPlan('باقة الأعمال')}>اشترك الآن</button>
        </div>

        <div className="pricing-card">
          <h2 className="plan-title">باقة الشركات</h2>
          <div className="price">تواصل معنا</div>
          <ul className="feature-list">
            <li>فروع غير محدودة</li>
            <li>خوارزميات مخصصة لعملك</li>
            <li>لوحة تحكم خاصة للمدراء</li>
            <li>تدريب مباشر للفريق</li>
          </ul>
          <button className="btn-login btn-ripple btn-full" onClick={() => handleSelectPlan('باقة الشركات')}>تواصل مع المبيعات</button>
        </div>
      </div>

      <footer className="footer-note">
        جميع الباقات تشمل تحديثات النظام المجانية وتشفير البيانات بالكامل
      </footer>
    </div>
  );
};

export default Subscription;
