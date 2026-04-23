import { useState } from "react";
import { Link } from "react-router";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { usuarios } from "../../data/usuarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";
import type { Perfil } from "../../types";

export function CrudUsuariosPage() {
  const [busca, setBusca] = useState("");
  const [perfilFiltro, setPerfilFiltro] = useState<Perfil | "">("");
  const [statusFiltro, setStatusFiltro] = useState<"" | "true" | "false">("");

  const lista = usuarios.filter((u) => {
    const matchBusca =
      busca === "" ||
      u.nome.toLowerCase().includes(busca.toLowerCase()) ||
      u.email.toLowerCase().includes(busca.toLowerCase());
    const matchPerfil = perfilFiltro === "" || u.perfil === perfilFiltro;
    const matchStatus =
      statusFiltro === "" ||
      (statusFiltro === "true" && u.ativo) ||
      (statusFiltro === "false" && !u.ativo);
    return matchBusca && matchPerfil && matchStatus;
  });

  return (
    <main className="admin-layout">
      <AdminSidebar />
      <section style={{ flex: 1, padding: "30px", backgroundColor: "#fff", minWidth: 0, overflow: "hidden" }}>
        <h2 className="section-title" style={{ marginTop: 0 }}>
          Gerenciar Usuários ({usuarios.length})
        </h2>

        <div className="filter-bar" style={{ marginBottom: "20px" }}>
          <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
            <label htmlFor="busca_user">Buscar:</label>
            <input
              type="text"
              id="busca_user"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Nome ou e-mail..."
            />
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label htmlFor="perfil_filtro">Perfil:</label>
            <select
              id="perfil_filtro"
              value={perfilFiltro}
              onChange={(e) => setPerfilFiltro(e.target.value as Perfil | "")}
            >
              <option value="">Todos</option>
              <option value="LEITOR">Leitor</option>
              <option value="AUTOR">Autor</option>
              <option value="EDITOR">Editor</option>
              <option value="SUPERADMIN">SuperAdmin</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label htmlFor="status_filtro">Status:</label>
            <select
              id="status_filtro"
              value={statusFiltro}
              onChange={(e) => setStatusFiltro(e.target.value as "" | "true" | "false")}
            >
              <option value="">Todos</option>
              <option value="true">Ativos</option>
              <option value="false">Inativos</option>
            </select>
          </div>
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: "#999" }}
            onClick={() => { setBusca(""); setPerfilFiltro(""); setStatusFiltro(""); }}
          >
            Limpar
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Perfil</th>
                <th>Cidade / UF</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((u) => {
                const cidade = cidades.find((c) => c.id === u.cidadeId);
                const uf = ufs.find((uf) => uf.id === cidade?.ufId);
                return (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img
                          src={u.avatar || `https://i.pravatar.cc/36?img=${u.id}`}
                          alt={u.nome}
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <p style={{ margin: 0, fontWeight: "bold", color: "#4a148c", fontSize: "0.9rem" }}>
                            {u.nome}
                          </p>
                          <p style={{ margin: 0, fontSize: "0.8rem", color: "#999" }}>
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="tag" style={{ fontSize: "0.75rem" }}>
                        {u.perfil}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.9rem" }}>
                      {cidade?.nome || "—"} / {uf?.sigla || "—"}
                    </td>
                    <td>
                      <span
                        className={u.ativo ? "badge-publicado" : "badge-despublicado"}
                      >
                        {u.ativo ? "Ativo" : "Bloqueado"}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.85rem", color: "#666" }}>
                      {u.criadoEm.split(" - ")[0]}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/admin/usuarios/${u.id}/editar`}
                          className="btn btn-small"
                        >
                          Editar
                        </Link>
                        <button
                          className="btn btn-small"
                          style={{ backgroundColor: u.ativo ? "#f57c00" : "#2e7d32" }}
                          onClick={() =>
                            window.confirm(
                              `${u.ativo ? "Bloquear" : "Ativar"} ${u.nome}?`
                            )
                          }
                        >
                          {u.ativo ? "Bloquear" : "Ativar"}
                        </button>
                        <button
                          className="btn btn-small"
                          style={{ backgroundColor: "#dc3545" }}
                          onClick={() => window.confirm(`Excluir ${u.nome}?`)}
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
