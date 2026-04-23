import { useState } from "react";
import { Link } from "react-router";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";
import { noticias } from "../../data/noticias";

export function CrudCidadesPage() {
  const [busca, setBusca] = useState("");
  const [ufFiltro, setUfFiltro] = useState("");

  const cidadesFiltradas = cidades.filter((c) => {
    const uf = ufs.find((u) => u.id === c.ufId);
    const matchBusca =
      busca === "" || c.nome.toLowerCase().includes(busca.toLowerCase());
    const matchUF = ufFiltro === "" || uf?.sigla === ufFiltro;
    return matchBusca && matchUF;
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
            Gerenciar Cidades ({cidades.length})
          </h2>
          <Link to="/admin/cidades/nova" className="btn">
            + Nova Cidade
          </Link>
        </div>

        <div className="filter-bar" style={{ marginBottom: "20px" }}>
          <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
            <label htmlFor="busca_cidade">Buscar:</label>
            <input
              type="text"
              id="busca_cidade"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome..."
            />
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label htmlFor="uf_filtro">UF:</label>
            <select
              id="uf_filtro"
              value={ufFiltro}
              onChange={(e) => setUfFiltro(e.target.value)}
            >
              <option value="">Todas as UFs</option>
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
            onClick={() => { setBusca(""); setUfFiltro(""); }}
          >
            Limpar
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome da Cidade</th>
                <th>UF</th>
                <th>Qtd. Notícias</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cidadesFiltradas.map((cidade) => {
                const uf = ufs.find((u) => u.id === cidade.ufId);
                const qtdNoticias = noticias.filter(
                  (n) => n.cidadeId === cidade.id
                ).length;
                return (
                  <tr key={cidade.id}>
                    <td>{cidade.id}</td>
                    <td style={{ fontWeight: "bold", color: "#4a148c" }}>
                      {cidade.nome}
                    </td>
                    <td>{uf?.sigla || "—"}</td>
                    <td>{qtdNoticias}</td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/admin/cidades/${cidade.id}/editar`}
                          className="btn btn-small"
                        >
                          Editar
                        </Link>
                        <button
                          className="btn btn-small"
                          style={{ backgroundColor: "#dc3545" }}
                          onClick={() =>
                            window.confirm(`Excluir ${cidade.nome}?`)
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
