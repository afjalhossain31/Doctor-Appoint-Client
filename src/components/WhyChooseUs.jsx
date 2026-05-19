"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";

const WhyChooseUs = () => {
  const benefits = [
    "World-class medical team of expert specialists",
    "24/7 online health consultation and support",
    "Easy and quick appointment booking system",
    "Comprehensive health records & patient portal",
    "Affordable health packages for everyone"
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold tracking-wide uppercase">
              Core Values
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Why Patients Choose <br />
              <span className="text-blue-600">Our Healthcare</span> Excellence
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              We combine medical expertise with cutting-edge technology to provide you with the best healthcare experience in the city. Your health is our top priority.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <CheckCircle className="text-blue-600" size={16} />
                  </div>
                  <span className="text-slate-700 font-medium text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image/Graphic */}
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                    alt="Doctor with patient"
                    width={800}
                    height={600}
                    className="object-cover"
                />
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-50 rounded-full -z-0 opacity-50 blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-100 rounded-full -z-0 opacity-50 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
