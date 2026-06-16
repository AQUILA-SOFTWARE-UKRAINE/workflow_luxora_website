"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";

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

  /* Attach move/up listeners to the window so drag works even when cursor
     leaves the container element */
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (dragging.current) updatePosition(e.clientX);
    };
    const onMouseUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [updatePosition]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = true;
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      dragging.current = true;
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition],
  );

  const onTouchEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div className="rounded-[20px] overflow-hidden bg-white shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]">
      <div
        ref={containerRef}
        className="relative h-[280px] overflow-hidden cursor-col-resize select-none"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* AFTER — base layer, full width (right side) */}
        <Image
          src={after}
          alt={`After: ${title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          draggable={false}
        />

        {/* BEFORE — clipped to reveal left `position`% (left side) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before}
            alt={`Before: ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            draggable={false}
          />
        </div>

        {/* BEFORE badge — top left */}
        <span className="absolute top-3 left-3 z-20 pointer-events-none bg-[rgba(12,13,13,0.7)] text-[#EAEBEC] text-[12px] font-[510] uppercase leading-[18px] px-2 py-0.5 rounded-[4px] overflow-hidden">
          Before
        </span>

        {/* AFTER badge — top right */}
        <span className="absolute top-3 right-3 z-20 pointer-events-none bg-[rgba(12,13,13,0.7)] text-[#EAEBEC] text-[12px] font-[510] uppercase leading-[18px] px-2 py-0.5 rounded-[4px] overflow-hidden">
          After
        </span>

        {/* Divider line */}
        <div
          className="absolute inset-y-0 z-20 w-[2px] bg-[#EAEBEC] pointer-events-none"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        />

        {/* Drag handle */}
        <div
          className="absolute top-1/2 z-30 pointer-events-none"
          style={{ left: `${position}%`, transform: "translate(-50%, -50%)" }}
        >
          <div className="size-10 rounded-full bg-[#EAEBEC] shadow-[0px_2px_12px_rgba(0,0,0,0.20)] flex items-center justify-center gap-0.5">
            <svg className="size-4 text-[#032445]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            <svg className="size-4 text-[#032445]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="px-6 pt-5 pb-6">
        <div className="flex flex-col gap-1">
          <p className="font-[590] text-[#032445] text-[16px] leading-6">{title}</p>
          <div className="inline-flex items-center gap-2">
            <p className="text-[#596067] text-[12px] leading-[18px]">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
