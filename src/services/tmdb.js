const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "pt-BR";

export const POSTER_BASE = "https://image.tmdb.org/t/p/w342";

function montarUrl(path, params) {
  let query = "api_key=" + API_KEY + "&language=" + LANGUAGE;
  for (const chave in params) {
    if (params[chave] !== undefined && params[chave] !== null) {
      query += "&" + chave + "=" + encodeURIComponent(params[chave]);
    }
  }
  return BASE_URL + path + "?" + query;
}

async function tmdbFetch(path, params = {}) {
  if (!API_KEY) {
    throw new Error(
      "Chave da API não encontrada. Confira o arquivo .env e reinicie o servidor (npm run dev)."
    );
  }

  const response = await fetch(montarUrl(path, params));
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Chave da API inválida (401). Confira o valor no arquivo .env.");
    }
    throw new Error("Erro na API do TMDB (" + response.status + ")");
  }
  return response.json();
}

export async function buscarTitulos(query) {
  if (!query || !query.trim()) return [];
  const data = await tmdbFetch("/search/multi", { query, include_adult: false });
  return (data.results || [])
    .filter((item) => item.media_type === "movie" || item.media_type === "tv")
    .map(normalizarResumo);
}

function normalizarResumo(item) {
  const tipo = item.media_type === "tv" ? "serie" : "filme";
  const data = tipo === "serie" ? item.first_air_date : item.release_date;
  return {
    id: item.id,
    tipo,
    titulo: tipo === "serie" ? item.name : item.title,
    ano: data ? data.slice(0, 4) : "—",
    poster: item.poster_path,
  };
}

export async function buscarDetalhes(tipo, id) {
  const endpoint = tipo === "serie" ? "/tv/" + id : "/movie/" + id;
  const data = await tmdbFetch(endpoint);
  const dataLancamento = tipo === "serie" ? data.first_air_date : data.release_date;
  return {
    id: data.id,
    tipo,
    titulo: tipo === "serie" ? data.name : data.title,
    ano: dataLancamento ? dataLancamento.slice(0, 4) : "—",
    poster: data.poster_path,
    sinopse: data.overview,
    generos: (data.genres || []).map((g) => g.name),
    nota: data.vote_average,
  };
}

export async function buscarProvedores(tipo, id) {
  const endpoint = tipo === "serie" ? "/tv/" + id + "/watch/providers" : "/movie/" + id + "/watch/providers";
  const data = await tmdbFetch(endpoint);
  const br = data.results && data.results.BR;
  if (!br) return [];

  const todos = (br.flatrate || []).concat(br.rent || []).concat(br.buy || []);
  const idsUsados = [];
  return todos.filter((provider) => {
    if (idsUsados.includes(provider.provider_id)) return false;
    idsUsados.push(provider.provider_id);
    return true;
  });
}
