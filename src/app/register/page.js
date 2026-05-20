"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Lock, 
  Image as ImageIcon, 
  Globe, 
  Github, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { name, email, password } = Object.fromEntries(formData.entries());

    const { data, error: authError } = await authClient.signUp.email({
      email,
      password,
      name,
      image: "", // Optional: specific in Better Auth
    }, {
      onRequest: () => {
        setLoading(true);
      },
      onSuccess: () => {
        toast.success("Registration successful!");
        router.push("/dashboard");
      },
      onError: (ctx) => {
        setError(ctx.error.message || "Registration failed");
        toast.error(ctx.error.message || "Error creating account");
        setLoading(false);
      },
    });
  };

  const handleSocialSignup = async (provider) => {
    try {
      setLoading(true);
      await authClient.signIn.social({
        provider: provider,
        callbackURL: "/dashboard",
      });
    } catch (err) {
      toast.error(`Login with ${provider} failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 mb-6">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Register</h2>
          <p className="mt-2 text-slate-500 font-medium">Join our healthcare community today</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100 animate-shake">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Name */}
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input
                name="name"
                type="text"
                required
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400"
                placeholder="Full Name"
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input
                name="email"
                type="email"
                required
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400"
                placeholder="Email Address"
              />
            </div>

            {/* Photo URL */}
            <div className="relative group">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input
                name="photo"
                type="url"
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400"
                placeholder="Photo URL (Optional)"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input
                name="password"
                type="password"
                required
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400"
                placeholder="Create Password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black rounded-2xl text-white bg-slate-900 hover:bg-blue-600 focus:outline-none transition-all shadow-xl shadow-slate-200 disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Register Now"}
            {!loading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500 font-bold uppercase tracking-widest text-[10px]">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => handleSocialSignup("google")}
            className="flex items-center justify-center gap-3 w-full px-4 py-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-slate-700 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm"
          >
            <Globe size={20} className="text-blue-600" />
            <span>Signup with Google</span>
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-500 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-black hover:underline underline-offset-4 decoration-2">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
