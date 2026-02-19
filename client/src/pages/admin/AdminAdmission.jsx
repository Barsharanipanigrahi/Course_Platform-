import React, { useEffect, useState } from "react";
import axios from "axios";


import AddAdmission from '../../components/courses/StudentAdmission'

const AdminAdmission = () => {
  
  const url = import.meta.env.VITE_BACKEND_URL;

  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  
  /* ===== Fetch all admissions ===== */
  const fetchAdmissions = async () => {
    try {
      const res = await axios.get(url + "/admission", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmissions(res.data.admissions || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  /* ===== Update admission status ===== */
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        url + `/admission/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAdmissions();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading admissions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Admission Requests
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {admissions.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No admission requests found
                </td>
              </tr>
            ) : (
              admissions.map((ad) => (
                <tr key={ad._id} className="border-t">
                  <td className="p-3">{ad.name}</td>
                  <td className="p-3">{ad.email}</td>
                  <td className="p-3">{ad.courseId?.title}</td>
                  <td className="p-3">₹ {ad.courseId?.price}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          ad.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : ad.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {ad.status}
                    </span>
                  </td>

                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => updateStatus(ad._id, "approved")}
                      disabled={ad.status === "approved"}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(ad._id, "rejected")}
                      disabled={ad.status === "rejected"}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAdmission;
