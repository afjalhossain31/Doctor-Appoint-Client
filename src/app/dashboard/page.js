"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  User, 
  Calendar, 
  Clock, 
  Settings, 
  Trash2, 
  Edit3, 
  X,
  Camera,
  CheckCircle2,
  Loader2
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const { data: sessionData, isPending } = authClient.useSession();
  const router = useRouter();
  
  // Tab Management
  const [activeTab, setActiveTab] = useState("bookings");
  const [isLoading, setIsLoading] = useState(true);

  // States for Bookings
  const [bookings, setBookings] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);

  // States for Doctors from DB
  const [doctors, setDoctors] = useState([]);

  // States for Profile
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    photo: ""
  });

  // Modal States
  const [editBooking, setEditBooking] = useState(null);
  const [editDoctor, setEditDoctor] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  // Stats states for client-side only calculations
  const [completedCount, setCompletedCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);

  useEffect(() => {
    if (!isPending && !sessionData) {
      router.push("/login");
    } else if (sessionData) {
      // Setup profile from session if not set
      if (sessionData.user && !profile.name) { 
        const timer = setTimeout(() => {
          setProfile({
            name: sessionData.user.name || "Demo User",
            email: sessionData.user.email || "user@doctor.com",
            photo: sessionData.user.image || ""
          });
        }, 0);
        return () => clearTimeout(timer);
      }
      
      // Fetch dynamic doctors from MongoDB
      const fetchDoctors = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
          const data = await res.json();
          setDoctors(data);
        } catch (error) {
          console.error("Error fetching doctors:", error);
        } finally {
          setIsLoading(false);
        }
      };

      // Fetch appointments for logged-in user
      const fetchAppointments = async () => {
        try {
          setAppointmentsLoading(true);
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments?email=${sessionData.user.email}`);
          if (res.ok) {
            const data = await res.json();
            setBookings(data);
            
            // Calculate stats on client-side only
            const now = new Date();
            const completed = data.filter(b => new Date(b.appointmentDate) < now).length;
            const upcoming = data.filter(b => new Date(b.appointmentDate) >= now).length;
            setCompletedCount(completed);
            setUpcomingCount(upcoming);
          }
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setAppointmentsLoading(false);
        }
      };
      
      fetchDoctors();
      fetchAppointments();
    }
  }, [isPending, router, sessionData, profile.name]);

  // Actions: Doctors
  const handleDeleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setDoctors(doctors.filter(d => d._id !== id));
        toast.success("Doctor removed successfully!");
      } else {
        toast.error("Failed to delete doctor");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("An error occurred while deleting");
    }
  };

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedDoctorData = {
      name: formData.get("name"),
      specialty: formData.get("specialty"),
      qualification: formData.get("qualification"),
      image: formData.get("image"),
      fee: parseInt(formData.get("fee"))
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${editDoctor._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDoctorData),
      });

      if (res.ok) {
        setDoctors(doctors.map(d => d._id === editDoctor._id ? { ...d, ...updatedDoctorData } : d));
        setEditDoctor(null);
        toast.success("Doctor updated successfully!");
      } else {
        toast.error("Failed to update doctor");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
      toast.error("An error occurred while updating");
    }
  };

  // Actions: Booking
  const handleDeleteBooking = (id) => {
    setBookings(bookings.filter(b => b.id !== id));
    toast.success("Appointment deleted successfully!");
  };

  const handleUpdateBooking = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = {
      date: formData.get("date"),
      time: formData.get("time")
    };
    
    setBookings(bookings.map(b => b.id === editBooking.id ? { ...b, ...updatedData } : b));
    setEditBooking(null);
    toast.success("Appointment updated successfully!");
  };

  // Actions: Profile
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProfile = {
      name: formData.get("name"),
      photo: formData.get("photo")
    };
    
    setProfile(prev => ({ ...prev, ...updatedProfile }));
    setIsProfileModalOpen(false);
    toast.success("Profile updated successfully!");
  };

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-900 font-bold text-xl animate-pulse">Loading Your Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-gray-200/40 border border-gray-100 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-black border-4 border-white shadow-xl overflow-hidden relative">
                {profile.photo ? (
                    <Image src={profile.photo} alt="Profile" fill className="object-cover" />
                ) : (
                    profile.name?.[0] || "U"
                )}
              </div>
              <button 
                onClick={() => setIsProfileModalOpen(true)}
                className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full border-2 border-white hover:bg-blue-600 transition-colors"
              >
                <Camera size={16} />
              </button>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-black text-slate-900 mb-1">Hello, {profile.name || "User"}!</h1>
              <p className="text-gray-500 font-medium">{profile.email || "email@example.com"}</p>
            </div>
            <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl">
              <button 
                onClick={() => setActiveTab("bookings")}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'bookings' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-slate-900'}`}
              >
                My Bookings
              </button>
              <button 
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'profile' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-slate-900'}`}
              >
                My Profile
              </button>
              <button 
                onClick={() => setActiveTab("doctors")}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'doctors' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-slate-900'}`}
              >
                Our Doctors
              </button>
              <button 
                onClick={() => router.push("/dashboard/add-doctor")}
                className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all bg-slate-900 text-white hover:bg-slate-800"
              >
                + Add Doctor
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-[2.5rem] p-6 border border-blue-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                <Calendar size={20} />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-white px-3 py-1 rounded-full">This Month</span>
            </div>
            <p className="text-gray-600 font-medium text-sm mb-1">Total Appointments</p>
            <h3 className="text-3xl font-black text-slate-900">{bookings.length}</h3>
          </div>

          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-[2.5rem] p-6 border border-green-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-green-600 text-white flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
              <span className="text-xs font-bold text-green-600 bg-white px-3 py-1 rounded-full">Completed</span>
            </div>
            <p className="text-gray-600 font-medium text-sm mb-1">Completed Visits</p>
            <h3 className="text-3xl font-black text-slate-900">{completedCount}</h3>
          </div>

          <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-[2.5rem] p-6 border border-orange-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center">
                <Clock size={20} />
              </div>
              <span className="text-xs font-bold text-orange-600 bg-white px-3 py-1 rounded-full">Upcoming</span>
            </div>
            <p className="text-gray-600 font-medium text-sm mb-1">Upcoming Visits</p>
            <h3 className="text-3xl font-black text-slate-900">{upcomingCount}</h3>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "doctors" ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-900">Available Doctors</h2>
                <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">{doctors.length} Doctors</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div key={doctor._id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="relative w-full h-48 mb-4 rounded-2xl overflow-hidden">
                    {doctor.image ? (
                      <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-2xl">
                        {doctor.name?.[0] || "D"}
                      </div>
                    )}
                  </div>
                  <h4 className="font-bold text-lg text-slate-900">{doctor.name || "Doctor"}</h4>
                  <p className="text-blue-500 text-sm font-bold uppercase mb-2">{doctor.specialty || "Specialist"}</p>
                  <p className="text-gray-500 text-xs mb-4">{doctor.qualification || "Qualified"}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm">
                      Book Appointment
                    </button>
                    <button 
                      onClick={() => setEditDoctor(doctor)}
                      className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                      title="Edit Doctor"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteDoctor(doctor._id)}
                      className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                      title="Delete Doctor"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === "bookings" ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-900">Your Appointments</h2>
                <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">{bookings.length} Total</span>
            </div>
            
            {bookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                          {booking.doctor?.[0] || "D"}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{booking.doctor || "Doctor"}</h4>
                          <p className="text-xs text-blue-500 font-bold uppercase tracking-widest">{booking.specialty || "Specialty"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-slate-900">৳ {booking.fee || "0"}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">PAID</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-3 rounded-2xl flex items-center gap-3">
                        <Calendar size={16} className="text-blue-500" />
                        <span className="text-sm font-bold text-slate-700">{booking.appointmentDate || booking.date || "N/A"}</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-2xl flex items-center gap-3">
                        <Clock size={16} className="text-blue-500" />
                        <span className="text-sm font-bold text-slate-700">{booking.appointmentTime || booking.time || "N/A"}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          setEditBooking(booking);
                          setSelectedTimeSlot("");
                          setIsTimeDropdownOpen(false);
                        }}
                        className="flex-1 py-3 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        <Edit3 size={16} /> Update
                      </button>
                      <button 
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="flex-1 py-3 bg-red-50 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Calendar size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">No Bookings Found</h3>
                    <p className="text-gray-500 mb-8">You haven&apos;t scheduled any appointments yet.</p>
                    <button onClick={() => router.push('/all-appointment')} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                        Book Your First Appointment
                    </button>
                </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm max-w-2xl mx-auto">
             <div className="text-center mb-10">
                <h2 className="text-2xl font-black text-slate-900 mb-2">Account Profile</h2>
                <p className="text-gray-500 font-medium">Manage your personal information and profile</p>
             </div>
             
             <div className="space-y-8">
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem]">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-black overflow-hidden relative">
                        {profile.photo ? <Image src={profile.photo} alt="p" fill className="object-cover" /> : profile.name?.[0] || "U"}
                      </div>
                      <div>
                         <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Full Name</p>
                         <h4 className="text-lg font-bold text-slate-900">{profile.name || "User"}</h4>
                      </div>
                   </div>
                   <CheckCircle2 className="text-green-500" size={24} />
                </div>

                <div className="p-6 bg-gray-50 rounded-[2rem]">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
                   <h4 className="text-lg font-bold text-slate-900">{profile.email || "user@example.com"}</h4>
                </div>

                <button 
                    onClick={() => setIsProfileModalOpen(true)}
                    className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
                >
                    <Settings size={20} /> Update Profile
                </button>
             </div>
          </div>
        )}

        {/* Update Booking Modal */}
        {editBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setEditBooking(null)}></div>
            <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 overflow-visible">
               <button onClick={() => { setEditBooking(null); setIsTimeDropdownOpen(false); }} className="absolute top-6 right-6 text-gray-400 hover:text-slate-900"><X /></button>
               <h2 className="text-2xl font-black text-slate-900 mb-8">Update Appointment</h2>
               
               <form onSubmit={handleUpdateBooking} className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-400 uppercase ml-1">Doctor (Read-only)</label>
                     <input type="text" value={editBooking.doctor || "Unknown"} disabled className="w-full px-5 py-3.5 bg-gray-100 rounded-2xl text-slate-500 font-bold" />
                  </div>
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-900 uppercase ml-1">Appointment Date</label>
                        <input name="date" type="date" defaultValue={editBooking.appointmentDate || editBooking.date || ""} className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold outline-none transition-all" required />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-900 uppercase ml-1">Preferred Time Slot</label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                            className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-2xl bg-white flex items-center justify-between hover:border-blue-400 transition-colors font-bold"
                          >
                            <span className={selectedTimeSlot || editBooking.appointmentTime || editBooking.time ? 'text-slate-900' : 'text-gray-400'}>
                              {selectedTimeSlot || editBooking.appointmentTime || editBooking.time || 'Select a time slot...'}
                            </span>
                          </button>

                          {/* Time Slot Dropdown */}
                          {isTimeDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg z-50">
                              {['09:00 AM - 12:00 PM', '12:00 PM - 03:00 PM', '03:00 PM - 06:00 PM', '06:00 PM - 09:00 PM'].map((time, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setSelectedTimeSlot(time);
                                    setIsTimeDropdownOpen(false);
                                  }}
                                  className={`w-full px-5 py-3 text-left font-bold transition-colors hover:bg-blue-50 ${
                                    idx !== 3 ? 'border-b border-gray-100' : ''
                                  } ${
                                    selectedTimeSlot === time || editBooking.appointmentTime === time || editBooking.time === time
                                      ? 'bg-blue-50 text-blue-600'
                                      : 'text-gray-700'
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                     </div>
                  </div>
                  <input type="hidden" name="time" value={selectedTimeSlot || editBooking.appointmentTime || editBooking.time || ""} />
                  <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 mt-4">Save Changes</button>
               </form>
            </div>
          </div>
        )}

        {/* Edit Doctor Modal */}
        {editDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setEditDoctor(null)}></div>
            <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95">
              <button onClick={() => setEditDoctor(null)} className="absolute top-6 right-6 text-gray-400 hover:text-slate-900"><X /></button>
              <h2 className="text-2xl font-black text-slate-900 mb-8">Edit Doctor</h2>
              
              <form onSubmit={handleUpdateDoctor} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-900 uppercase ml-1">Doctor Name</label>
                  <input name="name" type="text" defaultValue={editDoctor.name || ""} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold outline-none transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-900 uppercase ml-1">Specialty</label>
                  <input name="specialty" type="text" defaultValue={editDoctor.specialty || ""} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold outline-none transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-900 uppercase ml-1">Qualification</label>
                  <input name="qualification" type="text" defaultValue={editDoctor.qualification || ""} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold outline-none transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-900 uppercase ml-1">Image URL</label>
                  <input name="image" type="url" defaultValue={editDoctor.image || ""} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold outline-none transition-all" required />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-900 uppercase ml-1">Consultation Fee (৳)</label>
                  <input name="fee" type="number" defaultValue={editDoctor.fee || ""} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold outline-none transition-all" required />
                </div>
                <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 mt-4">Save Changes</button>
              </form>
            </div>
          </div>
        )}

        {/* Update Profile Modal */}
        {isProfileModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsProfileModalOpen(false)}></div>
             <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95">
                <button onClick={() => setIsProfileModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-slate-900"><X /></button>
                <h2 className="text-2xl font-black text-slate-900 mb-8">Edit Profile</h2>
                
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-900 uppercase ml-1">Name</label>
                      <input name="name" type="text" defaultValue={profile.name || ""} className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold outline-none transition-all" required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address (Read-only)</label>
                      <input type="email" value={profile.email || ""} disabled className="w-full px-5 py-4 bg-gray-100 rounded-2xl text-slate-500 font-bold" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-900 uppercase ml-1">Profile Photo URL</label>
                      <input name="photo" type="url" defaultValue={profile.photo || ""} placeholder="https://example.com/photo.jpg" className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold outline-none transition-all" />
                   </div>
                   <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 mt-4">Update Now</button>
                </form>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
