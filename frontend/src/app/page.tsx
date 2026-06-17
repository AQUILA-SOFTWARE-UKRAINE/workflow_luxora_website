import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import RewardsSection from "@/components/sections/RewardsSection";
import FaqSection from "@/components/sections/FaqSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";

export const metadata: Metadata = {
  title: "Luxora — Professional Home Cleaning Berlin",
  description:
    "From sofas and windows to full apartments, driveways and car interiors. Professional cleaning at your door across Berlin. New clients get 20% off.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <ServicesSection />
      <BeforeAfterSection />
      <ReviewsSection />
      <RewardsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
