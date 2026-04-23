import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <main style={{ textAlign: "center", padding: "80px 20px" }}>
      <div
        style={{
          display: "inline-block",
          backgroundColor: "#fce4ec",
          borderRadius: "50%",
          width: "120px",
          height: "120px",
          lineHeight: "120px",
          fontSize: "3rem",
          marginBottom: "30px",
        }}
      >
        404
      </div>

      <h1
        style={{
          color: "#4a148c",
          fontSize: "2rem",
          marginBottom: "15px",
        }}
      >
        Página não encontrada
      </h1>

      <p
        style={{
          color: "#666",
          fontSize: "1.05rem",
          marginBottom: "30px",
          maxWidth: "400px",
          margin: "0 auto 30px",
          lineHeight: 1.7,
        }}
      >
        A página que você está procurando não existe ou foi removida.
      </p>

      <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/" className="btn">
          Voltar para a Home
        </Link>
        <Link
          to="/login"
          className="btn"
          style={{ backgroundColor: "#4a148c" }}
        >
          Fazer Login
        </Link>
      </div>
    </main>
  );
}
