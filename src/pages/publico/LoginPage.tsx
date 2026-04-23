import { Link, useNavigate } from "react-router";

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <main>
      <div className="form-container">
        <h2 className="section-title" style={{ textAlign: "center" }}>
          Acesse o Portal
        </h2>

        <form>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="lembrar" name="lembrar" />
            <label htmlFor="lembrar" style={{ marginBottom: 0 }}>
              Lembrar meu acesso
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn" style={{ width: "100%" }}>
              Entrar
            </button>
          </div>

          <div className="form-footer">
            <p>
              <Link to="/lembrar-senha">Esqueci minha senha</Link>
            </p>
            <p style={{ marginTop: "8px" }}>
              Ainda não tem conta?{" "}
              <Link to="/cadastro">Cadastre-se agora</Link>
            </p>
          </div>
        </form>

        {/* === ACESSO RÁPIDO === */}
        <div
          style={{
            border: "2px solid red",
            padding: "20px",
            marginTop: "30px",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          <h3
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "15px",
              fontSize: "1rem",
            }}
          >
            Acesso Rápido (Desenvolvimento)
          </h3>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
          >
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "white", color: "red", border: "2px solid red" }}
              onClick={() => navigate("/leitor/perfil")}
            >
              LEITOR
            </button>
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "white", color: "red", border: "2px solid red" }}
              onClick={() => navigate("/autor/noticias")}
            >
              AUTOR
            </button>
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "white", color: "red", border: "2px solid red" }}
              onClick={() => navigate("/editor/painel")}
            >
              EDITOR
            </button>
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "white", color: "red", border: "2px solid red" }}
              onClick={() => navigate("/admin/dashboard")}
            >
              SUPERADMIN
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
