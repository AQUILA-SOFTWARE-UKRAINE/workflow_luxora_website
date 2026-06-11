"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

const SERVICES = [
  { id: "upholstery", label: "Upholstery & Carpet Cleaning", price: "From €80 incl. VAT" },
  { id: "apartment", label: "Apartment & House Cleaning", price: "From €120 incl. VAT" },
  { id: "windows", label: "Window Cleaning", price: "From €60 incl. VAT" },
  { id: "driveway", label: "Driveway & Patio Washing", price: "From €90 incl. VAT" },
  { id: "car", label: "Car Interior Detailing", price: "From €80 incl. VAT" },
  { id: "other", label: "Other", price: "From €60 incl. VAT" },
];

const CITIES = [
  "Berlin", "Potsdam", "Brandenburg an der Havel", "Cottbus",
  "Frankfurt (Oder)", "Eberswalde", "Oranienburg", "Other",
];

const inputCls =
  "w-full bg-white border border-[#dfe0e2] rounded-[12px] px-[17px] py-[15px] text-[16px] text-[#032445] placeholder:text-[#747a80] focus:outline-none focus:border-[#0666c6] focus:ring-2 focus:ring-[#0666c6]/20 transition-colors";

export default function RequestForm({ preselect }: { preselect?: string }) {
  const [selected, setSelected] = useState<Set<string>>(
    preselect ? new Set([preselect]) : new Set()
  );
  const [photos, setPhotos] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleService = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const arr = Array.from(files)
        .filter((f) => f.type.startsWith("image/"))
        .slice(0, 5 - photos.length);
      setPhotos((prev) => [...prev, ...arr].slice(0, 5));
    },
    [photos.length]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO Phase 2: POST to Supabase Edge Function /functions/v1/intake-lead
    await new Promise((r) => setTimeout(r, 800));
    setDone(true);
  };


  return (
    <>
    {/* ── Success modal ── */}
    {done && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(31,31,31,0.80)" }}>
        <div className="relative bg-white rounded-[40px] px-8 py-16 md:px-[140px] md:py-[80px] max-w-[721px] w-full overflow-hidden flex flex-col items-center">
          {/* Decorative circles */}
          <div className="absolute size-[215px] rounded-full bg-[#dbeaff] pointer-events-none -left-[98px] bottom-[48px]" />
          <div className="absolute size-[215px] rounded-full bg-[#dbeaff] pointer-events-none -right-[48px] -top-[85px]" />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-24">
            <div className="flex flex-col items-center gap-16">
              {/* Success icon */}
              <div className="relative size-[123px] flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full border-[5px] border-[#0666c6]/15" />
                <div className="size-[88px] rounded-full bg-[#dbeaff] flex items-center justify-center">
                  <svg className="size-11 text-[#0666c6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>
              {/* Text */}
              <div className="flex flex-col items-center gap-4">
                <p className="text-[36px] font-bold text-[#0666c6] text-center leading-none whitespace-nowrap">
                  Your Request Has Been Sent
                </p>
                <p className="text-[16px] text-[#032445] text-center leading-[1.5] max-w-[361px]">
                  We will call you within 10 minutes to confirm the details and discuss your booking
                </p>
              </div>
            </div>
            {/* Button */}
            <Link
              href="/"
              className="w-full h-[58px] flex items-center justify-center bg-[#0666c6] text-[#eaebec] font-[510] text-[18px] rounded-[12px] hover:bg-[#064a8d] active:bg-[#043565] transition-colors duration-150"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )}

    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Part 1 — service selector */}
      <div className="flex flex-col gap-3">
        <p className="text-[20px] font-[590] text-[#032445]">Select one or more services</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((svc) => {
            const checked = selected.has(svc.id);
            return (
              <button
                key={svc.id}
                type="button"
                onClick={() => toggleService(svc.id)}
                className={`flex flex-col justify-between h-[139px] p-[17px] rounded-[14px] border text-left transition-all duration-150 ${
                  checked
                    ? "bg-[#ebf5ff] border-[#0666c6]"
                    : "bg-white border-[#dfe0e2] hover:border-[#0666c6]/50 hover:shadow-[0_2px_8px_rgba(6,102,198,0.08)]"
                }`}
              >
                <div className="flex items-start justify-between w-full gap-2">
                  <span className="font-[590] text-[16px] text-[#032445] leading-[1.5]">
                    {svc.label}
                  </span>
                  <div
                    className={`shrink-0 mt-1 size-5 rounded-[6px] border flex items-center justify-center transition-colors ${
                      checked ? "bg-[#0666c6] border-[#0666c6]" : "border-[#dfe0e2]"
                    }`}
                  >
                    {checked && (
                      <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-[14px] text-[#596067]">{svc.price}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="name" className="flex gap-[2px] text-[16px] font-[590] text-[#032445] mb-3">
          Full Name <span className="text-[#f26c68]">*</span>
        </label>
        <input
          id="name" name="name" type="text" required
          placeholder="e.g. Anna Müller"
          className={inputCls}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="flex gap-[2px] text-[16px] font-[590] text-[#032445] mb-3">
          Phone Number <span className="text-[#f26c68]">*</span>
        </label>
        <input
          id="phone" name="phone" type="tel" required
          placeholder="+49 ___ _______"
          className={inputCls}
        />
      </div>

      {/* City */}
      <div>
        <label htmlFor="city" className="flex gap-[2px] text-[16px] font-[590] text-[#032445] mb-3">
          City or Town <span className="text-[#f26c68]">*</span>
        </label>
        <div className="relative">
          <select
            id="city" name="city" required defaultValue=""
            className={`${inputCls} appearance-none pr-10 cursor-pointer`}
          >
            <option value="" disabled className="text-[#747a80]">Select your city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            <svg className="size-5 text-[#032445]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Street Address */}
      <div>
        <label htmlFor="address" className="flex gap-[4px] text-[16px] mb-3">
          <span className="font-[590] text-[#032445]">Street Address</span>
          <span className="font-normal text-[#596067]">(optional)</span>
        </label>
        <input
          id="address" name="address" type="text"
          placeholder="e.g. Hauptstraße 12, Berlin"
          className={inputCls}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="flex gap-[4px] text-[16px] mb-3">
          <span className="font-[590] text-[#032445]">Message</span>
          <span className="font-normal text-[#596067]">(optional)</span>
        </label>
        <textarea
          id="message" name="message" rows={4}
          placeholder="Tell us about your space, rooms, or anything we should know"
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* Photo upload */}
      <div>
        <div className="flex items-end justify-between mb-3">
          <div className="flex gap-[4px] text-[16px]">
            <span className="font-[590] text-[#032445]">Add a photo</span>
            <span className="font-normal text-[#596067]">(optional)</span>
          </div>
          <span className="text-[14px] font-[510] text-[#596067] uppercase tracking-[-0.28px]">
            {photos.length}/5
          </span>
        </div>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`flex flex-col items-center gap-4 py-7 rounded-[14px] border border-dashed cursor-pointer transition-colors ${
            dragging
              ? "border-[#0666c6] bg-[#ebf5ff]"
              : "border-[#dfe0e2] bg-white hover:border-[#0666c6]/60 hover:bg-[#fafcff]"
          }`}
        >
          <div className="size-11 rounded-[12px] bg-[#dbeaff] flex items-center justify-center shrink-0">
            <svg className="size-6 text-[#0666c6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-[16px] font-[590] text-[#032445]">Upload a photo</p>
            <p className="text-[14px] text-[#596067]">Drag & drop · JPG/PNG up to 10 MB</p>
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        {photos.length > 0 && (
          <ul className="mt-2 flex flex-col gap-1">
            {photos.map((f, i) => (
              <li key={i} className="flex items-center justify-between text-[14px] text-[#596067] bg-[#f5f7fa] rounded-[8px] px-3 py-1.5">
                <span className="truncate">{f.name}</span>
                <button
                  type="button"
                  onClick={() => setPhotos((prev) => prev.filter((_, j) => j !== i))}
                  className="shrink-0 ml-3 text-[#4b6070] hover:text-[#032445]"
                  aria-label="Remove"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Honeypot */}
      <input type="text" name="_trap" tabIndex={-1} className="hidden" aria-hidden="true" />

      {/* Part 3 — actions */}
      <div className="flex flex-col gap-6">
        <button
          type="submit"
          disabled={submitting}
          className="w-full h-[58px] bg-[#0666c6] text-[#eaebec] font-[510] text-[18px] rounded-[12px] hover:bg-[#064a8d] active:bg-[#043565] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending…" : "Request a Free Estimate"}
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#dfe0e2]" />
          <span className="text-[14px] text-[#596067]">or</span>
          <div className="flex-1 h-px bg-[#dfe0e2]" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://wa.me/4916343250808"
            target="_blank"
            rel="noreferrer"
            className="flex-1 h-[51px] flex items-center justify-center gap-2 border-2 border-[#0666c6] text-[#0666c6] font-[510] text-[18px] rounded-[12px] hover:border-[#0759aa] hover:text-[#0759aa] active:border-[#064a8d] active:text-[#064a8d] transition-colors duration-150"
          >
            Write on WhatsApp
            <svg className="size-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
          <a
            href="tel:+4916343250808"
            className="flex-1 h-[51px] flex items-center justify-center gap-2 border-2 border-[#0666c6] text-[#0666c6] font-[510] text-[18px] rounded-[12px] hover:border-[#0759aa] hover:text-[#0759aa] active:border-[#064a8d] active:text-[#064a8d] transition-colors duration-150"
          >
            Call: +49 163 432 5808
            <svg className="size-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </a>
        </div>

        <div className="flex items-start justify-center gap-1">
          <span className="text-[#f26c68] text-[12px] font-[510] uppercase leading-[18px]">*</span>
          <span className="text-[12px] font-[510] text-[#596067] uppercase text-center leading-[18px]">
            By submitting this form you agree to our Terms &amp; Conditions
          </span>
        </div>
      </div>
    </form>
    </>
  );
}
