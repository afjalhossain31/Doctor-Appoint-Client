"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/assets/Logo.png"
              alt="DoctorAppoint Logo"
              width={46}
              height={46}
              className="object-contain"
            />
            <span className="text-[#2563EB] font-bold text-xl tracking-tight">
              DoctorAppoint
            </span>
          </Link>

          {/* Desktop Navigation Menu */}
          <ul className="hidden md:flex items-center gap-2">
            <li>
              <Link 
                href="/" 
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/all-appointment" 
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 font-medium"
              >
                All Appointment
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard" 
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 font-medium"
              >
                Dashboard
              </Link>
            </li>
          </ul>

          {/* Desktop Authentication Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link 
              href="/login" 
              className="px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-all font-medium"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 transition-all font-medium"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#2563EB] transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b shadow-lg animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col p-4 gap-4">
            <li>
              <Link href="/" onClick={() => setIsOpen(false)} className="block hover:text-[#2563EB]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/all-appointment" onClick={() => setIsOpen(false)} className="block hover:text-[#2563EB]">
                All Appointment
              </Link>
            </li>
            <li>
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block hover:text-[#2563EB]">
                Dashboard
              </Link>
            </li>
            <hr />
            <li>
              <Link href="/login" onClick={() => setIsOpen(false)} className="block hover:text-[#2563EB]">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" onClick={() => setIsOpen(false)} className="block hover:text-[#2563EB]">
                Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;