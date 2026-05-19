import Hero from "@/components/Hero";
import TopRatedDoctors from "@/components/TopRatedDoctors";
import StatsSection from "@/components/StatsSection";
import WhyChooseUs from "@/components/WhyChooseUs";

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
