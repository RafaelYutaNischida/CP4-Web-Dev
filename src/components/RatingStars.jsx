import { Star } from "lucide-react";
import "./RatingStars.css";

export default function RatingStars({ value = 0, onChange, readOnly = false }) {
  const estrelas = [1, 2, 3, 4, 5];

  return (
    <div className={`rating-stars${readOnly ? " rating-stars--readonly" : ""}`}>
      {estrelas.map((n) => (
        <button
          key={n}
          type="button"
          className="rating-stars__btn"
          disabled={readOnly}
          onClick={() => onChange(n)}
          aria-label={`Dar nota ${n}`}
        >
          <Star
            size={22}
            fill={n <= value ? "var(--accent)" : "none"}
            color={n <= value ? "var(--accent)" : "var(--text-muted)"}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}
