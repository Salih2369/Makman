import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, hasPermission } from "../js/auth";

// ✅ الرسم التفاعلي
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const u = getUser();

  // منع دخول غير المصرّح لهم
  useEffect(() => {
    const role = u?.role || "viewer";
    if (!hasPermission(role, "view_dashboard")) navigate("/");
  }, [navigate, u]);

  const [loading, setLoading] = useState(true);

  // Filters
  const [branch, setBranch] = useState("all");
  const [priority, setPriority] = useState("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const alerts = useMemo(
    () => [
      { id: 1, type: "AI", title: "نشاط غير اعتيادي", branch: "العليا", pr: "high", time: "قبل 2 د" },
      { id: 2, type: "OK", title: "ازدحام متوسط", branch: "النخيل", pr: "medium", time: "قبل 8 د" },
      { id: 3, type: "OK", title: "حركة طبيعية", branch: "الملز", pr: "low", time: "قبل 14 د" },
      { id: 4, type: "AI", title: "تغير مفاجئ في التدفق", branch: "العليا", pr: "medium", time: "قبل 22 د" },
    ],
    []
  );

  // ✅ بيانات الرسم (نفس فكرة الصورة: ساعات + زوار)
  const chartData = useMemo(
    () => [
      { t: "10am", v: 320 },
      { t: "12pm", v: 650 },
      { t: "2pm", v: 520 },
      { t: "4pm", v: 900 },
      { t: "6pm", v: 1100 },
      { t: "8pm", v: 960 },
    ],
    []
  );

  const branches = useMemo(() => ["العليا", "النخيل", "الملز"], []);

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      const okBranch = branch === "all" || a.branch === branch;
      const okPr = priority === "all" || a.pr === priority;
      const okQ =
        !q.trim() ||
        `${a.title} ${a.branch} ${a.type}`.toLowerCase().includes(q.trim().toLowerCase());
      return okBranch && okPr && okQ;
    });
  }, [alerts, branch, priority, q]);

  const styles = {
    topRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 14 },
    kpi: {
      padding: 14,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.05)",
    },
    kpiLabel: { fontSize: 12, color: "rgba(255,255,255,0.65)" },
    kpiVal: (tone) => ({
      fontSize: 22,
      fontWeight: 900,
      marginTop: 6,
      color:
        tone === "blue"
          ? "#7EB4FF"
          : tone === "red"
          ? "#FF7A7A"
          : tone === "green"
          ? "#6EE7B7"
          : "rgba(255,255,255,0.92)",
    }),

    main: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignItems: "start" },

    filterBar: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1.2fr",
      gap: 10,
      marginTop: 10,
      marginBottom: 12,
    },
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

    list: { display: "grid", gap: 12, marginTop: 14 },
    item: {
      display: "grid",
      gridTemplateColumns: "72px 1fr",
      gap: 14,
      alignItems: "center",
      padding: "16px 16px",
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.05)",
    },
    badge: (t) => ({
      width: 56,
      height: 56,
      borderRadius: 16,
      display: "grid",
      placeItems: "center",
      fontWeight: 900,
      border: "1px solid rgba(255,255,255,0.12)",
      background: t === "AI" ? "rgba(126,180,255,0.18)" : "rgba(255,255,255,0.06)",
      color: "rgba(255,255,255,0.92)",
    }),
    title: { fontWeight: 900, fontSize: 18, color: "rgba(255,255,255,0.92)" },
    meta: { fontSize: 13, color: "rgba(255,255,255,0.58)", marginTop: 6 },

    // ✅ كارد الرسم
    chartCard: {
      padding: 16,
      borderRadius: 20,
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.05)",
    },
    chartBox: {
      marginTop: 14,
      height: 260,
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.04)",
      padding: 10,
    },
  };

  // ✅ Tooltip مخصص مثل الصورة
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div
        style={{
          padding: "10px 12px",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(10,14,24,0.86)",
          color: "rgba(255,255,255,0.92)",
          minWidth: 140,
        }}
      >
        <div style={{ fontWeight: 900, marginBottom: 6 }}>{label}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.72)" }}>
          visitors : <span style={{ fontWeight: 900 }}>{payload[0].value}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="page-wrap">
      <div className="page-head">
        <h1 className="page-title">لوحة التحكم</h1>
        <p className="page-sub">بحث + فلاتر + تنبيهات — بشكل مرتب وواضح.</p>
      </div>

      <div className="glass-card" style={{ padding: 16 }}>
        {/* KPI */}
        <div style={styles.topRow}>
          <div style={styles.kpi}>
            <div style={styles.kpiLabel}>زوار اليوم</div>
            <div style={styles.kpiVal("blue")}>{loading ? "—" : "1,284"}</div>
          </div>

          <div style={styles.kpi}>
            <div style={styles.kpiLabel}>تنبيهات</div>
            <div style={styles.kpiVal("red")}>{loading ? "—" : alerts.length}</div>
          </div>

          <div style={styles.kpi}>
            <div style={styles.kpiLabel}>متوسط الانتظار</div>
            <div style={styles.kpiVal("green")}>{loading ? "—" : "4m"}</div>
          </div>
        </div>

        {/* ✅ الرسم فوق */}
        <div className="glass-card" style={styles.chartCard}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <h3 className="card-h" style={{ margin: 0 }}>
                تحليل الزوار لحظياً
              </h3>
              <p className="muted" style={{ marginTop: 6 }}>
                تدفق الزوار خلال اليوم (تفاعلي).
              </p>
            </div>
          </div>

          <div style={styles.chartBox}>
            {loading ? (
              <div className="muted" style={{ padding: "18px 4px" }}>
                جاري تحميل الرسم…
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 8, right: 16, left: 6, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="t" stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.45)" tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(126,180,255,0.35)" }} />
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke="#8FB8FF"
                    strokeWidth={3}
                    dot={{ r: 5, strokeWidth: 2, stroke: "#CFE0FF", fill: "#8FB8FF" }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button className="btn-login btn-ripple" onClick={() => navigate("/demo")}>
              مشاهدة التجربة
            </button>
            <button className="btn-register btn-ripple" onClick={() => navigate("/settings")}>
              الإعدادات
            </button>
          </div>
        </div>

        {/* ✅ تحت الرسم: التنبيهات + نظرة عامة */}
        <div style={{ marginTop: 14, ...styles.main }}>
          {/* يمين/يسار حسب CSS عندك - هنا خليتها مثل ما كانت */}
          <div className="glass-card" style={{ padding: 16 }}>
            <h3 className="card-h" style={{ margin: 0 }}>
              التنبيهات
            </h3>
            <p className="muted" style={{ marginTop: 6 }}>
              ابحث وفلتر حسب الفرع والأولوية.
            </p>

            <div style={styles.filterBar}>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                style={{ ...styles.input, cursor: "pointer" }}
              >
                <option value="all">كل الفروع</option>
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{ ...styles.input, cursor: "pointer" }}
              >
                <option value="all">كل الأولويات</option>
                <option value="high">عالية</option>
                <option value="medium">متوسطة</option>
                <option value="low">منخفضة</option>
              </select>

              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                style={styles.input}
                placeholder="بحث… مثال: العليا / AI / ازدحام"
              />
            </div>

            {loading ? (
              <div className="muted" style={{ padding: "18px 4px" }}>
                جاري تحميل التنبيهات…
              </div>
            ) : filtered.length === 0 ? (
              <div className="muted" style={{ padding: "18px 4px" }}>
                لا توجد نتائج مطابقة.
              </div>
            ) : (
              <div style={styles.list}>
                {filtered.map((a) => (
                  <div key={a.id} style={styles.item}>
                    <div style={styles.badge(a.type)}>{a.type}</div>
                    <div>
                      <div style={styles.title}>
                        {a.title} - فرع {a.branch}
                      </div>
                      <div style={styles.meta}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card" style={{ padding: 16 }}>
            <h3 className="card-h" style={{ margin: 0 }}>
              نظرة عامة
            </h3>
            <p className="muted" style={{ marginTop: 6 }}>
              ملخص سريع لحالة النظام.
            </p>

            <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
              <div style={styles.item}>
                <div style={styles.badge("OK")}>📌</div>
                <div>
                  <div style={styles.title}>مستوى النشاط</div>
                  <div style={styles.meta}>{loading ? "—" : "مستقر"}</div>
                </div>
              </div>

              <div style={styles.item}>
                <div style={styles.badge("OK")}>⏱️</div>
                <div>
                  <div style={styles.title}>آخر تحديث</div>
                  <div style={styles.meta}>{loading ? "—" : "منذ دقيقة"}</div>
                </div>
              </div>

              <div style={styles.item}>
                <div style={styles.badge("AI")}>🟢</div>
                <div>
                  <div style={styles.title}>وضع النظام</div>
                  <div style={styles.meta}>{loading ? "—" : "Live"}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
