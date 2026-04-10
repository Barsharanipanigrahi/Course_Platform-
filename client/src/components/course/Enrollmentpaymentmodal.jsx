import { useState } from "react";
import { X, Zap, CreditCard, CheckCircle2, Tag, ChevronRight, Lock, Sparkles, Calendar, AlertCircle } from "lucide-react";
import api from "../../services/api";

/* ─────────────────────────────────────────────────────────────
   EnrollmentPaymentModal
   Props:
     open       – boolean
     onClose    – () => void
     course     – { _id, title, price, duration, category, ... }
     onSuccess  – (enrollment) => void   (called after successful enroll)
   ───────────────────────────────────────────────────────────── */
const EnrollmentPaymentModal = ({ open, onClose, course, onSuccess }) => {
  const [plan, setPlan]         = useState(null);   // "full" | "installment"
  const [step, setStep]         = useState("pick"); // "pick" | "confirm" | "success"
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  if (!open || !course) return null;

  const basePrice     = course.price || 0;
  const discountPct   = 10;
  const discountAmt   = Math.round(basePrice * discountPct / 100);
  const fullPrice     = basePrice - discountAmt;

  // Installment: 3 equal parts (no discount)
  const installCount  = 3;
  const installAmt    = Math.round(basePrice / installCount);

  const handleClose = () => {
    setPlan(null);
    setStep("pick");
    setError("");
    onClose();
  };

  const handleConfirm = async () => {
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/enrollment/enroll",
        { courseId: course._id, paymentPlan: plan },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status) {
        setStep("success");
        onSuccess && onSuccess(res.data.enrollment);
      } else {
        setError(res.data.message || "Enrollment failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const isFree = basePrice === 0;

  return (
    <>
      <style>{`
        @keyframes modalFadeIn   { from { opacity:0 } to { opacity:1 } }
        @keyframes modalSlideUp  { from { opacity:0; transform:translateY(32px) scale(0.97) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes checkPop      { 0% { transform:scale(0) } 70% { transform:scale(1.2) } 100% { transform:scale(1) } }
        @keyframes shimmer       {
          0%   { background-position: 200% 0 }
          100% { background-position: -200% 0 }
        }
        .pay-plan-card {
          border-radius: 14px;
          padding: 1.25rem 1.4rem;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.22s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          overflow: hidden;
        }
        .pay-plan-card:hover { transform: translateY(-2px); }
        .pay-plan-card.selected-full {
          border-color: #f59e0b;
          background: rgba(245,158,11,0.07);
          box-shadow: 0 0 0 1px rgba(245,158,11,0.12), 0 8px 32px rgba(245,158,11,0.15);
        }
        .pay-plan-card.selected-installment {
          border-color: #60a5fa;
          background: rgba(96,165,250,0.07);
          box-shadow: 0 0 0 1px rgba(96,165,250,0.12), 0 8px 32px rgba(96,165,250,0.12);
        }
        .pay-plan-card.unselected {
          background: #27272a;
          border-color: rgba(255,255,255,0.07);
        }
        .pay-plan-card.unselected:hover {
          border-color: rgba(255,255,255,0.15);
          background: #2e2e32;
        }
        .confirm-btn {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.18s;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.02em;
        }
        .confirm-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .confirm-btn.full-btn {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #18181b;
          box-shadow: 0 4px 20px rgba(245,158,11,0.35);
        }
        .confirm-btn.full-btn:not(:disabled):hover {
          background: linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%);
          box-shadow: 0 6px 28px rgba(245,158,11,0.5);
          transform: translateY(-1px);
        }
        .confirm-btn.install-btn {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: #fff;
          box-shadow: 0 4px 20px rgba(59,130,246,0.35);
        }
        .confirm-btn.install-btn:not(:disabled):hover {
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          box-shadow: 0 6px 28px rgba(59,130,246,0.5);
          transform: translateY(-1px);
        }
        .back-link {
          background: none; border: none; cursor: pointer;
          color: #71717a; font-size: 0.78rem; font-family: 'DM Sans', sans-serif;
          display: flex; align-items: center; gap: 4px;
          transition: color 0.15s; padding: 0; margin-bottom: 1.2rem;
        }
        .back-link:hover { color: #a1a1aa; }
        .installment-chip {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(96,165,250,0.1);
          border: 1px solid rgba(96,165,250,0.2);
          border-radius: 100px; padding: 3px 10px;
          font-size: 0.68rem; font-weight: 700;
          color: #60a5fa; text-transform: uppercase; letter-spacing: 0.08em;
        }
        .discount-ribbon {
          position: absolute; top: 14px; right: -1px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #18181b; font-size: 0.6rem; font-weight: 900;
          padding: 3px 10px; border-radius: 100px 0 0 100px;
          letter-spacing: 0.08em; text-transform: uppercase;
          box-shadow: 0 2px 8px rgba(245,158,11,0.4);
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(6px)",
          zIndex: 100,
          animation: "modalFadeIn 0.2s ease",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "min(480px, calc(100vw - 32px))",
        background: "#18181b",
        border: "1px solid rgba(245,158,11,0.18)",
        borderRadius: 20,
        boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
        zIndex: 101,
        animation: "modalSlideUp 0.28s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* Top glow line */}
        <div style={{
          height: 2,
          background: "linear-gradient(90deg, transparent, #f59e0b80, #60a5fa80, transparent)",
        }} />

        {/* ══════ STEP: PICK PLAN ══════ */}
        {step === "pick" && (
          <div style={{ padding: "1.75rem" }}>

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 5 }}>
                  Enroll Now
                </p>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 900, color: "#fafafa", lineHeight: 1.3, margin: 0, maxWidth: 340 }}>
                  {course.title}
                </h2>
                {course.duration && (
                  <p style={{ fontSize: "0.72rem", color: "#71717a", marginTop: 5, display: "flex", alignItems: "center", gap: 5 }}>
                    <Calendar size={11} /> {course.duration}
                  </p>
                )}
              </div>
              <button onClick={handleClose} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8, padding: 6, cursor: "pointer", color: "#71717a",
                display: "flex", alignItems: "center", transition: "background 0.15s", flexShrink: 0,
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              >
                <X size={15} />
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: "1.4rem" }} />

            {isFree ? (
              /* ── FREE COURSE ── */
              <div>
                <div style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: 14, padding: "1.25rem",
                  textAlign: "center", marginBottom: "1.25rem",
                }}>
                  <p style={{ fontSize: "2rem", fontWeight: 900, color: "#22c55e", margin: 0 }}>FREE</p>
                  <p style={{ fontSize: "0.75rem", color: "#71717a", marginTop: 4 }}>No payment required</p>
                </div>
                <button
                  className="confirm-btn full-btn"
                  style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 4px 20px rgba(34,197,94,0.35)" }}
                  onClick={() => { setPlan("full"); setStep("confirm"); }}
                >
                  <Zap size={16} /> Enroll for Free
                </button>
              </div>
            ) : (
              /* ── PAID COURSE ── */
              <>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.85rem" }}>
                  Choose Payment Plan
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                  {/* ── Full Payment Card ── */}
                  <div
                    className={`pay-plan-card ${plan === "full" ? "selected-full" : "unselected"}`}
                    onClick={() => setPlan("full")}
                  >
                    <div className="discount-ribbon">10% OFF</div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: "rgba(245,158,11,0.12)",
                        border: "1px solid rgba(245,158,11,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Zap size={17} style={{ color: "#f59e0b" }} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 800, color: "#fafafa", fontSize: "0.92rem", margin: 0 }}>Full Payment</p>
                        <p style={{ fontSize: "0.68rem", color: "#71717a", margin: 0, marginTop: 2 }}>One-time · Best value</p>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
                      <span style={{ fontSize: "1.75rem", fontWeight: 900, color: "#f59e0b", lineHeight: 1 }}>
                        ₹{fullPrice.toLocaleString()}
                      </span>
                      <span style={{ fontSize: "0.85rem", color: "#52525b", textDecoration: "line-through", marginBottom: 3 }}>
                        ₹{basePrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Discount tag */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                      <Tag size={11} style={{ color: "#f59e0b" }} />
                      <span style={{ fontSize: "0.72rem", color: "#f59e0b", fontWeight: 700 }}>
                        You save ₹{discountAmt.toLocaleString()} ({discountPct}% discount)
                      </span>
                    </div>

                    {/* Selected indicator */}
                    {plan === "full" && (
                      <div style={{ position: "absolute", top: 14, left: 14 }}>
                        <CheckCircle2 size={16} style={{ color: "#f59e0b" }} />
                      </div>
                    )}

                    {/* Glow blob */}
                    <div style={{
                      position: "absolute", bottom: -30, right: -30,
                      width: 100, height: 100, borderRadius: "50%",
                      background: "#f59e0b", opacity: 0.04, pointerEvents: "none",
                    }} />
                  </div>

                  {/* ── Installment Card ── */}
                  <div
                    className={`pay-plan-card ${plan === "installment" ? "selected-installment" : "unselected"}`}
                    onClick={() => setPlan("installment")}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: "rgba(96,165,250,0.12)",
                        border: "1px solid rgba(96,165,250,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <CreditCard size={17} style={{ color: "#60a5fa" }} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 800, color: "#fafafa", fontSize: "0.92rem", margin: 0 }}>Installment Plan</p>
                        <p style={{ fontSize: "0.68rem", color: "#71717a", margin: 0, marginTop: 2 }}>3 easy payments · No extra cost</p>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                      <span style={{ fontSize: "1.75rem", fontWeight: 900, color: "#60a5fa", lineHeight: 1 }}>
                        ₹{installAmt.toLocaleString()}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "#71717a", marginBottom: 4 }}>/ installment</span>
                    </div>

                    {/* Installment breakdown */}
                    <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                      {[...Array(installCount)].map((_, idx) => (
                        <div key={idx} style={{
                          flex: 1, minWidth: 70,
                          background: "rgba(96,165,250,0.07)",
                          border: "1px solid rgba(96,165,250,0.15)",
                          borderRadius: 8, padding: "6px 8px",
                          textAlign: "center",
                        }}>
                          <p style={{ fontSize: "0.6rem", color: "#71717a", margin: 0, fontWeight: 600, textTransform: "uppercase" }}>
                            {idx === 0 ? "Today" : idx === 1 ? "Month 2" : "Month 3"}
                          </p>
                          <p style={{ fontSize: "0.8rem", fontWeight: 800, color: "#60a5fa", margin: 0, marginTop: 2 }}>
                            ₹{installAmt.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                      <AlertCircle size={11} style={{ color: "#71717a" }} />
                      <span style={{ fontSize: "0.7rem", color: "#71717a" }}>
                        Total: ₹{basePrice.toLocaleString()} (no discount)
                      </span>
                    </div>

                    {plan === "installment" && (
                      <div style={{ position: "absolute", top: 14, left: 14 }}>
                        <CheckCircle2 size={16} style={{ color: "#60a5fa" }} />
                      </div>
                    )}

                    <div style={{
                      position: "absolute", bottom: -30, right: -30,
                      width: 100, height: 100, borderRadius: "50%",
                      background: "#60a5fa", opacity: 0.04, pointerEvents: "none",
                    }} />
                  </div>
                </div>

                {/* CTA */}
                <div style={{ marginTop: "1.25rem" }}>
                  <button
                    className={`confirm-btn ${plan === "installment" ? "install-btn" : "full-btn"}`}
                    disabled={!plan}
                    onClick={() => setStep("confirm")}
                  >
                    {!plan ? "Select a Plan to Continue" : (
                      <>
                        Continue with {plan === "full" ? "Full Payment" : "Installment"}
                        <ChevronRight size={16} />
                      </>
                    )}
                  </button>
                  <p style={{ textAlign: "center", fontSize: "0.68rem", color: "#3f3f46", marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                    <Lock size={10} /> Secured · No hidden charges
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* ══════ STEP: CONFIRM ══════ */}
        {step === "confirm" && (
          <div style={{ padding: "1.75rem" }}>
            <button className="back-link" onClick={() => { setStep("pick"); setError(""); }}>
              ← Back to plans
            </button>

            <p style={{ fontSize: "0.62rem", fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 6 }}>
              Order Summary
            </p>
            <h2 style={{ fontSize: "1.05rem", fontWeight: 900, color: "#fafafa", marginBottom: "1.25rem", lineHeight: 1.3 }}>
              {course.title}
            </h2>

            {/* Summary card */}
            <div style={{
              background: "#27272a",
              border: `1px solid ${plan === "full" ? "rgba(245,158,11,0.2)" : "rgba(96,165,250,0.2)"}`,
              borderRadius: 14, padding: "1.1rem",
              marginBottom: "1.25rem",
            }}>
              {/* Plan */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: "0.78rem", color: "#71717a" }}>Payment Plan</span>
                <span className={plan === "installment" ? "installment-chip" : ""} style={plan === "full" ? {
                  fontSize: "0.72rem", fontWeight: 800, color: "#f59e0b",
                  background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)",
                  borderRadius: 100, padding: "2px 10px",
                } : {}}>
                  {plan === "full" ? "⚡ Full Payment" : "💳 Installment"}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "10px 0" }} />

              {plan === "full" && !isFree && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.78rem", color: "#71717a" }}>Original Price</span>
                    <span style={{ fontSize: "0.78rem", color: "#71717a", textDecoration: "line-through" }}>₹{basePrice.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.78rem", color: "#34d399", display: "flex", alignItems: "center", gap: 5 }}>
                      <Tag size={11} /> Discount (10%)
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#34d399", fontWeight: 700 }}>−₹{discountAmt.toLocaleString()}</span>
                  </div>
                  <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "10px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 800, color: "#fafafa", fontSize: "0.9rem" }}>Amount Due Today</span>
                    <span style={{ fontWeight: 900, color: "#f59e0b", fontSize: "1.1rem" }}>₹{fullPrice.toLocaleString()}</span>
                  </div>
                </>
              )}

              {plan === "installment" && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.78rem", color: "#71717a" }}>First Installment</span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#60a5fa" }}>₹{installAmt.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.78rem", color: "#71717a" }}>Remaining (2 × ₹{installAmt.toLocaleString()})</span>
                    <span style={{ fontSize: "0.78rem", color: "#71717a" }}>₹{(installAmt * 2).toLocaleString()}</span>
                  </div>
                  <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "10px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 800, color: "#fafafa", fontSize: "0.9rem" }}>Amount Due Today</span>
                    <span style={{ fontWeight: 900, color: "#60a5fa", fontSize: "1.1rem" }}>₹{installAmt.toLocaleString()}</span>
                  </div>
                </>
              )}

              {isFree && (
                <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
                  <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#22c55e" }}>FREE</span>
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: "rgba(248,113,113,0.1)",
                border: "1px solid rgba(248,113,113,0.2)",
                borderRadius: 10, padding: "0.75rem 1rem",
                fontSize: "0.78rem", color: "#f87171",
                marginBottom: "1rem",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <AlertCircle size={14} /> {error}
              </div>
            )}

            {/* Confirm Button */}
            <button
              className={`confirm-btn ${plan === "installment" ? "install-btn" : "full-btn"}`}
              disabled={loading}
              onClick={handleConfirm}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 16, height: 16, borderRadius: "50%",
                    border: "2px solid currentColor", borderTopColor: "transparent",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Processing...
                </>
              ) : (
                <>
                  <Lock size={15} />
                  {isFree ? "Confirm Free Enrollment" : `Pay ₹${plan === "full" ? fullPrice.toLocaleString() : installAmt.toLocaleString()} & Enroll`}
                </>
              )}
            </button>

            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

            <p style={{ textAlign: "center", fontSize: "0.68rem", color: "#3f3f46", marginTop: 10 }}>
              By enrolling you agree to our Terms & Refund Policy
            </p>
          </div>
        )}

        {/* ══════ STEP: SUCCESS ══════ */}
        {step === "success" && (
          <div style={{ padding: "2.5rem 1.75rem", textAlign: "center" }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "rgba(52,211,153,0.12)",
              border: "2px solid rgba(52,211,153,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 1.25rem",
              animation: "checkPop 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}>
              <CheckCircle2 size={32} style={{ color: "#34d399" }} />
            </div>

            <p style={{ fontSize: "0.62rem", fontWeight: 700, color: "#34d399", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8 }}>
              Enrollment Confirmed!
            </p>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#fafafa", marginBottom: 8 }}>
              You're all set! 🎉
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#71717a", marginBottom: "1.75rem", lineHeight: 1.6 }}>
              You've successfully enrolled in<br />
              <strong style={{ color: "#d4d4d8" }}>{course.title}</strong>
            </p>

            <div style={{
              background: "#27272a",
              border: "1px solid rgba(52,211,153,0.15)",
              borderRadius: 12, padding: "0.9rem",
              marginBottom: "1.5rem",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <Sparkles size={14} style={{ color: "#f59e0b" }} />
              <span style={{ fontSize: "0.78rem", color: "#a3a3a3" }}>
                {plan === "full" && !isFree ? `You saved ₹${discountAmt.toLocaleString()} with full payment!` :
                  plan === "installment" ? `First installment of ₹${installAmt.toLocaleString()} paid.` :
                    "Free enrollment activated!"}
              </span>
            </div>

            <button
              className="confirm-btn full-btn"
              style={{ background: "linear-gradient(135deg,#34d399,#10b981)", boxShadow: "0 4px 20px rgba(52,211,153,0.35)" }}
              onClick={handleClose}
            >
              Go to My Courses <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>
    </>
  );
};

export default EnrollmentPaymentModal;