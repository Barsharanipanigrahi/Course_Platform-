import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

/* ══════════════════════════════════════════════════════
   CONFIRMATION MODAL  (self-contained, no extra imports)
══════════════════════════════════════════════════════ */
const ConfirmModal = ({ config, onConfirm, onCancel }) => {
  if (!config) return null;
  const { type, title, message, confirmText, cancelText } = config;

  const isSuccess = type === 'success';
  const accent    = isSuccess ? '#22c55e' : '#f97316';
  const icon      = isSuccess ? '✓' : '↩';

  return (
    <>
      <style>{`
        @keyframes cm-backdrop { from{opacity:0} to{opacity:1} }
        @keyframes cm-pop { from{opacity:0;transform:scale(0.93) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .cm-overlay { position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1.5rem;
          background:rgba(0,0,0,0.72);backdrop-filter:blur(5px);animation:cm-backdrop 0.18s ease; }
        .cm-card { background:#134e4a;border:1px solid rgba(45,212,191,0.2);border-radius:20px;width:100%;max-width:380px;
          overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,0.55);animation:cm-pop 0.22s ease;font-family:'DM Sans',sans-serif; }
        .cm-header { background:#0f2027;padding:1.6rem 1.8rem 1.4rem;text-align:center;border-bottom:1px solid rgba(45,212,191,0.1); }
        .cm-icon { width:52px;height:52px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;
          font-size:1.4rem;font-weight:900;margin-bottom:0.9rem; }
        .cm-title { font-size:1.05rem;font-weight:800;color:#e2faf8;margin:0; }
        .cm-body { padding:1.2rem 1.8rem 1.6rem; }
        .cm-msg { color:rgba(226,250,248,0.65);font-size:0.88rem;line-height:1.7;text-align:center;margin-bottom:1.4rem; }
        .cm-actions { display:flex;gap:10px; }
        .cm-btn { flex:1;padding:10px 0;border-radius:10px;font-size:0.86rem;font-weight:700;cursor:pointer;
          font-family:'DM Sans',sans-serif;border:none;transition:opacity 0.15s,transform 0.15s; }
        .cm-btn:hover { opacity:0.88;transform:translateY(-1px); }
        .cm-cancel { background:rgba(45,212,191,0.08);border:1px solid rgba(45,212,191,0.2) !important;color:rgba(226,250,248,0.6); }
        .cm-confirm { color:#fff; }
      `}</style>

      <div className="cm-overlay" onClick={e => e.target === e.currentTarget && onCancel?.()}>
        <div className="cm-card">
          <div className="cm-header">
            <div className="cm-icon" style={{ background: `${accent}20`, border: `1.5px solid ${accent}40`, color: accent }}>
              {icon}
            </div>
            <p className="cm-title">{title}</p>
          </div>
          <div className="cm-body">
            <p className="cm-msg">{message}</p>
            <div className="cm-actions">
              {cancelText && (
                <button className="cm-btn cm-cancel" onClick={onCancel}>{cancelText}</button>
              )}
              <button
                className="cm-btn cm-confirm"
                style={{ background: accent, boxShadow: `0 4px 16px ${accent}40` }}
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ══════════════════════════════════════════════════════
   AUTH PROVIDER
══════════════════════════════════════════════════════ */
export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(null); // { type, title, message, confirmText, cancelText, onConfirm, onCancel }

  useEffect(() => {
    const storedUser  = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  /* ── helper: show a modal and get a Promise back ── */
  const showModal = (config) =>
    new Promise((resolve) => {
      setModal({
        ...config,
        onConfirm: () => { setModal(null); resolve(true);  },
        onCancel:  () => { setModal(null); resolve(false); },
      });
    });

  /* ── Login ── */
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);

      // Show success confirmation
      await showModal({
        type:        'success',
        title:       'Logged In Successfully!',
        message:     `Welcome back${data.name ? ', ' + data.name : ''}! You're now signed in to your account.`,
        confirmText: 'Continue',
        cancelText:  null, // no cancel for success
      });

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  /* ── Register ── */
  const register = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);

      // Show success confirmation
      await showModal({
        type:        'success',
        title:       'Account Created!',
        message:     `Welcome${data.name ? ', ' + data.name : ''}! Your account has been created successfully.`,
        confirmText: 'Get Started',
        cancelText:  null,
      });

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  /* ── Logout ── */
  const logout = async () => {
    const confirmed = await showModal({
      type:        'logout',
      title:       'Sign Out?',
      message:     'Are you sure you want to log out? You can always sign back in to continue learning.',
      confirmText: 'Yes, Log Out',
      cancelText:  'Stay Logged In',
    });

    if (confirmed) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}

      {/* Modal renders above everything */}
      <ConfirmModal
        config={modal}
        onConfirm={modal?.onConfirm}
        onCancel={modal?.onCancel}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);