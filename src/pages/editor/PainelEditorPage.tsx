import { useState } from "react";
import { Link } from "react-router";
import { noticias } from "../../data/noticias";
import { comentarios } from "../../data/comentarios";
import { usuarios } from "../../data/usuarios";
import { tags } from "../../data/tags";

export function PainelEditorPage() {
  const publicadas = noticias.filter((n) => n.publicada);
  const rascunhos = noticias.filter((n) => !n.publicada);
  const comentariosPendentes = comentarios.filter((c) => !c.aprovado);
  const totalAutores = usuarios.filter((u) => u.perfil === "AUTOR").length;
  const autores = usuarios.filter((u) => u.perfil === "AUTOR");

  // Filtros — notícias pendentes
  const [buscaNoticia, setBuscaNoticia] = useState("");
  const [autorFiltro, setAutorFiltro] = useState("");
  const [ordenacao, setOrdenacao] = useState<"recente" | "antiga">("recente");

  // Filtro — comentários
  const [buscaComentario, setBuscaComentario] = useState("");

  // Gráfico: contagem real de notícias por tag
  const contagemPorTag = tags.map((tag) => ({
    tag,
    count: noticias.filter((n) => n.publicada && n.tags.includes(tag.id)).length,
  }));
  const maxCount = Math.max(...contagemPorTag.map((x) => x.count), 1);

  const parseData = (s: string) => {
    const [d, m, y] = s.split(" - ")[0].split("/");
    return new Date(`${y}-${m}-${d}`).getTime();
  };

  const rascunhosFiltrados = rascunhos
    .filter((n) => {
      const matchBusca =
        buscaNoticia === "" ||
        n.titulo.toLowerCase().includes(buscaNoticia.toLowerCase());
      const matchAutor =
        autorFiltro === "" || String(n.autorId) === autorFiltro;
      return matchBusca && matchAutor;
    })
    .sort((a, b) =>
      ordenacao === "recente"
        ? parseData(b.criadoEm) - parseData(a.criadoEm)
        : parseData(a.criadoEm) - parseData(b.criadoEm)
    );

  const comentariosFiltrados = comentariosPendentes.filter((c) => {
    if (buscaComentario === "") return true;
    const autor = usuarios.find((u) => u.id === c.autorId);
    const noticia = noticias.find((n) => n.id === c.noticiaId);
    const q = buscaComentario.toLowerCase();
    return (
      c.texto.toLowerCase().includes(q) ||
      autor?.nome.toLowerCase().includes(q) ||
      noticia?.titulo.toLowerCase().includes(q)
    );
  });

  return (
    <main style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          flexShrink: 0,
          backgroundColor: "#faf5f7",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #fce4ec",
          height: "fit-content",
        }}
      >
        <h3 style={{ color: "#880e4f", marginBottom: "20px" }}>Menu do Editor</h3>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
          <li>
            <Link to="/editor/painel" style={{ color: "#d81b60", fontWeight: "bold", textDecoration: "none" }}>
              Painel Geral
            </Link>
          </li>
          <li>
            <Link to="/editor/perfil" style={{ color: "#4a148c", textDecoration: "none" }}>
              Meu Perfil
            </Link>
          </li>
        </ul>
      </aside>

      <section style={{ flex: 1, minWidth: 0 }}>
        <h2 className="section-title" style={{ marginTop: 0 }}>
          Visão Geral da Moderação
        </h2>

        {/* 4 Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          {[
            { label: "Notícias Publicadas", valor: publicadas.length, cor: "#2e7d32" },
            { label: "Rascunhos Pendentes", valor: rascunhos.length, cor: "#f57c00" },
            { label: "Comentários Pendentes", valor: comentariosPendentes.length, cor: "#d81b60" },
            { label: "Total de Autores", valor: totalAutores, cor: "#4a148c" },
          ].map((card) => (
            <div key={card.label} className="admin-card" style={{ padding: "15px", textAlign: "center" }}>
              <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: "8px" }}>{card.label}</p>
              <span style={{ fontSize: "1.8rem", fontWeight: "bold", color: card.cor }}>{card.valor}</span>
            </div>
          ))}
        </div>

        {/* Notícias Aguardando Revisão */}
        <h3 style={{ color: "#4a148c", marginBottom: "12px" }}>
          Notícias Aguardando Revisão ({rascunhos.length})
        </h3>

        {/* Filtros de notícias */}
        <div className="filter-bar" style={{ marginBottom: "15px" }}>
          <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
            <label htmlFor="busca_noticia">Buscar título:</label>
            <input
              type="text"
              id="busca_noticia"
              value={buscaNoticia}
              onChange={(e) => setBuscaNoticia(e.target.value)}
              placeholder="Filtrar por título..."
            />
          </div>
          <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
            <label htmlFor="autor_filtro">Autor:</label>
            <select
              id="autor_filtro"
              value={autorFiltro}
              onChange={(e) => setAutorFiltro(e.target.value)}
            >
              <option value="">Todos os autores</option>
              {autores.map((a) => (
                <option key={a.id} value={String(a.id)}>
                  {a.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
            <label htmlFor="ordenacao">Ordenar:</label>
            <select
              id="ordenacao"
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value as "recente" | "antiga")}
            >
              <option value="recente">Mais recente</option>
              <option value="antiga">Mais antiga</option>
            </select>
          </div>
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: "#999" }}
            onClick={() => { setBuscaNoticia(""); setAutorFiltro(""); setOrdenacao("recente"); }}
          >
            Limpar
          </button>
        </div>

        <div className="table-container" style={{ marginBottom: "30px" }}>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {rascunhosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", color: "#999", padding: "20px" }}>
                    Nenhuma notícia encontrada com os filtros aplicados.
                  </td>
                </tr>
              ) : (
                rascunhosFiltrados.map((noticia) => {
                  const autor = usuarios.find((u) => u.id === noticia.autorId);
                  return (
                    <tr key={noticia.id}>
                      <td style={{ fontWeight: "bold", color: "#4a148c" }}>
                        {noticia.titulo.length > 55 ? noticia.titulo.slice(0, 55) + "..." : noticia.titulo}
                      </td>
                      <td>{autor?.nome || `ID ${noticia.autorId}`}</td>
                      <td style={{ fontSize: "0.9rem", color: "#666", whiteSpace: "nowrap" }}>
                        {noticia.criadoEm.split(" - ")[0]}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Link to={`/editor/publicar/${noticia.id}`} className="btn btn-small btn-publicar">
                            Avaliar
                          </Link>
                          <Link to={`/editor/noticias/${noticia.id}/editar`} className="btn btn-small">
                            Editar
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          {/* Comentários para moderar */}
          <div style={{ flex: "1 1 300px" }}>
            <h3 style={{ color: "#4a148c", marginBottom: "12px" }}>
              Comentários para Moderar ({comentariosPendentes.length})
            </h3>

            {/* Filtro de comentários */}
            <input
              type="text"
              value={buscaComentario}
              onChange={(e) => setBuscaComentario(e.target.value)}
              placeholder="Filtrar por texto, autor ou notícia..."
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "6px",
                border: "1px solid #f8bbd0",
                fontSize: "0.9rem",
                backgroundColor: "#faf5f7",
                outline: "none",
                marginBottom: "12px",
                boxSizing: "border-box",
              }}
            />

            <div
              style={{
                backgroundColor: "#fff",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #fce4ec",
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              {comentariosFiltrados.length === 0 ? (
                <p style={{ color: "#999", textAlign: "center" }}>
                  {buscaComentario ? "Nenhum comentário encontrado." : "Nenhum comentário pendente."}
                </p>
              ) : (
                comentariosFiltrados.slice(0, 5).map((com) => {
                  const autor = usuarios.find((u) => u.id === com.autorId);
                  const noticia = noticias.find((n) => n.id === com.noticiaId);
                  return (
                    <div
                      key={com.id}
                      style={{ borderBottom: "1px solid #fce4ec", paddingBottom: "12px", marginBottom: "12px" }}
                    >
                      <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "5px" }}>
                        <strong>{autor?.nome || "Usuário"}</strong> em "{noticia?.titulo.slice(0, 30)}..."
                      </p>
                      <p style={{ fontStyle: "italic", marginBottom: "8px", fontSize: "0.9rem", color: "#444" }}>
                        "{com.texto.length > 80 ? com.texto.slice(0, 80) + "..." : com.texto}"
                      </p>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="btn btn-small btn-publicar" onClick={() => alert("Simulação: Aprovado!")}>
                          Aprovar
                        </button>
                        <button className="btn btn-small btn-despublicar" onClick={() => alert("Simulação: Rejeitado!")}>
                          Rejeitar
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Gráfico CSS */}
          <div style={{ flex: "1 1 300px" }}>
            <h3 style={{ color: "#4a148c", marginBottom: "15px" }}>
              Notícias Publicadas por Tag
            </h3>
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #fce4ec",
              }}
            >
              {contagemPorTag
                .filter((x) => x.count > 0)
                .sort((a, b) => b.count - a.count)
                .map((item) => {
                  const pct = Math.round((item.count / maxCount) * 100);
                  return (
                    <div key={item.tag.id} style={{ marginBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                        <span>#{item.tag.nome}</span>
                        <span>{item.count} notícia(s)</span>
                      </div>
                      <div style={{ width: "100%", backgroundColor: "#fce4ec", borderRadius: "4px", height: "18px" }}>
                        <div
                          style={{
                            width: `${pct}%`,
                            backgroundColor: "#d81b60",
                            height: "100%",
                            borderRadius: "4px",
                            transition: "width 0.3s ease",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
