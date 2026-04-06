import React, { useState } from "react";
import api from "../../services/api";
import { Linkedin, MapPin, Phone, Mail, MessageCircle, Send, Clock, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Contact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, seteMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handelSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please fill in Name, Email and Message fields.");
      return;
    }
    setSending(true);
    try {
      const res = await api.post("/contact/add", { name, email, phone, message });
      if (res?.data?.status) {
        alert(res?.data?.message || "Message sent successfully!");
        setname(""); setemail(""); setPhone(""); seteMessage("");
      } else {
        alert(res?.data?.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      if (err.response) {
        alert(`Server error: ${err.response.data?.message || err.response.status}`);
      } else if (err.request) {
        alert("Network error — could not reach the server. Please check your connection.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setSending(false);
    }
  };

  const pills = [
    { icon: <Mail size={16} />, lbl: "Email", val: "panigrahibarsharani20@gmail.com", href: "mailto:panigrahibarsharani20@gmail.com?subject=Enquiry from Website&body=Hi, I wanted to reach out regarding..." },
    { icon: <Phone size={16} />, lbl: "Phone", val: "+91 6372301256", href: "tel:+916372301256" },
    { icon: <FaWhatsapp size={16} />, lbl: "WhatsApp", val: "+91 6372301256", href: "https://wa.me/916372301256" },
    { icon: <MapPin size={16} />, lbl: "Location", val: "Bhubaneswar, India", href: null },
  ];

  const testimonials = [
    {
      name: "Amit Sharma", role: "Institute Director", accentClass: "ct-accent-orange",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAkopE5KuSrJ9qEoDuJDdNq-fB5WGloW9c2Q&s",
      msg: "This platform completely transformed how we manage courses and students. Simple, powerful, and utterly reliable!",
    },
    {
      name: "Priya Verma", role: "Online Educator", accentClass: "ct-accent-teal",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuDP407tSUJIFX1F07FjMhrARq-oKKHfXvTg&s",
      msg: "Live classes and deep analytics helped me scale my teaching effortlessly. An incredibly smooth experience from day one.",
    },
    {
      name: "Rahul Das", role: "HR Manager", accentClass: "ct-accent-purple",
      img: "https://thumbs.dreamstime.com/b/mature-businessman-office-working-computer-reviewing-documents-analyzing-data-desk-cup-coffee-professional-401881586.jpg",
      msg: "A robust platform that allows institutions to create, host, and deliver top-tier educational content with total ease.",
    },
  ];

  const stars = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    top: `${(i * 137.508) % 100}%`,
    left: `${(i * 97.314) % 100}%`,
    size: i % 7 === 0 ? 3.5 : i % 4 === 0 ? 2.5 : i % 2 === 0 ? 2 : 1.5,
    delay: `${((i * 0.23) % 4).toFixed(2)}s`,
    duration: `${(2 + (i % 4)).toFixed(1)}s`,
    opacity: i % 5 === 0 ? 0.9 : i % 3 === 0 ? 0.7 : 0.5,
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        *{box-sizing:border-box;}
        .ct{font-family:'DM Sans',sans-serif;background:#0a1f1d;}

        /* ── HERO ── */
        .ct-hero{
          position:relative;
          padding:7rem 1.5rem 5.5rem;
          overflow:hidden;
          min-height:640px;
          display:flex;align-items:center;justify-content:center;
        }
        .ct-hero-img{
          position:absolute;inset:0;z-index:0;
          background-image:url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80');
          background-size:cover;background-position:center top;
        }
        .ct-hero-overlay{
          position:absolute;inset:0;z-index:1;
          background:linear-gradient(to bottom,rgba(10,31,29,0.75) 0%,rgba(10,31,29,0.92) 100%);
        }
        .ct-hero-bg{
          position:absolute;inset:0;z-index:2;
          background-image:radial-gradient(circle,rgba(249,115,22,0.07) 1px,transparent 1px);
          background-size:28px 28px;
        }
        .ct-hero-glow{
          position:absolute;width:600px;height:600px;border-radius:50%;z-index:2;
          background:radial-gradient(circle,rgba(249,115,22,0.13),transparent 65%);
          top:50%;left:50%;transform:translate(-50%,-50%);
        }
        .ct-star{
          position:absolute;border-radius:50%;background:#fff;z-index:3;
          animation:ct-twinkle var(--dur,3s) var(--delay,0s) ease-in-out infinite;
        }
        @keyframes ct-twinkle{
          0%,100%{opacity:0.1;transform:scale(0.8);}
          50%{opacity:var(--op,0.75);transform:scale(1.5);}
        }
        .ct-hero-in{
          position:relative;z-index:4;max-width:700px;margin:0 auto;
          display:flex;flex-direction:column;align-items:center;text-align:center;
        }
        @keyframes ct-up{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}
        .ct-badge{
          display:inline-flex;align-items:center;gap:6px;
          background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,0.3);
          color:#f97316;font-size:0.7rem;font-weight:700;letter-spacing:0.12em;
          text-transform:uppercase;padding:5px 14px;border-radius:100px;
          margin-bottom:1.2rem;animation:ct-up 0.5s ease both;
        }
        .ct-hero-title{
          font-family:'Playfair Display',serif;
          font-size:clamp(3rem,6vw,4.8rem);font-weight:900;
          color:#fff;line-height:1.04;margin-bottom:1.2rem;
          animation:ct-up 0.5s 0.1s ease both;
          text-shadow:0 2px 24px rgba(0,0,0,0.6);
        }
        .ct-hero-title span{color:#f97316;display:block;}
        .ct-hero-sub{
          font-size:1rem;color:rgba(255,255,255,0.55);
          line-height:1.8;max-width:500px;
          animation:ct-up 0.5s 0.2s ease both;margin-bottom:2.5rem;
        }
        .ct-hero-pills{
          display:flex;flex-direction:row;flex-wrap:wrap;
          justify-content:center;gap:0.85rem;
          animation:ct-up 0.5s 0.3s ease both;width:100%;
        }
        .ct-info-pill{
          display:flex;align-items:center;gap:12px;
          background:rgba(19,78,74,0.75);border:1px solid rgba(45,212,191,0.2);
          border-radius:14px;padding:0.85rem 1.3rem;backdrop-filter:blur(14px);
          transition:transform 0.25s,border-color 0.25s,background 0.25s;
          cursor:default;min-width:190px;text-decoration:none;
        }
        .ct-info-pill:hover{transform:translateY(-4px);border-color:rgba(45,212,191,0.5);background:rgba(19,78,74,0.98);}
        a.ct-info-pill{cursor:pointer;}
        .ct-info-pill-ic{width:38px;height:38px;flex-shrink:0;background:rgba(45,212,191,0.15);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#2dd4bf;}
        .ct-info-pill-lbl{font-size:0.65rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#2dd4bf;margin-bottom:2px;}
        .ct-info-pill-val{color:#f0fdfa;font-size:0.86rem;font-weight:500;}

        /* ── WAVE ── */
        .ct-wave{display:block;width:100%;background:#0f2027;line-height:0;}
        .ct-wave svg{display:block;width:100%;}

        /* ── MAIN ── */
        .ct-main{padding:4rem 1.5rem 5rem;background:#0a1f1d;}
        .ct-main-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.1fr 0.9fr;gap:3.5rem;align-items:start;}
        @media(max-width:860px){.ct-main-in{grid-template-columns:1fr;}}

        /* ── FORM CARD (REDESIGNED) ── */
        .ct-form-card{
          background:#0f2d2a;border:1px solid rgba(45,212,191,0.18);
          border-radius:24px;padding:0;overflow:hidden;position:relative;
        }
        .ct-form-header{
          background:linear-gradient(135deg,#134e4a 0%,#0f3d39 100%);
          padding:2.2rem 2.4rem 1.8rem;
          border-bottom:1px solid rgba(45,212,191,0.12);
        }
        .ct-form-icon-row{display:flex;align-items:center;gap:14px;}
        .ct-form-icon{
          width:48px;height:48px;flex-shrink:0;
          background:rgba(249,115,22,0.15);border:1px solid rgba(249,115,22,0.3);
          border-radius:14px;display:flex;align-items:center;justify-content:center;color:#f97316;
        }
        .ct-form-title{font-family:'Playfair Display',serif;font-size:1.75rem;font-weight:900;color:#f0fdfa;line-height:1.1;}
        .ct-form-sub{color:rgba(255,255,255,0.45);font-size:0.84rem;margin-top:0.3rem;line-height:1.6;}
        .ct-form-body{padding:1.8rem 2.4rem 2.2rem;}
        .ct-row2{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
        @media(max-width:500px){.ct-row2{grid-template-columns:1fr;}}
        .ct-field{margin-bottom:1rem;}
        .ct-lbl2{
          display:flex;align-items:center;gap:4px;
          font-size:0.7rem;font-weight:700;letter-spacing:0.09em;
          text-transform:uppercase;color:#2dd4bf;margin-bottom:6px;
        }
        .ct-lbl2 span{color:rgba(249,115,22,0.85);}
        .ct-input{
          width:100%;padding:11px 15px;border:1.5px solid rgba(45,212,191,0.15);
          border-radius:10px;font-size:0.9rem;font-family:'DM Sans',sans-serif;
          color:#f0fdfa;background:rgba(255,255,255,0.04);outline:none;
          transition:border-color 0.2s,box-shadow 0.2s,background 0.2s;
        }
        .ct-input:focus{border-color:#0d9488;box-shadow:0 0 0 4px rgba(13,148,136,0.1);background:rgba(255,255,255,0.07);}
        .ct-input::placeholder{color:rgba(255,255,255,0.2);}
        .ct-textarea{resize:vertical;min-height:120px;}
        .ct-submit{
          width:100%;padding:14px;background:linear-gradient(135deg,#f97316,#ea580c);
          color:#fff;border:none;border-radius:12px;cursor:pointer;
          font-size:0.95rem;font-weight:700;font-family:'DM Sans',sans-serif;
          display:flex;align-items:center;justify-content:center;gap:8px;
          transition:opacity 0.2s,transform 0.2s,box-shadow 0.2s;
          box-shadow:0 6px 24px rgba(249,115,22,0.35);margin-top:0.6rem;
          position:relative;overflow:hidden;
        }
        .ct-submit::before{
          content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.1),transparent);
          opacity:0;transition:opacity 0.2s;
        }
        .ct-submit:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 32px rgba(249,115,22,0.48);}
        .ct-submit:hover:not(:disabled)::before{opacity:1;}
        .ct-submit:disabled{opacity:0.5;cursor:not-allowed;}
        .ct-reply-badge{
          display:inline-flex;align-items:center;gap:6px;
          background:rgba(45,212,191,0.07);border:1px solid rgba(45,212,191,0.18);
          border-radius:100px;padding:5px 12px;
          font-size:0.7rem;font-weight:600;color:#2dd4bf;
          margin-top:0.9rem;
        }

        /* ── RIGHT COLUMN ── */
        .ct-right{display:flex;flex-direction:column;gap:1.5rem;}
        .ct-test-hd-lbl{font-size:0.68rem;font-weight:700;letter-spacing:0.13em;text-transform:uppercase;color:#f97316;margin-bottom:0.35rem;}
        .ct-test-hd-title{font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:800;color:#f0fdfa;line-height:1.15;}
        .ct-section-line{width:36px;height:3px;background:linear-gradient(90deg,#f97316,#2dd4bf);border-radius:2px;margin-top:0.6rem;}
        .ct-test-list{display:flex;flex-direction:column;gap:0.9rem;}

        /* ── TESTIMONIAL CARDS (REDESIGNED) ── */
        .ct-test-card{
          background:#0f2d2a;border:1px solid rgba(45,212,191,0.12);
          border-radius:18px;padding:1.4rem 1.5rem;
          position:relative;overflow:hidden;
          transition:transform 0.22s,border-color 0.22s,box-shadow 0.22s;
        }
        .ct-test-card:hover{transform:translateY(-4px);border-color:rgba(45,212,191,0.28);box-shadow:0 16px 40px rgba(0,0,0,0.4);}
        .ct-test-accent{position:absolute;top:0;left:0;width:4px;height:100%;}
        .ct-accent-orange{background:linear-gradient(180deg,#f97316,rgba(249,115,22,0.1));}
        .ct-accent-teal{background:linear-gradient(180deg,#2dd4bf,rgba(45,212,191,0.1));}
        .ct-accent-purple{background:linear-gradient(180deg,#a78bfa,rgba(167,139,250,0.1));}
        .ct-quote-mark{
          position:absolute;top:-8px;right:14px;
          font-family:'Playfair Display',serif;font-size:4.5rem;
          color:rgba(45,212,191,0.06);line-height:1;
          pointer-events:none;user-select:none;
        }
        .ct-stars{display:flex;gap:3px;margin-bottom:0.75rem;}
        .ct-star-icon{color:#f97316;flex-shrink:0;}
        .ct-test-msg{
          font-size:0.87rem;color:rgba(255,255,255,0.58);
          line-height:1.8;font-style:italic;
          margin-bottom:1rem;position:relative;z-index:1;
        }
        .ct-test-divider{height:1px;background:rgba(45,212,191,0.08);margin-bottom:1rem;}
        .ct-test-author{display:flex;align-items:center;gap:10px;}
        .ct-test-img{width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid rgba(45,212,191,0.25);flex-shrink:0;}
        .ct-test-name{font-weight:700;font-size:0.86rem;color:#f0fdfa;}
        .ct-test-role{font-size:0.7rem;color:rgba(255,255,255,0.35);margin-top:1px;}
        .ct-test-verified{
          display:inline-flex;align-items:center;gap:3px;
          font-size:0.66rem;color:#2dd4bf;font-weight:600;
          background:rgba(45,212,191,0.08);border:1px solid rgba(45,212,191,0.15);
          border-radius:100px;padding:3px 8px;margin-left:auto;
        }

        /* ── SOCIAL STRIP ── */
        .ct-social-sec{
          background:#0f2027;padding:3rem 1.5rem;
          border-top:1px solid rgba(45,212,191,0.1);position:relative;overflow:hidden;
        }
        .ct-social-sec::before{
          content:'';position:absolute;inset:0;
          background-image:radial-gradient(circle,rgba(249,115,22,0.04) 1px,transparent 1px);
          background-size:22px 22px;
        }
        .ct-social-in{
          position:relative;z-index:1;max-width:1200px;margin:0 auto;
          display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;
        }
        .ct-social-lbl{font-size:0.68rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#f97316;margin-bottom:0.4rem;}
        .ct-social-title{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:800;color:#fff;}
        .ct-social-row{display:flex;gap:10px;}
        .ct-soc{
          width:48px;height:48px;border-radius:12px;
          display:flex;align-items:center;justify-content:center;
          font-size:18px;text-decoration:none;
          transition:transform 0.2s,box-shadow 0.2s;
          border:1px solid rgba(45,212,191,0.15);
        }
        .ct-soc:hover{transform:translateY(-4px);box-shadow:0 8px 20px rgba(0,0,0,0.3);}
        .ct-soc-wa{background:rgba(37,211,102,0.12);color:#25d366;}
        .ct-soc-li{background:rgba(45,212,191,0.1);color:#2dd4bf;}
        .ct-soc-gh{background:rgba(45,212,191,0.1);color:#2dd4bf;}

        @media(max-width:600px){
          .ct-info-pill{min-width:100%;justify-content:flex-start;}
          .ct-social-in{justify-content:center;text-align:center;}
        }
      `}</style>

      <div className="ct">

        {/* ── HERO ── */}
        <section className="ct-hero">
          <div className="ct-hero-img" />
          <div className="ct-hero-overlay" />
          <div className="ct-hero-bg" />
          <div className="ct-hero-glow" />

          {stars.map(s => (
            <div
              key={s.id}
              className="ct-star"
              style={{
                top: s.top, left: s.left,
                width: `${s.size}px`, height: `${s.size}px`,
                '--dur': s.duration,
                '--delay': s.delay,
                '--op': s.opacity,
              }}
            />
          ))}

          <div className="ct-hero-in">
            <div className="ct-badge"><MessageCircle size={11} /> We'd Love to Hear From You</div>
            <h1 className="ct-hero-title">
              Let's Start a
              <span>Conversation.</span>
            </h1>
            <p className="ct-hero-sub">
              Reach out to us — whether you have a question about courses, certifications, or just want to say hello. We're here for you.
            </p>
            <div className="ct-hero-pills">
              {pills.map((it, i) => {
                const Tag = it.href ? "a" : "div";
                return (
                  <Tag
                    className="ct-info-pill"
                    key={i}
                    {...(it.href ? { href: it.href, target: "_self", rel: "noreferrer" } : {})}
                  >
                    <div className="ct-info-pill-ic">{it.icon}</div>
                    <div>
                      <div className="ct-info-pill-lbl">{it.lbl}</div>
                      <div className="ct-info-pill-val">{it.val}</div>
                    </div>
                  </Tag>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── WAVE ── */}
        <div className="ct-wave">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" height="60" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#0f2027" />
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#0a1f1d" />
          </svg>
        </div>

        {/* ── MAIN ── */}
        <section className="ct-main">
          <div className="ct-main-in">

            {/* ── FORM CARD (REDESIGNED) ── */}
            <div className="ct-form-card">
              <div className="ct-form-header">
                <div className="ct-form-icon-row">
                  <div className="ct-form-icon">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <div className="ct-form-title">Send a Message</div>
                    <div className="ct-form-sub">Fill in the form and we'll get back to you within 24 hours.</div>
                  </div>
                </div>
              </div>

              <div className="ct-form-body">
                <div className="ct-row2">
                  <div className="ct-field">
                    <label className="ct-lbl2">Your Name <span>*</span></label>
                    <input className="ct-input" type="text" placeholder="John Doe" value={name} onChange={e => setname(e.target.value)} />
                  </div>
                  <div className="ct-field">
                    <label className="ct-lbl2">Email Address <span>*</span></label>
                    <input className="ct-input" type="email" placeholder="john@example.com" value={email} onChange={e => setemail(e.target.value)} />
                  </div>
                </div>
                <div className="ct-field">
                  <label className="ct-lbl2">Phone Number</label>
                  <input className="ct-input" type="text" placeholder="+91 00000 00000" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="ct-field">
                  <label className="ct-lbl2">Message <span>*</span></label>
                  <textarea className="ct-input ct-textarea" placeholder="Write your message here..." value={message} onChange={e => seteMessage(e.target.value)} />
                </div>

                <button className="ct-submit" onClick={handelSubmit} disabled={sending}>
                  {sending ? "Sending..." : (<><Send size={15} /> Send Message</>)}
                </button>

                <div className="ct-reply-badge">
                  <Clock size={11} /> Typical reply within 24 hours
                </div>
              </div>
            </div>

            {/* ── TESTIMONIALS (REDESIGNED) ── */}
            <div className="ct-right">
              <div>
                <div className="ct-test-hd-lbl">Kind Words</div>
                <div className="ct-test-hd-title">What Our Learners Say</div>
                <div className="ct-section-line" />
              </div>

              <div className="ct-test-list">
                {testimonials.map((t, i) => (
                  <div className="ct-test-card" key={i}>
                    <div className={`ct-test-accent ${t.accentClass}`} />
                    <div className="ct-quote-mark">"</div>

                    <div className="ct-stars">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="ct-star-icon" width="13" height="13" viewBox="0 0 24 24" fill="#f97316" xmlns="http://www.w3.org/2000/svg">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>

                    <div className="ct-test-msg">{t.msg}</div>
                    <div className="ct-test-divider" />

                    <div className="ct-test-author">
                      <img src={t.img} alt={t.name} className="ct-test-img" />
                      <div>
                        <div className="ct-test-name">{t.name}</div>
                        <div className="ct-test-role">{t.role}</div>
                      </div>
                      <div className="ct-test-verified">
                        <Check size={10} /> Verified
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── SOCIAL STRIP ── */}
        <section className="ct-social-sec">
          <div className="ct-social-in">
            <div>
              <div className="ct-social-lbl">Connect With Us</div>
              <div className="ct-social-title">Find Us Online</div>
            </div>
            <div className="ct-social-row">
              <a href="https://wa.me/916372301256" target="_blank" rel="noreferrer" className="ct-soc ct-soc-wa"><FaWhatsapp /></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="ct-soc ct-soc-li"><Linkedin size={17} /></a>
              <a href="https://github.com/Barsharanipanigrahi" target="_blank" rel="noreferrer" className="ct-soc ct-soc-gh"><FaGithub size={17} /></a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Contact;