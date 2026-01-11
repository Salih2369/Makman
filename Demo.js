import React from 'react';
import { useNavigate } from 'react-router-dom';

const Demo = () => {
  const navigate = useNavigate();

  return (
    <div className="page-wrap">
      <div className="page-head">
        <h1 className="page-title">تجربة مكمن</h1>
        <p className="page-sub">شاهد شكل النظام والتقارير والتنبيهات بدون تسجيل.</p>
      </div>

      <div className="demo-grid">
        <div className="demo-card glass-card">
          <div className="demo-badge">Preview</div>
          <h3 className="demo-title">لوحة تحكم تفاعلية</h3>
          <p className="demo-text">مؤشرات أداء + رسم بياني لحظي + تنبيهات.</p>

          <div className="demo-mock">
            <div className="dm-row">
              <span className="dm-k">زوار اليوم</span>
              <span className="dm-v">1,284</span>
            </div>
            <div className="dm-row">
              <span className="dm-k">تنبيهات</span>
              <span className="dm-v dm-danger">2</span>
            </div>
            <div className="dm-row">
              <span className="dm-k">الانتظار</span>
              <span className="dm-v dm-ok">4m</span>
            </div>
          </div>

          <div className="demo-actions">
            <button className="btn-register btn-ripple" onClick={() => navigate('/subscription')}>
              ابدأ الآن
            </button>
            <button className="btn-login btn-ripple" onClick={() => navigate('/dashboard')}>
              دخول لوحة التحكم
            </button>
          </div>
        </div>

        <div className="demo-card glass-card">
          <h3 className="demo-title">تنبيه نموذجي</h3>
          <p className="demo-text">عند حدوث نشاط غير اعتيادي يصلك تنبيه فورًا.</p>

          <div className="alert-sample">
            <div className="alert-pill">AI</div>
            <div className="alert-content">
              <div className="alert-title">نشاط غير اعتيادي - فرع العليا</div>
              <div className="alert-meta">قبل دقيقتين • أولوية عالية</div>
            </div>
          </div>

          <div className="alert-sample">
            <div className="alert-pill ok">OK</div>
            <div className="alert-content">
              <div className="alert-title">ازدحام متوسط - فرع النخيل</div>
              <div className="alert-meta">قبل 8 دقائق • أولوية متوسطة</div>
            </div>
          </div>
        </div>

        <div className="demo-card glass-card">
          <h3 className="demo-title">تقرير مختصر</h3>
          <p className="demo-text">ملخص يومي يساعدك على اتخاذ قرارات أسرع.</p>

          <ul className="demo-report">
            <li>أعلى فرع ازدحامًا: العليا</li>
            <li>متوسط الانتظار: 4 دقائق</li>
            <li>معدل التحسن عن الأسبوع: +12%</li>
            <li>عدد التنبيهات: 2</li>
          </ul>

          <button className="btn-login btn-ripple" onClick={() => navigate('/register')}>
            جرّب النظام مجانًا
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
