import React, { useEffect, useState } from 'react'
import axios from "axios"

const AdminContacts = () => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const [contacts, setContacts] = useState([]);

    // delete contact

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure?");
        if (!confirmDelete) return;
    
        try {
            const deleteUrl = url+ `/contact/delete/${id}`;
            const res = await axios.delete(deleteUrl);
    
            if (res.data.status) {
                fetchContacts();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchContacts = async () => {
        const url = import.meta.env.VITE_BACKEND_URL;
        try {
            const geturl = url + '/contact/get'
            const res = await axios.get(geturl)

            if (res.data.status) {
                setContacts(res.data.Contact)
            }

        } catch (err) {
            console.log(err)
        }
    }


    //update contact

    const handleUpdate = (contacts) => {
        setEditontact(contacts);
        setShowForm(true);
    };

    useEffect(() => {
        fetchContacts()
    }, []);
    return (
        <div>
            <table className="w-full">
                <thead className='border bg-green-500'>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Message</td>
                        <td>Delete</td>
                        <td>Update</td>
                        
                    </tr>
                </thead>
                <tbody>

                    {contacts?.length > 0 && contacts.map((ele) =>
                        <tr key={ele._id} >
                            <td>{ele?.name}</td>
                            <td>{ele?.email}</td>
                            <td>{ele?.phone}</td>
                            <td>{ele?.message}</td>
                            <td ><button onClick={()=>handleDelete(ele._id)}
                                className='bg-red-600 text-white px-1 py-1 rounded'
                                >Delete</button>
                             </td>
                             <td>
                                   <button
                                        onClick={() => {handleUpdate(ele);
                                            setShowForm(true);
                                        }}
                                        className="bg-green-600 text-white px-2 py-1 rounded"
                                        >
                                          Update
                                    </button>
                                           
                                </td>
                        </tr>
                    )}
                   
                </tbody>
            </table>

        </div>
    )
}

export default AdminContacts
