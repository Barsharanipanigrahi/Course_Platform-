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
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-xl">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800">
            Contact Us
          </h2>
          <p className="text-slate-500 mt-2">
            Have questions? Send us a message and we’ll get back to you.
          </p>
        </div>

        {/* Form */}
        <div className="grid gap-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => seteMessage(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3
                       focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Button */}
          <button
            onClick={handelSubmit}
            className="bg-blue-600 text-white py-3 rounded-xl font-semibold
                     hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
}

export default Contact
