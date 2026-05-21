"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { apiBaseUrl } from "@/lib/api-base";

const TopRatedDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: sessionData } = authClient.useSession();
  const router = useRouter();

  const handleViewDetails = (doctorId) => {
    if (!sessionData?.user) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/doctors/${doctorId}`)}`);
      return;
    }
    router.push(`/doctors/${doctorId}`);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/doctors`);
        if (res.ok) {
          let data = await res.json();
          
          // Find Dr. Afjal Hossain and prioritize it in top 3
          const afjal = data.find(d => d.name && d.name.toLowerCase().includes("afjal"));
          if (afjal) {
            // Remove Afjal from the array if found
            data = data.filter(d => d._id !== afjal._id);
            // Add Afjal at the beginning
            data.unshift(afjal);
          }
          
          setDoctors(data.slice(0, 3)); // Only show top 3 on home page
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading top doctors...</p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Top Rated Doctors
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Consult with our world-class medical specialists who are highly rated for their expertise and compassionate care.
            </p>
          </div>
          <Link href="/all-appointment" className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
            View All Specialized Doctors <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No doctors found in the database.</p>
            </div>
          ) : (
            doctors.map((doctor) => (
              <div key={doctor._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-transform duration-300 group">
                <div className="relative h-72">
                  <Image
                    src={doctor.image || "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=500"}
                    alt={doctor.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-bold text-slate-900">{doctor.rating || "4.9"}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-blue-600 font-bold text-sm mb-2 px-3 py-1 bg-blue-50 rounded-full inline-block">
                    {doctor.specialty}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{doctor.name}</h3>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      <span className="font-bold text-slate-900">{doctor.reviews || "120"}</span> Reviews
                    </div>
                    <button
                      onClick={() => handleViewDetails(doctor._id || 'd1')}
                      className="px-4 py-2.5 rounded-xl border border-slate-900 text-slate-900 font-bold text-sm hover:bg-slate-50 transition-all"
                    >
                      View Details
                    </button>
                    <Link
                      href={`/book-appointment?doctor=${encodeURIComponent(doctor.name)}`}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;
