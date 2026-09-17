import TitleCard from "./TitleCard";
import "./TitleGrid.css";

export default function TitleGrid({ itens }) {
  return (
    <div className="title-grid">
      {itens.map((item) => (
        <TitleCard key={`${item.tipo}-${item.id}`} {...item} />
      ))}
    </div>
  );
}
