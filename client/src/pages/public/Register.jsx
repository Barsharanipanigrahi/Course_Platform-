import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);
    if (result.success) navigate('/profile');
    else setError(result.message);
  };

  const strength = password.length===0?0:password.length<6?1:password.length<10?2:3;
  const strengthColor=['','#ef4444','#f97316','#22c55e'][strength];
  const strengthLabel=['','Weak','Good','Strong'][strength];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        .rg{font-family:'DM Sans',sans-serif;min-height:100vh;background:#f0fdfa;display:flex;align-items:center;justify-content:center;padding:2rem 1.5rem;}
        .rg-wrap{width:100%;max-width:960px;display:grid;grid-template-columns:1fr 1fr;border-radius:22px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.2);}
        @media(max-width:680px){.rg-wrap{grid-template-columns:1fr;}}
        .rg-left{background:#134e4a;padding:3.2rem;display:flex;flex-direction:column;justify-content:center;position:relative;overflow:hidden;}
        .rg-left-bg{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(45,212,191,0.07) 1px,transparent 1px);background-size:22px 22px;}
        .rg-left-glow{position:absolute;width:350px;height:350px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,0.1),transparent 65%);top:-80px;left:-80px;}
        .rg-left-in{position:relative;z-index:1;}
        .rg-left-lbl{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#2dd4bf;margin-bottom:0.8rem;}
        .rg-left-title{font-family:'Playfair Display',serif;font-size:2.1rem;font-weight:900;color:#fff;line-height:1.12;margin-bottom:0.9rem;}
        .rg-left-title span{color:#f97316;}
        .rg-left-sub{color:rgba(255,255,255,0.5);font-size:0.9rem;line-height:1.75;margin-bottom:2.2rem;}
        .rg-perks{display:flex;flex-direction:column;gap:10px;}
        .rg-perk{display:flex;align-items:center;gap:9px;font-size:0.86rem;color:rgba(255,255,255,0.65);}
        .rg-perk-ic{color:#2dd4bf;flex-shrink:0;}
        @media(max-width:680px){.rg-left{display:none;}}
        .rg-right{background:#fff;padding:3.2rem;display:flex;flex-direction:column;justify-content:center;}
        .rg-form-title{font-family:'Playfair Display',serif;font-size:1.75rem;font-weight:900;color:#0f2027;margin-bottom:0.3rem;}
        .rg-form-sub{color:#6b7280;font-size:0.86rem;margin-bottom:1.8rem;}
        .rg-err{background:rgba(239,68,68,0.07);border:1px solid rgba(239,68,68,0.22);color:#dc2626;padding:10px 13px;border-radius:8px;font-size:0.85rem;margin-bottom:1rem;}
        .rg-field{margin-bottom:1rem;}
        .rg-lbl{display:block;font-size:0.78rem;font-weight:600;color:#0f2027;margin-bottom:5px;}
        .rg-inp-wrap{position:relative;}
        .rg-inp{width:100%;padding:11px 15px;border:1.5px solid rgba(45,212,191,0.35);border-radius:8px;font-size:0.9rem;font-family:'DM Sans',sans-serif;color:#0f2027;background:#fff;outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
        .rg-inp:focus{border-color:#0d9488;box-shadow:0 0 0 3px rgba(13,148,136,0.1);}
        .rg-inp::placeholder{color:#d1d5db;}
        .rg-pw-btn{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#9ca3af;display:flex;align-items:center;transition:color 0.2s;}
        .rg-pw-btn:hover{color:#0d9488;}
        .rg-str-bar{display:flex;gap:4px;margin-top:6px;}
        .rg-str-seg{height:3px;flex:1;border-radius:100px;background:rgba(45,212,191,0.15);transition:background 0.3s;}
        .rg-submit{width:100%;padding:12px;background:#f97316;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.93rem;font-weight:700;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:7px;transition:background 0.2s,transform 0.2s;box-shadow:0 4px 14px rgba(249,115,22,0.35);margin-top:0.6rem;}
        .rg-submit:hover:not(:disabled){background:#ea6c0a;transform:translateY(-2px);}
        .rg-submit:disabled{opacity:0.6;cursor:not-allowed;}
        .rg-foot{margin-top:1.4rem;text-align:center;font-size:0.86rem;color:#6b7280;}
        .rg-foot a{color:#0d9488;font-weight:600;text-decoration:none;}
        .rg-foot a:hover{text-decoration:underline;}
      `}</style>
      <div className="rg">
        <div className="rg-wrap">
          <div className="rg-left">
            <div className="rg-left-bg"/><div className="rg-left-glow"/>
            <div className="rg-left-in">
              <div className="rg-left-lbl">Join us today</div>
              <h2 className="rg-left-title">Start Your <span>Learning</span> Journey</h2>
              <p className="rg-left-sub">Create a free account and get instant access to 120+ expert courses, live classes, and career support.</p>
              <div className="rg-perks">
                {["Free access to starter courses","Live classes & Q&A sessions","Industry-recognized certificates","1-on-1 mentor sessions","Career placement assistance"].map((t,i)=>(
                  <div className="rg-perk" key={i}><CheckCircle2 size={15} className="rg-perk-ic"/>{t}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="rg-right">
            <div className="rg-form-title">Create Account</div>
            <div className="rg-form-sub">Join thousands of learners today — it's free</div>
            {error && <div className="rg-err">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="rg-field"><label className="rg-lbl">Full Name</label><input className="rg-inp" type="text" placeholder="John Doe" value={name} onChange={e=>setName(e.target.value)} required/></div>
              <div className="rg-field"><label className="rg-lbl">Email Address</label><input className="rg-inp" type="email" placeholder="john@example.com" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
              <div className="rg-field">
                <label className="rg-lbl">Password</label>
                <div className="rg-inp-wrap">
                  <input className="rg-inp" type={showPw?"text":"password"} placeholder="Create a strong password" value={password} onChange={e=>setPassword(e.target.value)} required style={{paddingRight:'42px'}}/>
                  <button type="button" className="rg-pw-btn" onClick={()=>setShowPw(!showPw)}>{showPw?<EyeOff size={16}/>:<Eye size={16}/>}</button>
                </div>
                {password.length>0&&(
                  <div>
                    <div className="rg-str-bar">{[1,2,3].map(n=><div key={n} className="rg-str-seg" style={{background:n<=strength?strengthColor:undefined}}/>)}</div>
                    <div style={{fontSize:'0.72rem',color:strengthColor,marginTop:3,fontWeight:600}}>{strengthLabel}</div>
                  </div>
                )}
              </div>
              <button type="submit" className="rg-submit" disabled={loading}>{loading?"Creating account...":<><span>Create Account</span><ArrowRight size={14}/></>}</button>
            </form>
            <div className="rg-foot">Already have an account? <Link to="/login">Login here</Link></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;