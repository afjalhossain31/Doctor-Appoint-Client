"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, Calendar, ArrowRight, Filter, Search } from "lucide-react";

// Demo data for all appointments/doctors
const allDoctors = [
  {
    id: "d1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 120,
    experience: "12 years",
    location: "Dhanmondi, Dhaka",
    fee: 1000,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: "d2",
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 95,
    experience: "8 years",
    location: "Banani, Dhaka",
    fee: 1200,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: "d3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 4.9,
    reviews: 150,
    experience: "10 years",
    location: "Uttara, Dhaka",
    fee: 800,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: "d4",
    name: "Dr. James Wilson",
    specialty: "Orthopedic",
    rating: 4.7,
    reviews: 80,
    experience: "15 years",
    location: "Mirpur, Dhaka",
    fee: 900,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: "d5",
    name: "Dr. Lisa Wang",
    specialty: "Dermatologist",
    rating: 4.8,
    reviews: 110,
    experience: "7 years",
    location: "Gulshan, Dhaka",
    fee: 1100,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: "d6",
    name: "Dr. Robert Fox",
    specialty: "General Surgeon",
    rating: 4.6,
    reviews: 65,
    experience: "20 years",
    location: "Dhanmondi, Dhaka",
    fee: 1500,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=500",
  },
];

const AllAppointmentsPage = () => {
  // Mock login state - change to false to test redirect
  const isLoggedIn = true; 

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
                className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-80 transition-all font-medium"
              />
            </div>
            <button className="p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:bg-gray-50 transition-colors text-slate-900 px-5 flex items-center gap-2 font-bold">
              <Filter size={20} />
              Filter
            </button>
          </div>
        </div>

        {/* Appointment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-2 transition-all duration-300 group flex flex-col">
              
              {/* Image & Price Tag */}
              <div className="relative h-64">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Available Today</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-blue-600 px-4 py-2 rounded-2xl text-white font-black shadow-lg shadow-blue-200">
                    ৳ {doctor.fee}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {doctor.specialty}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">{doctor.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-yellow-700">{doctor.rating}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                    <Calendar size={16} className="text-blue-500" />
                    <span>{doctor.experience} Experience</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                    <MapPin size={16} className="text-blue-500" />
                    <span>{doctor.location}</span>
                  </div>
                </div>

                <div className="mt-auto">
                    <Link
                        href={isLoggedIn ? `/doctors/d1` : "/login"}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group/btn"
                    >
                        View Details
                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty State / Pagination (optional) */}
        <div className="mt-16 text-center">
            <button className="px-8 py-3.5 border-2 border-slate-900 font-bold rounded-2xl hover:bg-slate-900 hover:text-white transition-all">
                Load More Doctors
            </button>
        </div>

      </div>
    </div>
  );
};

export default AllAppointmentsPage;
