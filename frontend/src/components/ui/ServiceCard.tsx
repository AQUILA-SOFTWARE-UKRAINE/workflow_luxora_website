import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  img: string;
  name: string;
  price: string;
  bullets: string[];
  footnote?: string;
};

export default function ServiceCard({ id, img, name, price, bullets, footnote }: Props) {
  return (
    <Link
      href={`/contact?service=${id}`}
      className="rounded-[20px] border border-[#e2eaf0] overflow-hidden flex flex-col cursor-pointer hover:border-[#0666c6]/50 hover:shadow-[0_4px_20px_rgba(6,102,198,0.10)] transition-all duration-200"
    >
      <div className="relative h-[189px] shrink-0">
        <Image src={img} alt={name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-semibold text-[#032445] text-[20px] mb-3">{name}</h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-[13px] text-[#4b6070]">From (incl. VAT)</span>
          <span className="text-[36px] font-bold text-[#0666c6] leading-none">{price}</span>
        </div>
        <div className="border-t border-[#e2eaf0] mb-4" />
        <ul className="flex flex-col gap-2 flex-1">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-[14px] text-[#4b6070]">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none" className="shrink-0 mt-[5px]">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.8293 0.123719C11.0371 0.30556 11.0581 0.621441 10.8763 0.829259L3.87629 8.82926C3.78516 8.9334 3.65495 8.99513 3.51664 8.99973C3.37833 9.00434 3.2443 8.95141 3.14645 8.85356L0.146447 5.85356C-0.0488155 5.6583 -0.0488155 5.34172 0.146447 5.14645C0.341709 4.95119 0.658291 4.95119 0.853553 5.14645L3.47564 7.76855L10.1237 0.170755C10.3056 -0.0370638 10.6214 -0.0581225 10.8293 0.123719Z" fill="#0666C6" />
              </svg>
              {b}
            </li>
          ))}
        </ul>
        {footnote && (
          <div className="flex justify-center items-end gap-[2px] self-stretch mt-3">
            <span className="w-[6px] self-stretch text-[#F26C68] text-[12px] font-normal leading-[150%]">*</span>
            <span className="flex-[1_0_0] text-[#596067] text-[12px] font-normal leading-[150%]">{footnote.replace(/^\*\s?/, "")}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
