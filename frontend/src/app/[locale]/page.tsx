import HeroSection from "@/components/sections/HeroSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import RewardsSection from "@/components/sections/RewardsSection";
import FaqSection from "@/components/sections/FaqSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <ServicesSection />
      <BeforeAfterSection />
      {/* <ReviewsSection /> */}
      <RewardsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
