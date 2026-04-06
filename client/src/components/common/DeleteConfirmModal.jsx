import React from "react";

const DeleteConfirmModal = ({
    open,
    onClose,
    onDelete,
    title = "Confirm Delete",
    description = "This action cannot be undone.",
    confirmText = "Delete",
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div
                className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl"
                style={{
                    background: "#27272a",
                    border: "1px solid rgba(245,158,11,0.2)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                }}
            >
                {/* Top accent line */}
                <div
                    style={{
                        position: "absolute",
                        top: 0, left: 24, right: 24,
                        height: 2,
                        background: "linear-gradient(90deg, #f59e0b, transparent)",
                        borderRadius: 2,
                    }}
                />

                {/* Title */}
                <h2
                    className="text-lg font-bold mb-2"
                    style={{ color: "#f59e0b" }}
                >
                    {title}
                </h2>

                {/* Description */}
                <p className="text-sm mb-6" style={{ color: "#a1a1aa" }}>
                    {description}
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition"
                        style={{
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#a1a1aa",
                            background: "transparent",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onDelete}
                        className="px-4 py-2 rounded-lg text-sm font-semibold transition"
                        style={{
                            background: "#ef4444",
                            color: "#fff",
                            boxShadow: "0 4px 14px rgba(239,68,68,0.35)",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#dc2626"}
                        onMouseLeave={e => e.currentTarget.style.background = "#ef4444"}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;