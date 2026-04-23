import { useState } from "react";
import { useNavigate } from "react-router";
import { NoticiaCard } from "../../components/ui/NoticiaCard";
import { tags } from "../../data/tags";
import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";
import type { Noticia } from "../../types";

export function NovaNoticiaPage() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [imagemCapa, setImagemCapa] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [tagsSelecionadas, setTagsSelecionadas] = useState<number[]>([]);
  const [ufSelecionada, setUfSelecionada] = useState("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState<number>(1);

  const cidadesFiltradas = cidades.filter(
    (c) => c.ufId === ufs.find((u) => u.sigla === ufSelecionada)?.id
  );

  const handleToggleTag = (tagId: number) => {
    if (tagsSelecionadas.includes(tagId)) {
      setTagsSelecionadas(tagsSelecionadas.filter((id) => id !== tagId));
    } else if (tagsSelecionadas.length < 5) {
      setTagsSelecionadas([...tagsSelecionadas, tagId]);
    }
  };

  const previewNoticia: Noticia = {
    id: 999,
    titulo: titulo || "Seu título aparecerá aqui...",
    subtitulo: subtitulo || "Seu subtítulo aparecerá aqui...",
    conteudo,
    imagemCapa:
      imagemCapa ||
      "https://via.placeholder.com/800x400/fce4ec/880e4f?text=Preview+da+Capa",
    autorId: 6,
    cidadeId: cidadeSelecionada,
    tags: tagsSelecionadas,
    publicada: false,
    criadoEm: "Agora",
    atualizadoEm: "Agora",
    visualizacoes: 0,
  };

  const handleSalvar = (status: string) => {
    alert(`Simulação: Notícia salva como ${status}!`);
    navigate("/autor/noticias");
  };

  return (
    <main>
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {/* ── Formulário ── */}
        <div className="form-container" style={{ flex: "1 1 500px", margin: 0 }}>
          <h2 className="section-title">Escrever Nova Notícia</h2>

          <div className="form-group">
            <label>Título da Notícia</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Nova tecnologia revoluciona mercado"
              required
            />
          </div>

          <div className="form-group">
            <label>Subtítulo / Linha Fina</label>
            <input
              type="text"
              value={subtitulo}
              onChange={(e) => setSubtitulo(e.target.value)}
              placeholder="Resumo breve para atrair o leitor"
              required
            />
          </div>

          <div className="form-group">
            <label>URL da Imagem de Capa</label>
            <input
              type="url"
              value={imagemCapa}
              onChange={(e) => setImagemCapa(e.target.value)}
              placeholder="https://site.com/imagem.jpg"
            />
            {/* Preview da imagem direto no formulário */}
            {imagemCapa && (
              <img
                src={imagemCapa}
                alt="Preview da capa"
                style={{
                  width: "100%",
                  height: "160px",
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

          {/* UF → Cidade */}
          <div className="form-group" style={{ display: "flex", gap: "15px" }}>
            <div style={{ flex: 1 }}>
              <label>Estado (UF)</label>
              <select
                value={ufSelecionada}
                onChange={(e) => {
                  setUfSelecionada(e.target.value);
                  setCidadeSelecionada(0);
                }}
              >
                <option value="">Selecione...</option>
                {ufs.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.sigla} — {uf.nome}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label>Cidade</label>
              <select
                value={cidadeSelecionada}
                onChange={(e) => setCidadeSelecionada(Number(e.target.value))}
                disabled={!ufSelecionada}
              >
                <option value={0}>
                  {ufSelecionada ? "Selecione..." : "Escolha um estado"}
                </option>
                {cidadesFiltradas.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags com nomes reais */}
          <div className="form-group">
            <label>
              Tags{" "}
              <span style={{ color: "#999", fontWeight: 400, fontSize: "0.85rem" }}>
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
            <button
              type="button"
              onClick={() => handleSalvar("Rascunho")}
              className="btn"
              style={{ backgroundColor: "#f57c00" }}
            >
              Salvar como Rascunho
            </button>
            <button
              type="button"
              onClick={() => handleSalvar("Revisão")}
              className="btn"
            >
              Enviar para Revisão
            </button>
          </div>
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
