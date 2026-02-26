import { useEffect, useState } from "react";
import { Trash2, Eye } from "lucide-react";
import api from "../../services/api";
import ViewEnrollmentsModal from "../../components/home/ViewEnrollmentsModal";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);
    const [enrollments, setEnrollments] = useState([]);

    // FETCH USERS
    const fetchUsers = async () => {
        try {
            const res = await api.get("/user/get", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(res?.data.users)
            if (res.data.status) {
                setUsers(res.data.users);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // DELETE USER
    const deleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) return;

        try {
            const res = await api.delete(`/user/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res.data.status) {
                setUsers((prev) => prev.filter((u) => u._id !== id));
            }
        } catch (err) {
            console.log(err);
        }
    };

    // VIEW ENROLLMENTS
    const viewEnrollments = async (userId) => {
        try {
            const res = await api.get(`/enrollment/user/${userId}`);
            if (res.data.status) {
                setEnrollments(res.data.enrollments);
                setOpenModal(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Users Management</h1>

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div className="bg-white rounded-xl shadow overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Role</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-t">
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3 capitalize">{user.role}</td>
                                    <td className="p-3 flex justify-center gap-3">
                                        <button
                                            onClick={() => viewEnrollments(user._id)}
                                            className="text-blue-600"
                                        >
                                            <Eye size={18} />
                                        </button>

                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="text-red-600"
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

            <ViewEnrollmentsModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                courses={enrollments}
            />
        </div>
    );
};

export default AdminUsers;
