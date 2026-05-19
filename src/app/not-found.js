"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-black text-slate-900 tracking-tighter mb-4">404</h1>
        <h2 className="text-4xl font-black text-slate-800 mb-6">Page Not Found</h2>
        <p className="text-gray-500 text-lg mb-12 font-medium">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
                href="/"
                className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
                <Home size={20} /> Back to Home
            </Link>
            <button 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-100 hover:bg-slate-800 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
            >
                <ArrowLeft size={20} /> Go Back
            </button>
        </div>
      </div>
    </div>
  );
}
