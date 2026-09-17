import { TriangleAlert } from "lucide-react";
import "./ErrorMessage.css";

export default function ErrorMessage({ mensagem }) {
  return (
    <div className="error-message" role="alert">
      <TriangleAlert size={18} />
      <p>{mensagem}</p>
    </div>
  );
}
