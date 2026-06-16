export default function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#0666c6] text-[14px] font-[510] uppercase leading-[21px] mb-3">
      {children}
    </p>
  );
}
