import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, setUser, hasPermission } from "../js/auth";

const Settings = () => {
  const navigate = useNavigate();
  const u = getUser();

  const [companyName, setCompanyName] = useState(u?.companyName || "");
  const [email, setEmail] = useState(u?.email || "");
  const [role, setRole] = useState(u?.role || "manager");
  const [alertsEmail, setAlertsEmail] = useState(u?.alertsEmail ?? true);
  const [alertsWhatsapp, setAlertsWhatsapp] = useState(u?.alertsWhatsapp ?? false);

  const canManageUsers = hasPermission(role, "manage_users");

  const roleLabel = useMemo(() => {
    if (role === "admin") return "Admin (مدير النظام)";
    if (role === "manager") return "Manager (مدير)";
    return "Viewer (مشاهد)";
  }, [role]);

  const save = (e) => {
    e.preventDefault();
    setUser({
      ...(u || {}),
      companyName,
      email,
      role,
      alertsEmail,
      alertsWhatsapp,
    });
    navigate("/dashboard");
  };

  // ✅ ستايل داخلي خفيف عشان ما نغيّر CSS العام
  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "1.35fr 1fr",
      gap: 18,
      alignItems: "start",
    },
    cardPad: { padding: 18 },
    sectionTitle: { margin: "0 0 10px", fontSize: 18 },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      marginTop: 12,
    },
    full: { gridColumn: "1 / -1" },
    input: {
      width: "100%",
      height: 44,
      borderRadius: 14,
      padding: "0 14px",
      outline: "none",
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.06)",
      color: "rgba(255,255,255,0.92)",
    },
    labelRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6,
      fontSize: 13,
      color: "rgba(255,255,255,0.78)",
    },
    helper: { fontSize: 12, color: "rgba(255,255,255,0.45)" },
    toggleWrap: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      marginTop: 12,
    },
    toggleCard: (active) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      padding: "12px 14px",
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.10)",
      background: active ? "rgba(106,167,255,0.14)" : "rgba(255,255,255,0.06)",
    }),
    toggleLeft: { display: "flex", flexDirection: "column", gap: 2 },
    toggleTitle: { fontSize: 13, color: "rgba(255,255,255,0.92)" },
    toggleSub: { fontSize: 12, color: "rgba(255,255,255,0.55)" },
    permBox: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: 10,
      marginTop: 12,
    },
    permRow: (on) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 12px",
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.10)",
      background: on ? "rgba(100,255,160,0.10)" : "rgba(255,255,255,0.05)",
    }),
    badge: (on) => ({
      fontSize: 12,
      padding: "6px 10px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.12)",
      background: on ? "rgba(100,255,160,0.14)" : "rgba(255,255,255,0.06)",
      color: on ? "rgba(190,255,220,0.95)" : "rgba(255,255,255,0.70)",
    }),
    footerRow: { display: "flex", gap: 10, marginTop: 14 },
    ghostBtn: {
      height: 44,
      padding: "0 14px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.14)",
      background: "transparent",
      color: "rgba(255,255,255,0.88)",
      cursor: "pointer",
    },
  };

  return (
    <div className="page-wrap">
      <div className="page-head">
        <h1 className="page-title">الإعدادات</h1>
        <p className="page-sub">حساب الشركة، التنبيهات، والصلاحيات — بشكل مبسّط واحترافي.</p>
      </div>

      <div className="settings-grid" style={styles.grid}>
        {/* ✅ بطاقة الحساب */}
        <div className="glass-card" style={styles.cardPad}>
          <h3 className="card-h" style={styles.sectionTitle}>
            حساب الشركة
          </h3>
          <p className="muted" style={{ marginTop: -4 }}>
            عدّل معلوماتك الأساسية — وسيتم ربطها بالحساب.
          </p>

          <form onSubmit={save} style={{ marginTop: 10 }}>
            <div style={styles.formGrid}>
              {/* اسم الشركة */}
              <div style={styles.full}>
                <div style={styles.labelRow}>
                  <span>اسم الشركة</span>
                  <span style={styles.helper}>يظهر في لوحة التحكم والتقارير</span>
                </div>
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={styles.input}
                  placeholder="مثال: Makman Co."
                />
              </div>

              {/* البريد */}
              <div style={styles.full}>
                <div style={styles.labelRow}>
                  <span>البريد</span>
                  <span style={styles.helper}>لإرسال التقارير والتنبيهات</span>
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  placeholder="name@company.com"
                />
              </div>

              {/* الدور */}
              <div style={styles.full}>
                <div style={styles.labelRow}>
                  <span>الدور (Role)</span>
                  <span style={styles.helper}>{roleLabel}</span>
                </div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ ...styles.input, cursor: "pointer" }}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            </div>

            {/* ✅ تنبيهات (كروت بدل صف طويل مزعج) */}
            <div style={{ marginTop: 14 }}>
              <div style={styles.labelRow}>
                <span>التنبيهات</span>
                <span style={styles.helper}>اختر قنوات التنبيه</span>
              </div>

              <div style={styles.toggleWrap}>
                <div style={styles.toggleCard(alertsEmail)}>
                  <div style={styles.toggleLeft}>
                    <div style={styles.toggleTitle}>تنبيهات عبر البريد</div>
                    <div style={styles.toggleSub}>مناسب للتقارير والإشعارات الرسمية</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={alertsEmail}
                    onChange={(e) => setAlertsEmail(e.target.checked)}
                    style={{ transform: "scale(1.1)", cursor: "pointer" }}
                  />
                </div>

                <div style={styles.toggleCard(alertsWhatsapp)}>
                  <div style={styles.toggleLeft}>
                    <div style={styles.toggleTitle}>تنبيهات WhatsApp</div>
                    <div style={styles.toggleSub}>مناسب للتنبيهات العاجلة</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={alertsWhatsapp}
                    onChange={(e) => setAlertsWhatsapp(e.target.checked)}
                    style={{ transform: "scale(1.1)", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>

            {/* ✅ أزرار واضحة */}
            <div style={styles.footerRow}>
              <button className="btn-register btn-ripple" type="submit" style={{ flex: 1 }}>
                حفظ التغييرات
              </button>

              <button
                type="button"
                style={styles.ghostBtn}
                onClick={() => navigate("/dashboard")}
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>

        {/* ✅ بطاقة الصلاحيات */}
        <div className="glass-card" style={styles.cardPad}>
          <h3 className="card-h" style={styles.sectionTitle}>
            الصلاحيات
          </h3>
          <p className="muted" style={{ marginTop: -4 }}>
            الدور الحالي: <b className="text-strong">{role}</b>
          </p>

          <div style={styles.permBox}>
            <div style={styles.permRow(hasPermission(role, "view_dashboard"))}>
              <span>عرض لوحة التحكم</span>
              <span style={styles.badge(hasPermission(role, "view_dashboard"))}>
                {hasPermission(role, "view_dashboard") ? "مفعّل" : "غير مفعّل"}
              </span>
            </div>

            <div style={styles.permRow(hasPermission(role, "view_settings"))}>
              <span>عرض الإعدادات</span>
              <span style={styles.badge(hasPermission(role, "view_settings"))}>
                {hasPermission(role, "view_settings") ? "مفعّل" : "غير مفعّل"}
              </span>
            </div>

            <div style={styles.permRow(hasPermission(role, "export_reports"))}>
              <span>تصدير التقارير</span>
              <span style={styles.badge(hasPermission(role, "export_reports"))}>
                {hasPermission(role, "export_reports") ? "مفعّل" : "غير مفعّل"}
              </span>
            </div>

            <div style={styles.permRow(canManageUsers)}>
              <span>إدارة المستخدمين</span>
              <span style={styles.badge(canManageUsers)}>
                {canManageUsers ? "مفعّل" : "غير مفعّل"}
              </span>
            </div>
          </div>

          <div style={{ marginTop: 14 }} className="hint">
            <span className="pill pill-ai">Enterprise</span>
            <span className="muted">تصميم جاهز لصلاحيات فرق و Feature Flags (نسخة قادمة).</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
