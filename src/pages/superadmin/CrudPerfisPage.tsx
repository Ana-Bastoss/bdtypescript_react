import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { usuarios } from "../../data/usuarios";
import type { Perfil } from "../../types";

const perfis: { nome: Perfil; desc: string; cor: string }[] = [
  {
    nome: "LEITOR",
    desc: "Pode curtir, favoritar e comentar nas notícias publicadas.",
    cor: "#2196F3",
  },
  {
    nome: "AUTOR",
    desc: "Pode escrever notícias, salvar rascunhos e ver estatísticas.",
    cor: "#f57c00",
  },
  {
    nome: "EDITOR",
    desc: "Pode aprovar/rejeitar notícias e moderar comentários.",
    cor: "#2e7d32",
  },
  {
    nome: "SUPERADMIN",
    desc: "Acesso total a todos os CRUDs e configurações do portal.",
    cor: "#d81b60",
  },
];

export function CrudPerfisPage() {
  return (
    <main className="admin-layout">
      <AdminSidebar />
      <section style={{ flex: 1, padding: "30px", backgroundColor: "#fff", minWidth: 0, overflow: "hidden" }}>
        <h2 className="section-title" style={{ marginTop: 0 }}>
          Níveis de Acesso (Perfis)
        </h2>
        <p style={{ color: "#666", marginBottom: "30px" }}>
          Os perfis do sistema são fixos e não podem ser criados ou excluídos.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {perfis.map((perfil) => {
            const qtd = usuarios.filter((u) => u.perfil === perfil.nome).length;
            const ativos = usuarios.filter(
              (u) => u.perfil === perfil.nome && u.ativo
            ).length;

            return (
              <div
                key={perfil.nome}
                style={{
                  borderTop: `4px solid ${perfil.cor}`,
                  backgroundColor: "#faf5f7",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <h3 style={{ color: perfil.cor, marginBottom: "10px" }}>
                  {perfil.nome}
                </h3>
                <p
                  style={{
                    color: "#444",
                    fontSize: "0.95rem",
                    marginBottom: "20px",
                    minHeight: "45px",
                    lineHeight: 1.5,
                  }}
                >
                  {perfil.desc}
                </p>
                <div
                  style={{
                    borderTop: "1px solid #fce4ec",
                    paddingTop: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "0.85rem", color: "#666" }}>
                    Total / Ativos:
                  </span>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: "#4a148c",
                    }}
                  >
                    {qtd} / {ativos}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
