import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, setUser, hasPermission } from '../js/auth';

const Settings = () => {
  const navigate = useNavigate();
  const u = getUser();

  const [companyName, setCompanyName] = useState(u?.companyName || '');
  const [email, setEmail] = useState(u?.email || '');
  const [role, setRole] = useState(u?.role || 'manager');
  const [alertsEmail, setAlertsEmail] = useState(u?.alertsEmail ?? true);
  const [alertsWhatsapp, setAlertsWhatsapp] = useState(u?.alertsWhatsapp ?? false);

  const canManageUsers = hasPermission(role, 'manage_users');

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
    navigate('/dashboard');
  };

  return (
    <div className="page-wrap">
      <div className="page-head">
        <h1 className="page-title">الإعدادات</h1>
        <p className="page-sub">إعدادات الشركة والتنبيهات والصلاحيات.</p>
      </div>

      <div className="settings-grid">
        <div className="glass-card">
          <h3 className="card-h">حساب الشركة</h3>

          <form className="auth-form" onSubmit={save}>
            <label className="field-label">اسم الشركة</label>
            <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

            <label className="field-label">البريد</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />

            <label className="field-label">الدور (Role)</label>
            <select className="select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="viewer">Viewer</option>
            </select>

            <div className="toggle-row">
              <label className="toggle">
                <input type="checkbox" checked={alertsEmail} onChange={(e) => setAlertsEmail(e.target.checked)} />
                <span>تنبيهات عبر البريد</span>
              </label>

              <label className="toggle">
                <input type="checkbox" checked={alertsWhatsapp} onChange={(e) => setAlertsWhatsapp(e.target.checked)} />
                <span>تنبيهات WhatsApp</span>
              </label>
            </div>

            <button className="btn-register btn-ripple btn-full" type="submit">حفظ</button>
          </form>
        </div>

        <div className="glass-card">
          <h3 className="card-h">الصلاحيات</h3>
          <p className="muted">
            الدور الحالي: <b className="text-strong">{role}</b>
          </p>

          <div className="perm-list">
            <div className={`perm ${hasPermission(role,'view_dashboard') ? 'on' : 'off'}`}>view_dashboard</div>
            <div className={`perm ${hasPermission(role,'view_settings') ? 'on' : 'off'}`}>view_settings</div>
            <div className={`perm ${hasPermission(role,'export_reports') ? 'on' : 'off'}`}>export_reports</div>
            <div className={`perm ${canManageUsers ? 'on' : 'off'}`}>manage_users</div>
          </div>

          <div className="hint">
            <span className="pill pill-ai">Enterprise</span>
            <span className="muted">جاهز لتطبيق صلاحيات الفرق في النسخة القادمة.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
