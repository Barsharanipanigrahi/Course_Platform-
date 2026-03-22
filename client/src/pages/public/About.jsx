import { Rocket, Target, Star, GraduationCap, ArrowRight } from "lucide-react";

const About = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
      .ab{font-family:'DM Sans',sans-serif;}
      .ab-hero{background:#0f2027;padding:7rem 1.5rem 5.5rem;text-align:center;position:relative;overflow:hidden;}
      .ab-hero-bg{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(249,115,22,0.05) 1px,transparent 1px);background-size:28px 28px;}
      .ab-hero-glow{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,0.1),transparent 65%);top:50%;left:50%;transform:translate(-50%,-50%);}
      .ab-hero-in{position:relative;z-index:1;max-width:680px;margin:0 auto;}
      .ab-lbl{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#f97316;margin-bottom:0.8rem;}
      .ab-h1{font-family:'Playfair Display',serif;font-size:clamp(2.8rem,6vw,4.4rem);font-weight:900;line-height:1.06;color:#fff;margin-bottom:1.2rem;}
      .ab-h1 span{color:#f97316;}
      .ab-hero-sub{font-size:1rem;color:rgba(255,255,255,0.5);line-height:1.75;}
      .ab-sec{padding:5rem 1.5rem;}
      .ab-sec-white{background:#0d3d39;} .ab-sec-light{background:#134e4a;} .ab-sec-dark{background:#0f2027;} .ab-sec-mid{background:#0a2e2b;}
      .ab-sec-in{max-width:1200px;margin:0 auto;}
      .ab-sec-lbl{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#2dd4bf;margin-bottom:0.5rem;}
      .ab-sec-lbl-lt{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#2dd4bf;margin-bottom:0.5rem;}
      .ab-sec-ttl{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:800;color:#f0fdfa;margin-bottom:1rem;}
      .ab-sec-ttl-lt{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.5rem);font-weight:800;color:#f0fdfa;margin-bottom:1rem;}
      .ab-txt{font-size:0.97rem;color:rgba(255,255,255,0.6);line-height:1.8;margin-bottom:1rem;}
      .ab-txt strong{color:#2dd4bf;font-weight:600;}
      .ab-grid2{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
      @media(max-width:800px){.ab-grid2{grid-template-columns:1fr;}}
      .ab-card-dark{background:#134e4a;border:1px solid rgba(45,212,191,0.25);border-radius:18px;padding:2rem;position:relative;overflow:hidden;}
      .ab-card-dark::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:#2dd4bf;}
      .ab-card-title{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:800;color:#fff;margin-bottom:1.3rem;}
      .ab-card-row{display:flex;align-items:flex-start;gap:11px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.6);font-size:0.9rem;}
      .ab-card-row:last-child{border-bottom:none;}
      .ab-card-ic{width:32px;height:32px;flex-shrink:0;background:rgba(249,115,22,0.12);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#f97316;}
      .ab-val-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem;}
      @media(max-width:860px){.ab-val-grid{grid-template-columns:repeat(2,1fr);}}
      .ab-val-hd{text-align:center;margin-bottom:2.8rem;}
      .ab-val-card{background:rgba(255,255,255,0.05);border:1px solid rgba(45,212,191,0.2);border-radius:14px;padding:1.5rem;transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s;}
      .ab-val-card:hover{transform:translateY(-5px);box-shadow:0 16px 36px rgba(0,0,0,0.3);border-color:rgba(45,212,191,0.5);background:rgba(45,212,191,0.08);}
      .ab-val-ic{width:44px;height:44px;background:rgba(45,212,191,0.15);border-radius:11px;display:flex;align-items:center;justify-content:center;color:#2dd4bf;margin-bottom:0.9rem;}
      .ab-val-title{font-weight:700;font-size:0.95rem;color:#f0fdfa;margin-bottom:0.35rem;}
      .ab-val-desc{color:rgba(255,255,255,0.55);font-size:0.84rem;line-height:1.6;}
      .ab-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.1rem;}
      @media(max-width:700px){.ab-stats-grid{grid-template-columns:repeat(2,1fr);}}
      .ab-stats-hd{text-align:center;margin-bottom:2.8rem;}
      .ab-stat-card{background:#134e4a;border:1px solid rgba(45,212,191,0.15);border-radius:14px;padding:1.8rem;text-align:center;transition:transform 0.2s;}
      .ab-stat-card:hover{transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,0.3);}
      .ab-stat-num{font-family:'Playfair Display',serif;font-size:2.3rem;font-weight:900;color:#f97316;margin-bottom:5px;}
      .ab-stat-lbl{font-size:0.78rem;color:#2dd4bf;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;}
      .ab-trust-list{display:flex;flex-direction:column;gap:11px;margin-top:1.4rem;}
      .ab-trust-item{display:flex;align-items:center;gap:11px;font-size:0.93rem;color:rgba(255,255,255,0.6);}
      .ab-trust-ic{width:32px;height:32px;flex-shrink:0;background:rgba(45,212,191,0.15);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#2dd4bf;}
      .ab-cta-in{max-width:560px;margin:0 auto;text-align:center;position:relative;z-index:1;}
      .ab-cta-dot{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(249,115,22,0.1) 1px,transparent 1px);background-size:20px 20px;}
      .ab-cta-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#fff;margin-bottom:0.9rem;}
      .ab-cta-title span{color:#f97316;}
      .ab-cta-sub{color:rgba(255,255,255,0.55);font-size:0.97rem;line-height:1.75;margin-bottom:2rem;}
      .ab-cta-btn{display:inline-flex;align-items:center;gap:8px;background:#f97316;color:#fff;padding:12px 26px;border-radius:9px;font-weight:700;font-size:0.9rem;text-decoration:none;transition:background 0.2s,transform 0.2s;box-shadow:0 4px 18px rgba(249,115,22,0.4);font-family:'DM Sans',sans-serif;}
      .ab-cta-btn:hover{background:#ea6c0a;transform:translateY(-2px);}
    `}</style>
    <div className="ab">
      <section className="ab-hero">
        <div className="ab-hero-bg"/><div className="ab-hero-glow"/>
        <div className="ab-hero-in">
          <div className="ab-lbl">About Us</div>
          <h1 className="ab-h1">Know Us <span>Better</span></h1>
          <p className="ab-hero-sub">We are building a modern learning platform that helps students grow, upskill, and succeed in the tech-driven world.</p>
        </div>
      </section>
      <section className="ab-sec ab-sec-white">
        <div className="ab-sec-in">
          <div className="ab-grid2">
            <div>
              <div className="ab-sec-lbl">Our Story</div>
              <h2 className="ab-sec-ttl">Who We Are</h2>
              <p className="ab-txt"><strong>EduLearn</strong> is a next-generation online learning system designed to simplify course discovery, enrollment, and progress tracking.</p>
              <p className="ab-txt">Our focus is on practical learning, real-world skills, and a seamless experience for both <strong>students and educators.</strong></p>
            </div>
            <div className="ab-card-dark">
              <div className="ab-card-title">What Makes Us Different</div>
              {[{icon:<GraduationCap size={15}/>,text:"Structured learning paths with real outcomes"},{icon:<Star size={15}/>,text:"Industry-relevant and beginner-friendly courses"},{icon:<Rocket size={15}/>,text:"Built for growth, speed, and scalability"}].map((it,i)=>(
                <div className="ab-card-row" key={i}><span className="ab-card-ic">{it.icon}</span>{it.text}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="ab-sec ab-sec-light">
        <div className="ab-sec-in">
          <div className="ab-val-hd"><div className="ab-sec-lbl">What We Stand For</div><h2 className="ab-sec-ttl">Our Core Values</h2></div>
          <div className="ab-val-grid">
            {[{icon:<Rocket size={20}/>,title:"Our Vision",desc:"Empower learners with practical knowledge and confidence."},{icon:<Target size={20}/>,title:"Our Mission",desc:"Deliver high-quality courses accessible to everyone."},{icon:<Star size={20}/>,title:"Why Choose Us",desc:"Clean design, expert content, and flexible learning."},{icon:<GraduationCap size={20}/>,title:"Student First",desc:"We prioritize learner success through guided paths."},{icon:<Rocket size={20}/>,title:"Skill-Oriented",desc:"Courses designed to match real industry requirements."},{icon:<Star size={20}/>,title:"Continuous Growth",desc:"We evolve constantly to keep learning modern."}].map((it,i)=>(
              <div className="ab-val-card" key={i}><div className="ab-val-ic">{it.icon}</div><div className="ab-val-title">{it.title}</div><div className="ab-val-desc">{it.desc}</div></div>
            ))}
          </div>
        </div>
      </section>
      <section className="ab-sec ab-sec-dark">
        <div className="ab-sec-in">
          <div className="ab-stats-hd"><div className="ab-sec-lbl-lt">Our Impact</div><h2 className="ab-sec-ttl-lt">Our Impact So Far</h2></div>
          <div className="ab-stats-grid">
            {[{n:"10K+",l:"Students Enrolled"},{n:"120+",l:"Expert Courses"},{n:"50+",l:"Industry Mentors"},{n:"95%",l:"Learner Satisfaction"}].map((s,i)=>(
              <div className="ab-stat-card" key={i}><div className="ab-stat-num">{s.n}</div><div className="ab-stat-lbl">{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>
      <section className="ab-sec ab-sec-white">
        <div className="ab-sec-in">
          <div className="ab-grid2">
            <div>
              <div className="ab-sec-lbl">Trust & Credibility</div>
              <h2 className="ab-sec-ttl">Why Students Trust Us</h2>
              <p className="ab-txt">We believe learning should be simple, practical, and accessible. Thousands of learners choose our platform to build real-world skills.</p>
              <div className="ab-trust-list">
                {[{icon:<Star size={14}/>,text:"Learn at your own pace, anytime"},{icon:<GraduationCap size={14}/>,text:"Certificates that add value to your resume"},{icon:<Rocket size={14}/>,text:"Career-focused learning paths"}].map((it,i)=>(
                  <div className="ab-trust-item" key={i}><span className="ab-trust-ic">{it.icon}</span>{it.text}</div>
                ))}
              </div>
            </div>
            <div className="ab-card-dark">
              <div className="ab-card-title">Our Promise</div>
              <p style={{color:'rgba(255,255,255,0.6)',fontSize:'0.95rem',lineHeight:'1.8'}}>We are committed to delivering quality education, continuous improvement, and learner success every step of the way.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="ab-sec ab-sec-mid" style={{position:'relative',overflow:'hidden'}}>
        <div className="ab-cta-dot"/>
        <div className="ab-cta-in">
          <h2 className="ab-cta-title">Learn. Build. <span>Grow.</span></h2>
          <p className="ab-cta-sub">Join us and take the next step in your learning journey.</p>
          <a href="/register" className="ab-cta-btn">Start Learning Free <ArrowRight size={14}/></a>
        </div>
      </section>
    </div>
  </>
);
export default About;