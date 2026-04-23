import { useParams, useNavigate, Link } from "react-router";
import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";

export function PublicarDespublicarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const noticia = noticias.find((n) => n.id === Number(id));

  if (!noticia) {
    return (
      <main style={{ textAlign: "center", padding: "50px" }}>
        <h2>Notícia não encontrada!</h2>
      </main>
    );
  }

  const autor = usuarios.find((u) => u.id === noticia.autorId);

  const handleStatus = (acao: string) => {
    if (window.confirm(`Tem certeza que deseja ${acao} esta notícia?`)) {
      alert(`Simulação: Notícia ${acao} com sucesso!`);
      navigate("/editor/painel");
    }
  };

  return (
    <main>
      {/* Painel de ação */}
      <div
        style={{
          backgroundColor: "#faf5f7",
          padding: "20px",
          borderBottom: "2px solid #fce4ec",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: "#4a148c" }}>Modo de Revisão (Editor)</h3>
          <p style={{ margin: "6px 0 0", fontSize: "0.9rem", color: "#666" }}>
            Autor:{" "}
            <strong style={{ color: "#880e4f" }}>
              {autor?.nome || `ID ${noticia.autorId}`}
            </strong>{" "}
            | Atualizado em: <strong>{noticia.atualizadoEm}</strong>
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span
            className={noticia.publicada ? "badge-publicado" : "badge-despublicado"}
            style={{ fontSize: "0.9rem", padding: "6px 14px" }}
          >
            {noticia.publicada ? "✓ PUBLICADA" : "✎ RASCUNHO"}
          </span>

          {noticia.publicada ? (
            <button
              onClick={() => handleStatus("DESPUBLICAR")}
              className="btn btn-despublicar"
            >
              Despublicar
            </button>
          ) : (
            <button
              onClick={() => handleStatus("PUBLICAR")}
              className="btn btn-publicar"
            >
              Aprovar e Publicar
            </button>
          )}

          <Link
            to="/editor/painel"
            className="btn"
            style={{ backgroundColor: "#999" }}
          >
            Voltar
          </Link>
        </div>
      </div>

      {/* Visão de leitura da notícia */}
      <article
        className="form-container"
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <img
          src={noticia.imagemCapa}
          alt="Capa"
          style={{
            width: "100%",
            aspectRatio: "16/9",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />
        <h1 style={{ color: "#4a148c", marginBottom: "10px" }}>
          {noticia.titulo}
        </h1>
        <p
          style={{
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#666",
            fontSize: "1.05rem",
          }}
        >
          {noticia.subtitulo}
        </p>
        <div style={{ lineHeight: 1.9, color: "#444" }}>
          {noticia.conteudo
            .split("\n")
            .filter((p) => p.trim())
            .map((p, i) => (
              <p key={i} style={{ marginBottom: "16px" }}>
                {p}
              </p>
            ))}
        </div>
      </article>
    </main>
  );
}
