import { Link } from "react-router";
import type { Noticia } from "../types";

// O componente recebe uma "noticia" como propriedade (prop)
export function NoticiaCard({ noticia }: { noticia: Noticia }) {
  return (
    <article className="news-card">
      <div className="news-meta">
        {/* Como ainda não tem as cidades puxadas do banco, deixo fixo por enquanto */}
        <span>ID da Cidade: {noticia.cidadeId}</span>
        <span>{noticia.criadoEm}</span>
      </div>
      
      <h3 className="news-title">{noticia.titulo}</h3>
      
      <div className="tag-container">
        {/* Renderizando as tags dinamicamente */}
        {noticia.tags.map((tagId) => (
          <span key={tagId} className="tag">#tag_{tagId}</span>
        ))}
      </div>

      <p className="news-excerpt">
        {noticia.subtitulo}
      </p>
      
      <Link to={`/noticia/${noticia.id}`} className="btn">Ler mais</Link>
    </article>
  );
}