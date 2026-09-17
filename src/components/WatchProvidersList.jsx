import EmptyState from "./EmptyState";
import "./WatchProvidersList.css";

const LOGO_BASE = "https://image.tmdb.org/t/p/w92";

export default function WatchProvidersList({ providers }) {
  if (!providers || providers.length === 0) {
    return <EmptyState mensagem="Não encontramos onde assistir esse título no Brasil." />;
  }

  return (
    <ul className="watch-providers">
      {providers.map((provider) => (
        <li key={provider.provider_id} className="watch-providers__item">
          {provider.logo_path && (
            <img
              src={`${LOGO_BASE}${provider.logo_path}`}
              alt=""
              className="watch-providers__logo"
            />
          )}
          <span>{provider.provider_name}</span>
        </li>
      ))}
    </ul>
  );
}
