import { useNavigate } from "react-router";
import { Check, Tv, Film } from "lucide-react";
import { POSTER_BASE } from "../services/tmdb";
import "./TitleCard.css";

export default function TitleCard({ id, titulo, poster, ano, tipo, assistido, nota }) {
  const navigate = useNavigate();

  return (
    <button
      className="title-card"
      onClick={() => navigate(`/titulo/${tipo}/${id}`)}
      aria-label={`Ver detalhes de ${titulo}`}
    >
      <div className="title-card__poster-wrap">
        {poster ? (
          <img
            className="title-card__poster"
            src={`${POSTER_BASE}${poster}`}
            alt={`Pôster de ${titulo}`}
            loading="lazy"
          />
        ) : (
          <div className="title-card__poster title-card__poster--placeholder">
            {tipo === "serie" ? <Tv size={28} /> : <Film size={28} />}
          </div>
        )}

        {assistido && (
          <span className="title-card__badge">
            <Check size={13} strokeWidth={3} />
          </span>
        )}

        {typeof nota === "number" && (
          <span className="title-card__nota">{nota.toFixed(1)}</span>
        )}
      </div>
      <div className="title-card__info">
        <p className="title-card__titulo">{titulo}</p>
        <p className="title-card__meta">
          {ano} · {tipo === "serie" ? "Série" : "Filme"}
        </p>
      </div>
    </button>
  );
}
