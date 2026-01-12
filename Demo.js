import React from "react";
import { useNavigate } from "react-router-dom";

const Demo = () => {
  const navigate = useNavigate();

  const styles = {
    hero: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: 14,
      alignItems: "stretch",
      marginTop: 10,
    },
    mock: {
      padding: 16,
      borderRadius: 22,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.05)",
    },
    mockHead: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
      color: "rgba(255,255,255,0.7)",
      fontWeight: 700,
    },
    dots: { display: "flex", gap: 6 },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: "rgba(255,255,255,0.25)",
    },
    miniKpiRow: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 },
    miniKpi: {
      padding: 12,
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.04)",
    },
    miniLabel: { fontSize: 12, color: "rgba(255,255,255,0.6)" },
    miniVal: { fontSize: 18, fontWeight: 800, marginTop: 6, color: "rgba(255,255,255,0.92)" },

    chart: {
      height: 160,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.04)",
      marginTop: 12,
      display: "grid",
      placeItems: "center",
      color: "rgba(255,255,255,0.45)",
      fontWeight: 700,
    },

    right: { padding: 16 },
    badge: {
      width: "fit-content",
      padding: "6px 10px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(106,167,255,0.14)",
      color: "rgba(255,255,255,0.88)",
      fontSize: 12,
      fontWeight: 800,
    },
    h2: { margin: "10px 0 6px", fontSize: 24 },
    p: { margin: 0, color: "rgba(255,255,255,0.70)" },
    ul: { marginTop: 10, color: "rgba(255,255,255,0.78)", lineHeight: 1.8 },
    actions: { display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" },

    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 },
    cardPad: { padding: 16 },
    alert: {
      display: "grid",
      gridTemplateColumns: "52px 1fr",
      gap: 10,
      padding: 12,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.05)",
      marginTop: 10,
    },
    aBadge: (type) => ({
      width: 46,
      height: 46,
      borderRadius: 14,
      display: "grid",
      placeItems: "center",
      fontWeight: 800,
      border: "1px solid rgba(255,255,255,0.12)",
      background: type === "AI" ? "rgba(106,167,255,0.18)" : "rgba(255,255,255,0.06)",
      color: "rgba(255,255,255,0.92)",
    }),
    aTitle: { fontWeight: 800, color: "rgba(255,255,255,0.92)" },
    aMeta: { fontSize: 12, marginTop: 4, color: "rgba(255,255,255,0.60)" },
  };

  return (
    <div className="page-wrap">
      <div className="page-head">
        <h1 className="page-title">تجربة مكمن</h1>
        <p className="page-sub">نموذج Preview سريع — يوضح لك كيف تظهر لوحة التحكم والتنبيهات.</p>
      </div>

      <div className="glass-card" style={{ padding: 16 }}>
        <div style={styles.hero}>
          {/* Mock */}
          <div style={styles.mock}>
            <div style={styles.mockHead}>
              <span>Makman Analytics</span>
              <span style={styles.dots}>
                <i style={styles.dot} />
                <i style={styles.dot} />
                <i style={styles.dot} />
              </span>
            </div>

            <div style={styles.miniKpiRow}>
              <div style={styles.miniKpi}>
                <div style={styles.miniLabel}>زوار اليوم</div>
                <div style={styles.miniVal}>1,284</div>
              </div>
              <div style={styles.miniKpi}>
                <div style={styles.miniLabel}>تنبيهات</div>
                <div style={{ ...styles.miniVal, color: "rgba(255,140,140,0.95)" }}>2</div>
              </div>
              <div style={styles.miniKpi}>
                <div style={styles.miniLabel}>الانتظار</div>
                <div style={{ ...styles.miniVal, color: "rgba(140,255,190,0.95)" }}>4m</div>
              </div>
            </div>

            <div style={styles.chart}>Chart Placeholder</div>
          </div>

          {/* Copy */}
          <div className="glass-card" style={styles.right}>
            <div style={styles.badge}>Preview</div>
            <h2 style={styles.h2}>لوحة تحكم تفاعلية… بشكل SaaS</h2>
            <p style={styles.p}>كل شيء واضح: مؤشرات + تنبيهات + تقارير، بدون تعقيد.</p>

            <ul style={styles.ul}>
              <li>تنبيهات مصنّفة حسب الأولوية.</li>
              <li>بحث وفلاتر داخل لوحة التحكم.</li>
              <li>إعدادات وصلاحيات جاهزة لـ Enterprise.</li>
            </ul>

            <div style={styles.actions}>
              <button className="btn-register btn-ripple" onClick={() => navigate("/subscription")}>
                ابدأ الآن
              </button>
              <button className="btn-login btn-ripple" onClick={() => navigate("/dashboard")}>
                دخول لوحة التحكم
              </button>
            </div>
          </div>
        </div>

        <div style={styles.grid2}>
          <div className="glass-card" style={styles.cardPad}>
            <h3 className="card-h" style={{ margin: 0 }}>تنبيه نموذجي</h3>
            <p className="muted" style={{ marginTop: 6 }}>مثال للتنبيه كما يظهر في النظام.</p>

            <div style={styles.alert}>
              <div style={styles.aBadge("AI")}>AI</div>
              <div>
                <div style={styles.aTitle}>نشاط غير اعتيادي - فرع العليا</div>
                <div style={styles.aMeta}>قبل دقيقتين • أولوية عالية</div>
              </div>
            </div>

            <div style={styles.alert}>
              <div style={styles.aBadge("OK")}>OK</div>
              <div>
                <div style={styles.aTitle}>ازدحام متوسط - فرع النخيل</div>
                <div style={styles.aMeta}>قبل 8 دقائق • أولوية متوسطة</div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={styles.cardPad}>
            <h3 className="card-h" style={{ margin: 0 }}>تقرير مختصر</h3>
            <p className="muted" style={{ marginTop: 6 }}>ملخص سريع يساعدك تقرر بسرعة.</p>

            <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
              <div style={styles.miniKpi}>
                <div style={styles.miniLabel}>أعلى فرع ازدحامًا</div>
                <div style={styles.miniVal}>العليا</div>
              </div>
              <div style={styles.miniKpi}>
                <div style={styles.miniLabel}>تحسن أسبوعي</div>
                <div style={styles.miniVal}>+12%</div>
              </div>
              <div style={styles.miniKpi}>
                <div style={styles.miniLabel}>عدد التنبيهات</div>
                <div style={styles.miniVal}>2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
