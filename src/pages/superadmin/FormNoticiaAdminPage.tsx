import { useParams } from "react-router";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { EditarNoticiaPage } from "../autor/EditarNoticiaPage";
import { usuarios } from "../../data/usuarios";

export function FormNoticiaAdminPage() {
  const { id } = useParams();
  const autores = usuarios.filter((u) => u.perfil === "AUTOR");

  return (
    <main className="admin-layout">
      <AdminSidebar />
      <section style={{ flex: 1, padding: "0", minWidth: 0, overflow: "hidden" }}>
        {/* Banner SuperAdmin */}
        <div
          style={{
            backgroundColor: "#4a148c",
            color: "white",
            padding: "15px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          🔧 PAINEL DE CONTROLE: Editando Notícia #{id} — Permissão SuperAdmin
        </div>

        {/* Select de reatribuição com autores */}
        <div
          style={{
            padding: "15px 40px",
            backgroundColor: "#f3e5f5",
            borderBottom: "1px solid #ce93d8",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <label style={{ fontWeight: "bold", color: "#4a148c" }}>
            Reatribuir Autor desta Notícia:
          </label>
          <select
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ce93d8",
            }}
          >
            {autores.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nome} ({a.email})
              </option>
            ))}
          </select>
        </div>

        <EditarNoticiaPage />
      </section>
    </main>
  );
}
