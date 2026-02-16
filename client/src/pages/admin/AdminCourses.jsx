import React, { useEffect, useState } from 'react';
import axios from "axios";
import AddCourses from '../../components/courses/Coursescomponent';

function AdminCourses() {
    const url = import.meta.env.VITE_BACKEND_URL;

    const [courses, setCourses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editCourses, setEditCourses] = useState(null);

    const fetchCourses = async () => {
        try {
            const res = await axios.get(url + "/course/get");
            if (res.data.status) {
                setCourses(res.data.courses);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const res = await axios.delete(url + `/course/delete/${id}`);
            if (res.data.status) {
                fetchCourses();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = (course) => {
        setEditCourses(course);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditCourses(null);
        setShowForm(true);
    };

    return (
        <div>
            <button className='bg-blue-800 p-2 text-white mb-3' onClick={showForm ? () => setShowForm(false) : handleAdd}>
                {showForm ? "Cancel" : "Add"}
            </button>

            {showForm && (
                <AddCourses
                    fetchCourses={fetchCourses}
                    setShowForm={setShowForm}
                    editCourses={editCourses}
                    setEditCourses={setEditCourses}
                />
            )}

            <table className='w-full'>
                <thead className='border bg-blue-400'>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course._id}>
                            <td>{course.title}</td>
                            <td>{course.price}</td>
                            <td>{course.description}</td>
                            
                            <td>
                                <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(course._id)}>
                                    Delete
                                </button>
                            </td>
                            <td>
                                <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={() => handleUpdate(course)}>
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminCourses;
