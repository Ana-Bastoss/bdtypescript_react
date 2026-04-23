import { useState } from "react";
import { Link } from "react-router";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";

export function CrudNoticiasPage() {
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [ufFiltro, setUfFiltro] = useState("");

  const listaFiltrada = noticias.filter((n) => {
    const cidade = cidades.find((c) => c.id === n.cidadeId);
    const uf = ufs.find((u) => u.id === cidade?.ufId);
    const autor = usuarios.find((u) => u.id === n.autorId);

    const matchBusca =
      busca === "" ||
      n.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      autor?.nome.toLowerCase().includes(busca.toLowerCase());
    const matchStatus =
      statusFiltro === "" ||
      (statusFiltro === "pub" && n.publicada) ||
      (statusFiltro === "rasc" && !n.publicada);
    const matchUF = ufFiltro === "" || uf?.sigla === ufFiltro;

    return matchBusca && matchStatus && matchUF;
  });

  return (
    <main className="admin-layout">
      <AdminSidebar />
      <section style={{ flex: 1, padding: "30px", backgroundColor: "#fff", minWidth: 0, overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 className="section-title" style={{ margin: 0, border: "none" }}>
            Gestão de Notícias ({noticias.length})
          </h2>
        </div>

        <div className="filter-bar" style={{ marginBottom: "20px" }}>
          <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
            <label htmlFor="busca_n">Buscar:</label>
            <input
              type="text"
              id="busca_n"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Título ou autor..."
            />
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label htmlFor="status_n">Status:</label>
            <select
              id="status_n"
              value={statusFiltro}
              onChange={(e) => setStatusFiltro(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="pub">Publicadas</option>
              <option value="rasc">Rascunhos</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label htmlFor="uf_n">UF:</label>
            <select
              id="uf_n"
              value={ufFiltro}
              onChange={(e) => setUfFiltro(e.target.value)}
            >
              <option value="">Todas</option>
              {ufs.map((u) => (
                <option key={u.id} value={u.sigla}>
                  {u.sigla}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: "#999" }}
            onClick={() => { setBusca(""); setStatusFiltro(""); setUfFiltro(""); }}
          >
            Limpar
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>UF</th>
                <th>Status</th>
                <th>Vis.</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.map((n) => {
                const autor = usuarios.find((u) => u.id === n.autorId);
                const cidade = cidades.find((c) => c.id === n.cidadeId);
                const uf = ufs.find((u) => u.id === cidade?.ufId);
                return (
                  <tr key={n.id}>
                    <td style={{ color: "#999", fontSize: "0.85rem" }}>{n.id}</td>
                    <td
                      style={{
                        fontWeight: "bold",
                        color: "#4a148c",
                        maxWidth: "200px",
                      }}
                    >
                      {n.titulo.length > 45
                        ? n.titulo.slice(0, 45) + "..."
                        : n.titulo}
                    </td>
                    <td style={{ fontSize: "0.9rem" }}>
                      {autor?.nome || `ID ${n.autorId}`}
                    </td>
                    <td>{uf?.sigla || "—"}</td>
                    <td>
                      <span
                        className={
                          n.publicada ? "badge-publicado" : "badge-despublicado"
                        }
                      >
                        {n.publicada ? "Publicada" : "Rascunho"}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.85rem" }}>{n.visualizacoes}</td>
                    <td style={{ fontSize: "0.8rem", color: "#666", whiteSpace: "nowrap" }}>
                      {n.criadoEm.split(" - ")[0]}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/noticia/${n.id}`}
                          className="btn btn-small"
                          style={{ backgroundColor: "#2196F3" }}
                        >
                          Ver
                        </Link>
                        <Link
                          to={`/admin/noticias/${n.id}/editar`}
                          className="btn btn-small"
                        >
                          Editar
                        </Link>
                        <Link
                          to={`/editor/publicar/${n.id}`}
                          className="btn btn-small"
                          style={{
                            backgroundColor: n.publicada ? "#f48fb1" : "#81c784",
                          }}
                        >
                          {n.publicada ? "Despub." : "Publicar"}
                        </Link>
                        <button
                          className="btn btn-small"
                          style={{ backgroundColor: "#dc3545" }}
                          onClick={() =>
                            window.confirm(`Excluir notícia #${n.id}?`)
                          }
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
