import React, { useEffect, useState } from 'react'
import axios from "axios"

const AdminContacts=()=> {
    const url=import.meta.env.VITE_BACKEND_URL;
    const[contacts,setContacts]=useState([]);
    console.log(contacts);

    const fetchContacts=async()=>{
        const url=import.meta.env.VITE_BACKEND_URL;
        try{
            const geturl=url+'/contact/get'
            const res=await axios.get(geturl)
           
            if(res.data.status){
                setContacts(res.data.Contacts)
            }

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchContacts()
    },[]);
  return (
    <div>
        <table className="w-full">
            <thead className='border bg-green-500'>
            <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Message</td>
            </tr>
            </thead>
            <tbody>
            {contacts?.length>0 && contacts.map((ele)=>{
                    <tr>
                    <td>{ele?.Name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.Phone}</td>
                    <td>{ele.Message}</td>
                    </tr>
                })
            }

            </tbody>
        </table>
      
    </div>
  )
}

export default AdminContacts
