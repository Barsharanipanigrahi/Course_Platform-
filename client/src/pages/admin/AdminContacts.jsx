import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import api from "../../services/api";
import DeleteConfirmModal from "../../components/common/DeleteConfirmModal";

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    // delete modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // FETCH CONTACTS
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

    // OPEN DELETE MODAL
    const openDeleteModal = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

    // CONFIRM DELETE
    const confirmDelete = async () => {
        try {
            const res = await api.delete(`/contact/delete/${selectedId}`);
            if (res.data.status) {
                setContacts((prev) =>
                    prev.filter((contact) => contact._id !== selectedId)
                );
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
        <div className="p-6 bg-slate-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Contact Enquiries</h1>

            {loading ? (
                <p>Loading...</p>
            ) : contacts.length === 0 ? (
                <p>No contacts found</p>
            ) : (
                <div className="bg-white shadow rounded-lg overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-left">Message</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contacts.map((c) => (
                                <tr key={c._id} className="border-t hover:bg-slate-50">
                                    <td className="p-3">{c.name}</td>
                                    <td className="p-3">{c.email}</td>
                                    <td className="p-3">{c.phone}</td>
                                    <td className="p-3 max-w-xs truncate">{c.message}</td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => openDeleteModal(c._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* DELETE CONFIRM MODAL */}
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
