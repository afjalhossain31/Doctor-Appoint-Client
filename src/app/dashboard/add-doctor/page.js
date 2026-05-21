"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiBaseUrl } from "@/lib/api-base";

export default function AddDoctorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const specialty = form.specialty.value;
    const qualification = form.qualification.value;
    const image = form.image.value;
    const fee = form.fee.value;

    const doctorData = { name, specialty, qualification, image, fee: parseInt(fee) };

    try {
      const res = await fetch(`${apiBaseUrl}/doctors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorData),
      });

      if (res.ok) {
        toast.success("Doctor added successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Failed to add doctor");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100">
        <h2 className="text-3xl font-black text-slate-900 mb-8 text-center italic">Add New Doctor</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Doctor&apos;s Name</label>
            <input name="name" type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Dr. John Doe" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Specialty</label>
            <input name="specialty" type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Cardiologist" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Qualification</label>
            <input name="qualification" type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="MBBS, FCPS" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
            <input name="image" type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://example.com/image.jpg" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Consultation Fee (৳)</label>
            <input name="fee" type="number" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="1000" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-lg hover:bg-blue-700 transition-all disabled:bg-gray-400"
          >
            {loading ? "Adding..." : "Add Doctor Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
