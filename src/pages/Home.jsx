import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import TitleGrid from "../components/TitleGrid";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import { buscarTitulos } from "../services/tmdb";
import { useWatchedList } from "../hooks/useWatchedList";

export default function Home() {
  const { watched } = useWatchedList();
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setResultados([]);
      setErro(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setErro(null);
      try {
        const dados = await buscarTitulos(query);
        setResultados(dados);
      } catch (err) {
        setErro(err.message || "Não foi possível buscar agora. Tente novamente em instantes.");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const itensComEstado = resultados.map((item) => {
    const jaAssistido = watched.find((w) => w.id === item.id && w.tipo === item.tipo);
    return { ...item, assistido: Boolean(jaAssistido), nota: jaAssistido ? jaAssistido.nota : undefined };
  });

  return (
    <section>
      <h1>Descobrir</h1>
      <p>Busque um filme ou série para ver detalhes, avaliar e saber onde assistir.</p>

      <div style={{ marginBlock: "1.5rem" }}>
        <SearchBar value={query} onChange={setQuery} onSubmit={setQuery} />
      </div>

      {loading && <Loader />}
      {erro && <ErrorMessage mensagem={erro} />}

      {!loading && !erro && query.trim() && resultados.length === 0 && (
        <EmptyState mensagem={`Nenhum resultado para "${query}".`} />
      )}

      {!loading && !erro && resultados.length > 0 && <TitleGrid itens={itensComEstado} />}

      {!query.trim() && !loading && (
        <EmptyState mensagem="Comece digitando o nome de um filme ou série acima." />
      )}
    </section>
  );
}
