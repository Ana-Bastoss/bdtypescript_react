import { useState } from "react";
import { Link } from "react-router";

export function LembrarSenhaPage() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setEnviado(true);
    }
  };

  return (
    <main>
      <div className="form-container">
        <h2 className="section-title" style={{ textAlign: "center" }}>
          Recuperar Senha
        </h2>

        {!enviado ? (
          <form onSubmit={handleEnviar}>
            <p
              style={{
                color: "#666",
                marginBottom: "20px",
                fontSize: "0.95rem",
                lineHeight: 1.6,
              }}
            >
              Digite seu e-mail para receber as instruções de redefinição de senha.
            </p>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn" style={{ width: "100%" }}>
                Enviar instruções
              </button>
            </div>

            <div className="form-footer">
              <p>
                Lembrou a senha? <Link to="/login">Voltar para o Login</Link>
              </p>
            </div>
          </form>
        ) : (
          // Mensagem de sucesso simulada
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <div style={{ fontSize: "40px", marginBottom: "15px" }}>✉️</div>
            <p
              style={{
                color: "#2e7d32",
                fontWeight: 600,
                fontSize: "1.05rem",
                marginBottom: "10px",
              }}
            >
              E-mail enviado com sucesso!
            </p>
            <p
              style={{
                color: "#666",
                fontSize: "0.95rem",
                marginBottom: "25px",
                lineHeight: 1.6,
              }}
            >
              Verifique sua caixa de entrada em{" "}
              <strong style={{ color: "#4a148c" }}>{email}</strong> e siga as
              instruções para redefinir sua senha.
            </p>
            <Link to="/login" className="btn">
              Voltar para o Login
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
