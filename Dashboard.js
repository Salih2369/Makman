import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { time: '10am', visitors: 400 },
  { time: '12pm', visitors: 700 },
  { time: '2pm', visitors: 500 },
  { time: '4pm', visitors: 900 },
  { time: '6pm', visitors: 1100 },
  { time: '8pm', visitors: 800 },
];

const Dashboard = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="page-title">تحليلات مكمن الذكية</h1>

      <div className="kpi-grid">
        <div className="kpi-card">
          <h3>زوار اليوم</h3>
          <div className="kpi-value" style={{ color: 'var(--accent-cyan)' }}>1,284</div>
        </div>

        <div className="kpi-card">
          <h3>تنبيهات أمنية</h3>
          <div className="kpi-value" style={{ color: 'var(--danger)' }}>2</div>
        </div>

        <div className="kpi-card">
          <h3>متوسط الانتظار</h3>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>4m</div>
        </div>
      </div>

      <div className="chart-card">
        <h3 style={{ marginBottom: '18px' }}>تدفق الزوار لحظياً</h3>
        <ResponsiveContainer width="100%" height="88%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.10)" />
            <XAxis dataKey="time" stroke="#a0aec0" />
            <YAxis stroke="#a0aec0" />
            <Tooltip contentStyle={{ background: '#0a192f', border: '1px solid var(--accent-cyan)' }} />
            <Line type="monotone" dataKey="visitors" stroke="var(--accent-cyan)" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Dashboard;
