import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { NoticiaCard } from "../../components/ui/NoticiaCard";
import { noticias } from "../../data/noticias";
import { tags } from "../../data/tags";
import type { Noticia } from "../../types";

export function EditarNoticiaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const noticiaOriginal = noticias.find((n) => n.id === Number(id));

  if (!noticiaOriginal) {
    return (
      <main style={{ textAlign: "center", padding: "50px" }}>
        <h2>Notícia não encontrada para edição!</h2>
      </main>
    );
  }

  const [titulo, setTitulo] = useState(noticiaOriginal.titulo);
  const [subtitulo, setSubtitulo] = useState(noticiaOriginal.subtitulo);
  const [imagemCapa, setImagemCapa] = useState(noticiaOriginal.imagemCapa);
  const [conteudo, setConteudo] = useState(noticiaOriginal.conteudo);
  const [tagsSelecionadas, setTagsSelecionadas] = useState<number[]>(
    noticiaOriginal.tags
  );

  const handleToggleTag = (tagId: number) => {
    if (tagsSelecionadas.includes(tagId)) {
      setTagsSelecionadas(tagsSelecionadas.filter((t) => t !== tagId));
    } else if (tagsSelecionadas.length < 5) {
      setTagsSelecionadas([...tagsSelecionadas, tagId]);
    }
  };

  const previewNoticia: Noticia = {
    ...noticiaOriginal,
    titulo,
    subtitulo,
    imagemCapa,
    conteudo,
    tags: tagsSelecionadas,
  };

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Simulação: Alterações salvas com sucesso!");
    navigate("/autor/noticias");
  };

  return (
    <main>
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {/* ── Formulário ── */}
        <div className="form-container" style={{ flex: "1 1 500px", margin: 0 }}>
          {/* StatusBadge no topo */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2 className="section-title" style={{ margin: 0, border: "none" }}>
              Editar Notícia #{noticiaOriginal.id}
            </h2>
            <span
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                fontWeight: "bold",
                fontSize: "0.85rem",
                backgroundColor: noticiaOriginal.publicada ? "#e8f5e9" : "#fff3e0",
                color: noticiaOriginal.publicada ? "#2e7d32" : "#e65100",
              }}
            >
              {noticiaOriginal.publicada ? "PUBLICADA" : "RASCUNHO"}
            </span>
          </div>

          <form onSubmit={handleSalvar}>
            <div className="form-group">
              <label>Título da Notícia</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Subtítulo / Linha Fina</label>
              <input
                type="text"
                value={subtitulo}
                onChange={(e) => setSubtitulo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>URL da Imagem de Capa</label>
              <input
                type="url"
                value={imagemCapa}
                onChange={(e) => setImagemCapa(e.target.value)}
              />
              {imagemCapa && (
                <img
                  src={imagemCapa}
                  alt="Preview da capa"
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginTop: "10px",
                    border: "1px solid #fce4ec",
                  }}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).style.display = "none")
                  }
                />
              )}
            </div>

            <div className="form-group">
              <label>Conteúdo (Texto Completo)</label>
              <textarea
                rows={8}
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #f8bbd0",
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
                required
              />
            </div>

            {/* Tags com nomes reais */}
            <div className="form-group">
              <label>
                Tags{" "}
                <span
                  style={{
                    color: "#999",
                    fontWeight: 400,
                    fontSize: "0.85rem",
                  }}
                >
                  (máximo 5 — {tagsSelecionadas.length}/5 selecionadas)
                </span>
              </label>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "10px",
                }}
              >
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleToggleTag(tag.id)}
                    className="tag"
                    style={{
                      cursor:
                        !tagsSelecionadas.includes(tag.id) &&
                        tagsSelecionadas.length >= 5
                          ? "not-allowed"
                          : "pointer",
                      backgroundColor: tagsSelecionadas.includes(tag.id)
                        ? "#d81b60"
                        : "#fce4ec",
                      color: tagsSelecionadas.includes(tag.id)
                        ? "white"
                        : "#880e4f",
                      border: "none",
                      opacity:
                        !tagsSelecionadas.includes(tag.id) &&
                        tagsSelecionadas.length >= 5
                          ? 0.5
                          : 1,
                    }}
                  >
                    #{tag.nome}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="submit" className="btn">
                Salvar Alterações
              </button>
              <button
                type="button"
                onClick={() => navigate("/autor/noticias")}
                className="btn"
                style={{ backgroundColor: "#999" }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        {/* ── Preview ao Vivo ── */}
        <div style={{ flex: "1 1 320px" }}>
          <div style={{ position: "sticky", top: "20px" }}>
            <h3 style={{ color: "#880e4f", marginBottom: "15px" }}>
              Preview ao Vivo
            </h3>
            <div
              style={{
                border: "2px dashed #f8bbd0",
                padding: "15px",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <NoticiaCard noticia={previewNoticia} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
