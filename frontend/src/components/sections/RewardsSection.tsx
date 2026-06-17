import { REWARD_BUBBLES } from "@/data/home";

export default function RewardsSection() {
  return (
    <section id="discounts" className="bg-[#dbeaff] pt-16 pb-16 md:py-[80px] px-4 md:px-[48px] relative overflow-hidden">

<div className="absolute rounded-full bg-[#c2ddfd] pointer-events-none z-0 
  w-[200px] h-[200px] -left-16 -bottom-16 
  md:w-[400px] md:h-[400px] md:left-[-100px] md:top-[867px]" 
/>

<div className="absolute rounded-full bg-[#c2ddfd] pointer-events-none z-0 
  w-[300px] h-[300px] -right-20 -top-20 
  md:w-[600px] md:h-[600px] md:left-auto md:right-[-150px] md:top-[100px]" 
/>

<div className="absolute rounded-full bg-[#c2ddfd]/60 pointer-events-none z-0 
  w-[250px] h-[250px] -right-20 top-[45%] md:hidden" 
/>
      {/* Floating bubbles (CSS in globals.css) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {REWARD_BUBBLES.map((b, i) => (
          <div
            key={i}
            className="bubble-container"
            style={{ left: `${b.left}%`, animation: `floatUp ${b.duration}s linear ${b.delay}s infinite` }}
          >
            <div
              className="bubble"
              style={{ width: `${b.size}px`, height: `${b.size}px`, animation: `wobble ${b.wobble}s ease-in-out infinite alternate` }}
            />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-12">

        <div className="flex flex-col items-center gap-2">
          <p className="text-[#0666c6] text-[14px] font-[510] uppercase leading-[21px]">Rewards Program</p>
          <h2 className="text-[28px] leading-[1.15] md:text-[2.5rem] md:leading-[48px] font-bold text-center">
            <span className="text-[#0666c6]">Save More</span>
            <br />
            <span className="text-[#032445]">With Every Cleaning</span>
          </h2>
        </div>

        <div className="w-full max-w-[980px] flex flex-col gap-12 md:gap-[80px]">

          {/* Discount cards */}
          <div className="flex flex-col items-center gap-6">
            <div className="w-full flex flex-col md:flex-row items-stretch gap-6">
              <div className="md:w-[316px] shrink-0 bg-[#0666c6] rounded-[20px] pt-8 pb-8 px-6 overflow-hidden flex flex-col justify-between items-center gap-3 min-h-[255px]">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-[24px] font-bold text-[#eaebec] text-center">New Client</p>
                  <p className="text-[14px] leading-[21px] text-[#c2ddfd] text-center">
                    First time booking with us? Your first booking is 20% off. Applies to any service, taken off before you pay
                  </p>
                </div>
                <span className="bg-[#f6c90e] text-[#032445] font-[590] text-[20px] leading-[30px] px-5 py-1.5 rounded-[12px] overflow-hidden">−20%</span>
              </div>
              <div className="flex-1 bg-white rounded-[20px] pt-8 pb-8 px-6 overflow-hidden flex flex-col justify-between items-center gap-3 min-h-[255px]">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-[24px] font-bold text-[#032445] text-center">2 Services at Once</p>
                  <p className="text-[14px] leading-[21px] text-[#596067] text-center">
                    Book 2 services during the same visit and receive 30% off your third service during the appointment
                  </p>
                </div>
                <span className="bg-[#f6c90e] text-[#032445] font-[590] text-[20px] leading-[30px] px-5 py-1.5 rounded-[12px] overflow-hidden">−30%</span>
              </div>
              <div className="flex-1 bg-white rounded-[20px] pt-8 pb-8 px-6 overflow-hidden flex flex-col justify-between items-center gap-3 min-h-[255px]">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-[24px] font-bold text-[#032445] text-center">3 Services at Once</p>
                  <p className="text-[14px] leading-[21px] text-[#596067] text-center">
                    Book 3 services during the same visit and get 50% off your fourth service appointment
                  </p>
                </div>
                <span className="bg-[#f6c90e] text-[#032445] font-[590] text-[20px] leading-[30px] px-5 py-1.5 rounded-[12px] overflow-hidden">−50%</span>
              </div>
            </div>
            <p className="text-[#596067] text-[16px] leading-6 text-center">Save more when booking multiple services in one visit</p>
          </div>

          {/* Referral rows */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-[20px] p-6 flex flex-col gap-4 md:flex-row md:flex-nowrap md:items-center md:gap-6">
              <span className="self-start md:self-auto bg-[#f6c90e] text-[#032445] font-[590] text-[20px] leading-[30px] px-5 py-1.5 rounded-[12px] overflow-hidden shrink-0">−20%</span>
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <p className="text-[18px] md:text-[20px] font-[590] leading-[1.5]">
                  <span className="text-[#0666c6]">Invite Friends </span>
                  <span className="text-[#032445]">&amp; Earn Rewards</span>
                </p>
                <p className="text-[14px] text-[#596067] leading-[21px] max-w-[580px]">
                  Know someone whose home could use a good clean? Send them our way. You get 15% off your next booking. They get 20% off their first.
                </p>
              </div>
              <button className="w-full md:w-auto md:shrink-0 h-12 px-6 rounded-[12px] border-2 border-[#0666c6] text-[#0666c6] text-[14px] font-[510] leading-[21px] hover:bg-[#ebf5ff] hover:border-[#0759aa] hover:text-[#0759aa] active:bg-[#dbeaff] active:border-[#064a8d] active:text-[#064a8d] transition-colors duration-150 whitespace-nowrap bg-white">
                Share With a Friend
              </button>
            </div>
            <div className="bg-white rounded-[20px] p-6 flex flex-col gap-4 md:flex-row md:flex-nowrap md:items-center md:gap-6">
              <span className="self-start md:self-auto bg-[#f6c90e] text-[#032445] font-[590] text-[20px] leading-[30px] px-5 py-1.5 rounded-[12px] overflow-hidden shrink-0">−10%</span>
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <p className="text-[18px] md:text-[20px] font-[590] leading-[1.5]">
                  <span className="text-[#0666c6]">Leave a Review </span>
                  <span className="text-[#032445]">&amp; Get Discount</span>
                </p>
                <p className="text-[14px] text-[#596067] leading-[21px] max-w-[580px]">
                  Loved your cleaning? Leave a quick review on Google or Instagram and receive 10% off your next service.
                </p>
              </div>
              <button className="w-full md:w-auto md:shrink-0 h-12 px-6 rounded-[12px] border-2 border-[#0666c6] text-[#0666c6] text-[14px] font-[510] leading-[21px] hover:bg-[#ebf5ff] hover:border-[#0759aa] hover:text-[#0759aa] active:bg-[#dbeaff] active:border-[#064a8d] active:text-[#064a8d] transition-colors duration-150 whitespace-nowrap bg-white">
                Leave a Review
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
