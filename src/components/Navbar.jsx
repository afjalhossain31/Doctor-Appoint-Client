"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, LogOut, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/assets/Logo.png"
              alt="DoctorAppoint Logo"
              width={42}
              height={42}
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-slate-900 font-extrabold text-2xl tracking-tight">
              Doctor<span className="text-blue-600">Appoint</span>
            </span>
          </Link>

          {/* Desktop Navigation Menu */}
          <ul className="hidden md:flex items-center gap-1">
            <li>
              <Link 
                href="/" 
                className="px-4 py-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium text-sm"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/all-appointment" 
                className="px-4 py-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium text-sm"
              >
                All Appointment
              </Link>
            </li>
            {session && (
              <li>
                <Link 
                  href="/dashboard" 
                  className="px-4 py-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium text-sm"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Desktop Authentication Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="flex items-center gap-2 bg-gray-50 hover:bg-blue-50 px-3 py-1.5 rounded-full border border-gray-100 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold relative overflow-hidden">
                    {session.user.image ? (
                        <Image src={session.user.image} alt="User" fill className="object-cover" />
                    ) : (
                        session.user.name?.[0]
                    )}
                  </div>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600">{session.user.name}</span>
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="p-2.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all"
                  title="Sign Out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-slate-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-blue-600 shadow-xl shadow-slate-200 hover:shadow-blue-200 transition-all duration-300 text-sm font-bold"
                >
                  Register
                </Link>
              </>
            )}
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