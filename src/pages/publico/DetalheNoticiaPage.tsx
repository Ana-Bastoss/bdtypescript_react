import { useParams, Link } from "react-router";
import { noticias } from "../../data/noticias";
import { tags } from "../../data/tags";
import { usuarios } from "../../data/usuarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";
import { comentarios } from "../../data/comentarios";

export function DetalheNoticiaPage() {
  const { id } = useParams();
  const noticia = noticias.find((n) => n.id === Number(id));

  if (!noticia) {
    return (
      <main style={{ textAlign: "center", padding: "50px" }}>
        <h2 style={{ color: "#4a148c", marginBottom: "20px" }}>
          Notícia não encontrada!
        </h2>
        <Link to="/" className="btn">
          Voltar para a Home
        </Link>
      </main>
    );
  }

  // Dados relacionados
  const autor = usuarios.find((u) => u.id === noticia.autorId);
  const cidade = cidades.find((c) => c.id === noticia.cidadeId);
  const uf = ufs.find((u) => u.id === cidade?.ufId);
  const tagsDaNoticia = tags.filter((t) => noticia.tags.includes(t.id));
  const comentariosAprovados = comentarios.filter(
    (c) => c.noticiaId === noticia.id && c.aprovado
  );

  // Notícias recentes (últimas 5 publicadas, exceto a atual)
  const recentes = noticias
    .filter((n) => n.publicada && n.id !== noticia.id)
    .slice(0, 5);

  // Tags populares (todas exceto as da notícia atual)
  const tagsPopulares = tags.filter((t) => !noticia.tags.includes(t.id));

  // Parágrafos do conteúdo
  const paragrafos = noticia.conteudo
    .split("\n")
    .filter((p) => p.trim() !== "");

  // Notícias do mesmo autor
  const noticiasDoAutor = noticias.filter(
    (n) => n.autorId === noticia.autorId && n.publicada && n.id !== noticia.id
  ).length;

  return (
    <main>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: "20px", fontSize: "0.9rem", color: "#999" }}>
        <Link to="/" style={{ color: "#d81b60", textDecoration: "none" }}>
          Home
        </Link>
        {tagsDaNoticia[0] && (
          <>
            {" › "}
            <Link
              to={`/busca/tag/${tagsDaNoticia[0].slug}`}
              style={{ color: "#d81b60", textDecoration: "none" }}
            >
              {tagsDaNoticia[0].nome}
            </Link>
          </>
        )}
        {" › "}
        <span style={{ color: "#555" }}>
          {noticia.titulo.length > 50
            ? noticia.titulo.slice(0, 50) + "..."
            : noticia.titulo}
        </span>
      </nav>

      {/* Layout 2 colunas */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* ── Coluna Principal (70%) ── */}
        <article style={{ flex: "1 1 60%", minWidth: "0" }}>
          {/* Imagem de capa 16:9 */}
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "24px",
            }}
          >
            <img
              src={noticia.imagemCapa}
              alt={noticia.titulo}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Título e subtítulo */}
          <h1
            style={{
              color: "#4a148c",
              fontSize: "1.8rem",
              marginBottom: "10px",
              lineHeight: 1.3,
            }}
          >
            {noticia.titulo}
          </h1>
          <h2
            style={{
              color: "#666",
              fontSize: "1.1rem",
              fontWeight: 400,
              marginBottom: "20px",
              lineHeight: 1.5,
            }}
          >
            {noticia.subtitulo}
          </h2>

          {/* Metadados */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px",
              backgroundColor: "#faf5f7",
              borderRadius: "8px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            {autor && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img
                  src={
                    autor.avatar ||
                    `https://i.pravatar.cc/40?img=${autor.id}`
                  }
                  alt={autor.nome}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #d81b60",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#999",
                      margin: 0,
                    }}
                  >
                    Por
                  </p>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#4a148c",
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    {autor.nome}
                  </p>
                </div>
              </div>
            )}

            <div style={{ fontSize: "0.85rem", color: "#777" }}>
              {noticia.criadoEm}
            </div>
            <div style={{ fontSize: "0.85rem", color: "#777" }}>
              {noticia.visualizacoes} visualizações
            </div>
            {cidade && uf && (
              <div style={{ fontSize: "0.85rem", color: "#777" }}>
                {cidade.nome} / {uf.sigla}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="tag-container" style={{ marginBottom: "24px" }}>
            {tagsDaNoticia.map((tag) => (
              <Link
                key={tag.id}
                to={`/busca/tag/${tag.slug}`}
                className="tag"
                style={{ textDecoration: "none" }}
              >
                #{tag.nome}
              </Link>
            ))}
          </div>

          {/* Corpo da notícia */}
          <div
            style={{
              lineHeight: 1.9,
              color: "#444",
              fontSize: "1.05rem",
              marginBottom: "40px",
            }}
          >
            {paragrafos.map((p, i) => (
              <p key={i} style={{ marginBottom: "18px" }}>
                {p}
              </p>
            ))}
          </div>

          {/* Seção de Comentários */}
          <section>
            <h3 className="section-title">
              Comentários ({comentariosAprovados.length})
            </h3>

            {comentariosAprovados.length > 0 ? (
              <div style={{ marginBottom: "30px" }}>
                {comentariosAprovados.map((com) => {
                  const autorCom = usuarios.find((u) => u.id === com.autorId);
                  return (
                    <div
                      key={com.id}
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginBottom: "20px",
                        padding: "15px",
                        backgroundColor: "#faf5f7",
                        borderRadius: "8px",
                        border: "1px solid #fce4ec",
                      }}
                    >
                      <img
                        src={
                          autorCom?.avatar ||
                          `https://i.pravatar.cc/40?img=${com.autorId}`
                        }
                        alt={autorCom?.nome}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "baseline",
                            marginBottom: "6px",
                          }}
                        >
                          <strong style={{ color: "#4a148c", fontSize: "0.95rem" }}>
                            {autorCom?.nome || "Usuário"}
                          </strong>
                          <span style={{ color: "#999", fontSize: "0.8rem" }}>
                            {com.criadoEm}
                          </span>
                        </div>
                        <p style={{ color: "#555", margin: 0, lineHeight: 1.6 }}>
                          {com.texto}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: "#999", marginBottom: "20px" }}>
                Nenhum comentário ainda. Seja o primeiro!
              </p>
            )}

            {/* CTA login para comentar */}
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fce4ec",
                borderRadius: "8px",
                color: "#880e4f",
                textAlign: "center",
              }}
            >
              <p style={{ marginBottom: "15px", fontWeight: 600 }}>
                Você precisa estar logado para comentar.
              </p>
              <Link to="/login" className="btn">
                Fazer Login para Comentar
              </Link>
            </div>
          </section>
        </article>

        {/* ── Sidebar (30%) ── */}
        <aside style={{ flex: "0 0 280px", minWidth: "280px" }}>
          {/* Card Sobre o Autor */}
          {autor && (
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid #fce4ec",
                marginBottom: "24px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              }}
            >
              <h4 style={{ color: "#880e4f", marginBottom: "15px" }}>
                Sobre o Autor
              </h4>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <img
                  src={
                    autor.avatar ||
                    `https://i.pravatar.cc/60?img=${autor.id}`
                  }
                  alt={autor.nome}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #d81b60",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontWeight: 600,
                      color: "#4a148c",
                      margin: 0,
                    }}
                  >
                    {autor.nome}
                  </p>
                  <p style={{ color: "#999", fontSize: "0.85rem", margin: 0 }}>
                    {noticiasDoAutor + 1} notícia(s) publicada(s)
                  </p>
                </div>
              </div>
              {autor.bio && (
                <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {autor.bio}
                </p>
              )}
            </div>
          )}

          {/* Notícias Recentes */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #fce4ec",
              marginBottom: "24px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            }}
          >
            <h4 style={{ color: "#880e4f", marginBottom: "15px" }}>
              Notícias Recentes
            </h4>
            {recentes.map((n) => (
              <Link
                key={n.id}
                to={`/noticia/${n.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "12px",
                    paddingBottom: "12px",
                    borderBottom: "1px solid #fce4ec",
                  }}
                >
                  <img
                    src={n.imagemCapa}
                    alt={n.titulo}
                    style={{
                      width: "60px",
                      height: "45px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        color: "#4a148c",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        margin: "0 0 4px",
                        lineHeight: 1.3,
                      }}
                    >
                      {n.titulo.length > 55
                        ? n.titulo.slice(0, 55) + "..."
                        : n.titulo}
                    </p>
                    <p style={{ color: "#999", fontSize: "0.75rem", margin: 0 }}>
                      {n.criadoEm}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Tags Populares */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #fce4ec",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            }}
          >
            <h4 style={{ color: "#880e4f", marginBottom: "15px" }}>
              Tags Populares
            </h4>
            <div className="tag-container">
              {tagsPopulares.map((tag) => (
                <Link
                  key={tag.id}
                  to={`/busca/tag/${tag.slug}`}
                  className="tag"
                  style={{ textDecoration: "none" }}
                >
                  #{tag.nome}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
