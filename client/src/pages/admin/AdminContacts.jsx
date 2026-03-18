import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import api from "../../services/api";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchContacts = async () => {
        try {
            const res = await api.get("/contact/get");
            if (res.data.status && Array.isArray(res.data.Contacts)) {
                setContacts(res.data.Contacts);
            } else {
                setContacts([]);
            }
        } catch (err) {
            console.log("Fetch error:", err);
            setContacts([]);
        } finally {
            setLoading(false);
        }
    };

    const openDeleteModal = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            const res = await api.delete(`/contact/delete/${selectedId}`);
            if (res.data.status) {
                setContacts((prev) => prev.filter((contact) => contact._id !== selectedId));
            }
        } catch (err) {
            console.log(err);
        } finally {
            setShowModal(false);
            setSelectedId(null);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div
            className="p-8 min-h-screen"
            style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)" }}
        >
            {/* Header */}
            <div className="mb-8">
                <p
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: "#c9a84c" }}
                >
                    Inbox
                </p>
                <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "#f1f5f9" }}>
                    Contact Enquiries
                </h1>
                <div className="mt-2 h-px w-16" style={{ background: "linear-gradient(90deg, #c9a84c, transparent)" }} />
            </div>

            {loading ? (
                <p className="text-slate-400">Loading...</p>
            ) : contacts.length === 0 ? (
                <p className="text-slate-400">No contacts found.</p>
            ) : (
                <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(201,168,76,0.15)",
                        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                    }}
                >
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ background: "rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
                                {["Name", "Email", "Phone", "Message", "Action"].map((h) => (
                                    <th
                                        key={h}
                                        className={`p-4 font-semibold text-xs uppercase tracking-widest ${h === "Action" ? "text-center" : "text-left"}`}
                                        style={{ color: "#c9a84c" }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((c, i) => (
                                <tr
                                    key={c._id}
                                    className="transition-colors duration-150"
                                    style={{
                                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                                        background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.05)"}
                                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)"}
                                >
                                    <td className="p-4 font-medium" style={{ color: "#e2e8f0" }}>{c.name}</td>
                                    <td className="p-4" style={{ color: "#94a3b8" }}>{c.email}</td>
                                    <td className="p-4" style={{ color: "#94a3b8" }}>{c.phone}</td>
                                    <td className="p-4 max-w-xs truncate" style={{ color: "#94a3b8" }}>{c.message}</td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => openDeleteModal(c._id)}
                                            className="transition-colors duration-150"
                                            style={{ color: "#ef4444" }}
                                            onMouseEnter={e => e.currentTarget.style.color = "#fca5a5"}
                                            onMouseLeave={e => e.currentTarget.style.color = "#ef4444"}
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <DeleteConfirmModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onDelete={confirmDelete}
                title="Delete Contact?"
                description="This contact message will be permanently removed."
                confirmText="Delete"
            />
        </div>
    );
};

export default AdminContacts;