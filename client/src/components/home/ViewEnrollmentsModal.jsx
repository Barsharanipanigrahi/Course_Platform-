import React from "react";
import { X } from "lucide-react";

const ViewEnrollmentsModal = ({ open, onClose, courses }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[450px] rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Enrolled Courses</h2>
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                {courses.length === 0 ? (
                    <p className="text-slate-500">No courses enrolled</p>
                ) : (
                    <ul className="space-y-3">
                        {courses.map((enroll) => (
                            <li
                                key={enroll._id}
                                className="border p-3 rounded-lg"
                            >
                                <h4 className="font-semibold">
                                    {enroll.course.title}
                                </h4>
                                <p className="text-sm text-slate-600">
                                    {enroll.course.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ViewEnrollmentsModal;
