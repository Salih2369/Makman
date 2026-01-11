import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* =========================
          HERO (Stronger + Visual)
      ========================== */}
      <section className="hero hero-pro">
        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <h1 className="hero-title">نظام الذكاء الاصطناعي للأعمال</h1>
            <p className="hero-subtitle">
              راقب فروعك، حلل الفيديوهات لحظياً، واتخذ قرارات ذكية.
            </p>

            <div className="hero-actions">
              <button className="btn-register btn-ripple" onClick={() => navigate('/subscription')}>
                ابدأ رحلتك الآن
              </button>
              <button className="btn-login btn-ripple" onClick={() => navigate('/dashboard')}>
                مشاهدة لوحة التحكم
              </button>
            </div>

            <div className="hero-proof">
              <div className="proof-item">
                <span className="proof-num">+24%</span>
                <span className="proof-text">تحسين كفاءة التشغيل</span>
              </div>
              <div className="proof-item">
                <span className="proof-num">لحظي</span>
                <span className="proof-text">تنبيهات فورية</span>
              </div>
              <div className="proof-item">
                <span className="proof-num">AI</span>
                <span className="proof-text">تحليلات ذكية</span>
              </div>
            </div>
          </motion.div>

          {/* Visual mock */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="mock-card">
              <div className="mock-top">
                <div className="mock-dot" />
                <div className="mock-dot" />
                <div className="mock-dot" />
                <span className="mock-title">Makman Analytics</span>
              </div>

              <div className="mock-metrics">
                <div className="mock-kpi">
                  <span className="kpi-label">زوار اليوم</span>
                  <span className="kpi-val">1,284</span>
                </div>
                <div className="mock-kpi">
                  <span className="kpi-label">تنبيهات</span>
                  <span className="kpi-val danger">2</span>
                </div>
                <div className="mock-kpi">
                  <span className="kpi-label">الانتظار</span>
                  <span className="kpi-val ok">4m</span>
                </div>
              </div>

              <div className="mock-chart">
                <div className="chart-line" />
                <div className="chart-bars">
                  <span style={{ height: '35%' }} />
                  <span style={{ height: '55%' }} />
                  <span style={{ height: '40%' }} />
                  <span style={{ height: '70%' }} />
                  <span style={{ height: '85%' }} />
                  <span style={{ height: '60%' }} />
                </div>
              </div>

              <div className="mock-list">
                <div className="mock-row">
                  <span className="pill pill-ai">AI</span>
                  <span>نشاط غير اعتيادي - فرع العليا</span>
                  <span className="time">قبل 2 د</span>
                </div>
                <div className="mock-row">
                  <span className="pill pill-ok">OK</span>
                  <span>ازدحام متوسط - فرع النخيل</span>
                  <span className="time">قبل 8 د</span>
                </div>
              </div>
            </div>

            <div className="data-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================
          Features (Icons + Stagger)
      ========================== */}
      <motion.section
        className="section-block"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="section-head">
          <h2 className="section-h">مزايا مكمن</h2>
          <p className="section-p">كل ما تحتاجه لمراقبة الفروع واتخاذ قرارات أدق.</p>
        </div>

        <div className="features-grid features-stagger">
          <motion.div className="glass-card card-pro card-rise-1" variants={fadeUp}>
            <div className="card-icon">⚡</div>
            <h3 className="feature-title">التحليلات الفورية</h3>
            <p className="feature-text">رؤى فورية مدعومة بالذكاء الاصطناعي لتحسين أداء متجرك.</p>
          </motion.div>

          <motion.div className="glass-card card-pro card-rise-2" variants={fadeUp}>
            <div className="card-icon">📊</div>
            <h3 className="feature-title">تقارير مفصلة</h3>
            <p className="feature-text">لوحات معلومات تفاعلية تعرض كافة البيانات التي تحتاجها بدقة.</p>
          </motion.div>

          <motion.div className="glass-card card-pro card-rise-3" variants={fadeUp}>
            <div className="card-icon">🔔</div>
            <h3 className="feature-title">تنبيهات ذكية</h3>
            <p className="feature-text">إشعارات لحظية عند حدوث أي نشاط يتطلب تدخلك الفوري.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* =========================
          How it works (3 steps)
      ========================== */}
      <motion.section
        className="section-block"
        initial="hidden"
        whileInView="show"
        variants={stagger}
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="section-head">
          <h2 className="section-h">كيف يعمل النظام؟</h2>
          <p className="section-p">خطوات بسيطة… نتائج قوية وواضحة.</p>
        </div>

        <div className="steps-grid">
          <motion.div className="step-card" variants={fadeUp}>
            <div className="step-num">1</div>
            <h3 className="step-title">ربط الكاميرات / رفع الفيديو</h3>
            <p className="step-text">أضف مصدر الفيديو أو سجّل ملفاتك بسهولة.</p>
          </motion.div>

          <motion.div className="step-card" variants={fadeUp}>
            <div className="step-num">2</div>
            <h3 className="step-title">تحليل ذكي بالذكاء الاصطناعي</h3>
            <p className="step-text">نستخرج مؤشرات الأداء، الأنماط، والتنبيهات تلقائياً.</p>
          </motion.div>

          <motion.div className="step-card" variants={fadeUp}>
            <div className="step-num">3</div>
            <h3 className="step-title">تنبيهات + تقارير ولوحات</h3>
            <p className="step-text">تابع كل شيء من لوحة واحدة واتخذ قرارات أسرع.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* =========================
          Use cases
      ========================== */}
      <motion.section
        className="section-block"
        initial="hidden"
        whileInView="show"
        variants={stagger}
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="section-head">
          <h2 className="section-h">يناسب عدة قطاعات</h2>
          <p className="section-p">مكمن يخدم أعمال مختلفة بواجهة واحدة وتجربة موحّدة.</p>
        </div>

        <div className="usecases-grid">
          <motion.div className="usecase-card" variants={fadeUp}>
            <div className="usecase-icn">🏪</div>
            <div>
              <h3 className="usecase-title">المتاجر</h3>
              <p className="usecase-text">مراقبة الازدحام، التنبيهات، وتحسين التشغيل.</p>
            </div>
          </motion.div>

          <motion.div className="usecase-card" variants={fadeUp}>
            <div className="usecase-icn">☕</div>
            <div>
              <h3 className="usecase-title">المقاهي</h3>
              <p className="usecase-text">قياس التدفق وأوقات الذروة وتخفيف الانتظار.</p>
            </div>
          </motion.div>

          <motion.div className="usecase-card" variants={fadeUp}>
            <div className="usecase-icn">🛒</div>
            <div>
              <h3 className="usecase-title">السوبرماركت</h3>
              <p className="usecase-text">تحليلات حركة العملاء والتنبيه للمواقف الحساسة.</p>
            </div>
          </motion.div>

          <motion.div className="usecase-card" variants={fadeUp}>
            <div className="usecase-icn">🏢</div>
            <div>
              <h3 className="usecase-title">الشركات</h3>
              <p className="usecase-text">لوحات مدراء، تقارير تنفيذية، وقرارات دقيقة.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* =========================
          CTA
      ========================== */}
      <motion.section
        className="section-card section-card-pro"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">جاهز تبدأ؟</h2>
        <p className="section-subtitle">اختر خطة تناسبك وابدأ التجربة الآن.</p>
        <div className="cta-row">
          <button className="btn-register btn-ripple" onClick={() => navigate('/subscription')}>
            صفحة الاشتراكات
          </button>
          <button className="btn-login btn-ripple" onClick={() => navigate('/register')}>
            إنشاء حساب
          </button>
        </div>
      </motion.section>

      {/* =========================
          Footer (Professional)
      ========================== */}
      <footer className="footer-pro">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">
              <span className="footer-name">مكمن</span>
              <span className="footer-tag">منصة تحليلات ذكية للأعمال</span>
            </div>
            <p className="footer-desc">
              راقب فروعك، حلل الفيديوهات، واستفد من لوحات ذكية لتنمية أعمالك.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-h">روابط</h4>
            <a className="footer-link" href="/">الرئيسية</a>
            <a className="footer-link" href="/subscription">الاشتراكات</a>
            <a className="footer-link" href="/login">تسجيل الدخول</a>
          </div>

          <div className="footer-col">
            <h4 className="footer-h">تواصل</h4>
            <a className="footer-link" href="mailto:support@makman.ai">support@makman.ai</a>
            <span className="footer-muted">الرياض، السعودية</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 مكمن - جميع الحقوق محفوظة</span>
          <div className="footer-mini-links">
            <span className="footer-muted">الخصوصية</span>
            <span className="dot">•</span>
            <span className="footer-muted">الشروط</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

