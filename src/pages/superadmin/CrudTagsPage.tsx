import { Link } from "react-router";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { tags } from "../../data/tags";
import { noticias } from "../../data/noticias";

export function CrudTagsPage() {
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
            Gerenciar Tags ({tags.length})
          </h2>
          <Link to="/admin/tags/nova" className="btn">
            + Nova Tag
          </Link>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome (Badge)</th>
                <th>Slug</th>
                <th>Qtd. Notícias</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => {
                const qtd = noticias.filter((n) => n.tags.includes(tag.id)).length;
                return (
                  <tr key={tag.id}>
                    <td>{tag.id}</td>
                    <td>
                      <span className="tag">#{tag.nome}</span>
                    </td>
                    <td style={{ color: "#666", fontFamily: "monospace", fontSize: "0.9rem" }}>
                      {tag.slug}
                    </td>
                    <td>{qtd}</td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/admin/tags/${tag.id}/editar`}
                          className="btn btn-small"
                        >
                          Editar
                        </Link>
                        <button
                          className="btn btn-small"
                          style={{ backgroundColor: "#dc3545" }}
                          onClick={() => window.confirm(`Excluir #${tag.nome}?`)}
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
