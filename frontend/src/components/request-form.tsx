"use client";

import { useState } from "react";

const SERVICE_OPTIONS = [
  { value: "", label: "Select a service" },
  { value: "dry_cleaning", label: "Dry Cleaning" },
  { value: "laundry", label: "Laundry" },
  { value: "ironing", label: "Ironing" },
  { value: "leather", label: "Leather & Suede Care" },
  { value: "carpet", label: "Carpet Cleaning" },
  { value: "curtains", label: "Curtain Cleaning" },
  { value: "other", label: "Other" },
];

const inputCls =
  "w-full rounded-xl border border-border px-4 py-3 text-sm text-navy placeholder:text-body/50 focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-colors";

const labelCls = "block text-sm font-medium text-navy mb-1.5";

export default function RequestForm() {
  const [state, setState] = useState<"idle" | "submitting" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");
    // TODO Phase 2: POST form data to Supabase Edge Function /functions/v1/intake-lead
    await new Promise((r) => setTimeout(r, 800));
    setState("done");
  };

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-border bg-sky p-10 text-center">
        <div className="size-14 rounded-full bg-blue/10 flex items-center justify-center mx-auto mb-5">
          <svg className="size-7 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-xl font-bold text-navy mb-2">Request received</p>
        <p className="text-body text-sm leading-relaxed">
          A manager will contact you within 10 minutes to confirm the details and arrange a specialist visit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border p-8">
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelCls}>Full name <span className="text-blue">*</span></label>
          <input id="name" name="name" type="text" required placeholder="Olena Kovalenko" className={inputCls} />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelCls}>Phone number <span className="text-blue">*</span></label>
          <input id="phone" name="phone" type="tel" required placeholder="+380 XX XXX XX XX" className={inputCls} />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className={labelCls}>City <span className="text-blue">*</span></label>
          <input id="city" name="city" type="text" required placeholder="Kyiv" className={inputCls} />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className={labelCls}>Street address <span className="text-blue">*</span></label>
          <input id="address" name="address" type="text" required placeholder="Khreshchatyk St 1, apt 5" className={inputCls} />
        </div>

        {/* Service */}
        <div className="sm:col-span-2">
          <label htmlFor="service" className={labelCls}>Service type <span className="text-blue">*</span></label>
          <select id="service" name="service" required defaultValue="" className={inputCls}>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} disabled={o.value === ""}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label htmlFor="description" className={labelCls}>
            Description <span className="text-body/50 font-normal">(optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Describe the item, any stains, special concerns..."
            className={inputCls}
          />
        </div>

        {/* Photo */}
        <div className="sm:col-span-2">
          <label htmlFor="photo" className={labelCls}>
            Photo of the item <span className="text-body/50 font-normal">(optional, recommended)</span>
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            className="w-full rounded-xl border border-border px-4 py-3 text-sm text-body file:mr-4 file:rounded-lg file:border-0 file:bg-sky file:px-4 file:py-2 file:text-blue file:text-sm file:font-medium hover:file:bg-sky/80 transition-colors cursor-pointer"
          />
          <p className="text-xs text-body/60 mt-1.5">JPG, PNG, WEBP — max 10 MB</p>
        </div>

        {/* Honeypot — hidden from real users, caught server-side */}
        <input type="text" name="_trap" tabIndex={-1} className="hidden" aria-hidden="true" />

        {/* Consent */}
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 size-4 rounded border-border text-blue focus:ring-blue/30 shrink-0"
            />
            <span className="text-sm text-body">
              I agree to the processing of my personal data in accordance with the{" "}
              <a href="/privacy" className="text-blue underline underline-offset-4">Privacy Policy</a>.
            </span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-blue text-white font-medium px-8 py-4 rounded-xl hover:bg-[#064a8d] active:bg-[#043565] transition-colors duration-150 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "submitting" ? (
          <>
            <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Submit Request
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </button>
      <p className="text-center text-xs text-body/60 mt-3">Takes 2 minutes. No commitment required.</p>
    </form>
  );
}
