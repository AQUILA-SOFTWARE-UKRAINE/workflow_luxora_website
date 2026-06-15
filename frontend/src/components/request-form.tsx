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
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(31,31,31,0.80)" }}>
        <div className="relative bg-white rounded-[20px] md:rounded-[40px] pt-12 pb-8 px-5 md:pt-[80px] md:pb-[80px] md:px-[140px] w-full md:w-[721px] h-auto md:h-auto overflow-hidden flex flex-col items-center outline outline-1 outline-[#dfe0e2]">
          {/* Decorative circles */}
          <div className="absolute size-[215px] rounded-full bg-[#dbeaff] pointer-events-none -left-[35px] top-[304px]" />
          <div className="absolute size-[215px] rounded-full bg-[#dbeaff] pointer-events-none left-[560px] -top-[70px]" />

          {/* Content */}
          <div className="relative w-full flex flex-col items-center gap-10 md:gap-[96px]">
            <div className="flex flex-col items-center gap-8 md:gap-[64px]">
              {/* Checkmark icon */}
              <div className="size-[88px] md:size-[123px] rounded-full bg-[#dbeaff] flex items-center justify-center shrink-0">
                <svg className="w-10 h-7 md:w-[55px] md:h-[38px] text-[#0666c6]" fill="none" viewBox="0 0 55 38" stroke="currentColor" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 20L20 35L52 3" />
                </svg>
              </div>
              {/* Text */}
              <div className="flex flex-col items-center gap-4">
                <p className="text-[24px] md:text-[36px] font-bold text-[#0666c6] text-center leading-[1.15]">
                  Your Request Has Been Sent
                </p>
                <p className="text-[14px] md:text-[16px] text-[#032445] text-center leading-6">
                  We will call you within 10 minutes to confirm the details and discuss your booking
                </p>
              </div>
            </div>
            {/* Button */}
            <Link
              href="/"
              className="w-full h-12 md:h-[58px] flex items-center justify-center bg-[#0666c6] text-[#eaebec] font-[510] text-[14px] md:text-[18px] rounded-[12px] hover:bg-[#064a8d] active:bg-[#043565] transition-colors duration-150"
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
        <p className="text-[20px] font-[590] text-[#032445] leading-[30px]">Select one or more services</p>
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {SERVICES.map((svc) => {
            const checked = selected.has(svc.id);
            return (
              <button
                key={svc.id}
                type="button"
                onClick={() => toggleService(svc.id)}
                className={`flex flex-col gap-2 p-4 rounded-[14px] border text-left transition-all duration-150 ${
                  checked
                    ? "bg-[#ebf5ff] border-[#0666c6]"
                    : "bg-white border-[#dfe0e2] hover:border-[#0666c6]/50 hover:shadow-[0_2px_8px_rgba(6,102,198,0.08)]"
                }`}
              >
                <div className="flex items-start justify-between w-full gap-2">
                  <span className="font-[590] text-[16px] text-[#032445] leading-[24px]">
                    {svc.label}
                  </span>
                  <div
                    className={`shrink-0 mt-[2px] size-5 rounded-[6px] border flex items-center justify-center transition-colors ${
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
                <span className="text-[14px] text-[#596067] leading-[21px]">{svc.price}</span>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#0666C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="#0666C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 15V3" stroke="#0666C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
      className="w-full md:max-w-[482px] md:mx-auto inline-flex justify-center items-center gap-2 h-12 md:h-[58px] bg-[#0666C6] text-[#EAEBEC] font-[510] text-[14px] md:text-[18px] px-4 md:pl-10 md:pr-9 rounded-[12px] hover:bg-[#064a8d] active:bg-[#043565] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
>
          {submitting ? "Sending…" : "Request a Free Estimate"}
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#dfe0e2]" />
          <span className="text-[14px] text-[#596067]">or</span>
          <div className="flex-1 h-px bg-[#dfe0e2]" />
        </div>

        {/* Батьківський контейнер (додано items-center, щоб кнопки з фіксованою шириною були по центру екрана) */}
<div className="flex flex-col gap-4 items-center w-full md:flex-row md:justify-center">
  
  {/* WhatsApp Button */}
  <a
    href="https://wa.me/4916343250808"
    target="_blank"
    rel="noreferrer"
    className="w-[358px] h-[48px] md:flex-1 md:h-[51px] flex items-center justify-center gap-2 border-2 border-[#0666c6] text-[#0666c6] font-[510] text-[14px] md:text-[18px] rounded-[12px] hover:bg-[#ebf5ff] hover:border-[#0759aa] hover:text-[#0759aa] active:bg-[#dbeaff] active:border-[#064a8d] active:text-[#064a8d] transition-colors duration-150"
  >
    Write on WhatsApp
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.1173 2.242C11.6741 0.796961 9.75465 0.000752673 7.70951 0C3.49536 0 0.0656331 3.42936 0.0641579 7.64463C0.0634353 8.99216 0.415717 10.3074 1.08472 11.4666L0 15.4286L4.05291 14.3655C5.16948 14.9748 6.42684 15.2955 7.70623 15.2959H7.70951C11.923 15.2959 15.3531 11.8662 15.3545 7.65087C15.3552 5.60796 14.5609 3.68744 13.1173 2.242V2.242ZM7.70951 14.0048H7.70695C6.56686 14.0045 5.44845 13.6979 4.47263 13.1191L4.24059 12.9813L1.83547 13.6122L2.47735 11.2672L2.3263 11.0267C1.69029 10.015 1.35415 8.84554 1.35487 7.64503C1.35635 4.1416 4.20687 1.29108 7.7121 1.29108C9.40932 1.29183 11.0047 1.95352 12.2045 3.15479C13.4043 4.35569 14.0645 5.95253 14.0638 7.65014C14.0623 11.1539 11.2118 14.0045 7.70951 14.0045V14.0048ZM11.1949 9.24587C11.0039 9.15019 10.0648 8.68829 9.88956 8.62449C9.71433 8.5607 9.58716 8.52884 9.45993 8.72017C9.33273 8.91156 8.96654 9.34191 8.85508 9.46908C8.74363 9.59668 8.6322 9.61245 8.4412 9.51674C8.25023 9.42106 7.63473 9.21947 6.90488 8.56877C6.33706 8.06216 5.95359 7.43681 5.84219 7.24542C5.73074 7.05409 5.83045 6.9507 5.92574 6.85574C6.01151 6.77 6.11674 6.63253 6.21242 6.52107C6.3081 6.40962 6.33962 6.32974 6.40338 6.20251C6.46721 6.07492 6.4353 5.96355 6.38767 5.86781C6.33998 5.77216 5.95801 4.83186 5.79854 4.44953C5.64346 4.07711 5.48588 4.12769 5.36894 4.12146C5.25745 4.11595 5.13028 4.11487 5.00272 4.11487C4.87516 4.11487 4.66838 4.1625 4.49316 4.35388C4.31794 4.54518 3.82451 5.00748 3.82451 5.94735C3.82451 6.88729 4.50894 7.79607 4.60462 7.92364C4.70027 8.0512 5.95175 9.98048 7.86788 10.8082C8.32354 11.0051 8.67947 11.2107C9.4145 11.3562 9.83091 11.3357 10.1601 11.2866C10.5271 11.2316 11.2903 10.8243 11.4494 10.3782C11.6084 9.93207 11.6084 9.54938 11.5608 9.46981C11.5132 9.39029 11.3856 9.34224 11.1946 9.24659L11.1949 9.24587Z" fill="#0666C6"/>
    </svg>
  </a>

  {/* Phone Call Button */}
  <a
    href="tel:+4916343250808"
    className="w-[358px] h-[48px] md:flex-1 md:h-[51px] flex items-center justify-center gap-2 border-2 border-[#0666c6] text-[#0666c6] font-[510] text-[14px] md:text-[18px] rounded-[12px] hover:bg-[#ebf5ff] hover:border-[#0759aa] hover:text-[#0759aa] active:bg-[#dbeaff] active:border-[#064a8d] active:text-[#064a8d] transition-colors duration-150"
  >
    Call Us: +49 163 432 5808
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.68709 0.249818C3.80502 0.342438 3.93747 0.467045 4.08985 0.617552C4.41631 0.93886 4.79506 1.45365 5.12005 1.94785C5.44869 2.44758 5.75321 2.97366 5.92389 3.33982C6.02064 3.54787 6.10805 3.73686 6.16934 3.9021C6.23159 4.0699 6.28331 4.25447 6.28365 4.45589C6.28435 4.8775 6.05551 5.20289 5.83508 5.50302C5.77175 5.58924 5.71794 5.65989 5.67157 5.72079C5.5716 5.85205 5.50607 5.9381 5.45361 6.03762C5.40244 6.1347 5.3875 6.20478 5.41172 6.31761C5.44665 6.48031 5.59849 6.83644 5.89333 7.30232C6.17846 7.75288 6.56886 8.26107 7.03531 8.72605C7.50166 9.19091 8.00178 9.57102 8.44336 9.84606C8.89837 10.1295 9.24878 10.275 9.41615 10.3107C9.53264 10.3355 9.60537 10.32 9.70264 10.2693C9.80525 10.2159 9.89654 10.1462 10.0385 10.0379C10.0943 9.99526 10.1579 9.9467 10.2331 9.8908L10.2389 9.88649C10.54 9.66274 10.8746 9.41415 11.2988 9.4146C11.5083 9.41482 11.6964 9.47399 11.862 9.54158C12.0202 9.60617 12.202 9.69774 12.4014 9.79818L12.418 9.80659C12.7675 9.98282 13.2871 10.2814 13.7902 10.6068C14.2843 10.9265 14.8057 11.2997 15.1304 11.6268C15.2813 11.7792 15.4067 11.9122 15.4996 12.0301C15.5895 12.1442 15.6881 12.2918 15.7297 12.4754C15.7766 12.6822 15.7341 12.8543 15.6905 12.9737C15.6709 13.0275 15.6477 13.0791 15.6311 13.1161C15.6285 13.1218 15.626 13.1275 15.6235 13.133C15.6081 13.1672 15.5946 13.1971 15.5803 13.2314L15.5799 13.2322L15.5796 13.233C15.4326 13.5815 15.2539 13.9156 15.0456 14.2313L15.045 14.2322L15.0444 14.2332C14.6374 14.8446 14.2546 15.244 13.6595 15.5212C13.3502 15.6653 12.9084 15.8108 12.2217 15.7251C11.5612 15.6428 10.7019 15.3503 9.52915 14.6935C7.65247 13.641 6.35001 12.7334 4.67023 11.0584C2.99538 9.38818 2.17215 8.29812 1.01894 6.20314C-0.142018 4.09409 -0.140355 2.79349 0.191187 2.08503C0.469557 1.49019 0.873034 1.1091 1.48239 0.704261L1.48359 0.703464L1.4848 0.702673C1.80078 0.495066 2.13511 0.316833 2.48361 0.170206L2.48476 0.169722L2.48591 0.169244C2.52039 0.154913 2.55056 0.141391 2.58505 0.12593C2.59046 0.123505 2.59597 0.121033 2.60163 0.118503C2.63869 0.101919 2.69037 0.0788629 2.74414 0.0593304C2.86333 0.0160358 3.03507 -0.0262549 3.24151 0.0202965C3.42507 0.0616854 3.57273 0.160004 3.68709 0.249818ZM2.91884 1.2076C2.63448 1.32732 2.36164 1.47276 2.10374 1.64211C1.58896 1.98426 1.36828 2.22393 1.21013 2.56187C1.10503 2.78645 0.910525 3.67328 2.00449 5.66063C3.1062 7.66206 3.865 8.66661 5.46461 10.2617C7.0592 11.8519 8.27487 12.7002 10.0789 13.712C11.1828 14.3303 11.8986 14.5511 12.3609 14.6088C12.797 14.6632 13.0258 14.5754 13.1844 14.5014C13.525 14.3428 13.7657 14.1237 14.1073 13.6106C14.2771 13.3532 14.4228 13.0807 14.5427 12.7965C14.5589 12.7579 14.5747 12.7221 14.5881 12.6923C14.5357 12.63 14.4553 12.544 14.3317 12.4191C14.0981 12.1837 13.6644 11.8653 13.1791 11.5513C12.7026 11.2431 12.2183 10.9658 11.9117 10.8112C11.6904 10.6997 11.5487 10.6288 11.4368 10.5831C11.328 10.5387 11.2963 10.5396 11.2976 10.5396C11.3077 10.5396 11.273 10.5197 10.9041 10.7938C10.8664 10.8218 10.8257 10.853 10.7826 10.8861C10.6183 11.012 10.4193 11.1646 10.2221 11.2672C9.92743 11.4206 9.58919 11.4979 9.18149 11.4109C8.82469 11.3348 8.34347 11.1092 7.84857 10.801C7.34022 10.4843 6.77212 10.0522 6.24108 9.5228C5.71015 8.99356 5.2684 8.41859 4.9427 7.90393C4.6267 7.4046 4.38901 6.91347 4.31178 6.55374C4.22386 6.14415 4.30402 5.80589 4.45842 5.513C4.55792 5.32425 4.70666 5.12923 4.82908 4.96873C4.8651 4.9215 4.89883 4.87727 4.92837 4.83705C5.16484 4.51508 5.15929 4.46376 5.15868 4.45816C5.15866 4.45798 5.15868 4.45826 5.15868 4.45816C5.15867 4.44732 5.15613 4.40538 5.11457 4.29336C5.07208 4.17879 5.00592 4.03381 4.90406 3.81477C4.76497 3.51646 4.49232 3.04077 4.18009 2.56598C3.86424 2.0857 3.53847 1.65327 3.30043 1.41908L3.29962 1.41828C3.17402 1.29421 3.08763 1.2138 3.02526 1.16146C2.99496 1.17501 2.95844 1.19113 2.91884 1.2076Z" fill="#0666C6" />
    </svg>
  </a>

</div>

        <div className="flex items-start justify-center gap-1">
          <span className="text-[#f26c68] text-[12px] font-[510] uppercase leading-[18px]">*</span>
          <span className="text-[12px] font-[510] text-[#596067] uppercase text-center leading-[18px]">
            By submitting this form you agree <br /> to our Terms &amp; Conditions
          </span>
        </div>
      </div>
    </form>
    </>
  );
}
