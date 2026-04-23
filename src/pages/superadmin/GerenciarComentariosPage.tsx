import { useState } from "react";
import { Link } from "react-router";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { comentarios } from "../../data/comentarios";
import { usuarios } from "../../data/usuarios";
import { noticias } from "../../data/noticias";

export function GerenciarComentariosPage() {
  const [statusFiltro, setStatusFiltro] = useState<"todos" | "aprovados" | "pendentes">("todos");
  const [busca, setBusca] = useState("");
  const [selecionados, setSelecionados] = useState<number[]>([]);

  const listaFiltrada = comentarios.filter((c) => {
    const matchStatus =
      statusFiltro === "todos" ||
      (statusFiltro === "aprovados" && c.aprovado) ||
      (statusFiltro === "pendentes" && !c.aprovado);
    const autor = usuarios.find((u) => u.id === c.autorId);
    const matchBusca =
      busca === "" ||
      c.texto.toLowerCase().includes(busca.toLowerCase()) ||
      autor?.nome.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

  const toggleSelecionado = (id: number) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleTodos = () => {
    if (selecionados.length === listaFiltrada.length) {
      setSelecionados([]);
    } else {
      setSelecionados(listaFiltrada.map((c) => c.id));
    }
  };

  return (
    <main className="admin-layout">
      <AdminSidebar />
      <section style={{ flex: 1, padding: "30px", backgroundColor: "#fff", minWidth: 0, overflow: "hidden" }}>
        <h2 className="section-title" style={{ marginTop: 0 }}>
          Moderação Global de Comentários ({comentarios.length})
        </h2>

        {/* Filtros */}
        <div className="filter-bar" style={{ marginBottom: "20px" }}>
          <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
            <label htmlFor="busca_com">Buscar:</label>
            <input
              type="text"
              id="busca_com"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Texto ou autor..."
            />
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label htmlFor="status_com">Status:</label>
            <select
              id="status_com"
              value={statusFiltro}
              onChange={(e) =>
                setStatusFiltro(e.target.value as "todos" | "aprovados" | "pendentes")
              }
            >
              <option value="todos">Todos</option>
              <option value="aprovados">Aprovados</option>
              <option value="pendentes">Pendentes</option>
            </select>
          </div>
        </div>

        {/* Ações em lote */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            padding: "12px 15px",
            backgroundColor: "#faf5f7",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          <span style={{ fontSize: "0.9rem", color: "#666" }}>
            {selecionados.length} selecionado(s):
          </span>
          <button
            className="btn btn-small btn-publicar"
            disabled={selecionados.length === 0}
            onClick={() => alert(`Simulação: ${selecionados.length} aprovados`)}
          >
            Aprovar Selecionados
          </button>
          <button
            className="btn btn-small"
            style={{ backgroundColor: "#dc3545" }}
            disabled={selecionados.length === 0}
            onClick={() => alert(`Simulação: ${selecionados.length} excluídos`)}
          >
            Excluir Selecionados
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: "40px" }}>
                  <input
                    type="checkbox"
                    checked={
                      listaFiltrada.length > 0 &&
                      selecionados.length === listaFiltrada.length
                    }
                    onChange={toggleTodos}
                  />
                </th>
                <th>Autor</th>
                <th>Comentário</th>
                <th>Notícia</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.map((c) => {
                const autor = usuarios.find((u) => u.id === c.autorId);
                const noticia = noticias.find((n) => n.id === c.noticiaId);
                return (
                  <tr key={c.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selecionados.includes(c.id)}
                        onChange={() => toggleSelecionado(c.id)}
                      />
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <img
                          src={autor?.avatar || `https://i.pravatar.cc/32?img=${c.autorId}`}
                          alt={autor?.nome}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#4a148c" }}>
                          {autor?.nome || `Usuário #${c.autorId}`}
                        </span>
                      </div>
                    </td>
                    <td style={{ maxWidth: "250px" }}>
                      <span
                        style={{
                          fontSize: "0.9rem",
                          color: "#555",
                          fontStyle: "italic",
                        }}
                      >
                        "{c.texto.length > 80
                          ? c.texto.slice(0, 80) + "..."
                          : c.texto}"
                      </span>
                    </td>
                    <td style={{ fontSize: "0.85rem" }}>
                      {noticia ? (
                        <Link
                          to={`/noticia/${noticia.id}`}
                          style={{ color: "#d81b60", textDecoration: "none" }}
                        >
                          {noticia.titulo.length > 35
                            ? noticia.titulo.slice(0, 35) + "..."
                            : noticia.titulo}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "#999", whiteSpace: "nowrap" }}>
                      {c.criadoEm.split(" - ")[0]}
                    </td>
                    <td>
                      <span
                        className={c.aprovado ? "badge-publicado" : "badge-despublicado"}
                      >
                        {c.aprovado ? "Aprovado" : "Pendente"}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {!c.aprovado && (
                          <button
                            className="btn btn-small btn-publicar"
                            onClick={() => alert("Simulação: Aprovado!")}
                          >
                            Aprovar
                          </button>
                        )}
                        <button
                          className="btn btn-small"
                          style={{ backgroundColor: "#dc3545" }}
                          onClick={() => window.confirm("Excluir comentário?")}
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
