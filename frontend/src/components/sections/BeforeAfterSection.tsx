import BeforeAfterSlider from "@/components/before-after-slider";
import { BEFORE_AFTER_SLIDES } from "@/data/home";

export default function BeforeAfterSection() {
  return (
   <section id="results" className="bg-white pt-10 md:py-[80px] px-4 md:px-[64px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center gap-2 mb-8 md:mb-12 px-[28.5px] md:px-0">
          <p className="text-[#0666c6] text-[14px] font-[510] uppercase leading-[21px]">Before &amp; After</p>
          <h2 className="text-[28px] leading-[1.15] md:text-[40px] md:leading-[48px] font-bold text-center">
            <span className="text-[#0666c6]">The Results Speak</span>
            <br />
            <span className="text-[#032445]">For Themselves</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {BEFORE_AFTER_SLIDES.map((s) => (
            <BeforeAfterSlider key={s.title} {...s} />
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="font-[590] text-[#032445] text-[16px] leading-6 text-center max-w-[544px]">
            Want to see our work in detail?<br />
            Follow us to see before-and-after<br className="md:hidden" />{" "}
            cleaning results
          </p>
          <div className="flex flex-col gap-2 w-full md:w-auto md:flex-row md:flex-wrap md:gap-4 md:justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-1.5 h-12 px-6 rounded-[12px] border-2 border-[#0666c6] bg-white text-[#0666c6] font-[510] text-[14px] leading-[21px] hover:bg-[#ebf5ff] active:bg-[#dbeaff] md:border-0 md:bg-[#0666c6] md:text-white md:text-[18px] md:h-[53px] md:pl-[40px] md:pr-[36px] md:hover:bg-[#064a8d] md:active:bg-[#043565] transition-colors duration-150"
            >
              Our Facebook
              <svg className="size-[18px] md:size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-1.5 h-12 px-6 rounded-[12px] border-2 border-[#0666c6] bg-white text-[#0666c6] font-[510] text-[14px] leading-[21px] hover:bg-[#ebf5ff] active:bg-[#dbeaff] md:border-0 md:bg-[#0666c6] md:text-white md:text-[18px] md:h-[53px] md:pl-[40px] md:pr-[36px] md:hover:bg-[#064a8d] md:active:bg-[#043565] transition-colors duration-150"
            >
              Our Instagram
              <svg className="size-[18px] md:size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
