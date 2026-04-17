import { useEffect, useRef, useState } from "react";
import { Rocket, Target, Star, GraduationCap, ArrowRight, Users, Award, TrendingUp, Zap, Shield, Heart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

/* ── Animated counter hook ── */
const useCounter = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

/* ── Intersection Observer hook ── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

/* ── Stat card with animated counter ── */
const StatCard = ({ num, suffix, label, icon, color, delay, triggerCount }) => {
  const count = useCounter(num, 1800, triggerCount);
  return (
    <div className="ab-stat-card" style={{ animationDelay: delay }}>
      <div className="ab-stat-icon-wrap" style={{ background: `${color}18`, color }}>
        {icon}
      </div>
      <div className="ab-stat-num" style={{ color }}>
        {count}{suffix}
      </div>
      <div className="ab-stat-lbl">{label}</div>
    </div>
  );
};

const About = () => {
  const [statsRef, statsInView] = useInView(0.2);
  const [heroRef, heroInView]   = useInView(0.1);
  const [storyRef, storyInView] = useInView(0.15);
  const [valRef, valInView]     = useInView(0.1);
  const [timeRef, timeInView]   = useInView(0.1);

  const values = [
    { icon:<Rocket size={20}/>,      title:"Our Vision",        desc:"Empower learners with practical knowledge and confidence to build the future.",      color:"#f97316" },
    { icon:<Target size={20}/>,      title:"Our Mission",       desc:"Deliver high-quality courses accessible to every learner worldwide.",                 color:"#2dd4bf" },
    { icon:<Star size={20}/>,        title:"Why Choose Us",     desc:"Clean design, expert content, and a flexible self-paced learning experience.",        color:"#a78bfa" },
    { icon:<GraduationCap size={20}/>,title:"Student First",    desc:"We prioritize learner success through carefully guided learning paths.",               color:"#22c55e" },
    { icon:<Zap size={20}/>,         title:"Skill-Oriented",    desc:"Courses designed to precisely match real industry requirements and demands.",          color:"#f97316" },
    { icon:<TrendingUp size={20}/>,  title:"Continuous Growth", desc:"We constantly evolve to keep our learning ecosystem modern and relevant.",            color:"#2dd4bf" },
  ];

  const timeline = [
    { year:"2023", title:"Founded",          desc:"Learnfy was born with a vision to democratize quality education.",    side:"left"  },
    { year:"2024", title:"First 1K Students",desc:"Reached our first 1,000 enrolled learners across 12 courses.",        side:"right" },
    { year:"2025", title:"50+ Courses Live", desc:"Expanded our catalog with industry experts and live class support.",   side:"left"  },
    { year:"2026", title:"10K+ Learners",    desc:"Crossed 10,000 active students with a 95% satisfaction score.",       side:"right" },
  ];

  const trust = [
    { icon:<Star size={14}/>,         text:"Learn at your own pace, anytime, anywhere"     },
    { icon:<GraduationCap size={14}/>,text:"Certificates that add real value to your resume"},
    { icon:<Rocket size={14}/>,       text:"Career-focused structured learning paths"       },
    { icon:<Shield size={14}/>,       text:"Verified instructors with industry experience"  },
    { icon:<Heart size={14}/>,        text:"Community support and peer learning groups"     },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;}
        .ab{font-family:'DM Sans',sans-serif;overflow-x:hidden;}

        /* ── KEYFRAMES ── */
        @keyframes ab-up   {from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
        @keyframes ab-left {from{opacity:0;transform:translateX(-30px);}to{opacity:1;transform:translateX(0);}}
        @keyframes ab-right{from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0);}}
        @keyframes ab-scale{from{opacity:0;transform:scale(0.88);}to{opacity:1;transform:scale(1);}}
        @keyframes ab-fade {from{opacity:0;}to{opacity:1;}}
        @keyframes ab-float{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}
        @keyframes ab-spin {from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        @keyframes ab-pulse{0%,100%{opacity:0.5;transform:scale(1);}50%{opacity:1;transform:scale(1.08);}}
        @keyframes ab-shimmer{0%{background-position:-600px 0;}100%{background-position:600px 0;}}
        @keyframes ab-line {from{width:0;}to{width:100%;}}
        @keyframes ab-bar  {from{transform:scaleX(0);}to{transform:scaleX(1);}}

        .ab-in{opacity:0;}
        .ab-in.visible{animation:ab-up 0.65s cubic-bezier(0.22,1,0.36,1) both;}

        /* ── HERO ── */
        .ab-hero{
          background:#0f2027;padding:7rem 1.5rem 5.5rem;
          text-align:center;position:relative;overflow:hidden;
        }
        .ab-hero-mesh{
          position:absolute;inset:0;
          background-image:
            radial-gradient(circle at 20% 50%,rgba(45,212,191,0.08) 0%,transparent 50%),
            radial-gradient(circle at 80% 50%,rgba(249,115,22,0.08) 0%,transparent 50%),
            radial-gradient(circle,rgba(249,115,22,0.04) 1px,transparent 1px);
          background-size:100% 100%,100% 100%,28px 28px;
        }
        .ab-hero-ring{
          position:absolute;width:600px;height:600px;border-radius:50%;
          border:1px solid rgba(45,212,191,0.07);
          top:50%;left:50%;transform:translate(-50%,-50%);
          animation:ab-spin 30s linear infinite;
        }
        .ab-hero-ring2{
          position:absolute;width:400px;height:400px;border-radius:50%;
          border:1px solid rgba(249,115,22,0.08);
          top:50%;left:50%;transform:translate(-50%,-50%);
          animation:ab-spin 20s linear infinite reverse;
        }
        .ab-hero-glow{
          position:absolute;width:500px;height:500px;border-radius:50%;
          background:radial-gradient(circle,rgba(249,115,22,0.1),transparent 65%);
          top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;
        }
        .ab-hero-dot{
          position:absolute;width:8px;height:8px;border-radius:50%;
          animation:ab-pulse 3s ease-in-out infinite;
        }
        .ab-hero-in{position:relative;z-index:2;max-width:700px;margin:0 auto;}
        .ab-lbl{
          display:inline-flex;align-items:center;gap:6px;
          font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;
          color:#f97316;margin-bottom:1rem;
          background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.25);
          padding:5px 14px;border-radius:100px;
          animation:ab-up 0.5s ease both;
        }
        .ab-h1{
          font-family:'Playfair Display',serif;font-size:clamp(2.8rem,6vw,4.6rem);
          font-weight:900;line-height:1.05;color:#fff;margin-bottom:1.2rem;
          animation:ab-up 0.5s 0.1s ease both;
        }
        .ab-h1 span{
          color:transparent;
          background:linear-gradient(135deg,#f97316,#fb923c);
          -webkit-background-clip:text;background-clip:text;
        }
        .ab-hero-sub{
          font-size:1rem;color:rgba(255,255,255,0.5);line-height:1.8;
          animation:ab-up 0.5s 0.2s ease both;max-width:520px;margin:0 auto;
        }
        /* animated underline on hero title */
        .ab-hero-line{
          display:block;height:3px;margin:0.8rem auto 0;
          background:linear-gradient(90deg,#f97316,#2dd4bf);border-radius:2px;
          width:0;animation:ab-line 1s 0.7s ease both;
        }

        /* ── SECTION BASE ── */
        .ab-sec{padding:5.5rem 1.5rem;}
        .ab-sec-dark {background:#0f2027;}
        .ab-sec-teal {background:#0d3d39;}
        .ab-sec-deep {background:#0a2e2b;}
        .ab-sec-mid  {background:#134e4a;position:relative;overflow:hidden;}
        .ab-sec-in{max-width:1200px;margin:0 auto;}

        .ab-tag{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#2dd4bf;margin-bottom:0.5rem;display:block;}
        .ab-tag-orange{color:#f97316;}
        .ab-sec-ttl{font-family:'Playfair Display',serif;font-size:clamp(1.9rem,3vw,2.6rem);font-weight:800;color:#f0fdfa;margin-bottom:1rem;line-height:1.15;}
        .ab-sec-line{width:40px;height:3px;background:linear-gradient(90deg,#f97316,#2dd4bf);border-radius:2px;margin-bottom:1.4rem;}
        .ab-txt{font-size:0.96rem;color:rgba(255,255,255,0.55);line-height:1.85;margin-bottom:1rem;}
        .ab-txt strong{color:#2dd4bf;font-weight:600;}

        /* ── STORY SECTION ── */
        .ab-story-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
        @media(max-width:820px){.ab-story-grid{grid-template-columns:1fr;}}
        .ab-story-img-wrap{position:relative;}
        .ab-story-img-card{
          background:linear-gradient(135deg,#134e4a,#0a2e2b);
          border:1px solid rgba(45,212,191,0.2);border-radius:20px;
          padding:2.5rem;text-align:center;position:relative;overflow:hidden;
        }
        .ab-story-img-card::before{
          content:'';position:absolute;top:0;left:0;right:0;height:3px;
          background:linear-gradient(90deg,#f97316,#2dd4bf);
        }
        .ab-story-emoji{font-size:4rem;margin-bottom:1rem;display:block;animation:ab-float 4s ease-in-out infinite;}
        .ab-story-tagline{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:800;color:#f0fdfa;margin-bottom:0.5rem;}
        .ab-story-sub{font-size:0.85rem;color:rgba(255,255,255,0.4);}
        .ab-story-blob{
          position:absolute;width:120px;height:120px;border-radius:50%;
          background:radial-gradient(circle,rgba(249,115,22,0.15),transparent);
          bottom:-30px;right:-30px;pointer-events:none;
        }

        /* diff card */
        .ab-diff-card{
          background:#0a2e2b;border:1px solid rgba(45,212,191,0.2);
          border-radius:18px;padding:1.8rem;
        }
        .ab-diff-title{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:800;color:#fff;margin-bottom:1.2rem;}
        .ab-diff-row{
          display:flex;align-items:flex-start;gap:12px;padding:10px 0;
          border-bottom:1px solid rgba(255,255,255,0.05);
          color:rgba(255,255,255,0.6);font-size:0.9rem;line-height:1.5;
        }
        .ab-diff-row:last-child{border-bottom:none;}
        .ab-diff-ic{
          width:34px;height:34px;flex-shrink:0;border-radius:9px;
          display:flex;align-items:center;justify-content:center;margin-top:1px;
        }

        /* ── VALUES GRID ── */
        .ab-val-hd{text-align:center;margin-bottom:3rem;}
        .ab-val-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;}
        @media(max-width:880px){.ab-val-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:520px){.ab-val-grid{grid-template-columns:1fr;}}
        .ab-val-card{
          background:rgba(255,255,255,0.04);border:1px solid rgba(45,212,191,0.15);
          border-radius:16px;padding:1.6rem;
          transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s,border-color 0.3s,background 0.3s;
          position:relative;overflow:hidden;
        }
        .ab-val-card::after{
          content:'';position:absolute;inset:0;border-radius:16px;opacity:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.04),transparent);
          transition:opacity 0.3s;
        }
        .ab-val-card:hover{transform:translateY(-7px) scale(1.01);box-shadow:0 20px 44px rgba(0,0,0,0.4);border-color:rgba(45,212,191,0.4);}
        .ab-val-card:hover::after{opacity:1;}
        .ab-val-ic{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:0.9rem;transition:transform 0.3s;}
        .ab-val-card:hover .ab-val-ic{transform:scale(1.12) rotate(-5deg);}
        .ab-val-title{font-weight:700;font-size:0.96rem;color:#f0fdfa;margin-bottom:0.4rem;}
        .ab-val-desc{color:rgba(255,255,255,0.48);font-size:0.84rem;line-height:1.65;}

        /* ── STATS ── */
        .ab-stats-hd{text-align:center;margin-bottom:3rem;}
        .ab-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem;}
        @media(max-width:720px){.ab-stats-grid{grid-template-columns:repeat(2,1fr);}}
        .ab-stat-card{
          background:#0a2e2b;border:1px solid rgba(45,212,191,0.12);
          border-radius:16px;padding:2rem 1.5rem;text-align:center;
          transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s;
          animation:ab-scale 0.5s ease both;position:relative;overflow:hidden;
        }
        .ab-stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:currentColor;opacity:0.3;}
        .ab-stat-card:hover{transform:translateY(-5px);box-shadow:0 16px 36px rgba(0,0,0,0.35);border-color:rgba(45,212,191,0.3);}
        .ab-stat-icon-wrap{width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;margin:0 auto 0.8rem;}
        .ab-stat-num{font-family:'Playfair Display',serif;font-size:2.4rem;font-weight:900;line-height:1;margin-bottom:5px;}
        .ab-stat-lbl{font-size:0.73rem;color:#2dd4bf;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;opacity:0.75;}

        /* ── TIMELINE ── */
        .ab-timeline{position:relative;padding:1rem 0;}
        .ab-timeline::before{
          content:'';position:absolute;left:50%;top:0;bottom:0;
          width:2px;background:linear-gradient(to bottom,transparent,rgba(45,212,191,0.3),transparent);
          transform:translateX(-50%);
        }
        @media(max-width:700px){
          .ab-timeline::before{left:20px;}
          .ab-tl-item{flex-direction:column!important;align-items:flex-start!important;padding-left:50px!important;text-align:left!important;}
          .ab-tl-content{max-width:100%!important;}
          .ab-tl-dot{left:12px!important;right:auto!important;}
        }
        .ab-tl-item{
          display:flex;align-items:flex-start;gap:2rem;
          margin-bottom:3rem;position:relative;
        }
        .ab-tl-item.right{flex-direction:row-reverse;text-align:right;}
        .ab-tl-dot{
          position:absolute;left:50%;transform:translateX(-50%);
          width:14px;height:14px;border-radius:50%;
          background:#f97316;border:3px solid #0f2027;
          box-shadow:0 0 0 4px rgba(249,115,22,0.2);
          top:8px;flex-shrink:0;z-index:1;
        }
        .ab-tl-content{
          max-width:calc(50% - 2rem);background:#134e4a;
          border:1px solid rgba(45,212,191,0.15);border-radius:14px;
          padding:1.4rem 1.5rem;transition:transform 0.25s,box-shadow 0.25s;
        }
        .ab-tl-content:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(0,0,0,0.3);}
        .ab-tl-year{font-size:0.68rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#f97316;margin-bottom:0.3rem;}
        .ab-tl-title{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:800;color:#f0fdfa;margin-bottom:0.4rem;}
        .ab-tl-desc{font-size:0.85rem;color:rgba(255,255,255,0.5);line-height:1.65;}

        /* ── TRUST ── */
        .ab-trust-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
        @media(max-width:820px){.ab-trust-grid{grid-template-columns:1fr;}}
        .ab-trust-list{display:flex;flex-direction:column;gap:10px;margin-top:1.2rem;}
        .ab-trust-item{
          display:flex;align-items:center;gap:12px;font-size:0.92rem;
          color:rgba(255,255,255,0.6);padding:10px 14px;border-radius:10px;
          border:1px solid rgba(45,212,191,0.08);background:rgba(45,212,191,0.03);
          transition:background 0.2s,border-color 0.2s,transform 0.2s;
        }
        .ab-trust-item:hover{background:rgba(45,212,191,0.08);border-color:rgba(45,212,191,0.2);transform:translateX(5px);}
        .ab-trust-ic{width:32px;height:32px;flex-shrink:0;background:rgba(45,212,191,0.12);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#2dd4bf;}
        .ab-promise-card{
          background:#0a2e2b;border:1px solid rgba(45,212,191,0.2);
          border-radius:18px;padding:2rem;position:relative;overflow:hidden;
        }
        .ab-promise-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#2dd4bf,#f97316);}
        .ab-promise-ic{width:52px;height:52px;background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.2);border-radius:14px;display:flex;align-items:center;justify-content:center;color:#f97316;margin-bottom:1.2rem;}
        .ab-promise-title{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:800;color:#fff;margin-bottom:0.8rem;}
        .ab-promise-txt{color:rgba(255,255,255,0.55);font-size:0.92rem;line-height:1.8;}

        /* ── CTA ── */
        .ab-cta-in{max-width:580px;margin:0 auto;text-align:center;position:relative;z-index:1;}
        .ab-cta-dot{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(249,115,22,0.08) 1px,transparent 1px);background-size:20px 20px;}
        .ab-cta-glow{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(45,212,191,0.08),transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;}
        .ab-cta-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#fff;margin-bottom:0.9rem;}
        .ab-cta-title span{color:#f97316;}
        .ab-cta-sub{color:rgba(255,255,255,0.5);font-size:0.97rem;line-height:1.8;margin-bottom:2.2rem;}
        .ab-cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
        .ab-cta-btn{
          display:inline-flex;align-items:center;gap:8px;background:#f97316;color:#fff;
          padding:13px 28px;border-radius:10px;font-weight:700;font-size:0.9rem;
          text-decoration:none;transition:background 0.2s,transform 0.2s,box-shadow 0.2s;
          box-shadow:0 4px 18px rgba(249,115,22,0.4);font-family:'DM Sans',sans-serif;
        }
        .ab-cta-btn:hover{background:#ea6c0a;transform:translateY(-2px);box-shadow:0 8px 26px rgba(249,115,22,0.55);}
        .ab-cta-btn-ghost{
          display:inline-flex;align-items:center;gap:8px;background:transparent;color:rgba(255,255,255,0.65);
          border:1px solid rgba(255,255,255,0.2);padding:13px 28px;border-radius:10px;
          font-weight:500;font-size:0.9rem;text-decoration:none;
          transition:background 0.2s,border-color 0.2s;font-family:'DM Sans',sans-serif;
        }
        .ab-cta-btn-ghost:hover{background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.35);}

        /* stagger helper */
        .ab-stagger > *{opacity:0;animation:ab-up 0.55s cubic-bezier(0.22,1,0.36,1) both;}
        .ab-stagger.visible > *:nth-child(1){animation-delay:0.05s;}
        .ab-stagger.visible > *:nth-child(2){animation-delay:0.12s;}
        .ab-stagger.visible > *:nth-child(3){animation-delay:0.19s;}
        .ab-stagger.visible > *:nth-child(4){animation-delay:0.26s;}
        .ab-stagger.visible > *:nth-child(5){animation-delay:0.33s;}
        .ab-stagger.visible > *:nth-child(6){animation-delay:0.40s;}
        .ab-stagger:not(.visible) > *{animation:none;}
      `}</style>

      <div className="ab">

        {/* ── HERO ── */}
        <section className="ab-hero" ref={heroRef}>
          <div className="ab-hero-mesh"/>
          <div className="ab-hero-ring"/><div className="ab-hero-ring2"/>
          <div className="ab-hero-glow"/>
          {/* decorative dots */}
          {[
            {top:"18%",left:"12%",color:"#f97316",delay:"0s"},
            {top:"72%",left:"8%", color:"#2dd4bf",delay:"1s"},
            {top:"25%",right:"10%",color:"#2dd4bf",delay:"0.5s"},
            {top:"68%",right:"12%",color:"#f97316",delay:"1.5s"},
          ].map((d,i)=>(
            <div key={i} className="ab-hero-dot" style={{
              top:d.top,left:d.left,right:d.right,
              width:8,height:8,background:d.color,
              animationDelay:d.delay,
            }}/>
          ))}
          <div className="ab-hero-in">
            <div className="ab-lbl"><Star size={11}/> About Us</div>
            <h1 className="ab-h1">
              Know Us <span>Better</span>
              <span className="ab-hero-line"/>
            </h1>
            <p className="ab-hero-sub">We are building a modern learning platform that helps students grow, upskill, and succeed in the tech-driven world.</p>
          </div>
        </section>

        {/* ── STORY ── */}
        <section className="ab-sec ab-sec-teal" ref={storyRef}>
          <div className="ab-sec-in">
            <div className="ab-story-grid">
              <div className={`ab-in ${storyInView?"visible":""}`}>
                <span className="ab-tag">Our Story</span>
                <h2 className="ab-sec-ttl">Who We Are</h2>
                <div className="ab-sec-line"/>
                <p className="ab-txt"><strong>Learnfy</strong> is a next-generation online learning system designed to simplify course discovery, enrollment, and progress tracking for learners everywhere.</p>
                <p className="ab-txt">Our focus is on practical learning, real-world skills, and a seamless experience for both <strong>students and educators.</strong> We believe that quality education should be accessible to all.</p>
                <p className="ab-txt">From structured learning paths to industry-recognized certificates, we are committed to your <strong>growth every step of the way.</strong></p>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:"1.2rem"}}>
                <div className={`ab-story-img-wrap ab-in ${storyInView?"visible":""}`} style={{animationDelay:"0.15s"}}>
                  <div className="ab-story-img-card">
                    <span className="ab-story-emoji">🚀</span>
                    <div className="ab-story-tagline">Learn. Build. Grow.</div>
                    <div className="ab-story-sub">Your journey starts here</div>
                    <div className="ab-story-blob"/>
                  </div>
                </div>
                <div className={`ab-diff-card ab-in ${storyInView?"visible":""}`} style={{animationDelay:"0.25s"}}>
                  <div className="ab-diff-title">What Makes Us Different</div>
                  {[
                    {icon:<GraduationCap size={15}/>,text:"Structured paths with real outcomes",color:"#2dd4bf",bg:"rgba(45,212,191,0.12)"},
                    {icon:<Star size={15}/>,         text:"Industry-relevant and beginner-friendly",color:"#f97316",bg:"rgba(249,115,22,0.12)"},
                    {icon:<Rocket size={15}/>,        text:"Built for growth, speed and scalability",color:"#a78bfa",bg:"rgba(167,139,250,0.12)"},
                  ].map((it,i)=>(
                    <div className="ab-diff-row" key={i}>
                      <span className="ab-diff-ic" style={{background:it.bg,color:it.color}}>{it.icon}</span>
                      {it.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="ab-sec ab-sec-dark" ref={valRef}>
          <div className="ab-sec-in">
            <div className="ab-val-hd">
              <span className="ab-tag">What We Stand For</span>
              <h2 className="ab-sec-ttl">Our Core Values</h2>
            </div>
            <div className={`ab-val-grid ab-stagger ${valInView?"visible":""}`}>
              {values.map((it,i)=>(
                <div className="ab-val-card" key={i}>
                  <div className="ab-val-ic" style={{background:`${it.color}18`,color:it.color}}>{it.icon}</div>
                  <div className="ab-val-title">{it.title}</div>
                  <div className="ab-val-desc">{it.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="ab-sec ab-sec-deep" ref={statsRef}>
          <div className="ab-sec-in">
            <div className="ab-stats-hd">
              <span className="ab-tag ab-tag-orange">Our Impact</span>
              <h2 className="ab-sec-ttl">Our Impact So Far</h2>
            </div>
            <div className="ab-stats-grid">
              {[
                {num:10000,suffix:"+" ,label:"Students Enrolled", icon:<Users size={18}/>,       color:"#f97316", delay:"0.05s"},
                {num:120,  suffix:"+" ,label:"Expert Courses",     icon:<BookOpen size={18}/>,    color:"#2dd4bf", delay:"0.12s"},
                {num:50,   suffix:"+" ,label:"Industry Mentors",   icon:<Award size={18}/>,       color:"#a78bfa", delay:"0.19s"},
                {num:95,   suffix:"%" ,label:"Learner Satisfaction",icon:<TrendingUp size={18}/>, color:"#22c55e", delay:"0.26s"},
              ].map((s,i)=>(
                <StatCard key={i} {...s} triggerCount={statsInView}/>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="ab-sec ab-sec-teal" ref={timeRef}>
          <div className="ab-sec-in">
            <div className="ab-val-hd">
              <span className="ab-tag">How We Got Here</span>
              <h2 className="ab-sec-ttl">Our Journey</h2>
            </div>
            <div className="ab-timeline">
              {timeline.map((tl,i)=>(
                <div key={i} className={`ab-tl-item ${tl.side==="right"?"right":""} ab-in ${timeInView?"visible":""}`} style={{animationDelay:`${i*0.15}s`}}>
                  <div className="ab-tl-dot"/>
                  <div className="ab-tl-content">
                    <div className="ab-tl-year">{tl.year}</div>
                    <div className="ab-tl-title">{tl.title}</div>
                    <div className="ab-tl-desc">{tl.desc}</div>
                  </div>
                  <div style={{flex:1}}/>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST ── */}
        <section className="ab-sec ab-sec-mid">
          <div className="ab-cta-dot"/>
          <div className="ab-sec-in" style={{position:"relative",zIndex:1}}>
            <div className="ab-trust-grid">
              <div>
                <span className="ab-tag">Trust & Credibility</span>
                <h2 className="ab-sec-ttl">Why Students Trust Us</h2>
                <div className="ab-sec-line"/>
                <p className="ab-txt">We believe learning should be simple, practical, and accessible. Thousands of learners choose our platform to build real-world skills and launch meaningful careers.</p>
                <div className="ab-trust-list">
                  {trust.map((it,i)=>(
                    <div className="ab-trust-item" key={i}>
                      <span className="ab-trust-ic">{it.icon}</span>
                      {it.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="ab-promise-card">
                <div className="ab-promise-ic"><Heart size={22}/></div>
                <div className="ab-promise-title">Our Promise to You</div>
                <p className="ab-promise-txt">We are committed to delivering quality education, continuous improvement, and learner success every step of the way. Your growth is our greatest achievement.</p>
                <div style={{marginTop:"1.5rem",display:"flex",gap:"0.8rem",flexWrap:"wrap"}}>
                  {["Quality First","Learner Focused","Always Improving"].map((tag,i)=>(
                    <span key={i} style={{
                      fontSize:"0.72rem",fontWeight:700,padding:"4px 12px",borderRadius:100,
                      background:"rgba(45,212,191,0.1)",border:"1px solid rgba(45,212,191,0.2)",color:"#2dd4bf"
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ab-sec ab-sec-dark" style={{position:"relative",overflow:"hidden"}}>
          <div className="ab-cta-dot"/>
          <div className="ab-cta-glow"/>
          <div className="ab-cta-in">
            <h2 className="ab-cta-title">Learn. Build. <span>Grow.</span></h2>
            <p className="ab-cta-sub">Join thousands of learners and take the next step in your learning journey today.</p>
            <div className="ab-cta-btns">
              <Link to="/courses" className="ab-cta-btn">Start Learning <ArrowRight size={14}/></Link>
              <Link to="/contact" className="ab-cta-btn-ghost">Get in Touch</Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;