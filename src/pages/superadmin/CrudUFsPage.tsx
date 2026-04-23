import { useState } from "react";
import { Link } from "react-router";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";

export function CrudUFsPage() {
  const [busca, setBusca] = useState("");

  const listaFiltrada = ufs.filter(
    (u) =>
      busca === "" ||
      u.sigla.toLowerCase().includes(busca.toLowerCase()) ||
      u.nome.toLowerCase().includes(busca.toLowerCase())
  );

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
            Unidades Federativas ({ufs.length})
          </h2>
          <Link to="/admin/ufs/nova" className="btn">
            + Nova UF
          </Link>
        </div>

        <div className="filter-bar" style={{ marginBottom: "20px" }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label htmlFor="busca_uf">Buscar:</label>
            <input
              type="text"
              id="busca_uf"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por sigla ou nome..."
            />
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Sigla</th>
                <th>Nome da UF</th>
                <th>Qtd. Cidades</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.map((uf) => {
                const qtdCidades = cidades.filter((c) => c.ufId === uf.id).length;
                return (
                  <tr key={uf.id}>
                    <td>{uf.id}</td>
                    <td style={{ fontWeight: "bold", color: "#d81b60" }}>{uf.sigla}</td>
                    <td>{uf.nome}</td>
                    <td>{qtdCidades}</td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/admin/ufs/${uf.id}/editar`}
                          className="btn btn-small"
                        >
                          Editar
                        </Link>
                        <button
                          className="btn btn-small"
                          style={{ backgroundColor: "#dc3545" }}
                          onClick={() =>
                            window.confirm(`Excluir ${uf.sigla}?`)
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
