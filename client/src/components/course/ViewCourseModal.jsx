import React from "react";

const ViewCourseModal = ({ open, onClose, course }) => {
    if (!open || !course) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white w-[400px] p-5 rounded-lg">
                <h2 className="text-xl font-bold mb-3">{course.title}</h2>

                <p className="mb-2">{course.description}</p>
                <p className="font-semibold">₹ {course.price}</p>

                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="border px-3 py-1">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewCourseModal;
