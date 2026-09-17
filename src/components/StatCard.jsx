import "./StatCard.css";

export default function StatCard({ label, valor, icone: Icone }) {
  return (
    <div className="stat-card">
      {Icone && <Icone size={20} className="stat-card__icon" />}
      <p className="stat-card__valor">{valor}</p>
      <p className="stat-card__label">{label}</p>
    </div>
  );
}
