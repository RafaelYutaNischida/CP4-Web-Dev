import { Search } from "lucide-react";
import "./SearchBar.css";

export default function SearchBar({ value, onChange, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(value);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <Search size={18} className="search-bar__icon" />
      <input
        type="text"
        className="search-bar__input"
        placeholder="Buscar um filme ou série..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </form>
  );
}
