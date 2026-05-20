"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ShieldCheck } from "lucide-react";

// Import Swiper core styles and required modules
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slideData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop", 
    badge: "Compassionate Care",
    title: "Expert Medical Guidance You Can Always Trust",
    description: "Your health journey is personal, and we're here to walk it with you. Connect with caring specialists dedicated to providing the highest quality healthcare for you and your loved ones.",
    ctaText: "Start Your Journey",
    ctaLink: "/all-appointment",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2070&auto=format&fit=crop", 
    badge: "Smart Tracking",
    title: "Manage Your Health Dashboard Efficiently",
    description: "Take total control of your wellness. Access digital prescriptions, securely track treatment history, and handle follow-ups all from one clean console.",
    ctaText: "Go to Dashboard",
    ctaLink: "/dashboard",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop", 
    badge: "Expert Assistance",
    title: "Consult Top Medical Specialists Anytime",
    description: "Prioritize your mental and physical wellness. Tap into professional care through instant on-demand configurations tailored perfectly around your timeline.",
    ctaText: "Get Started",
    ctaLink: "/register",
  },
    {
    id: 4,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop", 
    badge: "24/7 Support",
    title: "Your Health, Our Priority - Anytime, Anywhere",
    description: "Experience world-class healthcare with 24/7 support. Our platform connects you with the right doctors instantly for a healthier tomorrow.",
    ctaText: "Explore More",
    ctaLink: "/about",
  },
];

export default function Hero() {
  return (
    <section className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[80vh] bg-slate-900 overflow-hidden">
      
      {/* Target Styles Overrides for Swiper Active Elements */}
      <style>{`
        .swiper-pagination-bullet-active {
          background: #2563EB !important;
          width: 24px !important;
          border-radius: 4px !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet {
          background: #FFFFFF;
          opacity: 0.7;
        }
      `}</style>

      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect={"fade"}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full overflow-hidden">
            
            {/* 1. Zooming Image Container */}
            <div className="absolute inset-0 w-full h-full">
              <motion.div 
                className="w-full h-full bg-cover bg-bottom sm:bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: 6, ease: "linear" }}
              />
              
              {/* 2. Double Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/60 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>

            {/* 3. Text and CTA Layout Content Layer */}
            <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-2xl text-white space-y-4 md:space-y-6">
                
                {/* Micro Healthcare Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {slide.badge}
                </motion.div>

                {/* Animated Catchy Slogan */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white"
                >
                  {slide.title}
                </motion.h1>

                {/* Platform Short Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-gray-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl"
                >
                  {slide.description}
                </motion.p>

                {/* Smooth Action Call-to-Action Button Set */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="pt-2"
                >
                  <Link
                    href={slide.ctaLink}
                    className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium rounded-xl shadow-lg active:scale-95 transition-all duration-200 text-sm sm:text-base"
                  >
                    <Calendar className="h-5 w-5 stroke-2" />
                    {slide.ctaText}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>

              </div>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}