import { useParams, Link } from "react-router";
import { noticias } from "../../data/noticias";
import { tags } from "../../data/tags";
import { NoticiaCard } from "../../components/ui/NoticiaCard";

export function BuscaPorTagPage() {
  const { slug } = useParams();

  const tagAtual = tags.find((t) => t.slug === slug);

  const noticiasDaTag = noticias.filter(
    (n) =>
      n.publicada &&
      tagAtual &&
      n.tags.includes(tagAtual.id)
  );

  // Tags relacionadas (todas exceto a atual)
  const tagsRelacionadas = tags.filter((t) => t.slug !== slug);

  return (
    <main>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: "20px", fontSize: "0.9rem", color: "#999" }}>
        <Link to="/" style={{ color: "#d81b60", textDecoration: "none" }}>
          Home
        </Link>
        {" › "}
        <span style={{ color: "#555" }}>
          {tagAtual ? tagAtual.nome : `Tag "${slug}"`}
        </span>
      </nav>

      {/* TagBadge grande de destaque */}
      {tagAtual ? (
        <div style={{ marginBottom: "30px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "#f8bbd0",
              color: "#880e4f",
              padding: "8px 20px",
              borderRadius: "30px",
              fontSize: "1.2rem",
              fontWeight: 700,
            }}
          >
            #{tagAtual.nome}
          </span>
          <p
            style={{
              color: "#666",
              marginTop: "10px",
              fontSize: "0.95rem",
            }}
          >
            {noticiasDaTag.length} notícia(s) encontrada(s) com esta tag
          </p>
        </div>
      ) : (
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "#880e4f" }}>Tag "{slug}" não encontrada</h2>
        </div>
      )}

      {/* Grid de notícias */}
      {noticiasDaTag.length > 0 ? (
        <>
          <h2 className="section-title">Notícias com #{tagAtual?.nome}</h2>
          <div className="news-grid" style={{ marginBottom: "40px" }}>
            {noticiasDaTag.map((n) => (
              <NoticiaCard key={n.id} noticia={n} />
            ))}
          </div>
        </>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "#faf5f7",
            borderRadius: "12px",
            border: "1px solid #fce4ec",
            marginBottom: "40px",
          }}
        >
          <p style={{ color: "#999", marginBottom: "15px" }}>
            {tagAtual
              ? `Nenhuma notícia publicada com a tag #${tagAtual.nome} ainda.`
              : "Tag não encontrada."}
          </p>
          <Link to="/" className="btn">
            Ver todas as notícias
          </Link>
        </div>
      )}

      {/* Tags Relacionadas */}
      <section>
        <h3 className="section-title">Tags Relacionadas</h3>
        <div className="tag-container">
          {tagsRelacionadas.map((tag) => (
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
      </section>
    </main>
  );
}
