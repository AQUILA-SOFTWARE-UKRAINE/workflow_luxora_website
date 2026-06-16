"use client";

import { usePathname } from "next/navigation";

export default function FooterBottomPad() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;
  return <div className="h-24 lg:hidden" />;
}
