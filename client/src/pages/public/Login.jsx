import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      const user = JSON.parse(localStorage.getItem('user'));
      navigate(user?.role === 'admin' ? '/admin' : '/profile');
    } else { setError(result.message); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        .lg{font-family:'DM Sans',sans-serif;min-height:100vh;background:#f0fdfa;display:flex;align-items:center;justify-content:center;padding:2rem 1.5rem;}
        .lg-wrap{width:100%;max-width:960px;display:grid;grid-template-columns:1fr 1fr;border-radius:22px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.2);}
        @media(max-width:680px){.lg-wrap{grid-template-columns:1fr;}}
        .lg-left{background:#0f2027;padding:3.2rem;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;}
        .lg-left-bg{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(249,115,22,0.06) 1px,transparent 1px);background-size:22px 22px;}
        .lg-left-glow{position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(45,212,191,0.1),transparent 65%);bottom:-80px;right:-80px;}
        .lg-left-in{position:relative;z-index:1;}
        .lg-left-lbl{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#f97316;margin-bottom:0.8rem;}
        .lg-left-title{font-family:'Playfair Display',serif;font-size:2.3rem;font-weight:900;color:#fff;line-height:1.1;margin-bottom:0.9rem;}
        .lg-left-title span{color:#f97316;}
        .lg-left-sub{color:rgba(255,255,255,0.45);font-size:0.92rem;line-height:1.75;margin-bottom:2.2rem;}
        .lg-pts{display:flex;flex-direction:column;gap:9px;}
        .lg-pt{display:flex;align-items:center;gap:9px;font-size:0.86rem;color:rgba(255,255,255,0.55);}
        .lg-pt-dot{width:5px;height:5px;border-radius:50%;background:#f97316;flex-shrink:0;}
        @media(max-width:680px){.lg-left{display:none;}}
        .lg-right{background:#fff;padding:3.2rem;display:flex;flex-direction:column;justify-content:center;}
        .lg-form-title{font-family:'Playfair Display',serif;font-size:1.75rem;font-weight:900;color:#0f2027;margin-bottom:0.3rem;}
        .lg-form-sub{color:#6b7280;font-size:0.86rem;margin-bottom:1.8rem;}
        .lg-err{background:rgba(239,68,68,0.07);border:1px solid rgba(239,68,68,0.22);color:#dc2626;padding:10px 13px;border-radius:8px;font-size:0.85rem;margin-bottom:1rem;}
        .lg-field{margin-bottom:1.1rem;}
        .lg-lbl{display:block;font-size:0.78rem;font-weight:600;color:#0f2027;margin-bottom:5px;}
        .lg-inp-wrap{position:relative;}
        .lg-inp{width:100%;padding:11px 15px;border:1.5px solid rgba(45,212,191,0.35);border-radius:8px;font-size:0.9rem;font-family:'DM Sans',sans-serif;color:#0f2027;background:#fff;outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
        .lg-inp:focus{border-color:#0d9488;box-shadow:0 0 0 3px rgba(13,148,136,0.1);}
        .lg-inp::placeholder{color:#d1d5db;}
        .lg-pw-btn{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9ca3af;display:flex;align-items:center;transition:color 0.2s;}
        .lg-pw-btn:hover{color:#0d9488;}
        .lg-submit{width:100%;padding:12px;background:#f97316;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.93rem;font-weight:700;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:7px;transition:background 0.2s,transform 0.2s;box-shadow:0 4px 14px rgba(249,115,22,0.35);margin-top:0.4rem;}
        .lg-submit:hover:not(:disabled){background:#ea6c0a;transform:translateY(-2px);}
        .lg-submit:disabled{opacity:0.6;cursor:not-allowed;}
        .lg-foot{margin-top:1.4rem;text-align:center;font-size:0.86rem;color:#6b7280;}
        .lg-foot a{color:#0d9488;font-weight:600;text-decoration:none;}
        .lg-foot a:hover{text-decoration:underline;}
      `}</style>
      <div className="lg">
        <div className="lg-wrap">
          <div className="lg-left">
            <div className="lg-left-bg"/><div className="lg-left-glow"/>
            <div className="lg-left-in">
              <div className="lg-left-lbl">Welcome back</div>
              <h2 className="lg-left-title">Learn.<br/><span>Grow.</span><br/>Succeed.</h2>
              <p className="lg-left-sub">Sign in to continue your learning journey and pick up right where you left off.</p>
              <div className="lg-pts">
                {["Access 120+ expert courses","Track your learning progress","Earn industry certificates","Get career support"].map((t,i)=>(
                  <div className="lg-pt" key={i}><span className="lg-pt-dot"/>{t}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg-right">
            <div className="lg-form-title">Welcome Back</div>
            <div className="lg-form-sub">Sign in to your account to continue</div>
            {error && <div className="lg-err">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="lg-field"><label className="lg-lbl">Email Address</label><input className="lg-inp" type="email" placeholder="john@example.com" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
              <div className="lg-field">
                <label className="lg-lbl">Password</label>
                <div className="lg-inp-wrap">
                  <input className="lg-inp" type={showPw?"text":"password"} placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required style={{paddingRight:'42px'}}/>
                  <button type="button" className="lg-pw-btn" onClick={()=>setShowPw(!showPw)}>{showPw?<EyeOff size={16}/>:<Eye size={16}/>}</button>
                </div>
              </div>
              <button type="submit" className="lg-submit" disabled={loading}>{loading?"Signing in...":<><span>Sign In</span><ArrowRight size={14}/></>}</button>
            </form>
            <div className="lg-foot">Don't have an account? <Link to="/register">Register here</Link></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;