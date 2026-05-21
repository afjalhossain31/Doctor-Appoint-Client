import Hero from "@/components/Hero";
import TopRatedDoctors from "@/components/TopRatedDoctors";
import StatsSection from "@/components/StatsSection";
import WhyChooseUs from "@/components/WhyChooseUs";

export const metadata = {
  title: "Doctor Appointment Booking",
  description: "Book appointments with top-rated doctors online. Fast, secure, and convenient doctor scheduling platform. Find specialists, book consultations, and manage your healthcare needs.",
  keywords: "doctor appointment, book doctor, online consultation, healthcare scheduling, medical appointments",
  openGraph: {
    title: "DoctorAppoint - Book Doctor Appointments",
    description: "Find and book appointments with qualified doctors easily on DoctorAppoint.",
    type: "website",
    image: "/assets/Logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "DoctorAppoint - Book Doctor Appointments",
    description: "Find and book appointments with qualified doctors easily.",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <TopRatedDoctors />
      <WhyChooseUs />
    </main>
  );
}
