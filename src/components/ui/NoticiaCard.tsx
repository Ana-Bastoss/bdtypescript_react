import { Link } from "react-router";
import type { Noticia } from "../../types";
import { tags } from "../../data/tags";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";

export function NoticiaCard({ noticia }: { noticia: Noticia }) {
  const cidade = cidades.find((c) => c.id === noticia.cidadeId);
  const uf = ufs.find((u) => u.id === cidade?.ufId);
  const tagsDaNoticia = tags.filter((t) => noticia.tags.includes(t.id));

  return (
    <article className="news-card">
      <img
        src={noticia.imagemCapa}
        alt={noticia.titulo}
        style={{
          width: "100%",
          height: "160px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "12px",
        }}
      />

      <div className="news-meta">
        <span>
          {cidade ? `${cidade.nome}${uf ? ` / ${uf.sigla}` : ""}` : "—"}
        </span>
        <span>{noticia.criadoEm.split(" - ")[0]}</span>
      </div>

      <h3 className="news-title">{noticia.titulo}</h3>

      <div className="tag-container">
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

      <p className="news-excerpt">{noticia.subtitulo}</p>

      <Link to={`/noticia/${noticia.id}`} className="btn">
        Ler mais
      </Link>
    </article>
  );
}
