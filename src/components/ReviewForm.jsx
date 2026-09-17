import { useState } from "react";
import RatingStars from "./RatingStars";
import "./ReviewForm.css";

export default function ReviewForm({ notaInicial = 0, comentarioInicial = "", onSubmit }) {
  const [nota, setNota] = useState(notaInicial);
  const [comentario, setComentario] = useState(comentarioInicial);
  const [salvo, setSalvo] = useState(notaInicial > 0);

  function handleSubmit(event) {
    event.preventDefault();
    if (nota === 0) return;
    onSubmit({ nota, comentario });
    setSalvo(true);
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-form__field">
        <label>Sua nota</label>
        <RatingStars value={nota} onChange={setNota} />
      </div>

      <div className="review-form__field">
        <label htmlFor="comentario">Comentário (opcional)</label>
        <textarea
          id="comentario"
          rows={3}
          value={comentario}
          onChange={(event) => setComentario(event.target.value)}
          placeholder="O que você achou?"
        />
      </div>

      <button type="submit" className="review-form__submit" disabled={nota === 0}>
        {salvo ? "Editar avaliação" : "Salvar avaliação"}
      </button>
    </form>
  );
}
