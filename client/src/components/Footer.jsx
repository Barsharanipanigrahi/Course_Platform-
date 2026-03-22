import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Linkedin, Facebook, Send, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const { user } = useAuth();
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        .ft{font-family:'DM Sans',sans-serif;}
        .ft-cta{background:#134e4a;padding:4.5rem 1.5rem;text-align:center;position:relative;overflow:hidden;}
        .ft-cta-dot{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(249,115,22,0.08) 1px,transparent 1px);background-size:20px 20px;}
        .ft-cta-ring{position:absolute;border-radius:50%;border:1px solid rgba(45,212,191,0.08);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;}
        .ft-cta-in{position:relative;z-index:1;max-width:540px;margin:0 auto;}
        .ft-cta-lbl{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#f97316;margin-bottom:0.7rem;}
        .ft-cta-title{font-family:'Playfair Display',serif;font-size:clamp(1.9rem,4vw,2.8rem);font-weight:900;color:#fff;line-height:1.1;margin-bottom:0.9rem;}
        .ft-cta-title span{color:#f97316;}
        .ft-cta-sub{font-size:0.94rem;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:1.8rem;}
        .ft-cta-btn{display:inline-flex;align-items:center;gap:8px;background:#f97316;color:#fff;padding:12px 26px;border-radius:9px;font-weight:700;font-size:0.9rem;text-decoration:none;border:none;cursor:pointer;transition:background 0.2s,transform 0.2s;box-shadow:0 4px 16px rgba(249,115,22,0.4);font-family:'DM Sans',sans-serif;}
        .ft-cta-btn:hover{background:#ea6c0a;transform:translateY(-2px);}
        .ft-body{background:#0f2027;padding:3rem 1.5rem 0;border-top:1px solid rgba(45,212,191,0.08);}
        .ft-body-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1.4fr;gap:2.5rem;padding-bottom:2.5rem;border-bottom:1px solid rgba(45,212,191,0.06);}
        @media(max-width:900px){.ft-body-in{grid-template-columns:1fr 1fr;gap:2rem;}}
        @media(max-width:540px){.ft-body-in{grid-template-columns:1fr;}}
        .ft-brand-logo{font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:900;color:#fff;margin-bottom:0.9rem;}
        .ft-brand-logo span{color:#f97316;}
        .ft-brand-desc{font-size:0.85rem;color:rgba(255,255,255,0.35);line-height:1.7;margin-bottom:1.3rem;max-width:260px;}
        .ft-socials{display:flex;gap:9px;}
        .ft-soc{width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;transition:transform 0.2s,background 0.2s;text-decoration:none;border:1px solid rgba(45,212,191,0.12);}
        .ft-soc:hover{transform:translateY(-2px);}
        .ft-soc-wa{background:rgba(37,211,102,0.12);color:#25d366;}
        .ft-soc-li{background:rgba(45,212,191,0.1);color:#2dd4bf;}
        .ft-soc-fb{background:rgba(45,212,191,0.1);color:#2dd4bf;}
        .ft-soc-tg{background:rgba(45,212,191,0.1);color:#2dd4bf;}
        .ft-col-title{font-size:0.68rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#f97316;margin-bottom:1.1rem;}
        .ft-links{list-style:none;display:flex;flex-direction:column;gap:9px;}
        .ft-lnk{font-size:0.85rem;color:rgba(255,255,255,0.35);text-decoration:none;transition:color 0.2s;display:flex;align-items:center;gap:6px;}
        .ft-lnk:hover{color:#fff;}
        .ft-lnk-dot{width:3px;height:3px;border-radius:50%;background:rgba(45,212,191,0.35);flex-shrink:0;}
        .ft-contact-item{display:flex;align-items:flex-start;gap:9px;font-size:0.84rem;color:rgba(255,255,255,0.35);margin-bottom:11px;line-height:1.5;}
        .ft-contact-ic{width:26px;height:26px;border-radius:6px;background:rgba(249,115,22,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#f97316;}
        .ft-bottom{max-width:1200px;margin:0 auto;padding:1.3rem 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;}
        .ft-copy{font-size:0.75rem;color:rgba(255,255,255,0.18);}
        .ft-btm-links{display:flex;gap:1.4rem;}
        .ft-btm-lnk{font-size:0.75rem;color:rgba(255,255,255,0.22);text-decoration:none;transition:color 0.2s;}
        .ft-btm-lnk:hover{color:#fff;}
      `}</style>
      <footer className="ft">
        <div className="ft-cta">
          <div className="ft-cta-dot"/>
          <div className="ft-cta-ring" style={{width:'380px',height:'380px'}}/>
          <div className="ft-cta-ring" style={{width:'560px',height:'560px'}}/>
          <div className="ft-cta-in">
            <div className="ft-cta-lbl">Ready to begin?</div>
            <h2 className="ft-cta-title">Start Learning <span>Today</span></h2>
            <p className="ft-cta-sub">Join thousands of learners upgrading their skills and building the careers they want.</p>
            {!user && <Link to="/register" className="ft-cta-btn">Create Free Account <ArrowRight size={14}/></Link>}
          </div>
        </div>
        <div className="ft-body">
          <div className="ft-body-in">
            <div>
              <div className="ft-brand-logo">Edu<span>Learn</span></div>
              <p className="ft-brand-desc">An online learning platform helping students grow their skills, earn certifications, and build better careers.</p>
              <div className="ft-socials">
                <a href="https://wa.me/916372301256" target="_blank" rel="noreferrer" className="ft-soc ft-soc-wa"><FaWhatsapp/></a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="ft-soc ft-soc-li"><Linkedin size={14}/></a>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="ft-soc ft-soc-fb"><Facebook size={14}/></a>
                <a href="https://t.me" target="_blank" rel="noreferrer" className="ft-soc ft-soc-tg"><Send size={13}/></a>
              </div>
            </div>
            <div>
              <div className="ft-col-title">Quick Links</div>
              <ul className="ft-links">
                {[['/', 'Home'],['/about','About Us'],['/course','Courses'],['/contact','Contact']].map(([to,label])=>(
                  <li key={to}><Link to={to} className="ft-lnk"><span className="ft-lnk-dot"/>{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="ft-col-title">Courses</div>
              <ul className="ft-links">
                {['Web Development','React & Frontend','Backend Node.js','Python','UI / UX Design'].map(c=>(
                  <li key={c}><Link to="/course" className="ft-lnk"><span className="ft-lnk-dot"/>{c}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="ft-col-title">Contact Us</div>
              <div className="ft-contact-item"><div className="ft-contact-ic"><Mail size={12}/></div>panigrahibarsharani20@gmail.com</div>
              <div className="ft-contact-item"><div className="ft-contact-ic"><Phone size={12}/></div>+91 6372301256</div>
              <div className="ft-contact-item"><div className="ft-contact-ic"><MapPin size={12}/></div>Bhubaneswar, India</div>
            </div>
          </div>
          <div className="ft-bottom">
            <div className="ft-copy">© {new Date().getFullYear()} EduLearn. All rights reserved.</div>
            <div className="ft-btm-links">
              <a href="#" className="ft-btm-lnk">Privacy Policy</a>
              <a href="#" className="ft-btm-lnk">Terms of Service</a>
              <a href="#" className="ft-btm-lnk">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;