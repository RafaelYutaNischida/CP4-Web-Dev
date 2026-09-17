import { X } from "lucide-react";
import TitleCard from "../components/TitleCard";
import EmptyState from "../components/EmptyState";
import { useWatchedList } from "../hooks/useWatchedList";
import "./Diario.css";

export default function Diario() {
  const { watched, removeWatched } = useWatchedList();
  return (
    <section>
      <h1>Meu diário</h1>
      <p>Tudo o que você já marcou como assistido.</p>

      {watched.length === 0 ? (
        <EmptyState mensagem="Você ainda não marcou nenhum título como assistido. Busque algo na página inicial." />
      ) : (
        <div className="diario-grid">
          {watched.map((item) => (
            <div key={`${item.tipo}-${item.id}`} className="diario-item">
              <button
                className="diario-item__remover"
                onClick={() => removeWatched(item.id, item.tipo)}
                aria-label={`Remover ${item.titulo} do diário`}
              >
                <X size={14} />
              </button>
              <TitleCard {...item} assistido nota={item.nota > 0 ? item.nota : undefined} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
