import { Film } from "lucide-react";
import "./EmptyState.css";

export default function EmptyState({ mensagem }) {
  return (
    <div className="empty-state">
      <Film size={26} />
      <p>{mensagem}</p>
    </div>
  );
}
