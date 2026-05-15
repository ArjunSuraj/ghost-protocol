import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Scanner from "@/components/Scanner";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Scanner />
        <Features />
        <HowItWorks />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
