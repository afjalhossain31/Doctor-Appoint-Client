"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Calendar, Clock, User, Phone, Mail, Activity } from "lucide-react";
import { apiBaseUrl } from "@/lib/api-base";

function AppointmentForm() {
  const { data: sessionData, isPending } = authClient.useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const doctorFromQuery = searchParams.get("doctor");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    gender: "Male",
    phone: "",
    appointmentDate: "",
    appointmentTime: "10:30 AM",
    doctorName: doctorFromQuery || "Dr. Ayesha Rahman"
  });

  useEffect(() => {
    if (doctorFromQuery) {
      const timer = setTimeout(() => {
        setFormData(prev => ({ ...prev, doctorName: doctorFromQuery }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [doctorFromQuery]);

  useEffect(() => {
    if (!isPending && !sessionData) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/book-appointment${doctorFromQuery ? `?doctor=${encodeURIComponent(doctorFromQuery)}` : ""}`)}`);
    }
  }, [isPending, sessionData, router, doctorFromQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingData = {
      ...formData,
      userEmail: sessionData?.user?.email || "user@gmail.com",
    };

    try {
      const res = await fetch(`${apiBaseUrl}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        toast.success("Appointment booked successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Failed to book appointment");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-100/50 overflow-hidden border border-blue-50">
          <div className="bg-blue-600 p-10 text-white text-center">
            <h1 className="text-3xl font-black mb-2">Book Your Appointment</h1>
            <p className="text-blue-100 font-medium">Fill in the details below to schedule your visit</p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Patient Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-wider">
                  <User size={16} className="text-blue-600" /> Patient Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-slate-900"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-wider">
                  <Activity size={16} className="text-blue-600" /> Gender
                </label>
                <select
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-slate-900 appearance-none"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-wider">
                  <Phone size={16} className="text-blue-600" /> Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="017XXXXXXXX"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-slate-900"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              {/* Doctor Name (Pre-filled for Demo) */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-wider">
                  <User size={16} className="text-blue-600" /> Doctor Name
                </label>
                <input
                  type="text"
                  readOnly
                  className="w-full px-6 py-4 rounded-2xl bg-slate-100 border border-slate-100 font-bold text-slate-500 cursor-not-allowed"
                  value={formData.doctorName}
                />
              </div>

              {/* Appointment Date */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-wider">
                  <Calendar size={16} className="text-blue-600" /> Preferred Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-slate-900"
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                />
              </div>

              {/* Appointment Time */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-black text-slate-700 uppercase tracking-wider">
                  <Clock size={16} className="text-blue-600" /> Preferred Time
                </label>
                <select
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-slate-900 appearance-none"
                  value={formData.appointmentTime}
                  onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                </select>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-blue-600 text-white font-black text-lg rounded-[1.5rem] shadow-xl shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transform hover:-translate-y-1 transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                  </span>
                ) : (
                  "Confirm Appointment"
                )}
              </button>
            </div>
            
            <p className="text-center text-slate-400 text-sm font-medium">
              By booking, you agree to our Terms of Service
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentBookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AppointmentForm />
    </Suspense>
  );
}
