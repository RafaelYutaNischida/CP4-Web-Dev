import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Check, Plus, Heart } from "lucide-react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import WatchProvidersList from "../components/WatchProvidersList";
import ReviewForm from "../components/ReviewForm";
import { POSTER_BASE, buscarDetalhes, buscarProvedores } from "../services/tmdb";
import { useWatchedList } from "../hooks/useWatchedList";
import "./Detalhe.css";

export default function Detalhe() {
  const { watched, favoritos, addWatched, updateReview, toggleFavorite } = useWatchedList();
  const { tipo, id } = useParams();
  const [titulo, setTitulo] = useState(null);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const registro = watched.find((w) => w.id === Number(id) && w.tipo === tipo);
  const assistido = Boolean(registro);

  useEffect(() => {
    async function carregar() {
      setLoading(true);
      setErro(null);
      try {
        const dadosTitulo = await buscarDetalhes(tipo, id);
        const dadosProviders = await buscarProvedores(tipo, id);
        setTitulo(dadosTitulo);
        setProviders(dadosProviders);
      } catch (err) {
        setErro("Não foi possível carregar esse título agora.");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [tipo, id]);

  function handleMarcarAssistido() {
    if (!titulo) return;
    addWatched({
      id: titulo.id,
      tipo: titulo.tipo,
      titulo: titulo.titulo,
      poster: titulo.poster,
      ano: titulo.ano,
      nota: 0,
      comentario: "",
    });
  }

  function handleAvaliar({ nota, comentario }) {
    updateReview(Number(id), tipo, nota, comentario);
  }

  if (loading) return <Loader />;
  if (erro) return <ErrorMessage mensagem={erro} />;
  if (!titulo) return null;

  return (
    <section className="detalhe">
      <div className="detalhe__topo">
        {titulo.poster ? (
          <img
            src={`${POSTER_BASE}${titulo.poster}`}
            alt={`Pôster de ${titulo.titulo}`}
            className="detalhe__poster"
          />
        ) : (
          <div className="detalhe__poster detalhe__poster--placeholder" />
        )}

        <div>
          <h1>{titulo.titulo}</h1>
          <p>
            {titulo.ano} · {titulo.tipo === "serie" ? "Série" : "Filme"}
            {titulo.generos.length > 0 && ` · ${titulo.generos.join(", ")}`}
          </p>
          <p>{titulo.sinopse || "Sem sinopse disponível."}</p>

          {!assistido && (
            <button className="detalhe__botao-marcar" onClick={handleMarcarAssistido}>
              <Plus size={16} /> Marcar como assistido
            </button>
          )}
          {assistido && (
            <div className="detalhe__acoes">
              <span className="detalhe__badge-assistido">
                <Check size={16} /> Assistido
              </span>

              <button
                className={`detalhe__botao-favorito${
                  registro.favorito ? " detalhe__botao-favorito--ativo" : ""
                }`}
                onClick={() => toggleFavorite(Number(id), tipo)}
                disabled={!registro.favorito && favoritos.length >= 5}
              >
                <Heart size={16} fill={registro.favorito ? "currentColor" : "none"} />
                {registro.favorito ? "Nos favoritos" : "Adicionar aos favoritos"}
              </button>

              {!registro.favorito && favoritos.length >= 5 && (
                <span className="detalhe__aviso-favorito">
                  Você já tem 5 favoritos. Remova um no seu perfil para trocar.
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="filmstrip-divider" />

      <h2>Onde assistir</h2>
      <WatchProvidersList providers={providers} />

      {assistido && (
        <>
          <div className="filmstrip-divider" />
          <h2>Sua avaliação</h2>
          <ReviewForm
            notaInicial={registro.nota}
            comentarioInicial={registro.comentario}
            onSubmit={handleAvaliar}
          />
        </>
      )}
    </section>
  );
}
