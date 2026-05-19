"use client";

import { Activity, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";

const StatsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Activity, label: "Success Stories", value: "25k+", color: "bg-blue-100 text-blue-600" },
            { icon: ShieldCheck, label: "Expert Doctors", value: "150+", color: "bg-green-100 text-green-600" },
            { icon: Clock, label: "Years Experience", value: "12+", color: "bg-orange-100 text-orange-600" },
            { icon: CheckCircle2, label: "Patients Safety", value: "100%", color: "bg-purple-100 text-purple-600" },
          ].map((stat, i) => (
            <div key={i} className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-2xl hover:shadow-gray-200 transition-all duration-300 text-center flex flex-col items-center">
              <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center mb-6`}>
                <stat.icon size={28} />
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-2">{stat.value}</h3>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
