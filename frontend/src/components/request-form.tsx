"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./request-form.module.css";

const SERVICE_IDS = ["upholstery", "apartment", "windows", "driveway", "car", "other"] as const;

function compressPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const MAX = 1600;
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        const r = Math.min(MAX / width, MAX / height);
        width = Math.round(width * r);
        height = Math.round(height * r);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("no 2d context")); return; }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.82).split(",")[1]);
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("image load failed")); };
    img.src = objectUrl;
  });
}

const MODAL_BUBBLES = [
  { size: 18, left: 8,  duration: 10, delay: -2,  wobble: 3   },
  { size: 12, left: 22, duration: 13, delay: -7,  wobble: 2.5 },
  { size: 24, left: 40, duration:  9, delay: -4,  wobble: 4   },
  { size: 14, left: 58, duration: 12, delay: -1,  wobble: 3.2 },
  { size: 20, left: 74, duration: 11, delay: -9,  wobble: 3.8 },
  { size: 16, left: 88, duration: 14, delay: -5,  wobble: 2.8 },
  { size: 10, left: 32, duration: 10, delay: -11, wobble: 3   },
  { size: 22, left: 65, duration:  8, delay: -3,  wobble: 4.2 },
];

export default function RequestForm({ preselect }: { preselect?: string }) {
  const t = useTranslations("form");

  const [selected, setSelected] = useState<Set<string>>(
    preselect ? new Set([preselect]) : new Set(),
  );
  const [photos, setPhotos]     = useState<{ file: File; url: string }[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]         = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const validatePhone = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) return t("phoneError");
    return "";
  };

  const cities = t.raw("cities") as string[];

  const services = SERVICE_IDS.map((id) => ({
    id,
    label: t(`services.${id}`),
    price: t(`servicePrices.${id}`),
  }));

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
        .slice(0, 5 - photos.length)
        .map((file) => ({ file, url: URL.createObjectURL(file) }));
      setPhotos((prev) => [...prev, ...arr].slice(0, 5));
    },
    [photos.length],
  );

  const removePhoto = (i: number) =>
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[i].url);
      return prev.filter((_, j) => j !== i);
    });

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    const phoneVal = (data.get("phone") as string) || "";
    const phoneValidationError = validatePhone(phoneVal);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    setSubmitting(true);

    try {
      const photoBase64s = photos.length > 0
        ? await Promise.all(photos.map(({ file }) => compressPhoto(file)))
        : [];

      const res = await fetch(
        "https://wkvqirxbzryysbeczzmd.supabase.co/functions/v1/submit-lead",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name:     data.get("name"),
            phone:    data.get("phone"),
            city:     data.get("city"),
            address:  data.get("address") || null,
            message:  data.get("message") || null,
            services: [...selected],
            photos:   photoBase64s,
            _trap:    data.get("_trap"),
          }),
        },
      );

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        console.error(`Submit failed HTTP ${res.status}:`, body);
        throw new Error(`HTTP ${res.status}`);
      }
      setDone(true);
    } catch (err) {
      console.error("Submit error:", err);
      alert(t("errorMsg"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Success modal ── */}
      {done && (
        <div
          className={styles.modalOverlay}
          style={{ background: "rgba(31,31,31,0.80)" }}
        >
          <div className={styles.modalCard}>
            <div className={styles.modalCircle1} />
            <div className={styles.modalCircle2} />

            <div className={styles.modalBubbles}>
              {MODAL_BUBBLES.map((b, i) => (
                <div
                  key={i}
                  className="bubble-container"
                  style={{ left: `${b.left}%`, animation: `floatUp ${b.duration}s linear ${b.delay}s infinite` }}
                >
                  <div
                    className="bubble"
                    style={{
                      width: b.size,
                      height: b.size,
                      animation: `wobble ${b.wobble}s ease-in-out infinite alternate`,
                      background: "radial-gradient(circle at 30% 30%, rgba(194,221,253,0.95), rgba(194,221,253,0.4) 60%, rgba(194,221,253,0) 100%)",
                      border: "2px solid rgba(6,102,198,0.25)",
                      boxShadow: "inset 0 0 10px rgba(194,221,253,0.8)",
                    }}
                  />
                </div>
              ))}
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalTop}>
                <div className={styles.checkCircle}>
                  <svg
                    className={styles.checkIcon}
                    fill="none"
                    viewBox="0 0 55 38"
                    stroke="currentColor"
                    strokeWidth={7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 20L20 35L52 3" />
                  </svg>
                </div>
                <div className={styles.modalTextBlock}>
                  <p className={styles.modalTitle}>{t("successTitle")}</p>
                  <p className={styles.modalSubtitle}>{t("successDesc")}</p>
                </div>
              </div>
              <Link href="/" className={styles.modalBackBtn}>{t("successBack")}</Link>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Service selector */}
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>{t("selectServices")}</legend>
          <div className={styles.serviceGrid}>
            {services.map((svc) => {
              const checked = selected.has(svc.id);
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => toggleService(svc.id)}
                  className={`${styles.serviceCard} ${checked ? styles.serviceCardSelected : ""}`}
                >
                  <div className={styles.serviceCardTop}>
                    <span className={styles.serviceLabel}>{svc.label}</span>
                    <div className={`${styles.serviceCheckbox} ${checked ? styles.serviceCheckboxSelected : ""}`}>
                      {checked && (
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" style={{ color: "white" }} />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className={styles.servicePrice}>{svc.price}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Full Name */}
        <div className={styles.fieldGroup}>
          <label htmlFor="name" className={styles.label}>
            {t("name")} <span className={styles.required}>*</span>
          </label>
          <input id="name" name="name" type="text" required placeholder={t("namePlaceholder")} className={styles.input} />
        </div>

        {/* Phone */}
        <div className={styles.fieldGroup}>
          <label htmlFor="phone" className={styles.label}>
            {t("phone")} <span className={styles.required}>*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder={t("phonePlaceholder")}
            className={`${styles.input} ${phoneError ? styles.inputError : ""}`}
            onBlur={(e) => setPhoneError(validatePhone(e.target.value))}
            onChange={(e) => { if (phoneError) setPhoneError(validatePhone(e.target.value)); }}
          />
          {phoneError && (
            <div className={styles.fieldError}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle cx="7" cy="7" r="7" fill="#e53935" />
                <path d="M7 3.5v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="7" cy="10" r="0.9" fill="white" />
              </svg>
              {phoneError}
            </div>
          )}
        </div>

        {/* City */}
        <div className={styles.fieldGroup}>
          <label htmlFor="city" className={styles.label}>
            {t("city")} <span className={styles.required}>*</span>
          </label>
          <div className={styles.selectWrap}>
            <select id="city" name="city" required defaultValue="" className={styles.select}>
              <option value="" disabled>{t("cityPlaceholder")}</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className={styles.selectChevron}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Street Address */}
        <div className={styles.fieldGroup}>
          <label htmlFor="address" className={styles.label}>
            {t("address")} <span style={{ fontWeight: 400, color: "#596067" }}>{t("addressOptional")}</span>
          </label>
          <input id="address" name="address" type="text" placeholder={t("addressPlaceholder")} className={styles.input} />
        </div>

        {/* Message */}
        <div className={styles.fieldGroup}>
          <label htmlFor="message" className={styles.label}>
            {t("message")} <span style={{ fontWeight: 400, color: "#596067" }}>{t("messageOptional")}</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder={t("messagePlaceholder")}
            className={styles.textarea}
          />
        </div>

        {/* Photo upload */}
        <div className={styles.fieldGroup}>
          <div className={styles.uploadHeader}>
            <div className={styles.uploadLabelGroup}>
              <span className={styles.uploadLabelBold}>{t("addPhoto")}</span>
              <span className={styles.uploadLabelOptional}>{t("photoOptional")}</span>
            </div>
            <span className={styles.uploadCount}>{photos.length}/5</span>
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`${styles.dropZone} ${dragging ? styles.dropZoneDragging : ""}`}
          >
            <div className={styles.dropZoneIconWrap}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#0666C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 10L12 15L17 10" stroke="#0666C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15V3" stroke="#0666C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className={styles.dropZoneText}>
              <p className={styles.dropZoneTitle}>
                {photos.length > 0 ? t("uploadedPhoto", { count: photos.length }) : t("uploadPhoto")}
              </p>
              <p className={styles.dropZoneHint}>{t("photoHint")}</p>
            </div>

            {photos.length > 0 && (
              <div className={styles.previewGrid}>
                {photos.map((p, i) => (
                  <div key={i} className={styles.previewItem}>
                    <img src={p.url} alt={p.file.name} className={styles.previewImg} />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removePhoto(i); }}
                      className={styles.previewRemove}
                      aria-label="Remove photo"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />
        </div>

        {/* Honeypot */}
        <input type="text" name="_trap" tabIndex={-1} className="hidden" aria-hidden="true" />

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="submit"
            disabled={submitting}
            className={`${styles.submitBtn} ${submitting ? styles.submitBtnDisabled : ""}`}
          >
            {submitting ? t("submitting") : t("submit")}
          </button>

          <div className={styles.divider}>
            <div className={styles.dividerLine} />
            <span className={styles.dividerText}>or</span>
            <div className={styles.dividerLine} />
          </div>

          <div className={styles.altBtns}>
            <a href="https://wa.me/4916343250808" target="_blank" rel="noreferrer" className={styles.altBtn}>
              {t("whatsapp")}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.1173 2.242C11.6741 0.796961 9.75465 0.000752673 7.70951 0C3.49536 0 0.0656331 3.42936 0.0641579 7.64463C0.0634353 8.99216 0.415717 10.3074 1.08472 11.4666L0 15.4286L4.05291 14.3655C5.16948 14.9748 6.42684 15.2955 7.70623 15.2959H7.70951C11.923 15.2959 15.3531 11.8662 15.3545 7.65087C15.3552 5.60796 14.5609 3.68744 13.1173 2.242V2.242ZM7.70951 14.0048H7.70695C6.56686 14.0045 5.44845 13.6979 4.47263 13.1191L4.24059 12.9813L1.83547 13.6122L2.47735 11.2672L2.3263 11.0267C1.69029 10.015 1.35415 8.84554 1.35487 7.64503C1.35635 4.1416 4.20687 1.29108 7.7121 1.29108C9.40932 1.29183 11.0047 1.95352 12.2045 3.15479C13.4043 4.35569 14.0645 5.95253 14.0638 7.65014C14.0623 11.1539 11.2118 14.0045 7.70951 14.0045V14.0048ZM11.1949 9.24587C11.0039 9.15019 10.0648 8.68829 9.88956 8.62449C9.71433 8.5607 9.58716 8.52884 9.45993 8.72017C9.33273 8.91156 8.96654 9.34191 8.85508 9.46908C8.74363 9.59668 8.6322 9.61245 8.4412 9.51674C8.25023 9.42106 7.63473 9.21947 6.90488 8.56877C6.33706 8.06216 5.95359 7.43681 5.84219 7.24542C5.73074 7.05409 5.83045 6.9507 5.92574 6.85574C6.01151 6.77 6.11674 6.63253 6.21242 6.52107C6.3081 6.40962 6.33962 6.32974 6.40338 6.20251C6.46721 6.07492 6.4353 5.96355 6.38767 5.86781C6.33998 5.77216 5.95801 4.83186 5.79854 4.44953C5.64346 4.07711 5.48588 4.12769 5.36894 4.12146C5.25745 4.11595 5.13028 4.11487 5.00272 4.11487C4.87516 4.11487 4.66838 4.1625 4.49316 4.35388C4.31794 4.54518 3.82451 5.00748 3.82451 5.94735C3.82451 6.88729 4.50894 7.79607 4.60462 7.92364C4.70027 8.0512 5.95175 9.98048 7.86788 10.8082C8.32354 11.0051 8.67947 11.2107 9.4145 11.3562C9.83091 11.3357 10.1601 11.2866 10.5271 11.2316C11.2903 10.8243 11.4494 10.3782 11.6084 9.93207C11.6084 9.93207 11.6084 9.54938 11.5608 9.46981C11.5132 9.39029 11.3856 9.34224 11.1946 9.24659L11.1949 9.24587Z" fill="#0666C6" />
              </svg>
            </a>
            <a href="tel:+4916343250808" className={styles.altBtn}>
              {t("call")}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.68709 0.249818C3.80502 0.342438 3.93747 0.467045 4.08985 0.617552C4.41631 0.93886 4.79506 1.45365 5.12005 1.94785C5.44869 2.44758 5.75321 2.97366 5.92389 3.33982C6.02064 3.54787 6.10805 3.73686 6.16934 3.9021C6.23159 4.0699 6.28331 4.25447 6.28365 4.45589C6.28435 4.8775 6.05551 5.20289 5.83508 5.50302C5.77175 5.58924 5.71794 5.65989 5.67157 5.72079C5.5716 5.85205 5.50607 5.9381 5.45361 6.03762C5.40244 6.1347 5.3875 6.20478 5.41172 6.31761C5.44665 6.48031 5.59849 6.83644 5.89333 7.30232C6.17846 7.75288 6.56886 8.26107 7.03531 8.72605C7.50166 9.19091 8.00178 9.57102 8.44336 9.84606C8.89837 10.1295 9.24878 10.275 9.41615 10.3107C9.53264 10.3355 9.60537 10.32 9.70264 10.2693C9.80525 10.2159 9.89654 10.1462 10.0385 10.0379C10.0943 9.99526 10.1579 9.9467 10.2331 9.8908L10.2389 9.88649C10.54 9.66274 10.8746 9.41415 11.2988 9.4146C11.5083 9.41482 11.6964 9.47399 11.862 9.54158C12.0202 9.60617 12.202 9.69774 12.4014 9.79818L12.418 9.80659C12.7675 9.98282 13.2871 10.2814 13.7902 10.6068C14.2843 10.9265 14.8057 11.2997 15.1304 11.6268C15.2813 11.7792 15.4067 11.9122 15.4996 12.0301C15.5895 12.1442 15.6881 12.2918 15.7297 12.4754C15.7766 12.6822 15.7341 12.8543 15.6905 12.9737C15.6709 13.0275 15.6477 13.0791 15.6311 13.1161C15.6285 13.1218 15.626 13.1275 15.6235 13.133C15.6081 13.1672 15.5946 13.1971 15.5803 13.2314L15.5799 13.2322L15.5796 13.233C15.4326 13.5815 15.2539 13.9156 15.0456 14.2313L15.045 14.2322L15.0444 14.2332C14.6374 14.8446 14.2546 15.244 13.6595 15.5212C13.3502 15.6653 12.9084 15.8108 12.2217 15.7251C11.5612 15.6428 10.7019 15.3503 9.52915 14.6935C7.65247 13.641 6.35001 12.7334 4.67023 11.0584C2.99538 9.38818 2.17215 8.29812 1.01894 6.20314C-0.142018 4.09409 -0.140355 2.79349 0.191187 2.08503C0.469557 1.49019 0.873034 1.1091 1.48239 0.704261L1.48359 0.703464L1.4848 0.702673C1.80078 0.495066 2.13511 0.316833 2.48361 0.170206L2.48476 0.169722L2.48591 0.169244C2.52039 0.154913 2.55056 0.141391 2.58505 0.12593C2.59046 0.123505 2.59597 0.121033 2.60163 0.118503C2.63869 0.101919 2.69037 0.0788629 2.74414 0.0593304C2.86333 0.0160358 3.03507 -0.0262549 3.24151 0.0202965C3.42507 0.0616854 3.57273 0.160004 3.68709 0.249818ZM2.91884 1.2076C2.63448 1.32732 2.36164 1.47276 2.10374 1.64211C1.58896 1.98426 1.36828 2.22393 1.21013 2.56187C1.10503 2.78645 0.910525 3.67328 2.00449 5.66063C3.1062 7.66206 3.865 8.66661 5.46461 10.2617C7.0592 11.8519 8.27487 12.7002 10.0789 13.712C11.1828 14.3303 11.8986 14.5511 12.3609 14.6088C12.797 14.6632 13.0258 14.5754 13.1844 14.5014C13.525 14.3428 13.7657 14.1237 14.1073 13.6106C14.2771 13.3532 14.4228 13.0807 14.5427 12.7965C14.5589 12.7579 14.5747 12.7221 14.5881 12.6923C14.5357 12.63 14.4553 12.544 14.3317 12.4191C14.0981 12.1837 13.6644 11.8653 13.1791 11.5513C12.7026 11.2431 12.2183 10.9658 11.9117 10.8112C11.6904 10.6997 11.5487 10.6288 11.4368 10.5831C11.328 10.5387 11.2963 10.5396 11.2976 10.5396C11.3077 10.5396 11.273 10.5197 10.9041 10.7938C10.8664 10.8218 10.8257 10.853 10.7826 10.8861C10.6183 11.012 10.4193 11.1646 10.2221 11.2672C9.92743 11.4206 9.58919 11.4979 9.18149 11.4109C8.82469 11.3348 8.34347 11.1092 7.84857 10.801C7.34022 10.4843 6.77212 10.0522 6.24108 9.5228C5.71015 8.99356 5.2684 8.41859 4.9427 7.90393C4.6267 7.4046 4.38901 6.91347 4.31178 6.55374C4.22386 6.14415 4.30402 5.80589 4.45842 5.513C4.55792 5.32425 4.70666 5.12923 4.82908 4.96873C4.8651 4.9215 4.89883 4.87727 4.92837 4.83705C5.16484 4.51508 5.15929 4.46376 5.15868 4.45816C5.15866 4.45798 5.15868 4.45826 5.15868 4.45816C5.15867 4.44732 5.15613 4.40538 5.11457 4.29336C5.07208 4.17879 5.00592 4.03381 4.90406 3.81477C4.76497 3.51646 4.49232 3.04077 4.18009 2.56598C3.86424 2.0857 3.53847 1.65327 3.30043 1.41908L3.29962 1.41828C3.17402 1.29421 3.08763 1.2138 3.02526 1.16146C2.99496 1.17501 2.95844 1.19113 2.91884 1.2076Z" fill="#0666C6" />
              </svg>
            </a>
          </div>

          <p className={styles.finePrint}>
            <span className={styles.finePrintAsterisk}>*</span>
            <span className={styles.finePrintText}>{t("agreement")}</span>
          </p>
        </div>
      </form>
    </>
  );
}
