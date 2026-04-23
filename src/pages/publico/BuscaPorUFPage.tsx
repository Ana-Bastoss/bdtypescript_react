import { useParams, Link } from "react-router";
import { noticias } from "../../data/noticias";
import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";
import { NoticiaCard } from "../../components/ui/NoticiaCard";

export function BuscaPorUFPage() {
  const { sigla } = useParams();

  const uf = ufs.find((u) => u.sigla === sigla?.toUpperCase());

  // IDs das cidades desta UF
  const cidadesDaUF = cidades
    .filter((c) => c.ufId === uf?.id)
    .map((c) => c.id);

  // Notícias publicadas desta UF
  const noticiasDaUF = noticias.filter(
    (n) => n.publicada && cidadesDaUF.includes(n.cidadeId)
  );

  return (
    <main>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: "20px", fontSize: "0.9rem", color: "#999" }}>
        <Link to="/" style={{ color: "#d81b60", textDecoration: "none" }}>
          Home
        </Link>
        {" › "}
        <span style={{ color: "#555" }}>
          Busca por UF {uf ? `› ${uf.nome}` : ""}
        </span>
      </nav>

      <div style={{ display: "flex", gap: "30px", alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* ── Conteúdo Principal ── */}
        <div style={{ flex: "1 1 60%", minWidth: "0" }}>
          <h2 className="section-title">
            {uf
              ? `Notícias de ${uf.nome} (${uf.sigla})`
              : `UF "${sigla}" não encontrada`}
          </h2>

          {uf && (
            <p style={{ color: "#666", marginBottom: "20px", fontSize: "0.95rem" }}>
              {noticiasDaUF.length} notícia(s) encontrada(s)
            </p>
          )}

          {noticiasDaUF.length > 0 ? (
            <div className="news-grid">
              {noticiasDaUF.map((n) => (
                <NoticiaCard key={n.id} noticia={n} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                backgroundColor: "#faf5f7",
                borderRadius: "12px",
                border: "1px solid #fce4ec",
              }}
            >
              <p style={{ color: "#999", marginBottom: "15px" }}>
                {uf
                  ? `Nenhuma notícia publicada para ${uf.nome} ainda.`
                  : "Estado não encontrado."}
              </p>
              <Link to="/" className="btn">
                Ver todas as notícias
              </Link>
            </div>
          )}
        </div>

        {/* ── Sidebar: lista de UFs ── */}
        <aside
          style={{
            flex: "0 0 200px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #fce4ec",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          }}
        >
          <h4 style={{ color: "#880e4f", marginBottom: "15px" }}>
            Filtrar por Estado
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {ufs.map((u) => (
              <li key={u.id} style={{ marginBottom: "6px" }}>
                <Link
                  to={`/busca/uf/${u.sigla}`}
                  style={{
                    color:
                      u.sigla === sigla?.toUpperCase() ? "#d81b60" : "#4a148c",
                    textDecoration: "none",
                    fontWeight:
                      u.sigla === sigla?.toUpperCase() ? 600 : 400,
                    fontSize: "0.9rem",
                    display: "block",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    backgroundColor:
                      u.sigla === sigla?.toUpperCase()
                        ? "#fce4ec"
                        : "transparent",
                    transition: "background 0.2s",
                  }}
                >
                  {u.sigla} — {u.nome}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
