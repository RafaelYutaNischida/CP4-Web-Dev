import { Link } from "react-router";
import { Ghost } from "lucide-react";

export default function PageNotFound() {
  return (
    <section style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <Ghost size={40} style={{ color: "var(--text-muted)" }} />
      <h1>Página não encontrada</h1>
      <p>O que você procurava não existe (ou já foi cancelado, como o TV Time).</p>
      <Link to="/" style={{ color: "var(--accent)" }}>
        Voltar para o início
      </Link>
    </section>
  );
}
