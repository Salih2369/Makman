const TOKEN_KEY = 'makman_token';
const USER_KEY = 'makman_user';
const THEME_KEY = 'makman_theme';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Feature Flags (Enterprise vibe)
 * - demo: enable demo route
 * - settings: enable settings page
 * - alerts: enable alerts module
 * - exportReports: enable export button
 */
export const getFeatureFlags = () => ({
  demo: true,
  settings: true,
  alerts: true,
  exportReports: true,
});

/**
 * Permissions (Role-based)
 * roles: admin, manager, viewer
 */
export const hasPermission = (role, action) => {
  const map = {
    admin: ['view_dashboard', 'view_settings', 'manage_users', 'export_reports'],
    manager: ['view_dashboard', 'view_settings', 'export_reports'],
    viewer: ['view_dashboard'],
  };
  return (map[role] || []).includes(action);
};

/** Theme */
export const getTheme = () => localStorage.getItem(THEME_KEY) || 'dark';

export const setTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.setAttribute('data-theme', theme);
};

export const initTheme = () => {
  const theme = getTheme();
  document.documentElement.setAttribute('data-theme', theme);
};
