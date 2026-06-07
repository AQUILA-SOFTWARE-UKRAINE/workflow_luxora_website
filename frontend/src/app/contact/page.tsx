import type { Metadata } from "next";
import RequestForm from "@/components/request-form";

export const metadata: Metadata = {
  title: "Contact & Request a Service",
  description:
    "Submit a dry cleaning request or contact us directly. A specialist visits for in-person assessment — no commitment until you confirm the price.",
};

const CONTACT_ITEMS = [
  {
    label: "Phone",
    value: "+380 XX XXX XX XX",
    href: "tel:+380XXXXXXXXX",
    icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
  },
  {
    label: "Email",
    value: "hello@luxora.ua",
    href: "mailto:hello@luxora.ua",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  },
  {
    label: "Hours",
    value: "Mon–Sat: 9:00 – 19:00",
    href: null,
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    label: "Service area",
    value: "Ukraine",
    href: null,
    icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-white py-16 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-blue text-xs font-semibold tracking-widest uppercase mb-4">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Request a <span className="text-blue">Free Assessment</span>
          </h1>
          <p className="text-body text-sm leading-relaxed">
            Fill in the form below — a manager will contact you within 10 minutes to confirm
            details and arrange a specialist visit. No commitment until you approve the in-person quote.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Left: contact info */}
          <div>
            <h2 className="font-bold text-navy text-xl mb-8">Get in touch</h2>

            <div className="flex flex-col gap-6 mb-10">
              {CONTACT_ITEMS.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="size-10 rounded-full bg-blue/10 flex items-center justify-center shrink-0">
                    <svg className="size-4 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-body mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-semibold text-navy hover:text-blue transition-colors text-sm">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-navy text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl bg-sky aspect-square flex items-end p-5">
              <p className="text-blue/30 text-xs">Map embed — add when ready</p>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <RequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
