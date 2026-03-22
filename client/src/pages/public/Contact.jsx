import React, { useState } from "react";
import axios from "axios";
import { Linkedin, Facebook, Send, MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, seteMessage] = useState("");
  const [sending, setSending] = useState(false);
  const url = import.meta.env.VITE_BACKEND_URL;

  const handelSubmit = async () => {
    setSending(true);
    try {
      const res = await axios.post(url + "/contact/add", { name, email, phone, message });
      if (res?.data?.status) { alert(res?.data?.message); setname(""); setemail(""); setPhone(""); seteMessage(""); }
      else alert("Something went wrong");
    } catch (err) { console.log(err); }
    finally { setSending(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        .ct{font-family:'DM Sans',sans-serif;background:#0d3d39;}
        .ct-hero{background:#0f2027;padding:7rem 1.5rem 5.5rem;position:relative;overflow:hidden;}
        .ct-hero-bg{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(249,115,22,0.05) 1px,transparent 1px);background-size:28px 28px;}
        .ct-hero-glow{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,0.1),transparent 65%);top:-100px;right:-100px;}
        .ct-hero-in{position:relative;z-index:1;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
        @media(max-width:800px){.ct-hero-in{grid-template-columns:1fr;}}
        .ct-lbl{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#f97316;margin-bottom:0.8rem;}
        .ct-hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.8rem,6vw,4.4rem);font-weight:900;color:#fff;line-height:1.06;margin-bottom:1.1rem;}
        .ct-hero-title span{color:#f97316;}
        .ct-hero-sub{font-size:1rem;color:rgba(255,255,255,0.5);line-height:1.75;}
        .ct-info-card{background:#134e4a;border:1px solid rgba(45,212,191,0.25);border-radius:18px;padding:1.8rem;}
        .ct-info-item{display:flex;align-items:center;gap:13px;padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:0.9rem;color:rgba(255,255,255,0.6);}
        .ct-info-item:last-child{border-bottom:none;}
        .ct-info-ic{width:36px;height:36px;background:rgba(45,212,191,0.12);border-radius:9px;display:flex;align-items:center;justify-content:center;color:#2dd4bf;flex-shrink:0;}
        .ct-info-lbl{font-size:0.68rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#2dd4bf;margin-bottom:1px;}
        .ct-info-val{color:#fff;font-size:0.9rem;}
        .ct-main{padding:5rem 1.5rem;background:#0d3d39;}
        .ct-main-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;}
        @media(max-width:800px){.ct-main-in{grid-template-columns:1fr;}}
        .ct-form-card{background:#134e4a;border:1px solid rgba(45,212,191,0.2);border-radius:18px;padding:2.2rem;box-shadow:0 4px 22px rgba(0,0,0,0.3);}
        .ct-form-title{font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:800;color:#f0fdfa;margin-bottom:0.3rem;}
        .ct-form-sub{color:rgba(255,255,255,0.5);font-size:0.87rem;margin-bottom:1.8rem;}
        .ct-field{margin-bottom:1rem;}
        .ct-lbl2{display:block;font-size:0.78rem;font-weight:600;color:#2dd4bf;margin-bottom:5px;}
        .ct-input{width:100%;padding:11px 15px;border:1.5px solid rgba(45,212,191,0.25);border-radius:8px;font-size:0.9rem;font-family:'DM Sans',sans-serif;color:#f0fdfa;background:rgba(255,255,255,0.06);outline:none;transition:border-color 0.2s,box-shadow 0.2s;}
        .ct-input:focus{border-color:#0d9488;box-shadow:0 0 0 3px rgba(13,148,136,0.1);}
        .ct-input::placeholder{color:#d1d5db;}
        .ct-textarea{resize:vertical;min-height:110px;}
        .ct-submit{width:100%;padding:12px;background:#f97316;color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:0.93rem;font-weight:700;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:7px;transition:background 0.2s,transform 0.2s;box-shadow:0 4px 14px rgba(249,115,22,0.35);}
        .ct-submit:hover:not(:disabled){background:#ea6c0a;transform:translateY(-2px);}
        .ct-submit:disabled{opacity:0.6;cursor:not-allowed;}
        .ct-test-lbl{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#2dd4bf;margin-bottom:0.5rem;}
        .ct-test-title{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,2.5vw,2.1rem);font-weight:800;color:#f0fdfa;margin-bottom:1.8rem;}
        .ct-test-list{display:flex;flex-direction:column;gap:1rem;}
        .ct-test-card{background:#134e4a;border:1px solid rgba(45,212,191,0.2);border-radius:13px;padding:1.3rem;transition:transform 0.2s,box-shadow 0.2s;}
        .ct-test-card:hover{transform:translateY(-3px);box-shadow:0 10px 26px rgba(0,0,0,0.3);}
        .ct-test-msg{font-size:0.9rem;color:rgba(255,255,255,0.55);line-height:1.7;margin-bottom:0.9rem;font-style:italic;}
        .ct-test-author{display:flex;align-items:center;gap:10px;}
        .ct-test-img{width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid #2dd4bf;}
        .ct-test-name{font-weight:700;font-size:0.86rem;color:#f0fdfa;}
        .ct-test-role{font-size:0.75rem;color:rgba(255,255,255,0.4);}
        .ct-social-sec{background:#0f2027;padding:3.5rem 1.5rem;text-align:center;}
        .ct-social-in{max-width:480px;margin:0 auto;}
        .ct-social-lbl{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#f97316;margin-bottom:0.6rem;}
        .ct-social-title{font-family:'Playfair Display',serif;font-size:1.7rem;font-weight:800;color:#fff;margin-bottom:1.6rem;}
        .ct-social-row{display:flex;justify-content:center;gap:13px;}
        .ct-soc{width:46px;height:46px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:18px;text-decoration:none;transition:transform 0.2s,background 0.2s;border:1px solid rgba(45,212,191,0.15);}
        .ct-soc:hover{transform:translateY(-3px);}
        .ct-soc-wa{background:rgba(37,211,102,0.12);color:#25d366;}
        .ct-soc-li{background:rgba(45,212,191,0.1);color:#2dd4bf;}
        .ct-soc-fb{background:rgba(45,212,191,0.1);color:#2dd4bf;}
        .ct-soc-tg{background:rgba(45,212,191,0.1);color:#2dd4bf;}
      `}</style>
      <div className="ct">
        <section className="ct-hero">
          <div className="ct-hero-bg"/><div className="ct-hero-glow"/>
          <div className="ct-hero-in">
            <div>
              <div className="ct-lbl">Get In Touch</div>
              <h1 className="ct-hero-title">Contact <span>Us</span></h1>
              <p className="ct-hero-sub">Bridging the communication gap between us is the first step to collaborate. We'd love to support your learning journey.</p>
            </div>
            <div className="ct-info-card">
              {[
                {icon:<Mail size={16}/>,lbl:"Email",val:"panigrahibarsharani20@gmail.com"},
                {icon:<Phone size={16}/>,lbl:"Phone",val:"+91 98765 43210"},
                {icon:<MapPin size={16}/>,lbl:"Location",val:"Bhubaneswar, India"},
              ].map((it,i)=>(
                <div className="ct-info-item" key={i}>
                  <div className="ct-info-ic">{it.icon}</div>
                  <div><div className="ct-info-lbl">{it.lbl}</div><div className="ct-info-val">{it.val}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="ct-main">
          <div className="ct-main-in">
            <div className="ct-form-card">
              <div className="ct-form-title">Send a Message</div>
              <div className="ct-form-sub">Fill in the form and we'll get back to you within 24 hours.</div>
              <div className="ct-field"><label className="ct-lbl2">Your Name</label><input className="ct-input" type="text" placeholder="John Doe" value={name} onChange={e=>setname(e.target.value)}/></div>
              <div className="ct-field"><label className="ct-lbl2">Email Address</label><input className="ct-input" type="email" placeholder="john@example.com" value={email} onChange={e=>setemail(e.target.value)}/></div>
              <div className="ct-field"><label className="ct-lbl2">Phone Number</label><input className="ct-input" type="text" placeholder="+91 00000 00000" value={phone} onChange={e=>setPhone(e.target.value)}/></div>
              <div className="ct-field"><label className="ct-lbl2">Message</label><textarea className="ct-input ct-textarea" placeholder="Write your message..." value={message} onChange={e=>seteMessage(e.target.value)}/></div>
              <button className="ct-submit" onClick={handelSubmit} disabled={sending}>{sending?"Sending...":(<><Send size={14}/> Send Message</>)}</button>
            </div>
            <div>
              <div className="ct-test-lbl">Testimonials</div>
              <div className="ct-test-title">What Our Clients Say</div>
              <div className="ct-test-list">
                {[
                  {name:"Amit Sharma",role:"Institute Director",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAkopE5KuSrJ9qEoDuJDdNq-fB5WGloW9c2Q&s",msg:"This platform completely transformed how we manage courses and students. Simple, powerful, and reliable!"},
                  {name:"Priya Verma",role:"Online Educator",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuDP407tSUJIFX1F07FjMhrARq-oKKHfXvTg&s",msg:"The live classes and analytics helped me scale my teaching easily. Incredibly smooth experience."},
                  {name:"Rahul Das",role:"HR Manager",img:"https://thumbs.dreamstime.com/b/mature-businessman-office-working-computer-reviewing-documents-analyzing-data-desk-cup-coffee-professional-401881586.jpg",msg:"A robust platform that allows institutions to create, host, and deliver educational content with ease."},
                ].map((t,i)=>(
                  <div className="ct-test-card" key={i}>
                    <div className="ct-test-msg">"{t.msg}"</div>
                    <div className="ct-test-author"><img src={t.img} alt={t.name} className="ct-test-img"/><div><div className="ct-test-name">{t.name}</div><div className="ct-test-role">{t.role}</div></div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="ct-social-sec">
          <div className="ct-social-in">
            <div className="ct-social-lbl">Connect With Us</div>
            <div className="ct-social-title">Find Us Online</div>
            <div className="ct-social-row">
              <a href="https://wa.me/916372301256" target="_blank" rel="noreferrer" className="ct-soc ct-soc-wa"><FaWhatsapp/></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="ct-soc ct-soc-li"><Linkedin size={17}/></a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="ct-soc ct-soc-fb"><Facebook size={17}/></a>
              <a href="https://t.me" target="_blank" rel="noreferrer" className="ct-soc ct-soc-tg"><Send size={16}/></a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Contact;