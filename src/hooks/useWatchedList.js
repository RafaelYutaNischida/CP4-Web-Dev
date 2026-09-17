import { useEffect, useState } from "react";

const STORAGE_KEY = "cinediario:watched";
const LIMITE_FAVORITOS = 5;

export function useWatchedList() {
  const [watched, setWatched] = useState(() => {
    const salvo = localStorage.getItem(STORAGE_KEY);
    return salvo ? JSON.parse(salvo) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watched));
  }, [watched]);

  function addWatched(item) {
    setWatched((atual) => {
      const jaExiste = atual.find((w) => w.id === item.id && w.tipo === item.tipo);
      if (jaExiste) return atual;
      return [...atual, item];
    });
  }

  function updateReview(id, tipo, nota, comentario) {
    setWatched((atual) =>
      atual.map((w) =>
        w.id === id && w.tipo === tipo
          ? { ...w, nota, comentario, avaliadoEm: Date.now() }
          : w
      )
    );
  }

  function removeWatched(id, tipo) {
    setWatched((atual) => atual.filter((w) => !(w.id === id && w.tipo === tipo)));
  }

  function toggleFavorite(id, tipo) {
    setWatched((atual) => {
      const item = atual.find((w) => w.id === id && w.tipo === tipo);
      if (!item) return atual;

      const totalFavoritos = atual.filter((w) => w.favorito).length;
      if (!item.favorito && totalFavoritos >= LIMITE_FAVORITOS) return atual;

      return atual.map((w) =>
        w.id === id && w.tipo === tipo ? { ...w, favorito: !w.favorito } : w
      );
    });
  }

  const favoritos = watched.filter((w) => w.favorito);

  return { watched, favoritos, addWatched, updateReview, removeWatched, toggleFavorite };
}
