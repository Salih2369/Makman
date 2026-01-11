import React from 'react';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('makman_token');

  const handleSelectPlan = (planName) => {
    if (!isLoggedIn) {
      alert(`لقد اخترت ${planName}. يرجى تسجيل الدخول أو إنشاء حساب لإتمام الاشتراك.`);
      navigate('/login');
    } else {
      alert(`شكراً لاختيارك ${planName}! يتم الآن توجيهك للوحة التحكم.`);
      navigate('/dashboard');
    }
  };

  return (
    <div className="subscription-container">
      <section className="hero">
        <h1 className="hero-title" style={{ fontSize: '3.2rem' }}>باقات مكمن</h1>
        <p className="hero-subtitle">اختر الخطة المناسبة لنمو أعمالك وتطوير متجرك</p>
      </section>

      <div className="pricing-grid">
        {/* Trial */}
        <div className="pricing-card">
          <h2 className="feature-title">الباقة التجريبية</h2>
          <div className="price">مجاناً</div>
          <ul className="feature-list">
            <li>فرع واحد فقط</li>
            <li>تحليلات أساسية</li>
            <li>تنبيهات عبر الإيميل</li>
          </ul>
          <button className="btn-login btn-full" onClick={() => handleSelectPlan('الباقة التجريبية')}>
            ابدأ الآن
          </button>
        </div>

        {/* Popular */}
        <div className="pricing-card popular">
          <div className="badge-popular">الأكثر رواجاً</div>
          <h2 className="feature-title">باقة الأعمال</h2>
          <div className="price">
            $99 <small>/شهر</small>
          </div>
          <ul className="feature-list">
            <li>حتى 5 فروع</li>
            <li>تحليلات متقدمة بالذكاء الاصطناعي</li>
            <li>تنبيهات فورية (SMS/WhatsApp)</li>
            <li>دعم فني 24/7</li>
          </ul>
          <button className="btn-register btn-full" onClick={() => handleSelectPlan('باقة الأعمال')}>
            اشترك الآن
          </button>
        </div>

        {/* Enterprise */}
        <div className="pricing-card">
          <h2 className="feature-title">باقة الشركات</h2>
          <div className="price">تواصل معنا</div>
          <ul className="feature-list">
            <li>فروع غير محدودة</li>
            <li>خوارزميات مخصصة لعملك</li>
            <li>لوحة تحكم خاصة للمدراء</li>
            <li>تدريب مباشر للفريق</li>
          </ul>
          <button className="btn-login btn-full" onClick={() => handleSelectPlan('باقة الشركات')}>
            تواصل مع المبيعات
          </button>
        </div>
      </div>

      <footer className="footer" style={{ marginTop: '50px', opacity: 0.55 }}>
        <p>جميع الباقات تشمل تحديثات النظام المجانية وتشفير البيانات بالكامل</p>
      </footer>
    </div>
  );
};

export default Subscription;
