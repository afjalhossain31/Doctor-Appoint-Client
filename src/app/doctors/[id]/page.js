"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Star, 
  MapPin, 
  Clock, 
  Hospital, 
  BadgeCheck, 
  ArrowLeft, 
  CreditCard,
  CalendarCheck,
  MessageSquare,
  ThumbsUp,
  X,
  Loader2
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DoctorDetailsPage = () => {
  const params = useParams();
  const doctorId = params.id;
  const router = useRouter();
  const { data: sessionData } = authClient.useSession();
  const session = sessionData?.user;

  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  // Fetch doctor data
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/doctors/${doctorId}`);
        
        if (!response.ok) {
          throw new Error("Doctor not found");
        }
        
        const data = await response.json();
        setDoctorData(data);
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Error fetching doctor:", error);
        toast.error("Failed to load doctor details");
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  const handleBooking = () => {
    if (!session) {
      toast.error("Please login to book an appointment");
      router.push("/login");
      return;
    }
    setIsTimeDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select date and time");
      return;
    }

    try {
      setBookingLoading(true);
      
      const appointmentData = {
        doctorId: doctorData._id || doctorData.id,
        doctorName: doctorData.name,
        specialty: doctorData.specialty,
        email: session.email,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        fee: doctorData.fee,
        status: "pending"
      };

      const response = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error("Failed to book appointment");
      }

      toast.success("Appointment booked successfully!");
      setIsModalOpen(false);
      setSelectedDate("");
      setSelectedTime("");
      
      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error(error.message || "Failed to book appointment");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login to leave a review");
      router.push("/login");
      return;
    }

    if (!newReview.comment.trim()) {
      toast.error("Please add a comment");
      return;
    }

    const review = {
      id: Date.now(),
      user: session.name || "Anonymous User",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: "" });
    toast.success("Review added successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Loading doctor details...</p>
        </div>
      </div>
    );
  }

  if (!doctorData) {
    return (
      <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4">Doctor Not Found</h1>
          <p className="text-gray-600 mb-6">The doctor you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/all-appointment"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Back to All Doctors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Link */}
        <Link 
          href="/all-appointment" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to All Doctors
        </Link>

        {/* Main Content Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/60 overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row">
            
            {/* Left: Image Section */}
            <div className="md:w-2/5 relative h-100 md:h-auto min-h-125 overflow-hidden bg-linear-to-br from-blue-100 to-blue-50">
              {doctorData.image && (
                <Image
                  src={doctorData.image}
                  alt={doctorData.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent md:hidden" />
              <div className="absolute bottom-6 left-6 text-white md:hidden">
                <h1 className="text-3xl font-bold">{doctorData.name}</h1>
                <p className="text-blue-300 font-medium">{doctorData.specialty}</p>
              </div>
            </div>

            {/* Right: Info Section */}
            <div className="md:w-3/5 p-8 md:p-12 space-y-8">
              <div className="hidden md:block">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">
                  <BadgeCheck size={18} />
                  Verified Specialist
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{doctorData.name}</h1>
                <p className="text-xl text-blue-600 font-semibold">{doctorData.specialty}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-gray-100">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Experience</p>
                  <p className="text-slate-900 font-bold">{doctorData.experience}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Fee</p>
                  <p className="text-slate-900 font-bold">৳ {doctorData.fee}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Ratings</p>
                  <div className="flex items-center gap-1 text-slate-900 font-bold">
                    {doctorData.rating || 4.9} <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-400 font-normal text-xs ml-1">({reviews.length} Reviews)</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">About Doctor</h3>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                  {doctorData.description}
                </p>
              </div>

              {/* Details List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <Hospital size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Hospital</h4>
                    <p className="text-sm text-gray-500">{doctorData.hospital}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Location</h4>
                    <p className="text-sm text-gray-500">{doctorData.location}</p>
                  </div>
                </div>
              </div>

              {/* Availability */}
              {doctorData.availability && doctorData.availability.length > 0 && (
                <div className="bg-slate-900 p-6 rounded-3xl text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={18} className="text-blue-400" />
                    <h4 className="font-bold">Availability Slots</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {doctorData.availability.map((time, idx) => (
                      <span key={idx} className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/5">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button 
                onClick={handleBooking}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 group"
              >
                <CalendarCheck size={22} className="group-hover:scale-110 transition-transform" />
                Book An Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Review System Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Review Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 sticky top-8">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <MessageSquare className="text-blue-600" size={24} />
                Leave a Review
              </h3>
              
              {session ? (
                <form onSubmit={handleAddReview} className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Your Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`p-2 rounded-xl transition-all ${newReview.rating >= star ? 'bg-yellow-50 text-yellow-500' : 'bg-gray-50 text-gray-300'}`}
                        >
                          <Star size={24} fill={newReview.rating >= star ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Your Comment</label>
                    <textarea
                      rows="4"
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-medium outline-none transition-all placeholder:text-gray-300 resize-none"
                      placeholder="Tell us about your experience..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
                  >
                    Submit Review
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                  <p className="text-blue-900 text-sm font-semibold mb-3">Please login to leave a review</p>
                  <button
                    onClick={() => router.push("/login")}
                    className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm"
                  >
                    Go to Login
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-black text-slate-900">Patient Feedback</h3>
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full">
                <ThumbsUp size={16} className="text-blue-600" />
                <span className="text-sm font-black text-blue-600">{reviews.length} Reviews</span>
              </div>
            </div>

            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg shadow-gray-200/30 hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-500 text-xl">
                          {review.user?.[0] || "U"}
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900">{review.user}</h4>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={14} className={s <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-medium bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
                      &quot;{review.comment}&quot;
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-2xl text-center border border-gray-100">
                <MessageSquare size={48} className="mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 font-semibold">No reviews yet. Be the first to review!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300 space-y-6 overflow-visible">
            
            {/* Close Button */}
            <button 
              onClick={() => {
                setIsModalOpen(false);
                setIsTimeDropdownOpen(false);
              }}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-400" />
            </button>

            {/* Header */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <CalendarCheck size={32} />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Book Appointment</h2>
              <p className="text-gray-500 text-sm">with <strong>{doctorData.name}</strong></p>
            </div>

            {/* Form */}
            <div className="space-y-4 overflow-visible">
              {/* Date Selection */}
              <div>
                <label className="text-xs font-bold text-slate-900 uppercase ml-1 mb-2 block">Appointment Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-2xl bg-white focus:border-blue-500 outline-none transition-colors font-bold"
                />
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900 uppercase ml-1">Preferred Time Slot</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                    className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-2xl bg-white flex items-center justify-between hover:border-blue-400 transition-colors font-bold"
                  >
                    <span className={selectedTime ? 'text-slate-900' : 'text-gray-400'}>
                      {selectedTime || 'Select a time slot...'}
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
                            setSelectedTime(time);
                            setIsTimeDropdownOpen(false);
                          }}
                          className={`w-full px-5 py-3 text-left font-bold transition-colors hover:bg-blue-50 ${
                            idx !== 3 ? 'border-b border-gray-100' : ''
                          } ${
                            selectedTime === time 
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

              {/* Fee Display */}
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-600 font-medium">Consultation Fee</span>
                  <span className="text-slate-900 font-black">৳ {doctorData.fee}</span>
                </div>
                <div className="flex justify-between border-t border-blue-200 pt-3">
                  <span className="text-gray-600 font-medium">Platform Fee</span>
                  <span className="text-slate-900 font-black">৳ 50</span>
                </div>
                <div className="flex justify-between border-t border-blue-200 pt-3 mt-3">
                  <span className="text-slate-900 font-black">Total</span>
                  <span className="text-blue-600 font-black text-lg">৳ {doctorData.fee + 50}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 font-bold text-slate-600 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmBooking}
                disabled={bookingLoading}
                className="flex-1 py-3 bg-blue-600 text-white font-black rounded-xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {bookingLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDetailsPage;
