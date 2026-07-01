"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
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
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Додаємо стан для відформатованого значення телефону (дефолтно з плюсом)
  const [phoneValue, setPhoneValue] = useState("+");
  const [phoneError, setPhoneError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Допоміжна функція для форматування маски на льоту
  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 12);
    let formatted = "+";
    
    if (digits.length > 0) {
      formatted += digits.substring(0, 3);
    }
    if (digits.length > 3) {
      formatted += " " + digits.substring(3, 5);
    }
    if (digits.length > 5) {
      formatted += " " + digits.substring(5, 8);
    }
    if (digits.length > 8) {
      formatted += " " + digits.substring(8, 10);
    }
    if (digits.length > 10) {
      formatted += " " + digits.substring(10, 12);
    }
    
    return formatted;
  };

  const validatePhone = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    // Перевіряємо, щоб було введено рівно 12 цифр
    if (digits.length !== 12) return t("phoneError");
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneValue(formatted);
    
    // Якщо помилка вже відображається, валідуємо на льоту під час виправлення
    if (phoneError) {
      setPhoneError(validatePhone(formatted));
    }
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setPhoneError(validatePhone(e.target.value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    // Отримуємо значення з formData
    const phoneVal = (data.get("phone") as string) || "";
    const phoneValidationError = validatePhone(phoneVal);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    if (!turnstileToken) return;

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
            phone:    data.get("phone"), // На бекенд піде рядок з пробілами, наприклад "+380 99 123 45 67"
            city:     data.get("city"),
            address:  data.get("address") || null,
            message:  data.get("message") || null,
            services:        [...selected],
            photos:          photoBase64s,
            _trap:           data.get("_trap"),
            turnstileToken,
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
            placeholder="+380 00 000 00 00"
            className={`${styles.input} ${phoneError ? styles.inputError : ""}`}
            value={phoneValue}
            onBlur={handlePhoneBlur}
            onChange={handlePhoneChange}
            onKeyDown={(e) => {
              // Захист від видалення початкового знаку плюса через Backspace
              if (e.key === "Backspace" && phoneValue === "+") {
                e.preventDefault();
              }
            }}
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

        {/* Turnstile */}
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={setTurnstileToken}
          onExpire={() => setTurnstileToken(null)}
          onError={() => setTurnstileToken(null)}
          options={{ theme: "light" }}
        />

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="submit"
            disabled={submitting || !turnstileToken}
            className={`${styles.submitBtn} ${submitting || !turnstileToken ? styles.submitBtnDisabled : ""}`}
          >
            {submitting ? t("submitting") : t("submit")}
          </button>

          <div className={styles.divider}>
            <div className={styles.dividerLine} />
            <span className={styles.dividerText}>or</span>
            <div className={styles.dividerLine} />
          </div>

          <div className={styles.altBtns}>
            <a href="https://wa.me/4915147409329" target="_blank" rel="noreferrer" className={styles.altBtn}>
              {t("whatsapp")}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.1173 2.242C11.6741 0.796961 9.75465 0.000752673 7.70951 0C3.49536 0 0.0656331 3.42936 0.0641579 7.64463C0.0634353 8.99216 0.415717 10.3074 1.08472 11.4666L0 15.4286L4.05291 14.3655C5.16948 14.9748 6.42684 15.2955 7.70623 15.2959H7.70951C11.923 15.2959 15.3531 11.8662 15.3545 7.65087C15.3552 5.60796 14.5609 3.68744 13.1173 2.242V2.242ZM7.70951 14.0048H7.70695C6.56686 14.0045 5.44845 13.6979 4.47263 13.1191L4.24059 12.9813L1.83547 13.6122L2.47735 11.2672L2.3263 11.0267C1.69029 10.015 1.35415 8.84554 1.35487 7.64503C1.35635 4.1416 4.20687 1.29108 7.7121 1.29108C9.40932 1.29183 11.0047 1.95352 12.2045 3.15479C13.4043 4.35569 14.0645 5.95253 14.0638 7.65014C14.0623 11.1539 11.2118 14.0045 7.70951 14.0045V14.0048ZM11.1949 9.24587C11.0039 9.15019 10.0648 8.68829 9.88956 8.62449C9.71433 8.5607 9.58716 8.52884 9.45993 8.72017C9.33273 8.91156 8.96654 9.34191 8.85508 9.46908C8.74363 9.59668 8.6322 9.61245 8.4412 9.51674C8.25023 9.42106 7.63473 9.21947 6.90488 8.56877C6.33706 8.06216 5.95359 7.43681 5.84219 7.24542C5.73074 7.05409 5.83045 6.9507 5.92574 6.85574C6.01151 6.77 6.11674 6.63253 6.21242 6.52107C6.3081 6.40962 6.33962 6.32974 6.40338 6.20251C6.46721 6.07492 6.4353 5.96355 6.38767 5.86781C6.33998 5.77216 5.95801 4.83186 5.79854 4.44953C5.64346 4.07711 5.48588 4.12769 5.36894 4.12146C5.25745 4.11595 5.13028 4.11487 5.00272 4.11487C4.87516 4.11487 4.66838 4.1625 4.49316 4.35388C4.31794 4.54518 3.82451 5.00748 3.82451 5.94735C3.82451 6.88729 4.50894 7.79607 4.60462 7.92364C4.70027 8.0512 5.95175 9.98048 7.86788 10.8082C8.32354 11.0051 8.67947 11.2107 9.4145 11.3562C9.83091 11.3357 10.1601 11.2866 10.5271 11.2316C11.2903 10.8243 11.4494 10.3782 11.6084 9.93207C11.6084 9.93207 11.6084 9.54938 11.5608 9.46981C11.5132 9.39029 11.3856 9.34224 11.1946 9.24659L11.1949 9.24587Z" fill="#0666C6" />
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