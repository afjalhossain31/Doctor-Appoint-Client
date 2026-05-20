"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl shadow-gray-200 p-10 border border-gray-100">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-2 mb-6 group">
            <Image src="/assets/Logo.png" alt="Logo" width={50} height={50} className="group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-black text-slate-900">Doctor<span className="text-blue-600">Appoint</span></span>
          </Link>
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-blue-600" size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900">Password Reset</h1>
          <p className="text-gray-500 mt-4 font-medium">This feature is coming soon. Please try again later or contact support.</p>
        </div>

        <Link href="/login" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-2 group mb-4">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>

        <div className="text-center">
          <p className="text-gray-500 text-sm font-medium">
            Remember your password?{" "}
            <Link href="/login" className="text-blue-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
