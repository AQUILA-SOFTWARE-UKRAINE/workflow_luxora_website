import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BeforeAfterSlider from "@/components/before-after-slider";
import ReviewsCarousel from "@/components/reviews-carousel";

export const metadata: Metadata = {
  title: "Luxora — Professional Home Cleaning Berlin",
  description:
    "From sofas and windows to full apartments, driveways and car interiors. Professional cleaning at your door across Berlin. New clients get 20% off.",
};

/* ── Shared helpers ────────────────────────────────────────────── */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#0666c6] text-[14px] font-[510] uppercase leading-[21px] mb-3">
      {children}
    </p>
  );
}


/* ── Page ──────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[640px] md:min-h-[816px] overflow-hidden">
        <Image
          src="/images/hero-bg.png"
          alt="Professional cleaning service"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Figma gradient: 270deg right→left, transparent to white */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(270deg, rgba(217, 217, 217, 0.00) 0%, rgba(217, 217, 217, 0.06) 45.38%, rgba(217, 217, 217, 0.52) 63.52%, rgba(217, 217, 217, 0.72) 79.53%, rgba(217, 217, 217, 0.80) 100%)"
          }}
        />

        {/* Figma: content left=147px top=164px w=586px, flex-col gap-40px */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:pl-[147px] md:pr-[64px] pt-[72px] pb-[72px] md:pt-[164px] md:pb-[164px]">
          <div className="max-w-[586px] flex flex-col gap-[40px]">

            {/* Heading block: flex-col gap-[16px] */}
            <div className="flex flex-col gap-[16px]">
              <h1 className="font-bold leading-[1.1] text-[#032445] text-[2.5rem] md:text-[56px]">
                Professional
                <br />
                <span className="text-[#0666c6]">Home Cleaning</span>
                <br />
                You Can Trust
              </h1>
              <p className="text-[16px] text-[#032445] leading-[1.5] max-w-[477px]">
                From sofas and windows to full apartments, driveways and car
                interiors. Professional cleaning at your door across Berlin
              </p>
            </div>

            {/* Checkmarks + button: flex-col gap-[24px] */}
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {["Discount for new clients", "Reply in 10 min", "500+ clients"].map((b) => (
                  <div key={b} className="flex items-center gap-2 text-[16px] text-[#032445]">
                    <svg className="size-5 text-[#0666c6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {b}
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#0666c6] text-white font-medium text-[18px] pl-[40px] pr-[36px] h-[53px] rounded-[12px] hover:bg-[#0555aa] transition-colors self-start"
              >
                Request a Free Estimate
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════════════════ */}
      <section id="why-us" className="bg-white py-[80px] px-6 md:px-[64px]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: 2×2 photo grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-0 rounded-[20px] overflow-clip">
                {[
                  { src: "/images/why-1.jpg", name: "Anna Müller", service: "Sofa Cleaning, Berlin" },
                  { src: "/images/why-2.jpg", name: "Laura Schreiber", service: "Apartment Cleaning, Mitte" },
                  { src: "/images/why-3.jpg", name: "Felix & Jana Becker", service: "Apartment Cleaning, Berlin" },
                  { src: "/images/why-4.jpg", name: "Markus Hoffmann", service: "Window Cleaning, Kreuzberg" },
                ].map((photo) => (
                  <div key={photo.name} className="relative aspect-square">
                    <Image
                      src={photo.src}
                      alt={photo.service}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute bottom-3 right-3 bg-[rgba(12,13,13,0.7)] rounded-[12px] px-3 py-1.5">
                      <p className="text-white text-[12px] font-semibold leading-tight">{photo.name}</p>
                      <p className="text-white/70 text-[11px] leading-tight">{photo.service}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Floating badge */}
                <div className="absolute -top-4 -left-4 bg-[#043565] rounded-[12px] px-6 py-3 shadow-lg z-10 flex flex-col justify-center items-center gap-1">
                  <p className="text-[#EAEBEC] text-[24px] font-bold leading-normal">
                    500+
                  </p>
                  <p className="text-[#EAEBEC] text-[14px] font-[510] leading-[150%]">
                    Happy Homeowners
                  </p>
              </div>
            </div>

            {/* Right: content */}
            <div>
              <Kicker>WHY CLIENTS TRUST US</Kicker>
              <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-[#032445] leading-[1.2] mb-4">
                We Don&apos;t Just Clean.
                <br />
                We <span className="text-[#0666c6]">Care For Your Space</span>
              </h2>
              <p className="text-[#4b6070] text-[16px] leading-relaxed mb-8">
                Trusted professionals, consistent quality, and attention to every
                detail — creating a home that feels fresh, comfortable, and cared for
              </p>

             <div className="flex flex-col gap-[40px]">
  {[
    {
      title: "Cleaning On Your Schedule",
      desc: "Whether you're home or away, our trusted team cleans your space safely, securely, and professionally.",
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none" className="text-[#0666c6]">
          <path fillRule="evenodd" clipRule="evenodd" d="M7.97344 6.33609C7.97344 2.82633 10.8236 0 14.4375 0C18.0327 0 21 2.79885 21 6.32672C21 9.85274 18.0347 12.6642 14.4375 12.6642C13.6492 12.6642 12.9848 12.5634 12.301 12.319C12.2773 12.3356 12.251 12.3538 12.2216 12.3739C12.0788 12.4713 11.8316 12.6323 11.5444 12.6942C11.3911 12.7273 11.2505 12.7132 11.1857 12.7056C11.1027 12.6959 11.0191 12.6795 10.9459 12.6632C10.8037 12.6317 10.6419 12.587 10.5033 12.5487L10.4926 12.5458C10.4156 12.5245 10.3452 12.5051 10.2813 12.4883C10.3014 12.5329 10.3252 12.5829 10.3528 12.6393C10.3627 12.6596 10.3736 12.6816 10.3851 12.7049C10.4386 12.813 10.5057 12.9487 10.5549 13.0697C10.5864 13.147 10.6218 13.2446 10.6453 13.351C10.6672 13.4506 10.6913 13.6123 10.6523 13.7955C10.6063 14.0112 10.4923 14.2037 10.4036 14.3334C10.3027 14.4809 10.1765 14.6305 10.0373 14.767C9.79054 15.0091 9.37223 15.3389 8.87585 15.3967C8.56358 15.4331 8.28766 15.3383 8.12388 15.2734C8.05985 15.248 7.9976 15.2206 7.94159 15.1951C7.94499 15.2032 7.94837 15.2113 7.95169 15.2194C8.00583 15.3512 8.09578 15.5865 8.0905 15.856C8.08004 16.4942 7.7061 16.881 7.44297 17.1234C7.29751 17.2594 7.11108 17.4284 6.88099 17.5527C6.62557 17.6908 6.34883 17.7586 6.03315 17.7548C5.78658 17.7517 5.52061 17.6944 5.35218 17.6581C5.33115 17.6536 5.31164 17.6494 5.29387 17.6457C5.19543 17.625 5.12935 17.6126 5.07904 17.6068C5.07545 17.6064 5.07215 17.606 5.06913 17.6057C5.06946 17.6085 5.0698 17.6114 5.07017 17.6144C5.07976 17.692 5.0889 17.7422 5.10041 17.8056C5.11137 17.8658 5.12448 17.9379 5.14219 18.0567C5.18653 18.3542 5.28419 19.0633 4.76293 19.5744C4.66258 19.6732 4.58453 19.7554 4.48138 19.8641C4.44437 19.9031 4.40413 19.9455 4.35847 19.9933C4.18905 20.1706 3.96594 20.3996 3.59831 20.7577L3.5964 20.7596L3.59483 20.7611C3.3007 21.0439 2.94228 21.0096 2.79431 20.9809C2.62703 20.9485 2.47769 20.879 2.37027 20.8218C2.14631 20.7026 1.90618 20.5277 1.69601 20.361C1.26847 20.0218 0.835413 19.6118 0.658019 19.4264C0.38677 19.1428 0 18.5815 0 17.9095C0.000152573 17.6716 0.0503777 17.4359 0.147409 17.2187C0.242076 17.0067 0.37923 16.8165 0.550315 16.6598C0.654052 16.5574 1.04682 16.1158 1.6504 15.4216C2.25017 14.7318 3.02532 13.831 3.8491 12.8699C5.36504 11.1012 7.0423 9.13199 8.08762 7.90469C7.97309 7.37011 7.97327 6.83903 7.97343 6.38531C7.97343 6.3688 7.97344 6.3524 7.97344 6.33609ZM10.0236 12.4298C10.0241 12.4298 10.0247 12.4299 10.0253 12.43C10.0144 12.4294 10.013 12.4285 10.0236 12.4298ZM14.4375 1.5C11.6295 1.5 9.47344 3.67711 9.47344 6.33609C9.47344 6.97005 9.4806 7.43011 9.62408 7.84306C9.71138 8.09433 9.65906 8.37304 9.48658 8.57555C9.41034 8.66505 9.32937 8.76012 9.24411 8.86022C8.20002 10.0861 6.51267 12.0672 4.98801 13.846C4.16355 14.808 3.38567 15.7119 2.78236 16.4058C2.19583 17.0804 1.7393 17.5975 1.5841 17.7468C1.57781 17.7529 1.57142 17.7588 1.56493 17.7646C1.54451 17.783 1.52818 17.8054 1.51699 17.8304C1.50584 17.8554 1.50005 17.8824 1.5 17.9098C1.50006 17.9596 1.51686 18.039 1.56802 18.141C1.61847 18.2415 1.68602 18.331 1.74198 18.3896C1.87396 18.5275 2.25653 18.891 2.62821 19.1858C2.71742 19.2566 2.79907 19.3178 2.87116 19.3685C3.04507 19.1948 3.17085 19.0649 3.27395 18.957C3.31098 18.9183 3.34636 18.881 3.38094 18.8446C3.47947 18.7407 3.57155 18.6437 3.67729 18.5385C3.67971 18.507 3.68134 18.4305 3.65859 18.2779C3.65457 18.251 3.64614 18.2015 3.63613 18.1427C3.61699 18.0303 3.5921 17.8842 3.58149 17.7983C3.56349 17.6527 3.53082 17.3483 3.65595 17.0563C3.76264 16.8073 3.91014 16.5692 4.1485 16.3919C4.38007 16.2197 4.62444 16.1624 4.77674 16.1303C4.9597 16.0918 5.13271 16.103 5.25192 16.1168C5.37709 16.1313 5.50262 16.1568 5.60223 16.1777C5.61565 16.1805 5.62871 16.1833 5.6414 16.1859C5.85157 16.2301 5.96377 16.2537 6.05141 16.2549C6.12464 16.2558 6.14788 16.2439 6.16784 16.2331C6.21197 16.2093 6.2756 16.1614 6.42044 16.0259C6.42196 16.0245 6.42349 16.0231 6.42502 16.0216C6.52963 15.9254 6.56838 15.8773 6.58488 15.8506C6.58545 15.8496 6.58597 15.8488 6.58644 15.848C6.58204 15.835 6.57504 15.8157 6.56418 15.7893C6.54848 15.7511 6.53133 15.7127 6.50854 15.6617C6.50391 15.6514 6.49904 15.6405 6.49391 15.629C6.46621 15.5669 6.43168 15.4886 6.40003 15.4054C6.3398 15.2472 6.26277 15.0046 6.27874 14.7257C6.29655 14.4147 6.42559 14.1214 6.67054 13.8815C6.94676 13.611 7.28093 13.5115 7.59921 13.5246C7.87664 13.5361 8.12203 13.6324 8.27864 13.6999C8.34842 13.73 8.41904 13.763 8.47745 13.7902C8.4883 13.7953 8.49872 13.8001 8.50864 13.8047C8.57802 13.837 8.63037 13.8606 8.67671 13.879C8.69538 13.8864 8.71049 13.8918 8.72235 13.8958C8.73469 13.8899 8.75097 13.8814 8.7712 13.8691C8.83572 13.8299 8.9113 13.7704 8.98692 13.6962C9.04042 13.6437 9.08717 13.5905 9.12455 13.5425C9.10455 13.4999 9.0809 13.4519 9.05248 13.3943C9.03806 13.365 9.02242 13.3333 9.0054 13.2985C8.93863 13.162 8.85186 12.9801 8.79093 12.7929C8.73461 12.6198 8.66422 12.3387 8.73231 12.0357L8.73284 12.0334C8.73312 12.0322 8.7334 12.0309 8.73368 12.0297C8.77363 11.8585 8.86018 11.7198 8.91047 11.6457C8.97245 11.5544 9.04654 11.465 9.12495 11.3844C9.25067 11.2551 9.506 11.0241 9.83912 10.9516C9.99275 10.9183 10.1338 10.9324 10.1987 10.94C10.2817 10.9498 10.3653 10.9661 10.4385 10.9824C10.5806 11.014 10.7425 11.0586 10.8811 11.0969L10.8917 11.0998C11.0438 11.1418 11.1702 11.1765 11.2711 11.1989C11.2724 11.1992 11.2737 11.1995 11.275 11.1998C11.3025 11.1836 11.3358 11.1624 11.3764 11.1346C11.4237 11.1024 11.4695 11.0694 11.523 11.0308C11.5376 11.0203 11.5528 11.0094 11.5687 10.998C11.6366 10.9492 11.7199 10.89 11.8051 10.8369C12.014 10.7069 12.2733 10.6875 12.4991 10.7852C13.122 11.0544 13.6803 11.1642 14.4375 11.1642C17.2622 11.1642 19.5 8.96944 19.5 6.32672C19.5 3.68584 17.2641 1.5 14.4375 1.5ZM11.3608 11.2159C11.3603 11.2158 11.3597 11.2157 11.3591 11.2157C11.37 11.2163 11.3714 11.2171 11.3608 11.2159ZM15.75 4.5C15.6017 4.5 15.4567 4.54399 15.3333 4.6264C15.21 4.70881 15.1139 4.82594 15.0571 4.96299C15.0003 5.10003 14.9855 5.25083 15.0144 5.39632C15.0434 5.5418 15.1148 5.67544 15.2197 5.78033C15.3246 5.88522 15.4582 5.95665 15.6037 5.98559C15.7492 6.01453 15.9 5.99968 16.037 5.94291C16.1741 5.88614 16.2912 5.79002 16.3736 5.66668C16.456 5.54334 16.5 5.39834 16.5 5.25C16.5 5.05109 16.421 4.86032 16.2803 4.71967C16.1397 4.57902 15.9489 4.5 15.75 4.5ZM14.5 3.37919C14.87 3.13196 15.305 3 15.75 3C16.3467 3 16.919 3.23705 17.341 3.65901C17.7629 4.08097 18 4.65326 18 5.25C18 5.69501 17.868 6.13002 17.6208 6.50003C17.3736 6.87004 17.0222 7.15843 16.611 7.32873C16.1999 7.49903 15.7475 7.54358 15.311 7.45677C14.8746 7.36995 14.4737 7.15566 14.159 6.84099C13.8443 6.52632 13.63 6.12541 13.5432 5.68895C13.4564 5.2525 13.501 4.8001 13.6713 4.38896C13.8416 3.97783 14.13 3.62643 14.5 3.37919Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "Punctual & Reliable",
      desc: "Your time matters. We arrive as scheduled and complete every service with efficiency and care.",
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="23" viewBox="0 0 15 23" fill="none" className="text-[#0666c6]">
          <path fillRule="evenodd" clipRule="evenodd" d="M3.75 5.25C2.50736 5.25 1.5 6.25736 1.5 7.5V15C1.5 16.2426 2.50736 17.25 3.75 17.25H11.25C12.4926 17.25 13.5 16.2426 13.5 15V7.5C13.5 6.25736 12.4926 5.25 11.25 5.25H3.75ZM0 7.5C0 5.42893 1.67893 3.75 3.75 3.75H11.25C13.3211 3.75 15 5.42893 15 7.5V15C15 17.0711 13.3211 18.75 11.25 18.75H3.75C1.67893 18.75 0 17.0711 0 15V7.5Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M4.5 1.5V4.5H3V1.125C3 0.826633 3.11853 0.540484 3.3295 0.329505C3.54048 0.118526 3.82663 0 4.125 0H10.875C11.1734 0 11.4595 0.118526 11.6705 0.329505C11.8815 0.540484 12 0.826633 12 1.125V4.5H10.5V1.5H4.5Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M4.5 21V18H3V21.375C3 21.6734 3.11852 21.9595 3.3295 22.1705C3.54048 22.3815 3.82663 22.5 4.125 22.5H10.875C11.1734 22.5 11.4595 22.3815 11.6705 22.1705C11.8815 21.9595 12 21.6734 12 21.375V18H10.5V21H4.5Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "Certified & Insured Team",
      desc: "Our professional cleaners are carefully vetted, fully insured, and trained to deliver exceptional service.",
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="23" viewBox="0 0 21 23" fill="none" className="text-[#0666c6]">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.5 1.5C7.6005 1.5 5.25 3.8505 5.25 6.75C5.25 9.6495 7.6005 12 10.5 12C13.3995 12 15.75 9.6495 15.75 6.75C15.75 3.8505 13.3995 1.5 10.5 1.5ZM3.75 6.75C3.75 3.02208 6.77208 0 10.5 0C14.2279 0 17.25 3.02208 17.25 6.75C17.25 10.4779 14.2279 13.5 10.5 13.5C6.77208 13.5 3.75 10.4779 3.75 6.75Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M5.59781 9.27344C5.9599 9.47459 6.09037 9.93119 5.88922 10.2933L2.02804 17.2438L4.81777 17.2303C5.07862 17.229 5.33546 17.2958 5.56263 17.424C5.78985 17.5522 5.97968 17.7375 6.1134 17.9616L7.41011 20.1353L10.9577 12.3309C11.1291 11.9538 11.5737 11.7871 11.9508 11.9585C12.3279 12.1299 12.4946 12.5745 12.3232 12.9516L8.18277 22.0604C8.06729 22.3144 7.82032 22.4833 7.54169 22.4988C7.26306 22.5144 6.99886 22.3739 6.8559 22.1342L4.82535 18.7303L0.753627 18.75C0.487246 18.7513 0.240171 18.6112 0.104523 18.3819C-0.031125 18.1527 -0.0349885 17.8686 0.0943731 17.6358L4.57797 9.56485C4.77912 9.20275 5.23572 9.07229 5.59781 9.27344Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M15.3182 9.09388C15.6806 8.89322 16.137 9.02431 16.3377 9.38667L20.9061 17.6367C21.0351 17.8696 21.0309 18.1533 20.8952 18.3824C20.7595 18.6114 20.5126 18.7513 20.2464 18.75L16.1746 18.7303L14.1441 22.1342C14.0011 22.3739 13.7369 22.5144 13.4583 22.4988C13.1797 22.4833 12.9327 22.3144 12.8172 22.0604L9.81722 15.4604C9.64582 15.0833 9.81256 14.6386 10.1896 14.4672C10.5667 14.2958 11.0114 14.4626 11.1828 14.8396L13.5899 20.1353L14.8865 17.9617C15.0202 17.7377 15.2102 17.5522 15.4374 17.424C15.6645 17.2958 15.9212 17.229 16.1821 17.2303L18.974 17.2438L15.0254 10.1133C14.8248 9.75096 14.9559 9.29454 15.3182 9.09388Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M10.5 4.5C9.25736 4.5 8.25 5.50736 8.25 6.75C8.25 7.99264 9.25736 9 10.5 9C11.7426 9 12.75 7.99264 12.75 6.75C12.75 5.50736 11.7426 4.5 10.5 4.5ZM6.75 6.75C6.75 4.67893 8.42893 3 10.5 3C12.5711 3 14.25 4.67893 14.25 6.75C14.25 8.82107 12.5711 10.5 10.5 10.5C8.42893 10.5 6.75 8.82107 6.75 6.75Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "Safe For Families & Pets",
      desc: "We use eco-friendly, fabric-safe products that are gentle on your home and safe for children and pets.",
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 20 23" fill="none" className="text-[#0666c6]">
          <path fillRule="evenodd" clipRule="evenodd" d="M7.84413 4.88841C8.56515 5.08661 9.16178 5.25062 9.75 5.25062C10.3402 5.25062 10.939 5.08657 11.662 4.88849C11.7068 4.87622 11.752 4.86382 11.7978 4.85132C12.5366 4.64954 13.409 4.42228 14.3169 4.50361C16.1314 4.6661 17.4742 5.55591 18.3284 7.04552C19.1552 8.48759 19.5 10.4451 19.5 12.7506C19.5 14.7945 18.694 17.1737 17.6234 19.0313C17.085 19.9656 16.4589 20.8048 15.7962 21.421C15.1535 22.0185 14.3738 22.5006 13.5375 22.5006C12.2691 22.5006 11.5342 22.1677 10.9541 21.8422C10.8854 21.8036 10.8221 21.7675 10.763 21.7338C10.3385 21.4919 10.1343 21.3756 9.75 21.3756C9.36561 21.3756 9.16136 21.492 8.73673 21.7339C8.67766 21.7676 8.61433 21.8036 8.54565 21.8422C7.96557 22.1677 7.23066 22.5006 5.9625 22.5006C5.12633 22.5006 4.34659 22.0185 3.70396 21.421C3.04129 20.8048 2.41518 19.9656 1.87675 19.0314C0.806164 17.1737 0 14.7945 0 12.7506C0 10.434 0.383349 8.4778 1.22824 7.03884C2.0954 5.56197 3.43039 4.66792 5.17999 4.50389C6.08927 4.41931 6.96357 4.64707 7.70257 4.84954C7.7503 4.86261 7.79748 4.87558 7.84413 4.88841ZM5.31975 5.99737C4.06948 6.11465 3.15456 6.72058 2.52176 7.79833C1.86665 8.91406 1.5 10.5673 1.5 12.7506C1.5 14.4568 2.19384 16.5775 3.17637 18.2824C3.66451 19.1294 4.20325 19.837 4.72534 20.3224C5.26747 20.8265 5.69242 21.0006 5.9625 21.0006C6.90684 21.0006 7.38927 20.771 7.81161 20.5341C7.86361 20.5049 7.9176 20.4734 7.97391 20.4406C8.39415 20.1956 8.94315 19.8756 9.75 19.8756C10.5568 19.8756 11.1058 20.1956 11.5259 20.4406C11.5822 20.4734 11.6362 20.5049 11.6882 20.5341C12.1105 20.771 12.5929 21.0006 13.5375 21.0006C13.8077 21.0006 14.2327 20.8265 14.7749 20.3224C15.297 19.837 15.8357 19.1294 16.3238 18.2824C17.3063 16.5775 18 14.4568 18 12.7506C18 10.5561 17.6651 8.90427 17.0271 7.79165C16.4164 6.72658 15.5092 6.11638 14.1831 5.99763C13.5788 5.94349 12.9513 6.09122 12.193 6.29831C12.1352 6.3141 12.0765 6.33031 12.0168 6.34676C11.3414 6.53302 10.5523 6.75062 9.75 6.75062C8.94871 6.75062 8.16036 6.53244 7.48615 6.34586C7.42521 6.32899 7.36521 6.31239 7.30622 6.29623C6.54826 6.08857 5.92211 5.9414 5.31975 5.99737Z" fill="currentColor"/>
          <path d="M12.9337 3.1478C11.9494 4.13218 10.7934 4.41343 10.1765 4.49733C10.1201 4.50546 10.0626 4.50063 10.0084 4.48321C9.95413 4.46578 9.90456 4.43623 9.86344 4.39678C9.82232 4.35733 9.79073 4.30903 9.77107 4.25555C9.75141 4.20206 9.7442 4.1448 9.74998 4.08811C9.86124 3.03369 10.3353 2.05064 11.0911 1.30702C12.1223 0.27577 13.2473 0.0460828 13.8436 0.00155159C13.8992 -0.00352762 13.9553 0.00390037 14.0078 0.0232922C14.0602 0.0426841 14.1076 0.0735494 14.1466 0.11363C14.1855 0.153711 14.215 0.201993 14.2329 0.254946C14.2508 0.307898 14.2566 0.364181 14.25 0.419677C14.1323 1.45171 13.6683 2.41339 12.9337 3.1478Z" fill="currentColor"/>
          <path d="M7.875 15.7506C8.49632 15.7506 9 14.7433 9 13.5006C9 12.258 8.49632 11.2506 7.875 11.2506C7.25368 11.2506 6.75 12.258 6.75 13.5006C6.75 14.7433 7.25368 15.7506 7.875 15.7506Z" fill="currentColor"/>
          <path d="M11.625 15.7506C12.2463 15.7506 12.75 14.7433 12.75 13.5006C12.75 12.258 12.2463 11.2506 11.625 11.2506C11.0037 11.2506 10.5 12.258 10.5 13.5006C10.5 14.7433 11.0037 15.7506 11.625 15.7506Z" fill="currentColor"/>
        </svg>
      )
    },
  ].map((b) => {
    const Icon = b.icon;
    
    return (
      <div key={b.title} className="flex gap-4">
        {}
        <div className="size-11 rounded-full bg-[#dbeaff] flex items-center justify-center shrink-0">
          <Icon />
        </div>
        <div>
          <p className="font-semibold text-[#032445] mb-0.5">{b.title}</p>
          <p className="text-[#596067] text-[16px] leading-6">{b.desc}</p>
        </div>
      </div>
    );
  })}
</div>

              <Link
                href="/contact"
                className="mt-10 inline-flex items-center gap-2 bg-[#0666c6] text-white font-medium text-[16px] pl-8 pr-7 h-[53px] rounded-[12px] hover:bg-[#0555aa] transition-colors"
              >
                Book a Cleaning
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES / PRICING
      ══════════════════════════════════════════════════════ */}
      <section id="services" className="bg-white py-[80px] px-6 md:px-[64px] border-t border-[#e2eaf0]">
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Kicker>OUR SERVICES</Kicker>
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.15] mb-3">
              <span className="block text-[#0666c6]">Easy Booking.</span>
              <span className="block text-[#032445]">Spotless Results</span>
            </h2>
            <p className="text-[#4b6070] text-[16px] max-w-[500px] mx-auto">
              Fill the form → We call you within 10 min → You get a fixed price
            </p>
          </div>

          {/* Row 1 — 3 cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard
              img="/images/service-windows.jpg"
              name="Window Cleaning"
              price="€60"
              bullets={[
                "Interior and exterior cleaning of all panes, including hard-to-reach areas",
                "Streak-free result using professional squeegee equipment and cleaning solution",
                "Frames, window sills and tracks carefully cleaned by hand after each panel",
              ]}
            />
            <ServiceCard
              img="/images/service-upholstery.jpg"
              name="Upholstery & Carpet Cleaning"
              price="€80"
              bullets={[
                "Deep cleaning for sofas, mattresses, carpets, rugs and soft furniture",
                "Removes stubborn stains, odors, pet hair and allergens from deep in the fabric",
                "Safe for all fabric types including delicate, mixed and everyday upholstery",
              ]}
            />
            <ServiceCard
              img="/images/service-apartment.jpg"
              name="Apartment & House Cleaning"
              price="€120"
              bullets={[
                "Thorough cleaning of every room including hallways, storage areas and balconies",
                "Kitchens, bathrooms, floors and all surfaces cleaned carefully with professional products",
                "Available as a one-time deep clean or as a regular recurring service",
              ]}
            />
          </div>

          {/* Row 2 — 2 cards centered */}
          <div className="grid md:grid-cols-2 gap-6 mt-6 max-w-[calc(66.667%+1.5rem)] mx-auto">
            <ServiceCard
              img="/images/service-driveway.jpg"
              name="Driveway & Patio Washing"
              price="€90"
              bullets={[
                "High-pressure washing for brick driveways, patios and yard surfaces",
                "Removes moss, dirt, oil stains and weathering from paving stones",
                "Includes kerbs, path edges and hard-to-reach corners",
              ]}
            />
            <ServiceCard
              img="/images/service-car.jpg"
              name="Car Interior Detailing"
              price="€80"
              bullets={[
                "Full interior cleaning: seats, ceiling, door panels and trunk",
                "Extractor deep clean removes dirt and odors from deep in the fabric",
                "Leather and plastic care: protected and refreshed",
              ]}
              footnote="* Access to a standard 220V outlet required"
            />
          </div>

          {/* CTA strip */}
          <div className="mt-6 flex flex-col items-center gap-6">
            <p className="text-[14px] text-[#4b6070] text-center">
              <span className="text-[#F26C68]">*</span>
              {" "}Final price depends on size and condition. VAT Includes: travel, cleaning products, all equipment
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0666c6] text-white font-medium text-[16px] pl-7 pr-6 h-[53px] rounded-[12px] hover:bg-[#0555aa] transition-colors"
            >
              Request a Free Estimate
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BEFORE & AFTER RESULTS
      ══════════════════════════════════════════════════════ */}
      <section id="results" className="bg-white py-[80px] px-6 md:px-[64px] border-t border-[#e2eaf0]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col items-center gap-2 mb-12">
            <p className="text-[#0666c6] text-[14px] font-[510] uppercase leading-[21px]">Before &amp; After</p>
            <h2 className="text-[40px] font-bold leading-[48px] text-center">
              <span className="text-[#0666c6]">The Results Speak</span>
              <br />
              <span className="text-[#032445]">For Themselves</span>
            </h2>
          </div>

          {/* 3 interactive before/after sliders */}
          <div className="grid md:grid-cols-3 gap-6">
            <BeforeAfterSlider
              before="/images/before-sofa.jpg"
              after="/images/after-sofa.jpg"
              title="Sofa Deep Cleaning"
              location="Deep-cleaned fabric sofa · Charlottenburg"
            />
            <BeforeAfterSlider
              before="/images/before-kitchen.jpg"
              after="/images/after-kitchen.jpg"
              title="Deep Kitchen Cleaning"
              location="Residential kitchen cleaning · Mitte"
            />
            <BeforeAfterSlider
              before="/images/before-windows.jpg"
              after="/images/after-windows.jpg"
              title="Professional Window Cleaning"
              location="Full interior & exterior cleaning · Kreuzberg"
            />
          </div>

          {/* Bottom CTA */}
          <div className="mt-6 flex flex-col items-center gap-6">
            <p className="font-[590] text-[#032445] text-[16px] leading-6 text-center max-w-[544px]">
              Want to see our work in detail?<br />
              Follow us to see before-and-after cleaning results
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#" className="inline-flex items-center gap-2 bg-[#0666c6] text-white font-[510] text-[18px] pl-[40px] pr-[36px] h-[53px] rounded-[12px] hover:bg-[#0555aa] transition-colors">
                Our Facebook
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="inline-flex items-center gap-2 bg-[#0666c6] text-white font-[510] text-[18px] pl-[40px] pr-[36px] h-[53px] rounded-[12px] hover:bg-[#0555aa] transition-colors">
                Our Instagram
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          REVIEWS
      ══════════════════════════════════════════════════════ */}
      <section id="reviews" className="bg-white pt-[80px] pb-[160px] px-6 md:px-[64px] border-t border-[#e2eaf0]">
        <div className="max-w-[1440px] mx-auto">
          {/* Header — centered */}
          <div className="text-center mb-12">
            <Kicker>CLIENT REVIEWS</Kicker>
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.15] mb-3">
              <span className="text-[#032445]">What Our </span>
              <span className="text-[#0666c6]">Clients</span>
              <span className="text-[#032445]"> Say</span>
            </h2>
            <p className="text-[#4b6070] text-[16px]">Real feedback from real people across Berlin and surrounding areas</p>
          </div>

          {/* Review carousel — 3 per page, paginated */}
          <ReviewsCarousel />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          REWARDS PROGRAM
      ══════════════════════════════════════════════════════ */}
      <section id="rewards" className="bg-[#dbeaff] py-[64px] px-6 md:px-[48px] relative overflow-hidden">
        {/* Decorative circles — exact Figma positions */}
        <div
          className="absolute rounded-full bg-[#c2ddfd] pointer-events-none"
          style={{ width: 400, height: 400, left: -100, top: 867 }}
        />
        <div
          className="absolute rounded-full bg-[#c2ddfd] pointer-events-none"
          style={{ width: 600, height: 600, left: 1038, top: -225 }}
        />

        <div className="relative flex flex-col items-center gap-12">

          {/* Heading */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[#0666c6] text-[14px] font-[510] uppercase leading-[21px]">Rewards Program</p>
            <h2 className="text-[2.5rem] font-bold leading-[48px] text-center">
              <span className="text-[#0666c6]">Save More</span>
              <br />
              <span className="text-[#032445]">With Every Cleaning</span>
            </h2>
          </div>

          {/* Content: top cards + bottom referral rows */}
          <div className="w-full max-w-[980px] flex flex-col gap-[80px]">

            {/* Top — 3 discount cards + subtitle */}
            <div className="flex flex-col items-center gap-6">
              <div className="w-full flex flex-col md:flex-row items-stretch gap-6">

                {/* New Client — blue */}
                <div className="md:w-[316px] shrink-0 bg-[#0666c6] rounded-[20px] pt-8 pb-8 px-6 overflow-hidden flex flex-col justify-between items-center gap-3 min-h-[255px]">
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-[24px] font-bold text-[#eaebec] text-center">New Client</p>
                    <p className="text-[14px] leading-[21px] text-[#c2ddfd] text-center">
                      First time booking with us? Your first booking is 20% off. Applies to any service, taken off before you pay
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="bg-[#f6c90e] text-[#032445] font-[590] text-[20px] leading-[30px] px-5 py-1.5 rounded-[12px] overflow-hidden">
                      −20%
                    </span>
                  </div>
                </div>

                {/* 2 Services */}
                <div className="flex-1 bg-white rounded-[20px] pt-8 pb-8 px-6 overflow-hidden flex flex-col justify-between items-center gap-3 min-h-[255px]">
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-[24px] font-bold text-[#032445] text-center">2 Services at Once</p>
                    <p className="text-[14px] leading-[21px] text-[#596067] text-center">
                      Book 2 services during the same visit and receive 30% off your third service during the appointment
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="bg-[#f6c90e] text-[#032445] font-[590] text-[20px] leading-[30px] px-5 py-1.5 rounded-[12px] overflow-hidden">
                      −30%
                    </span>
                  </div>
                </div>

                {/* 3 Services */}
                <div className="flex-1 bg-white rounded-[20px] pt-8 pb-8 px-6 overflow-hidden flex flex-col justify-between items-center gap-3 min-h-[255px]">
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-[24px] font-bold text-[#032445] text-center">3 Services at Once</p>
                    <p className="text-[14px] leading-[21px] text-[#596067] text-center">
                      Book 3 services during the same visit and get 50% off your fourth service appointment
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="bg-[#f6c90e] text-[#032445] font-[590] text-[20px] leading-[30px] px-5 py-1.5 rounded-[12px] overflow-hidden">
                      −50%
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[#596067] text-[16px] leading-6 text-center">
                Save more when booking multiple services in one visit
              </p>
            </div>

            {/* Bottom — referral rows */}
            <div className="flex flex-col gap-6">

              {/* Invite Friends */}
              <div className="bg-white rounded-[20px] p-6 flex flex-wrap md:flex-nowrap items-center gap-6">
                <span className="bg-[#f6c90e] text-[#032445] font-[590] text-[20px] leading-[30px] px-5 py-1.5 rounded-[12px] overflow-hidden shrink-0">
                  −20%
                </span>
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <p className="text-[20px] font-[590] leading-[30px]">
                    <span className="text-[#0666c6]">Invite Friends </span>
                    <span className="text-[#032445]">&amp; Earn Rewards</span>
                  </p>
                  <p className="text-[14px] text-[#596067] leading-[21px] max-w-[580px]">
                    Know someone whose home could use a good clean? Send them our way. You get 15% off your next booking. They get 20% off their first.
                  </p>
                </div>
                <button className="shrink-0 h-12 px-6 rounded-[12px] border-2 border-[#0666c6] text-[#0666c6] text-[14px] font-[510] leading-[21px] hover:bg-[#0666c6]/5 transition-colors whitespace-nowrap">
                  Share With a Friend
                </button>
              </div>

              {/* Leave a Review */}
              <div className="bg-white rounded-[20px] p-6 flex flex-wrap md:flex-nowrap items-center gap-6">
                <span className="bg-[#f6c90e] text-[#032445] font-[590] text-[20px] leading-[30px] px-5 py-1.5 rounded-[12px] overflow-hidden shrink-0">
                  −10%
                </span>
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <p className="text-[20px] font-[590] leading-[30px]">
                    <span className="text-[#0666c6]">Leave a Review </span>
                    <span className="text-[#032445]">&amp; Get Discount</span>
                  </p>
                  <p className="text-[14px] text-[#596067] leading-[21px] max-w-[580px]">
                    Loved your cleaning? Leave a quick review on Google or Instagram and receive 10% off your next service.
                  </p>
                </div>
                <button className="shrink-0 h-12 px-6 rounded-[12px] border-2 border-[#0666c6] text-[#0666c6] text-[14px] font-[510] leading-[21px] hover:bg-[#0666c6]/5 transition-colors whitespace-nowrap">
                  Leave a Review
                </button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0666c6] text-[#eaebec] font-[510] text-[18px] pl-[40px] pr-[36px] h-[53px] rounded-[12px] hover:bg-[#0555aa] transition-colors"
            >
              Request a Free Estimate
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.16669 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15" stroke="#EAEBEC" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <p className="text-[#596067] text-[12px] leading-[18px] text-center">Takes 1 minute. No commitment</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section id="faq" className="bg-white pt-[80px] pb-[160px] px-6 md:px-[64px]">
        <div className="max-w-[980px] mx-auto flex flex-col gap-[56px]">

          {/* Header */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-[#0666c6] text-[14px] font-[510] uppercase leading-[21px]">FAQ</p>
            <h2 className="text-[40px] font-bold leading-[48px] text-center">
              <span className="text-[#032445]">Got </span>
              <span className="text-[#0666c6]">Questions?</span>
              <span className="text-[#032445]"><br />We Have Answers</span>
            </h2>
            <p className="text-[#596067] text-[16px] leading-6 text-center">
              Can&apos;t find your answer here? Write to us. We reply within 10 minutes
            </p>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-4">

            {/* Open items — blue tinted, border-radius 20px */}
            {[
              {
                q: "What should I prepare before the cleaning?",
                a: "Please ensure access to water and electricity, and clear the areas to be cleaned from personal items. This helps us work efficiently and deliver the best result.",
              },
              {
                q: "How do I pay?",
                a: "We accept cash, bank transfer and PayPal. Payment is made after the service is completed and you are happy with the result. We will confirm the payment details when we call to confirm your booking.",
              },
              {
                q: "Can I cancel or reschedule?",
                a: "Yes, you can cancel or reschedule free of charge up to 24 hours before the appointment. For cancellations with less than 24 hours notice, a small travel fee may apply. Just call or message us and we will sort it out.",
              },
            ].map((item) => (
              <details
                key={item.q}
                open
                className="group bg-white rounded-[20px] outline outline-1 outline-[#c2ddfd] shadow-[0px_0px_4px_rgba(194,221,253,0.50)] overflow-hidden"
              >
                <summary className="px-6 py-6 bg-[#ebf3ff] flex items-center justify-between cursor-pointer gap-4 list-none">
                  <span className="text-[#032445] text-[16px] font-[590] leading-6">{item.q}</span>
                  <span className="size-6 shrink-0 text-[#0666c6]">
                    <svg className="size-6 hidden group-open:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                    <svg className="size-6 group-open:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 py-6">
                  <p className="text-[#596067] text-[16px] font-normal leading-6">{item.a}</p>
                </div>
              </details>
            ))}

            {/* Closed items — plain white, border-radius 16px */}
            {[
              {
                q: "How much does a cleaning cost?",
                a: "Prices start from €60 for window cleaning, €80 for upholstery/carpet, €120 for apartments. Final price depends on size and condition — we give you an exact quote before starting.",
              },
              {
                q: "Can I cancel or reschedule?",
                a: "Yes, you can cancel or reschedule free of charge up to 24 hours before the appointment. For cancellations with less than 24 hours notice, a small travel fee may apply.",
              },
              {
                q: "Do you bring your own equipment?",
                a: "Yes, absolutely. Our team brings all professional cleaning equipment and eco-friendly products. You don't need to provide anything except access to water and a standard power outlet.",
              },
              {
                q: "What areas do you cover?",
                a: "We cover Berlin and all surrounding areas within a 100 km radius. If you're unsure whether we service your area, just ask — we'll confirm within minutes.",
              },
            ].map((item) => (
              <details
                key={`closed-${item.q}`}
                className="group bg-white rounded-[16px] outline outline-1 outline-[#dfe0e2] overflow-hidden"
              >
                <summary className="px-6 py-6 flex items-center justify-between cursor-pointer gap-4 list-none">
                  <span className="text-[#032445] text-[16px] font-[590] leading-6">{item.q}</span>
                  <span className="size-6 shrink-0 text-[#0666c6]">
                    <svg className="size-6 hidden group-open:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                    <svg className="size-6 group-open:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 py-6">
                  <p className="text-[#596067] text-[16px] font-normal leading-6">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA (blue, before footer)
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#dbeaff] pt-[80px] pb-[160px] px-6 md:px-[48px] relative overflow-hidden">
        {/* Decorative circles — exact Figma positions */}
        <div className="absolute rounded-full bg-[#c2ddfd] pointer-events-none" style={{ width: 130, height: 130, left: 86, top: -65 }} />
        <div className="absolute rounded-full bg-[#c2ddfd] pointer-events-none" style={{ width: 195, height: 195, left: -71, top: 398 }} />
        <div className="absolute rounded-full bg-[#c2ddfd] pointer-events-none" style={{ width: 352, height: 352, left: 1264, top: -164 }} />

        <div className="relative w-full max-w-[900px] mx-auto px-6 md:px-[40px] flex flex-col items-center gap-[40px]">

          {/* Text + badges */}
          <div className="w-full flex flex-col items-start gap-6">

            {/* Heading block */}
            <div className="w-full flex flex-col items-center gap-4">
              <p className="text-[#0666c6] text-[16px] font-normal leading-6 text-center">Just One Step Away</p>
              <h2 className="text-[56px] font-bold leading-[61.6px] text-center">
                <span className="text-[#032445]">Your First Cleaning<br />Is </span>
                <span className="text-[#0666c6]">20% Off </span>
              </h2>
              <p className="text-[#596067] text-[16px] font-normal leading-6 text-center max-w-[478px]">
                First booking with us? New clients get 20% off. Leave a request and we&apos;ll reach out to discuss the details
              </p>
            </div>

            {/* Feature badges */}
            <div className="w-full pt-[29px] flex flex-wrap justify-center gap-3">
              {[
                {
                  label: "Certified professionals",
                  svg: (
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M7 1C5.067 1 3.5 2.567 3.5 4.5C3.5 6.433 5.067 8 7 8C8.933 8 10.5 6.433 10.5 4.5C10.5 2.567 8.933 1 7 1ZM2.5 4.5C2.5 2.01472 4.51472 0 7 0C9.48528 0 11.5 2.01472 11.5 4.5C11.5 6.98528 9.48528 9 7 9C4.51472 9 2.5 6.98528 2.5 4.5Z" fill="#0666C6"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.73187 6.18229C3.97327 6.31639 4.06025 6.62079 3.92615 6.86219L1.35203 11.4959L3.21185 11.4869C3.38575 11.486 3.55697 11.5305 3.70842 11.616C3.8599 11.7015 3.98646 11.825 4.0756 11.9744L4.94007 13.4236L7.30513 8.22059C7.4194 7.9692 7.71583 7.85805 7.96722 7.97232C8.21861 8.08659 8.32976 8.38302 8.21549 8.63441L5.45518 14.7069C5.3782 14.8763 5.21354 14.9889 5.02779 14.9992C4.84204 15.0096 4.66591 14.9159 4.5706 14.7562L3.2169 12.4869L0.502418 12.5C0.324831 12.5009 0.160114 12.4075 0.069682 12.2546C-0.02075 12.1018 -0.0233256 11.9124 0.0629154 11.7572L3.05198 6.37656C3.18608 6.13517 3.49048 6.04819 3.73187 6.18229Z" fill="#0666C6"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M10.2122 6.06259C10.4537 5.92881 10.758 6.01621 10.8918 6.25778L13.9374 11.7578C14.0234 11.913 14.0206 12.1022 13.9301 12.2549C13.8397 12.4076 13.675 12.5009 13.4976 12.5L10.7831 12.4869L9.4294 14.7562C9.33409 14.9159 9.15796 15.0096 8.97221 14.9992C8.78645 14.9889 8.6218 14.8763 8.54482 14.7069L6.54482 10.3069C6.43055 10.0555 6.54171 9.75909 6.7931 9.64482C7.04449 9.53055 7.34091 9.64171 7.45518 9.8931L9.05993 13.4235L9.92435 11.9745C10.0135 11.8251 10.1401 11.7015 10.2916 11.616C10.443 11.5305 10.6141 11.486 10.788 11.4869L12.6493 11.4959L10.017 6.74222C9.88319 6.50064 9.97058 6.19636 10.2122 6.06259Z" fill="#0666C6"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M7 3C6.17157 3 5.5 3.67157 5.5 4.5C5.5 5.32843 6.17157 6 7 6C7.82843 6 8.5 5.32843 8.5 4.5C8.5 3.67157 7.82843 3 7 3ZM4.5 4.5C4.5 3.11929 5.61929 2 7 2C8.38071 2 9.5 3.11929 9.5 4.5C9.5 5.88071 8.38071 7 7 7C5.61929 7 4.5 5.88071 4.5 4.5Z" fill="#0666C6"/>
                    </svg>
                  ),
                },
                {
                  label: "Reply Within 10 Minutes",
                  svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6116 0.102095C12.2822 -0.0169349 12.9242 -0.0431245 13.4454 0.0840119C13.5625 0.112139 13.6693 0.172876 13.7533 0.25921C13.8364 0.344547 13.8939 0.451409 13.9193 0.567656C14.0417 1.10428 14.0163 1.75168 13.8969 2.42749C13.776 3.11186 13.5526 3.85915 13.2502 4.60927C12.6477 6.10406 11.7126 7.65688 10.5857 8.77792C10.2545 9.11115 9.89953 9.41975 9.52371 9.70131C9.54832 10.3149 9.47833 10.9497 9.22828 11.5235C8.82313 12.4502 8.09295 13.0326 7.38991 13.394C6.68891 13.7542 5.98434 13.9118 5.56623 13.979C5.44798 13.9981 5.32693 13.9897 5.21242 13.9546C5.09791 13.9194 4.99302 13.8585 4.90584 13.7763C4.81867 13.6942 4.75154 13.5931 4.70967 13.4809C4.66779 13.3686 4.65227 13.2483 4.66432 13.1291C4.66446 13.1277 4.66461 13.1263 4.66477 13.1249L4.88502 11.118C4.86272 11.1158 4.84042 11.1135 4.81814 11.111C4.57272 11.0857 4.34364 10.9761 4.16989 10.8009L4.1687 10.7997L3.19187 9.82285L3.19066 9.82166C3.01552 9.648 2.90594 9.41905 2.88054 9.17376C2.87794 9.15032 2.87548 9.12688 2.87315 9.10342L0.864471 9.32394L0.862405 9.32416L0.860856 9.32432C0.741531 9.33654 0.620995 9.32112 0.508589 9.27926C0.396178 9.2374 0.294922 9.17021 0.212665 9.08292C0.130407 8.99562 0.0693502 8.89056 0.0342319 8.77586C-0.000885569 8.66117 -0.00912138 8.53993 0.0101614 8.42154L0.0103067 8.42065C0.0789636 8.00386 0.237209 7.30035 0.59801 6.59976C0.959748 5.89735 1.54141 5.16793 2.46741 4.76077L2.46873 4.76019C3.04281 4.50976 3.68108 4.43987 4.29842 4.46682C4.58 4.09237 4.88838 3.73867 5.22118 3.40854C6.34545 2.28534 7.92176 1.35066 9.42638 0.748568C10.1816 0.446375 10.9313 0.222822 11.6116 0.102095ZM9.79789 1.67699C8.38287 2.24323 6.93214 3.11253 5.92739 4.11654L5.92606 4.11787C5.5672 4.47378 5.23998 4.86023 4.9481 5.27286C4.84513 5.41843 4.67243 5.49814 4.49485 5.48207C3.88623 5.42701 3.3232 5.47866 2.8693 5.67646C2.21782 5.96312 1.78123 6.48636 1.48704 7.0576C1.26042 7.49765 1.128 7.94836 1.0518 8.29736L3.28878 8.05178C3.42925 8.03636 3.56968 8.0811 3.67534 8.17492C3.781 8.26875 3.84203 8.40291 3.84332 8.54421C3.84492 8.71834 3.85538 8.89227 3.87465 9.06533C3.87484 9.06708 3.87503 9.06882 3.8752 9.07056C3.87677 9.08611 3.88371 9.10063 3.89482 9.11162L3.8969 9.11368L4.87784 10.0946L4.87987 10.0967C4.89087 10.1078 4.9054 10.1147 4.92096 10.1163C4.92283 10.1165 4.92471 10.1167 4.92658 10.1169C5.09857 10.1361 5.27142 10.1465 5.44446 10.1482C5.58571 10.1496 5.71979 10.2106 5.81356 10.3163C5.90732 10.4219 5.95202 10.5623 5.93661 10.7027L5.69126 12.9382C6.04022 12.863 6.49199 12.7311 6.9328 12.5046C7.50441 12.2108 8.02704 11.7745 8.31162 11.1239C8.50993 10.6687 8.56151 10.1082 8.50925 9.50139C8.49399 9.32418 8.57401 9.15221 8.7194 9.04976C9.13317 8.75821 9.52065 8.43104 9.87742 8.07199L9.87953 8.06989C10.889 7.066 11.7577 5.63713 12.3227 4.23543C12.6042 3.53708 12.8055 2.8572 12.9121 2.25351C12.9986 1.76418 13.0191 1.34583 12.982 1.01639C12.6717 0.981397 12.2676 1.00129 11.7863 1.08671C11.186 1.19325 10.5027 1.39497 9.79789 1.67699ZM9.27616 3.89358C9.11113 3.89358 8.9498 3.94252 8.81258 4.03421C8.67537 4.1259 8.56842 4.25622 8.50528 4.4087C8.44213 4.56117 8.42562 4.72895 8.45783 4.8908C8.49004 5.05266 8.56952 5.20133 8.68623 5.31802C8.76359 5.39554 8.85589 5.45745 8.95705 5.49942C9.0582 5.54138 9.16664 5.56298 9.27616 5.56298C9.38567 5.56298 9.49411 5.54138 9.59527 5.49942C9.69643 5.45745 9.78831 5.39595 9.86567 5.31843C9.98238 5.20175 10.0623 5.05266 10.0945 4.8908C10.1267 4.72895 10.1102 4.56117 10.047 4.4087C9.98389 4.25623 9.87695 4.1259 9.73973 4.03421C9.60252 3.94252 9.44119 3.89358 9.27616 3.89358ZM8.25699 3.20276C8.55866 3.00117 8.91334 2.89358 9.27616 2.89358C9.63898 2.89358 9.99366 3.00117 10.2953 3.20276C10.597 3.40434 10.8321 3.69085 10.9709 4.02607C11.1098 4.36128 11.1461 4.73013 11.0753 5.08598C11.0045 5.44163 10.8299 5.76833 10.5735 6.02479C10.4033 6.19539 10.2011 6.33074 9.97844 6.42309C9.75582 6.51544 9.51717 6.56298 9.27616 6.56298C9.03514 6.56298 8.7965 6.51544 8.57388 6.42309C8.35137 6.33079 8.14924 6.19553 7.97905 6.02504C7.72255 5.76854 7.54786 5.44175 7.47706 5.08598C7.40625 4.73013 7.44255 4.36128 7.58138 4.02607C7.7202 3.69086 7.95532 3.40434 8.25699 3.20276Z" fill="#0666C6"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.92212 9.9335C2.95577 10.2076 2.76085 10.4571 2.48677 10.4907C2.2861 10.5153 2.0994 10.6062 1.95623 10.749C1.9082 10.7974 1.83066 10.9303 1.75412 11.1809C1.68239 11.4157 1.62869 11.695 1.58962 11.972C1.56525 12.1449 1.54724 12.3119 1.534 12.46C1.68219 12.4468 1.84941 12.4287 2.02235 12.4043C2.29948 12.3652 2.57869 12.3115 2.81335 12.2397C3.06445 12.1629 3.19675 12.0852 3.24438 12.0375L3.24523 12.0367C3.38826 11.8943 3.47912 11.7078 3.50315 11.5074C3.53603 11.2332 3.78495 11.0376 4.05913 11.0705C4.33331 11.1034 4.52892 11.3523 4.49604 11.6265C4.44526 12.0499 4.2533 12.444 3.95115 12.745C3.72333 12.9726 3.39338 13.108 3.10585 13.196C2.80165 13.289 2.46568 13.3517 2.16208 13.3945C1.85619 13.4377 1.57032 13.4625 1.36172 13.4765C1.25707 13.4836 1.17101 13.488 1.11057 13.4906C1.08033 13.4919 1.05644 13.4928 1.03979 13.4934C1.03147 13.4937 1.02494 13.4939 1.02033 13.494L1.01486 13.4942L1.01249 13.4943C1.01249 13.4943 1.01234 13.4943 0.999596 12.9944C0.499758 12.9817 0.499762 12.9815 0.499762 12.9815L0.499826 12.9792L0.499983 12.9737C0.50012 12.9691 0.500323 12.9626 0.500608 12.9542C0.501176 12.9376 0.502068 12.9137 0.503394 12.8835C0.506045 12.8231 0.510441 12.7371 0.517483 12.6325C0.531519 12.424 0.556293 12.1382 0.599416 11.8324C0.642217 11.5289 0.704809 11.193 0.797732 10.8888C0.885659 10.6009 1.02095 10.2708 1.24825 10.0427L1.2491 10.0419C1.55005 9.74134 1.94278 9.54997 2.36492 9.49815C2.63901 9.4645 2.88847 9.65942 2.92212 9.9335ZM0.999596 12.9944L0.499762 12.9815C0.496268 13.1185 0.549145 13.2511 0.646039 13.348C0.742934 13.4449 0.875501 13.4977 1.01249 13.4943L0.999596 12.9944Z" fill="#0666C6"/>
                    </svg>
                  ),
                },
                {
                  label: "Flexible Key Handover",
                  svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.31563 4.22406C5.31563 1.88422 7.21574 0 9.625 0C12.0218 0 14 1.8659 14 4.21781C14 6.5685 12.0231 8.44281 9.625 8.44281C9.09948 8.44281 8.65654 8.37557 8.20068 8.21265C8.18487 8.22374 8.16736 8.23586 8.14774 8.24925C8.05252 8.31419 7.88773 8.42153 7.69626 8.46278C7.59406 8.48488 7.5003 8.47549 7.45714 8.47041C7.40179 8.46391 7.34608 8.45299 7.29726 8.44215C7.2025 8.4211 7.0946 8.39132 7.00217 8.36581L6.9951 8.36385C6.94375 8.34968 6.89677 8.33675 6.85417 8.3255C6.86761 8.35528 6.88346 8.38859 6.90187 8.42621C6.90849 8.43974 6.91574 8.45441 6.92341 8.46993C6.95904 8.54199 7.00378 8.63247 7.0366 8.71313C7.05758 8.76468 7.08122 8.82972 7.09685 8.90063C7.1115 8.96707 7.12755 9.07487 7.10152 9.19703C7.07088 9.3408 6.99484 9.46911 6.93572 9.55559C6.8685 9.65394 6.78435 9.75364 6.69153 9.84468C6.52703 10.006 6.24816 10.2259 5.91724 10.2645C5.70905 10.2887 5.52511 10.2256 5.41592 10.1823C5.37323 10.1654 5.33173 10.1471 5.29439 10.13C5.29666 10.1354 5.29891 10.1409 5.30113 10.1462C5.33722 10.2341 5.39719 10.391 5.39367 10.5706C5.3867 10.9961 5.1374 11.254 4.96198 11.4156C4.86501 11.5063 4.74072 11.6189 4.58733 11.7018C4.41705 11.7939 4.23255 11.8391 4.0221 11.8365C3.85772 11.8344 3.68041 11.7963 3.56812 11.7721C3.5541 11.7691 3.54109 11.7663 3.52924 11.7638C3.46362 11.75 3.41957 11.7418 3.38603 11.7379C3.38364 11.7376 3.38144 11.7374 3.37942 11.7372C3.37964 11.739 3.37987 11.7409 3.38011 11.7429C3.38651 11.7947 3.3926 11.8282 3.40028 11.8704C3.40758 11.9106 3.41632 11.9586 3.42813 12.0378C3.45769 12.2361 3.5228 12.7089 3.17529 13.0496C3.10838 13.1155 3.05635 13.1703 2.98759 13.2427C2.96291 13.2687 2.93609 13.297 2.90565 13.3289C2.7927 13.4471 2.64396 13.5998 2.39887 13.8385L2.3976 13.8397L2.39655 13.8407C2.20047 14.0293 1.96152 14.0064 1.86287 13.9873C1.75135 13.9656 1.6518 13.9193 1.58018 13.8812C1.43087 13.8017 1.27079 13.6851 1.13067 13.574C0.845647 13.3479 0.556942 13.0746 0.438679 12.9509C0.257847 12.7619 0 12.3877 0 11.9397C0.000101715 11.7811 0.0335851 11.6239 0.0982727 11.4791C0.161384 11.3378 0.25282 11.211 0.366876 11.1066C0.436034 11.0383 0.697883 10.7438 1.10027 10.2811C1.50012 9.82118 2.01688 9.22068 2.56607 8.57993C3.57669 7.4008 4.69487 6.08799 5.39175 5.26979C5.31539 4.91341 5.31552 4.55935 5.31562 4.25688C5.31562 4.24587 5.31563 4.23493 5.31563 4.22406ZM6.68238 8.2865C6.68274 8.28654 6.68312 8.28659 6.68353 8.28664C6.67628 8.28624 6.6753 8.28567 6.68238 8.2865ZM9.625 1C7.75301 1 6.31563 2.45141 6.31563 4.22406C6.31563 4.6467 6.3204 4.95341 6.41605 5.22871C6.47426 5.39622 6.43938 5.58203 6.32439 5.71703C6.27356 5.7767 6.21958 5.84008 6.16274 5.90681C5.46668 6.72406 4.34178 8.0448 3.32534 9.2307C2.7757 9.87198 2.25711 10.4746 1.85491 10.9372C1.46389 11.3869 1.15953 11.7317 1.05607 11.8312C1.05188 11.8353 1.04761 11.8392 1.04329 11.8431C1.02968 11.8553 1.01879 11.8702 1.01133 11.8869C1.00389 11.9036 1.00003 11.9216 1 11.9399C1.00004 11.9731 1.01124 12.026 1.04535 12.094C1.07898 12.161 1.12401 12.2207 1.16132 12.2597C1.24931 12.3517 1.50435 12.594 1.75214 12.7905C1.81161 12.8377 1.86605 12.8785 1.91411 12.9123C2.03005 12.7966 2.1139 12.71 2.18263 12.638C2.20732 12.6122 2.2309 12.5873 2.25396 12.563C2.31964 12.4938 2.38104 12.4291 2.45153 12.359C2.45314 12.338 2.45422 12.287 2.43906 12.1853C2.43638 12.1673 2.43076 12.1343 2.42409 12.0952C2.41132 12.0202 2.39473 11.9228 2.38766 11.8656C2.37566 11.7685 2.35388 11.5655 2.4373 11.3709C2.50843 11.2049 2.60676 11.0461 2.76567 10.9279C2.92005 10.8131 3.08296 10.7749 3.18449 10.7535C3.30646 10.7279 3.42181 10.7353 3.50128 10.7445C3.58473 10.7542 3.66841 10.7712 3.73482 10.7851C3.74377 10.787 3.75247 10.7888 3.76093 10.7906C3.90105 10.8201 3.97585 10.8358 4.03427 10.8366C4.0831 10.8372 4.09859 10.8293 4.11189 10.8221C4.14131 10.8062 4.18374 10.7743 4.2803 10.6839C4.28131 10.683 4.28233 10.682 4.28335 10.6811C4.35309 10.6169 4.37892 10.5848 4.38992 10.567C4.3903 10.5664 4.39065 10.5658 4.39096 10.5653C4.38802 10.5566 4.38336 10.5438 4.37612 10.5262C4.36565 10.5007 4.35422 10.4751 4.33903 10.4411C4.33594 10.4342 4.3327 10.427 4.32928 10.4193C4.31081 10.3779 4.28778 10.3257 4.26669 10.2703C4.22653 10.1648 4.17518 10.0031 4.18583 9.81711C4.1977 9.60978 4.28373 9.41428 4.44702 9.25435C4.63117 9.074 4.85395 9.00767 5.06614 9.01643C5.25109 9.02407 5.41468 9.08827 5.51909 9.1333C5.56562 9.15336 5.6127 9.17532 5.65164 9.19348C5.65887 9.19685 5.66581 9.20009 5.67243 9.20317C5.71868 9.22466 5.75358 9.24042 5.78447 9.25267C5.79692 9.2576 5.807 9.26123 5.8149 9.26388C5.82313 9.25995 5.83398 9.25424 5.84747 9.24604C5.89048 9.2199 5.94087 9.18024 5.99128 9.13078C6.02695 9.0958 6.05811 9.06035 6.08303 9.02832C6.0697 8.99993 6.05393 8.96795 6.03499 8.92951C6.02538 8.91001 6.01495 8.88886 6.0036 8.86566C5.95909 8.77467 5.90124 8.65341 5.86062 8.52858C5.82308 8.41319 5.77615 8.22582 5.82154 8.02381L5.8219 8.02224C5.82208 8.02143 5.82227 8.02063 5.82245 8.01982C5.84909 7.90567 5.90679 7.81323 5.94031 7.76382C5.98163 7.70293 6.03103 7.64335 6.0833 7.58959C6.16712 7.50338 6.33733 7.34938 6.55941 7.3011C6.66183 7.27883 6.75587 7.28826 6.79911 7.29334C6.85446 7.29984 6.91017 7.31076 6.95899 7.3216C7.05375 7.34265 7.16165 7.37243 7.25408 7.39794L7.26115 7.3999C7.3625 7.42787 7.44681 7.451 7.51407 7.46594C7.51494 7.46613 7.5158 7.46632 7.51665 7.46651C7.53498 7.45576 7.55719 7.44158 7.58429 7.4231C7.61579 7.40162 7.64632 7.37961 7.68203 7.35388C7.69175 7.34688 7.70184 7.3396 7.71245 7.33198C7.75771 7.29947 7.8133 7.25998 7.8701 7.22461C8.00932 7.13792 8.18221 7.12503 8.33276 7.1901C8.74802 7.3696 9.12017 7.44281 9.625 7.44281C11.5081 7.44281 13 5.97963 13 4.21781C13 2.45723 11.5094 1 9.625 1ZM7.57387 7.47725C7.57351 7.47721 7.57313 7.47716 7.57272 7.47711C7.57997 7.47751 7.58095 7.47808 7.57387 7.47725ZM10.5 3C10.4011 3 10.3044 3.02932 10.2222 3.08427C10.14 3.13921 10.0759 3.21729 10.0381 3.30866C10.0002 3.40002 9.99031 3.50055 10.0096 3.59755C10.0289 3.69454 10.0765 3.78363 10.1464 3.85355C10.2164 3.92348 10.3055 3.9711 10.4025 3.99039C10.4994 4.00969 10.6 3.99978 10.6913 3.96194C10.7827 3.9241 10.8608 3.86001 10.9157 3.77779C10.9707 3.69556 11 3.59889 11 3.5C11 3.36739 10.9473 3.24022 10.8536 3.14645C10.7598 3.05268 10.6326 3 10.5 3ZM9.66664 2.2528C9.91332 2.08797 10.2033 2 10.5 2C10.8978 2 11.2794 2.15804 11.5607 2.43934C11.842 2.72064 12 3.10217 12 3.5C12 3.79667 11.912 4.08668 11.7472 4.33335C11.5824 4.58003 11.3481 4.77229 11.074 4.88582C10.7999 4.99935 10.4983 5.02906 10.2074 4.97118C9.91639 4.9133 9.64912 4.77044 9.43934 4.56066C9.22956 4.35088 9.0867 4.08361 9.02882 3.79264C8.97094 3.50166 9.00065 3.20006 9.11418 2.92598C9.22771 2.65189 9.41997 2.41762 9.66664 2.2528Z" fill="#0666C6"/>
                    </svg>
                  ),
                },
              ].map((b) => (
                <span
                  key={b.label}
                  className="flex items-center gap-2 text-[#0666c6] text-[14px] font-normal leading-[21px] px-[18px] py-2 rounded-full outline outline-1 outline-[#0666c6]"
                >
                  {b.svg}
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full pt-[29px] flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#0666c6] text-[#eaebec] font-[510] text-[18px] px-[40px] h-[53px] rounded-[12px] hover:bg-[#0555aa] transition-colors"
            >
              Claim Your 20% Discount
            </Link>
            <a
              href="tel:+4916343250808"
              className="inline-flex items-center justify-center text-[#0666c6] font-[510] text-[18px] px-[40px] h-[53px] rounded-[12px] outline outline-2 outline-[#0666c6] hover:bg-[#0666c6]/5 transition-colors"
            >
              Get Help By Phone
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── ServiceCard ────────────────────────────────────────────────── */
function ServiceCard({
  img,
  name,
  price,
  bullets,
  footnote,
}: {
  img: string;
  name: string;
  price: string;
  bullets: string[];
  footnote?: string;
}) {
  return (
    <div className="rounded-[20px] border border-[#e2eaf0] overflow-hidden flex flex-col">
      <div className="relative h-[189px] shrink-0">
        <Image src={img} alt={name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-semibold text-[#032445] text-[20px] mb-3">{name}</h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-[13px] text-[#4b6070]">From (incl. VAT)</span>
          <span className="text-[36px] font-bold text-[#0666c6] leading-none">{price}</span>
        </div>
        <div className="border-t border-[#e2eaf0] mb-4" />
        <ul className="flex flex-col gap-2 flex-1">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-[14px] text-[#4b6070]">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none" className="shrink-0 mt-[5px]">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.8293 0.123719C11.0371 0.30556 11.0581 0.621441 10.8763 0.829259L3.87629 8.82926C3.78516 8.9334 3.65495 8.99513 3.51664 8.99973C3.37833 9.00434 3.2443 8.95141 3.14645 8.85356L0.146447 5.85356C-0.0488155 5.6583 -0.0488155 5.34172 0.146447 5.14645C0.341709 4.95119 0.658291 4.95119 0.853553 5.14645L3.47564 7.76855L10.1237 0.170755C10.3056 -0.0370638 10.6214 -0.0581225 10.8293 0.123719Z" fill="#0666C6" />
              </svg>
              {b}
            </li>
          ))}
        </ul>
        {footnote && (
          <div className="flex justify-center items-end gap-[2px] self-stretch mt-3">
            <span className="w-[6px] self-stretch text-[#F26C68] text-[12px] font-normal leading-[150%]">*</span>
            <span className="flex-[1_0_0] text-[#596067] text-[12px] font-normal leading-[150%]">{footnote.replace(/^\*\s?/, "")}</span>
          </div>
        )}
      </div>
    </div>
  );
}
