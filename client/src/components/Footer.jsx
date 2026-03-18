import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Linkedin, Facebook, Send } from "lucide-react";
import {  FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className="mt-20 bg-gradient-to-r bg-indigo-200  text-white">
      {/* CTA Section */}
      <section className="py-16 text-center px-4 border-b border-slate-800">
        <h2 className="text-3xl font-bold mb-4 text-white-400">
          Start Learning Today 🚀
        </h2>
        <p className="mb-8 text-white-400">
          Join thousands of learners and upgrade your skills.
        </p>

        {!user && (
          <Link
            to="/register"
            className="inline-block bg-yellow-400 text-black px-10 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
          >
            Create Free Account
          </Link>
        )}
    

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-2xl font-bold mb-3">
            <span className="text-blue-900">Learn</span>
            <span style={{ color: "#55C437" }}>ify</span>
          </h3>
          <p className="text-white-400">
            Learnify is an online learning platform to help students grow
            their skills and build a better future.
          </p>
        </div>

        {/* CONTACT INFO */}
        <div>
            <h4 className="text-lg  text-blue-700 font-bold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-white/500">
              <li>📧 panigrahibarsharani20@gmail.com</li>
              <li>📞 +91 98765 43210</li>
              <li>📍 Bhubaneswar, India</li>
            </ul>
          </div>

        <div>
            <h4 className="text-lg  text-blue-600 font-bold mb-4">Connect With Quick Links</h4>
            <div className="flex justify-center md:justify-center gap-5">

              <a
          href="https://wa.me/919876543210"
          target="_blank"
          className="bg-green-600 p-3 rounded-full hover:bg-green-500 transition"
        >
          <FaWhatsapp />
        </a>

        <a
          href="https://www.linkedin.com"
          target="_blank"
          className="bg-blue-600 p-3 rounded-square hover:bg-blue-600 transition"
        >
          <Linkedin  />
        </a>

        <a
          href="https://www.facebook.com"
          target="_blank"
          className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition"
        >
          <Facebook  />
        </a>

        <a
          href="https://t.me"
          target="_blank"
          className="bg-blue-600 p-3 rounded-square hover:bg-sky-400 transition"
        >
          <Send  />
        </a>

            </div>
          </div>
        </div>
        {/* BOTTOM BAR */}
        <div className="border-t border-white/50 text-center py-4 text-sm text-white/100">
          © {new Date().getFullYear()} Course Platform. All rights reserved.
        </div>
        </section>
    </footer>
  );
};

export default Footer;