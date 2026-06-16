import ReviewsCarousel from "@/components/reviews-carousel";
import Kicker from "@/components/ui/Kicker";

export default function ReviewsSection() {
  return (
    <section id="reviews" className="bg-white pt-10 pb-14 md:pt-[80px] md:pb-[160px] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[64px] text-center mb-10 md:mb-12">
        <Kicker>CLIENT REVIEWS</Kicker>
        <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.15] mb-3">
          <span className="text-[#032445]">What Our </span>
          <span className="text-[#0666c6]">Clients</span>
          <span className="text-[#032445]"> Say</span>
        </h2>
        <p className="text-[#4b6070] text-[16px]">Real feedback from real people across Berlin and surrounding areas</p>
      </div>
      <div className="w-full max-w-[1600px] mx-auto">
        <ReviewsCarousel />
      </div>
    </section>
  );
}
