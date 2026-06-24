type Bubble = {
  size: number;
  left: number;
  duration: number;
  delay: number;
  wobble: number;
};

export default function BubblesLayer({ bubbles }: { bubbles: Bubble[] }) {
  return (
    <>
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble-container"
          style={{ left: `${b.left}%`, animation: `floatUp ${b.duration}s linear ${b.delay}s infinite` }}
        >
          <div
            className="bubble"
            style={{ width: b.size, height: b.size, animation: `wobble ${b.wobble}s ease-in-out infinite alternate` }}
          />
        </div>
      ))}
    </>
  );
}
