import { useState } from "react";
import { Link } from "react-router";
import { NoticiaCard } from "../../components/ui/NoticiaCard";
import { noticias } from "../../data/noticias";
import { ufs } from "../../data/ufs";
import { tags } from "../../data/tags";

export function HomePage() {
  const [ufFiltro, setUfFiltro] = useState("");
  const [tagFiltro, setTagFiltro] = useState("");
  const [busca, setBusca] = useState("");

  // Apenas notícias publicadas
  const publicadas = noticias.filter((n) => n.publicada);

  // Notícia de destaque (a mais recente publicada)
  const destaque = publicadas[0];

  // Filtragem
  const filtradas = publicadas.filter((n) => {
    const matchUF = ufFiltro === "" || true; // sem dados de uf direto na notícia, filtra por cidadeId futuramente
    const matchTag =
      tagFiltro === "" ||
      n.tags.some((tid) => {
        const tag = tags.find((t) => t.id === tid);
        return tag?.slug === tagFiltro;
      });
    const matchBusca =
      busca === "" ||
      n.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      n.subtitulo.toLowerCase().includes(busca.toLowerCase());
    return matchUF && matchTag && matchBusca;
  });

  // Remove o destaque da lista principal
  const demais = filtradas.filter((n) => n.id !== destaque?.id);

  return (
    <main>
      {destaque && (
        <section
          style={{
            position: "relative",
            width: "100%",
            height: "320px",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "40px",
          }}
        >
          <img
            src={destaque.imagemCapa}
            alt={destaque.titulo}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              left: "30px",
              right: "30px",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontSize: "1.8rem",
                marginBottom: "12px",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {destaque.titulo}
            </h2>
            <Link to={`/noticia/${destaque.id}`} className="btn">
              Ler mais
            </Link>
          </div>
        </section>
      )}

      {/* ── Tags Clicáveis ── */}
      <div className="tag-container" style={{ marginBottom: "30px" }}>
        {tags.map((tag) => (
          <Link
            key={tag.id}
            to={`/busca/tag/${tag.slug}`}
            className="tag"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            #{tag.nome}
          </Link>
        ))}
      </div>

      {/* ── Barra de Filtros ── */}
      <div className="filter-bar">
        {/* SearchBar com ícone de lupa */}
        <div className="form-group" style={{ flex: 2 }}>
          <label htmlFor="busca">Buscar:</label>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#999",
                fontSize: "1rem",
              }}
            >
            </span>
            <input
              type="text"
              id="busca"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por título ou assunto..."
              style={{ paddingLeft: "36px" }}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="uf_filtro">Estado:</label>
          <select
            id="uf_filtro"
            value={ufFiltro}
            onChange={(e) => setUfFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            {ufs.map((uf) => (
              <option key={uf.id} value={uf.sigla}>
                {uf.sigla} — {uf.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tag_filtro">Tag:</label>
          <select
            id="tag_filtro"
            value={tagFiltro}
            onChange={(e) => setTagFiltro(e.target.value)}
          >
            <option value="">Todas</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.slug}>
                {tag.nome}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="btn"
          onClick={() => {
            setBusca("");
            setUfFiltro("");
            setTagFiltro("");
          }}
          style={{ backgroundColor: "#999" }}
        >
          Limpar
        </button>
      </div>

      {/* ── Lista de Notícias ── */}
      <h2 className="section-title">Últimas Notícias</h2>

      {demais.length === 0 ? (
        <p style={{ color: "#666", textAlign: "center", padding: "40px 0" }}>
          Nenhuma notícia encontrada com os filtros aplicados.
        </p>
      ) : (
        <div className="news-grid">
          {demais.map((item) => (
            <NoticiaCard key={item.id} noticia={item} />
          ))}
        </div>
      )}
    </main>
  );
}
