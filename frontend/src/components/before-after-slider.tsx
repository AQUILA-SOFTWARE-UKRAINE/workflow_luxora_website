"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import styles from "./before-after-slider.module.css";

interface Props {
  before: string;
  after: string;
  title: string;
  location: string;
}

export default function BeforeAfterSlider({ before, after, title, location }: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { if (dragging.current) updatePosition(e.clientX); };
    const onMouseUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [updatePosition]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragging.current = true;
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  const onTouchEnd = useCallback(() => { dragging.current = false; }, []);

  return (
    <div className={styles.card}>
      <div
        ref={containerRef}
        className={styles.interactive}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* AFTER — base layer */}
        <Image src={after} alt={`After: ${title}`} fill className={styles.image} sizes="(max-width: 744px) 100vw, (max-width: 1280px) 50vw, 33vw" draggable={false} />

        {/* BEFORE — clipped */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={before} alt={`Before: ${title}`} fill className={styles.image} sizes="(max-width: 744px) 100vw, (max-width: 1280px) 50vw, 33vw" draggable={false} />
        </div>

        <span className={`${styles.badge} ${styles.badgeBefore}`}>Before</span>
        <span className={`${styles.badge} ${styles.badgeAfter}`}>After</span>

        <div className={styles.divider} style={{ left: `${position}%` }} />

        <div className={styles.handle} style={{ left: `${position}%`, top: "50%" }}>
          <svg className="size-4 text-[#032445]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <svg className="size-4 text-[#032445]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>

      <div className={styles.caption}>
        <p className={styles.captionTitle}>{title}</p>
        <p className={styles.captionLocation}>{location}</p>
      </div>
    </div>
  );
}
