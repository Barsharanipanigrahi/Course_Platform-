import React from "react";
import { X, BookOpen } from "lucide-react";

const ViewEnrollmentsModal = ({ open, onClose, courses, userName }) => {
  if (!open) return null;

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 50,
    }}>
      <div style={{
        background: "#27272a",
        border: "1px solid rgba(245,158,11,0.2)",
        borderRadius: 16,
        width: "100%", maxWidth: 480,
        padding: "1.5rem",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <div>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#f59e0b", marginBottom: 3 }}>
              Enrollments
            </p>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 900, color: "#fafafa", display: "flex", alignItems: "center", gap: 8 }}>
              <BookOpen size={18} style={{ color: "#f59e0b" }} />
              {userName ? `${userName}'s Courses` : "Enrolled Courses"}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8, padding: 6, cursor: "pointer",
              color: "#a1a1aa", display: "flex", alignItems: "center",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
          >
            <X size={16} />
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(245,158,11,0.15)", marginBottom: "1.25rem" }} />

        {/* Content */}
        {!courses || courses.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem 0", color: "#52525b", fontSize: "0.875rem" }}>
            No courses enrolled
          </div>
        ) : (
          <ul style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 360, overflowY: "auto", paddingRight: 4 }}>
            {courses.map((enroll, i) => (
              <li
                key={enroll._id || i}
                style={{
                  background: "rgba(245,158,11,0.05)",
                  border: "1px solid rgba(245,158,11,0.15)",
                  borderRadius: 10,
                  padding: "0.75rem 1rem",
                  transition: "border-color 0.15s, background 0.15s",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(245,158,11,0.35)";
                  e.currentTarget.style.background = "rgba(245,158,11,0.09)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(245,158,11,0.15)";
                  e.currentTarget.style.background = "rgba(245,158,11,0.05)";
                }}
              >
                <h4 style={{ fontWeight: 700, color: "#fafafa", fontSize: "0.9rem", marginBottom: 4 }}>
                  {enroll.course?.title || "Untitled Course"}
                </h4>
                <p style={{ fontSize: "0.78rem", color: "#71717a", lineHeight: 1.5 }}>
                  {enroll.course?.description || "No description"}
                </p>
              </li>
            ))}
          </ul>
        )}

        {/* Footer count */}
        {courses && courses.length > 0 && (
          <p style={{ marginTop: "1rem", fontSize: "0.72rem", color: "#52525b", textAlign: "right" }}>
            {courses.length} course{courses.length !== 1 ? "s" : ""} enrolled
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewEnrollmentsModal;