import { Clapperboard, Star, Tv, Heart, Clock, X } from "lucide-react";
import StatCard from "../components/StatCard";
import EmptyState from "../components/EmptyState";
import TitleCard from "../components/TitleCard";
import TitleGrid from "../components/TitleGrid";
import { useWatchedList } from "../hooks/useWatchedList";
import "./Perfil.css";

export default function Perfil() {
  const { watched, favoritos, toggleFavorite } = useWatchedList();
  const total = watched.length;
  const totalFilmes = watched.filter((w) => w.tipo === "filme").length;
  const totalSeries = watched.filter((w) => w.tipo === "serie").length;

  const avaliados = watched.filter((w) => w.nota > 0);
  const notaMedia =
    avaliados.length > 0
      ? (avaliados.reduce((soma, w) => soma + w.nota, 0) / avaliados.length).toFixed(1)
      : "—";

  const recentes = [...avaliados]
    .sort((a, b) => (b.avaliadoEm || 0) - (a.avaliadoEm || 0))
    .slice(0, 5)
    .map((item) => ({ ...item, assistido: true }));

  return (
    <section>
      <h1>Perfil</h1>
      <p>Um resumo dos seus hábitos de consumo até agora.</p>

      {total === 0 ? (
        <EmptyState mensagem="Assista e avalie alguns títulos para ver suas estatísticas aqui." />
      ) : (
        <>
          <div className="perfil__stats">
            <StatCard label="Títulos assistidos" valor={total} icone={Clapperboard} />
            <StatCard label="Filmes" valor={totalFilmes} icone={Clapperboard} />
            <StatCard label="Séries" valor={totalSeries} icone={Tv} />
            <StatCard label="Nota média dada" valor={notaMedia} icone={Star} />
          </div>

          <div className="filmstrip-divider" />

          <h2 className="perfil__titulo-secao">
            <Heart size={18} /> Top 5 favoritos
            <span className="perfil__contador">{favoritos.length}/5</span>
          </h2>
          {favoritos.length === 0 ? (
            <EmptyState mensagem="Abra um título que você já assistiu e clique em 'Adicionar aos favoritos' para montar seu top 5." />
          ) : (
            <div className="perfil__favoritos">
              {favoritos.map((item) => (
                <div key={`fav-${item.tipo}-${item.id}`} className="perfil__favorito">
                  <button
                    className="perfil__remover-favorito"
                    onClick={() => toggleFavorite(item.id, item.tipo)}
                    aria-label={`Remover ${item.titulo} dos favoritos`}
                  >
                    <X size={14} />
                  </button>
                  <TitleCard
                    {...item}
                    assistido
                    nota={item.nota > 0 ? item.nota : undefined}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="filmstrip-divider" />

          <h2 className="perfil__titulo-secao">
            <Clock size={18} /> Avaliados recentemente
          </h2>
          {recentes.length === 0 ? (
            <EmptyState mensagem="Suas avaliações mais recentes aparecem aqui." />
          ) : (
            <TitleGrid itens={recentes} />
          )}
        </>
      )}
    </section>
  );
}
