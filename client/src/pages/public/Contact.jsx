import React, { useState } from 'react'
import axios from "axios";

const Contact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, seteMessage] = useState("");

  const url = import.meta.env.VITE_BACKEND_URL

  const handelSubmit = async () => {
    try {
      const posturl = url + '/contact/add'

      const res = await axios.post(posturl, {

        name,
        email,
        phone,
        message,

      })
      console.log(res?.data)
      if (res?.data?.status) {
        alert(res?.data?.message);
        setname("");
        setemail("")
        setPhone("")
        seteMessage("")

      } else {
        alert("something went wrong")
      }


    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='border grid gap-2 w-1/2 m-auto p-4 shadow-x1 rounded-2x1'>
      <input className="input-class"
        type="text"
        placeholder='Enter name'
        onChange={(e) => setname(e.target.value)} value={name} />
      <input className="input-class" type="text" placeholder='Enter email' onChange={(e) => setemail(e.target.value)} value={email} />
      <input className="input-class" type="text" placeholder='Enter phone' onChange={(e) => setPhone(e.target.value)} value={phone} />
      <input className="input-class" type="text" placeholder='Enter message' onChange={(e) => seteMessage(e.target.value)} value={message} />
      <button onClick={handelSubmit} className="botton">submit</button>
    </div>
  )
}

export default Contact
