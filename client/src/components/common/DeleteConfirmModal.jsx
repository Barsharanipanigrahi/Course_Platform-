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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[360px] p-6 rounded-xl shadow-lg">
                {/* Title */}
                <h2 className="text-lg font-bold text-red-600 mb-3">
                    {title}
                </h2>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-6">
                    {description}
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border text-slate-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onDelete}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
