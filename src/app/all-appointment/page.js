"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, ArrowRight, Search, X, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const AllAppointmentsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [specialties, setSpecialties] = useState([]);
  const { data: sessionData } = authClient.useSession();
  const router = useRouter();

  const handleViewDetails = (doctorId) => {
    if (!sessionData?.user) {
      router.push("/login");
      return;
    }
    router.push(`/doctors/${doctorId}`);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
        if (res.ok) {
          const data = await res.json();
          setDoctors(data);
          // Extract unique specialties
          const uniqueSpecialties = ["All", ...new Set(data.map(d => d.specialty))];
          setSpecialties(uniqueSpecialties);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialty === "All" || doc.specialty === specialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleClearSearch = () => {
    setSearchTerm("");
    setSpecialty("All");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3">Find Your Specialist</h1>
            <p className="text-gray-500 font-medium text-lg">Search and book appointments with top-rated doctors</p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={22} />
                <input 
                  type="text" 
                  placeholder="Search by doctor name or specialty..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-600 focus:bg-white focus:outline-none transition-all font-medium text-slate-900 placeholder:text-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Specialty Filter */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-600 uppercase tracking-wider">
                  <Filter size={18} className="text-blue-600" />
                  Filter by Specialty:
                </div>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((spec) => (
                    <button
                      key={spec}
                      onClick={() => setSpecialty(spec)}
                      className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${
                        specialty === spec
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(searchTerm || specialty !== "All") && (
                <button
                  onClick={handleClearSearch}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 underline"
                >
                  Clear all filters
                </button>
              )}

              {/* Results Count */}
              <div className="pt-2 border-t border-gray-100">
                <p className="text-sm font-bold text-slate-600">
                  Found <span className="text-blue-600">{filteredDoctors.length}</span> {filteredDoctors.length === 1 ? "doctor" : "doctors"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-500 font-medium">Loading doctors...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.length === 0 ? (
                <div className="col-span-full text-center py-16">
                    <Search size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 font-bold text-lg">No doctors found matching your criteria.</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</p>
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
                            <button
                            onClick={() => handleViewDetails(doctor._id || 'd1')}
                            className="flex-1 text-center py-4 rounded-2xl border-2 border-slate-100 text-slate-900 font-black text-sm hover:bg-slate-50 transition-all uppercase tracking-wider"
                            >
                            Details
                            </button>
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
}

export default AllAppointmentsPage;
