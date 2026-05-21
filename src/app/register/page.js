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
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const { name, email, password } = Object.fromEntries(formData.entries());

    // Password Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    setLoading(true);

    await authClient.signUp.email({
      email,
      password,
      name,
      image: "",
    }, {
      onRequest: () => {
        setLoading(true);
      },
      onSuccess: () => {
        toast.success("Registration successful!");
        router.push("/login");
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
        callbackURL: "/",
      });
    } catch (err) {
      toast.error(`Login with ${provider} failed`);
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
                type={showPassword ? "text" : "password"}
                required
                className="block w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400"
                placeholder="Create Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 hover:text-blue-600 transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
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
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full px-4 py-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-slate-700 hover:border-blue-600 hover:bg-blue-50 transition-all shadow-sm disabled:opacity-70"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <image href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/%3E%3Cpath fill='%2334A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/%3E%3Cpath fill='%23FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/%3E%3Cpath fill='%23EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/%3E%3Cpath fill='none' d='M1 1h22v22H1z'/%3E%3C/svg%3E" width="20" height="20" alt="Google" />
            </svg>
            <span>{loading ? "Signing up..." : "Google"}</span>
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
