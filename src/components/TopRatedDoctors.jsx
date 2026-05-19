"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=500",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 4.9,
    reviews: 150,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=500",
  },
];

const TopRatedDoctors = () => {
  // Mock login state - in a real app, this would come from an Auth Context
  const isLoggedIn = false; 

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
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-transform duration-300 group">
              <div className="relative h-72">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold text-slate-900">{doctor.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-blue-600 font-bold text-sm mb-2 px-3 py-1 bg-blue-50 rounded-full inline-block">
                  {doctor.specialty}
                </p>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{doctor.name}</h3>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    <span className="font-bold text-slate-900">{doctor.reviews}</span> Reviews
                  </div>


                  
                  <Link
                    href={`/doctors/d1`}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;
