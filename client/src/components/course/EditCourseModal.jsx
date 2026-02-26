import React, { useEffect, useState } from "react";

const EditCourseModal = ({ open, onClose, course, onUpdate }) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
    });

    useEffect(() => {
        if (course) {
            setForm({
                _id: course._id,
                title: course.title || "",
                description: course.description || "",
                price: course.price || "",
            });
        }
    }, [course]);

    if (!open || !course) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        onUpdate(form);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-fadeIn">
                {/* Header */}
                <div className="mb-5">
                    <h2 className="text-2xl font-bold text-slate-800">
                        Edit Course
                    </h2>
                    <p className="text-sm text-slate-500">
                        Update course information
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Course Title
                        </label>
                        <input
                            name="title"
                            type="text"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows="3"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Price (₹)
                        </label>
                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-slate-300
                       text-slate-700 hover:bg-slate-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdate}
                        className="px-5 py-2 rounded-lg bg-green-600
                       text-white font-semibold hover:bg-green-700
                       transition shadow-md"
                    >
                        Update Course
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCourseModal;
