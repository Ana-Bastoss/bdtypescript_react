import { useState } from "react";
import { Link } from "react-router";
import { noticias } from "../../data/noticias";

// Autor logado simulado (id=6 = Pedro Alves, perfil AUTOR)
const AUTOR_ID = 6;

export function MinhasNoticiasPage() {
  const [statusFiltro, setStatusFiltro] = useState("Todas");
  const [busca, setBusca] = useState("");

  const minhasNoticias = noticias.filter((n) => n.autorId === AUTOR_ID);

  // Filtros aplicados
  const noticiasExibidas = minhasNoticias.filter((n) => {
    const matchStatus =
      statusFiltro === "Todas" ||
      (statusFiltro === "Publicadas" && n.publicada) ||
      (statusFiltro === "Rascunhos" && !n.publicada);
    const matchBusca =
      busca === "" ||
      n.titulo.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

  return (
    <main>
      <div
        className="action-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 className="section-title" style={{ margin: 0, border: "none" }}>
          Minhas Notícias
        </h2>
        <Link to="/autor/noticias/nova" className="btn">
          + Nova Notícia
        </Link>
      </div>

      {/* Filtros conectados ao estado */}
      <div
        className="filter-bar"
        style={{ marginBottom: "20px" }}
      >
        <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
          <label htmlFor="busca_titulo">Buscar:</label>
          <input
            type="text"
            id="busca_titulo"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por título..."
          />
        </div>
        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
          <label htmlFor="status_filtro">Status:</label>
          <select
            id="status_filtro"
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
          >
            <option value="Todas">Todas</option>
            <option value="Publicadas">Publicadas</option>
            <option value="Rascunhos">Rascunhos</option>
          </select>
        </div>
        <button
          type="button"
          className="btn"
          style={{ backgroundColor: "#999" }}
          onClick={() => { setBusca(""); setStatusFiltro("Todas"); }}
        >
          Limpar
        </button>
      </div>

      {/* Tabela */}
      <div className="table-container">
        {noticiasExibidas.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              backgroundColor: "#faf5f7",
              borderRadius: "12px",
              border: "1px solid #fce4ec",
            }}
          >
            <p style={{ color: "#666", marginBottom: "15px" }}>
              {minhasNoticias.length === 0
                ? "Você ainda não escreveu nenhuma notícia."
                : "Nenhuma notícia encontrada com os filtros aplicados."}
            </p>
            {minhasNoticias.length === 0 && (
              <Link to="/autor/noticias/nova" className="btn">
                Começar a escrever
              </Link>
            )}
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Título</th>
                <th>Status</th>
                <th>Vis.</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {noticiasExibidas.map((noticia) => (
                <tr key={noticia.id}>
                  <td style={{ fontSize: "0.9rem", color: "#666", whiteSpace: "nowrap" }}>
                    {noticia.criadoEm.split(" - ")[0]}
                  </td>
                  <td style={{ fontWeight: "bold", color: "#4a148c" }}>
                    {noticia.titulo.length > 60
                      ? noticia.titulo.slice(0, 60) + "..."
                      : noticia.titulo}
                  </td>
                  <td>
                    <span
                      className={
                        noticia.publicada ? "badge-publicado" : "badge-despublicado"
                      }
                    >
                      {noticia.publicada ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td>{noticia.visualizacoes}</td>
                  <td>
                    <div className="action-buttons">
                      <Link
                        to={`/noticia/${noticia.id}`}
                        className="btn btn-small"
                        style={{ backgroundColor: "#2196F3" }}
                      >
                        Ver
                      </Link>
                      <Link
                        to={`/autor/noticias/${noticia.id}/editar`}
                        className="btn btn-small"
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-small"
                        style={{ backgroundColor: "#dc3545" }}
                        onClick={() =>
                          window.confirm("Tem certeza que deseja apagar esta notícia?")
                        }
                      >
                        Apagar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
