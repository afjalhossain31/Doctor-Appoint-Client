"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, ArrowRight, Search } from "lucide-react";
import { useEffect, useState } from "react";

const AllAppointmentsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
        if (res.ok) {
          const data = await res.json();
          setDoctors(data);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Available Appointments</h1>
            <p className="text-gray-500 font-medium">Find and book your preferred specialist instantly.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search doctors..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-80 transition-all font-medium"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.length === 0 ? (
                <div className="col-span-full text-center py-10">
                    <p className="text-gray-500 font-bold">No doctors found matching your criteria.</p>
                </div>
            ) : (
                filteredDoctors.map((doctor) => (
                    <div key={doctor._id} className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 group">
                        <div className="relative h-64">
                        <Image
                            src={doctor.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=500"}
                            alt={doctor.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-1.5 shadow-sm border border-white/50">
                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-black text-slate-900">{doctor.rating || "4.9"}</span>
                        </div>
                        </div>
                        
                        <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] px-3 py-1 bg-blue-50 rounded-lg mb-2 inline-block">
                                {doctor.specialty}
                            </span>
                            <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                                {doctor.name}
                            </h3>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-gray-500 font-medium text-sm">
                            <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-blue-600">
                                <Clock size={16} />
                            </div>
                            <span>{doctor.experience || "10+ Years Experience"}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500 font-medium text-sm">
                            <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-blue-600">
                                <MapPin size={16} />
                            </div>
                            <span>{doctor.location || "Dhanmondi, Dhaka"}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-gray-100 gap-4">
                            <Link
                            href={`/doctors/d1`}
                            className="flex-1 text-center py-4 rounded-2xl border-2 border-slate-100 text-slate-900 font-black text-sm hover:bg-slate-50 transition-all uppercase tracking-wider"
                            >
                            Details
                            </Link>
                            <Link
                            href={`/book-appointment?doctor=${encodeURIComponent(doctor.name)}`}
                            className="flex-1 text-center py-4 rounded-2xl bg-blue-600 text-white font-black text-sm hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all uppercase tracking-wider"
                            >
                            Book Now
                            </Link>
                        </div>
                        </div>
                    </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointmentsPage;
