import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const StudentAdmission = () => {
  const { user, token } = useAuth();
  const url = import.meta.env.VITE_BACKEND_URL;

  const [admission, setAdmission] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===== Protect student route ===== */
  if (!user || user.role !== "student") {
    return <Navigate to="/" replace />;
  }

  /* ===== Fetch student admission ===== */
  const fetchAdmission = async () => {
    try {
      const res = await axios.get(url + "/admission/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmission(res.data.admission || null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmission();
  }, []);

  /* ===== Submit admission ===== */
  const submitAdmission = async () => {
    try {
      await axios.post(
        url + "/admission",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAdmission();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading admission status...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        My Admission Status
      </h1>

      {!admission ? (
        /* ===== No admission yet ===== */
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600 mb-4">
            You have not submitted any admission request yet.
          </p>
          <button
            onClick={submitAdmission}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit Admission
          </button>
        </div>
      ) : (
        /* ===== Admission details ===== */
        <div className="bg-white rounded-lg shadow p-6 max-w-xl">
          <p className="mb-3">
            <strong>Course:</strong> {admission.courseId?.title}
          </p>
          <p className="mb-3">
            <strong>Price:</strong> ₹ {admission.courseId?.price}
          </p>

          <p className="mb-3">
            <strong>Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold
                ${
                  admission.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : admission.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {admission.status}
            </span>
          </p>

          {admission.status === "approved" && (
            <p className="text-green-600 font-semibold mt-4">
              🎉 Your admission has been approved!
            </p>
          )}

          {admission.status === "rejected" && (
            <p className="text-red-600 font-semibold mt-4">
              ❌ Your admission was rejected.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentAdmission;
