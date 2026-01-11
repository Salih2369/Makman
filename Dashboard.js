import React, { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { SkeletonBox, SkeletonText } from '../components/Skeleton';
import { getUser, getFeatureFlags, hasPermission } from '../js/auth';

const chartData = [
  { time: '10am', visitors: 400 }, { time: '12pm', visitors: 700 },
  { time: '2pm', visitors: 500 }, { time: '4pm', visitors: 900 },
  { time: '6pm', visitors: 1100 }, { time: '8pm', visitors: 800 },
];

const seedAlerts = [
  { id: 1, branch: 'العليا', type: 'high', label: 'AI', title: 'نشاط غير اعتيادي', time: 'قبل 2 د' },
  { id: 2, branch: 'النخيل', type: 'med', label: 'OK', title: 'ازدحام متوسط', time: 'قبل 8 د' },
  { id: 3, branch: 'الملز', type: 'low', label: 'OK', title: 'حركة طبيعية', time: 'قبل 14 د' },
  { id: 4, branch: 'العليا', type: 'med', label: 'AI', title: 'تغير مفاجئ في التدفق', time: 'قبل 22 د' },
];

const Dashboard = () => {
  const u = getUser();
  const flags = getFeatureFlags();
  const role = u?.role || 'viewer';

  const [loading, setLoading] = useState(true);

  const [branch, setBranch] = useState('all');
  const [priority, setPriority] = useState('all');
  const [q, setQ] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650); // skeleton shimmer
    return () => clearTimeout(t);
  }, []);

  const branches = useMemo(() => {
    const s = new Set(seedAlerts.map(a => a.branch));
    return ['all', ...Array.from(s)];
  }, []);

  const filteredAlerts = useMemo(() => {
    return seedAlerts
      .filter(a => branch === 'all' ? true : a.branch === branch)
      .filter(a => priority === 'all' ? true : a.type === priority)
      .filter(a => (a.title + ' ' + a.branch).toLowerCase().includes(q.toLowerCase().trim()));
  }, [branch, priority, q]);

  const canExport = hasPermission(role, 'export_reports');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-wrap">
      <div className="page-head">
        <div>
          <h1 className="page-title">لوحة التحكم</h1>
          <p className="page-sub">
            {u?.companyName ? `مرحباً ${u.companyName}` : 'تحليلات مكمن الذكية'} •
            <span className="muted"> الدور: {role}</span>
          </p>
        </div>

        <div className="dash-actions">
          {canExport && (
            <button className="btn-login btn-ripple">تصدير تقرير</button>
          )}
          <button className="btn-register btn-ripple">إنشاء تنبيه تجريبي</button>
        </div>
      </div>

      {/* KPI */}
      <div className="kpi-grid">
        {loading ? (
          <>
            <div className="kpi-card"><SkeletonText lines={2} /><SkeletonBox style={{ height: 44, marginTop: 10 }} /></div>
            <div className="kpi-card"><SkeletonText lines={2} /><SkeletonBox style={{ height: 44, marginTop: 10 }} /></div>
            <div className="kpi-card"><SkeletonText lines={2} /><SkeletonBox style={{ height: 44, marginTop: 10 }} /></div>
          </>
        ) : (
          <>
            <div className="kpi-card">
              <h3>زوار اليوم</h3>
              <div className="kpi-value">1,284</div>
            </div>
            <div className="kpi-card">
              <h3>تنبيهات أمنية</h3>
              <div className="kpi-value kpi-danger">2</div>
            </div>
            <div className="kpi-card">
              <h3>متوسط الانتظار</h3>
              <div className="kpi-value kpi-ok">4m</div>
            </div>
          </>
        )}
      </div>

      {/* Chart */}
      <div className="chart-card glass-card">
        {loading ? (
          <>
            <SkeletonText lines={2} />
            <SkeletonBox style={{ height: 290, marginTop: 14 }} />
          </>
        ) : (
          <>
            <h3 className="card-h">تدفق الزوار لحظياً</h3>
            <div style={{ height: 340, marginTop: 12 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.10)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.65)" />
                  <YAxis stroke="rgba(255,255,255,0.65)" />
                  <Tooltip contentStyle={{ background: 'rgba(10,17,32,0.96)', border: '1px solid rgba(99,179,237,0.35)' }} />
                  <Line type="monotone" dataKey="visitors" stroke="var(--accent-cyan)" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>

      {/* Alerts module with search + filters */}
      {flags.alerts && (
        <div className="glass-card alerts-card">
          <div className="alerts-head">
            <div>
              <h3 className="card-h">التنبيهات</h3>
              <p className="muted">ابحث وفلتر حسب الفرع والأولوية.</p>
            </div>

            <div className="filters">
              <select className="select" value={branch} onChange={(e) => setBranch(e.target.value)}>
                {branches.map(b => <option key={b} value={b}>{b === 'all' ? 'كل الفروع' : b}</option>)}
              </select>

              <select className="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="all">كل الأولويات</option>
                <option value="high">عالية</option>
                <option value="med">متوسطة</option>
                <option value="low">منخفضة</option>
              </select>

              <input
                className="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="بحث..."
              />
            </div>
          </div>

          {loading ? (
            <div className="alerts-list">
              <div className="alert-row"><SkeletonBox style={{ width: 44, height: 28, borderRadius: 999 }} /><SkeletonBox style={{ height: 18, width: '60%' }} /><SkeletonBox style={{ height: 14, width: 90 }} /></div>
              <div className="alert-row"><SkeletonBox style={{ width: 44, height: 28, borderRadius: 999 }} /><SkeletonBox style={{ height: 18, width: '45%' }} /><SkeletonBox style={{ height: 14, width: 90 }} /></div>
              <div className="alert-row"><SkeletonBox style={{ width: 44, height: 28, borderRadius: 999 }} /><SkeletonBox style={{ height: 18, width: '52%' }} /><SkeletonBox style={{ height: 14, width: 90 }} /></div>
            </div>
          ) : (
            <div className="alerts-list">
              {filteredAlerts.length === 0 ? (
                <div className="muted">لا توجد نتائج.</div>
              ) : (
                filteredAlerts.map(a => (
                  <div key={a.id} className="alert-row">
                    <span className={`alert-pill ${a.label === 'OK' ? 'ok' : ''}`}>{a.label}</span>
                    <div className="alert-main">
                      <div className="alert-title">{a.title} - فرع {a.branch}</div>
                      <div className="alert-meta">{a.type === 'high' ? 'أولوية عالية' : a.type === 'med' ? 'أولوية متوسطة' : 'أولوية منخفضة'}</div>
                    </div>
                    <div className="alert-time">{a.time}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
