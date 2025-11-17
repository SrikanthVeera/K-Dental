export default function RatingStars({ value = 0 }: { value?: number }) {
  const full = Math.round(value);
  return (
    <div className="flex gap-0.5 text-amber-500 text-sm" aria-label={`Rated ${value} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < full ? "★" : "☆"}</span>
      ))}
    </div>
  );
}
