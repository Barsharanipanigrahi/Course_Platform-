import React, { useState } from "react";
import axios from "axios";
import { Linkedin, Facebook, Send } from "lucide-react";
import {  FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, seteMessage] = useState("");

  const url = import.meta.env.VITE_BACKEND_URL;

  const handelSubmit = async () => {
    try {
      const posturl = url + "/contact/add";
      const res = await axios.post(posturl, {
        name,
        email,
        phone,
        message,
      });

      if (res?.data?.status) {
        alert(res?.data?.message);
        setname("");
        setemail("");
        setPhone("");
        seteMessage("");
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br  px-4 py-16">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* HERO SECTION */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-extrabold text-slate-800 mb-6">
              Contact Us
            </h1>
            <p className="text-white-600 max-w-lg leading-relaxed">
              Bridging the communication gap between us is the first move
              to collaborate with us. Learn how we can support your vision
              and prepare your institute for the future of education.
            </p>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute w-80 h-80 rounded-full bg-indigo-100 -z-10"></div>
            <div className="bg-white rounded-2xl shadow-xl p-4">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
                alt="Support"
                className="rounded-xl w-72"
              />
            </div>
          </div>
        </div>

        {/* CONTACT CARD */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2 p-10 gap-10">
          {/* LEFT INFO */}
          <div>
          </div>
          <br></br>
          {/* TESTIMONIALS SECTION */}
          <div className="max-w-7xl mx-auto space-y-12">
            <h2 className="text-3xl font-extrabold rouded-2xl hover:bg-yellow-200 text-center text-black-800">
              What Our Clients Say
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Amit Sharma",
                  role: "Institute Director",
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAkopE5KuSrJ9qEoDuJDdNq-fB5WGloW9c2Q&s",
                  message:
                    "This platform completely transformed how we manage courses and students. Simple, powerful, and reliable!",
                },
                {
                  name: "Priya Verma",
                  role: "Online Educator",
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuDP407tSUJIFX1F07FjMhrARq-oKKHfXvTg&s",
                  message:
                    "The course platform features are extremely smooth. Live classes and analytics helped me scale my teaching easily.",
                },
                {
                  name: "Rahul Das",
                  role: "HR",
                  image: "https://thumbs.dreamstime.com/b/mature-businessman-office-working-computer-reviewing-documents-analyzing-data-desk-cup-coffee-professional-401881586.jpg",
                  message:
                    "The course platform is a software system that allows individuals or institutions to create, host, manage, and sell educational content.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
                >
                  <p className="text-black-600 mb-6 leading-relaxed">
                    “{item.message}”
                  </p>

                  <div className="flex items-center gap-4">
                    {/* IMAGE */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <div>
                      <p className="font-semibold text-slate-800">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* RIGHT: IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Happy learners"
              className="rounded-3xl shadow-xl max-h-[420px] object-cover"
            />
          </div>


          <br></br>
          
          {/* RIGHT FORM */}
          <div>
            <h3 className="text-4xl font-extrabold text-center mb-14 text-gray-900">
              Contact Us
            </h3>

            <div className="grid gap-5">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />

              <textarea
                rows="4"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => seteMessage(e.target.value)}
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none"
              />

              <button
                onClick={handelSubmit}
                className="bg-indigo-500 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg"
              >
                Send Message 🚀
              </button>
         {/* left image*/}
      <div className="w-full flex justify-start">
       <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Contact illustration"
            className="rounded-2xl w-80 shadow-xl max-h-[400px]"
       />
      </div>
            </div>
          </div>
        </div>        
      </div>
    </section>
  );

};

export default Contact;