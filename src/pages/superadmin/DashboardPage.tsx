import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";
import { comentarios } from "../../data/comentarios";
import { ufs } from "../../data/ufs";
import { tags } from "../../data/tags";

export function DashboardPage() {
  // Métricas calculadas dos mocks
  const publicadas = noticias.filter((n) => n.publicada);
  const rascunhos = noticias.filter((n) => !n.publicada);

  const metricas = [
    { label: "Usuários", valor: usuarios.length, cor: "#4a148c" },
    { label: "Notícias Pub.", valor: publicadas.length, cor: "#2e7d32" },
    { label: "Rascunhos", valor: rascunhos.length, cor: "#f57c00" },
    { label: "Comentários", valor: comentarios.length, cor: "#d81b60" },
    { label: "UFs", valor: ufs.length, cor: "#1565c0" },
    { label: "Tags", valor: tags.length, cor: "#880e4f" },
  ];

  // Últimos 5 usuários (por criadoEm, invertido)
  const ultimosUsuarios = [...usuarios].reverse().slice(0, 5);

  // Últimas 5 notícias
  const ultimasNoticias = noticias.slice(0, 5);

  // Dados do gráfico: notícias por mês (simulados a partir dos mocks)
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  const alturas = [35, 60, 45, 80, 70, 55];

  return (
    <main className="admin-layout">
      <AdminSidebar />

      <section style={{ flex: 1, padding: "30px", backgroundColor: "#fff", minWidth: 0, overflow: "hidden" }}>
        <h2 className="section-title" style={{ marginTop: 0 }}>
          Painel de Controle Global
        </h2>

        {/* 6 Cards de Métricas dinâmicos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "15px",
            marginBottom: "40px",
          }}
        >
          {metricas.map((m) => (
            <div
              key={m.label}
              style={{
                backgroundColor: "#faf5f7",
                padding: "20px 15px",
                borderRadius: "8px",
                border: "1px solid #fce4ec",
                textAlign: "center",
              }}
            >
              <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: "8px" }}>
                {m.label}
              </p>
              <span style={{ fontSize: "2rem", fontWeight: "bold", color: m.cor }}>
                {m.valor}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", marginBottom: "40px" }}>
          {/* Gráfico de barras verticais CSS */}
          <div style={{ flex: "1 1 380px" }}>
            <h3 style={{ color: "#4a148c", marginBottom: "15px" }}>
              Notícias por Mês
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "12px",
                height: "180px",
                padding: "15px 15px 0",
                backgroundColor: "#faf5f7",
                borderRadius: "8px",
                border: "1px solid #fce4ec",
              }}
            >
              {alturas.map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: "#d81b60", fontWeight: 600 }}>
                    {Math.round(h * 0.3)}
                  </span>
                  <div
                    style={{
                      width: "100%",
                      height: `${h}%`,
                      background: "linear-gradient(to top, #d81b60, #f8bbd0)",
                      borderRadius: "4px 4px 0 0",
                    }}
                  />
                  <span style={{ fontSize: "0.75rem", color: "#666", paddingBottom: "6px" }}>
                    {meses[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabela de Últimos Usuários com dados */}
          <div style={{ flex: "1 1 380px", minWidth: 0 }}>
            <h3 style={{ color: "#4a148c", marginBottom: "15px" }}>
              Últimos Usuários
            </h3>
            <div className="table-container">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ padding: "8px 10px", textAlign: "left", backgroundColor: "#f8bbd0", color: "#880e4f", fontSize: "0.85rem" }}>
                    Usuário
                  </th>
                  <th style={{ padding: "8px 10px", textAlign: "left", backgroundColor: "#f8bbd0", color: "#880e4f", fontSize: "0.85rem" }}>
                    Perfil
                  </th>
                  <th style={{ padding: "8px 10px", textAlign: "left", backgroundColor: "#f8bbd0", color: "#880e4f", fontSize: "0.85rem" }}>
                    Data
                  </th>
                </tr>
              </thead>
              <tbody>
                {ultimosUsuarios.map((u) => {
                  return (
                    <tr key={u.id} style={{ borderBottom: "1px solid #fce4ec" }}>
                      <td style={{ padding: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <img
                            src={u.avatar || `https://i.pravatar.cc/30?img=${u.id}`}
                            alt={u.nome}
                            style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }}
                          />
                          <div>
                            <p style={{ margin: 0, fontWeight: 600, fontSize: "0.85rem", color: "#4a148c" }}>
                              {u.nome}
                            </p>
                            <p style={{ margin: 0, fontSize: "0.75rem", color: "#999" }}>
                              {u.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "10px" }}>
                        <span className="tag" style={{ fontSize: "0.75rem" }}>
                          {u.perfil}
                        </span>
                      </td>
                      <td style={{ padding: "10px", fontSize: "0.8rem", color: "#666" }}>
                        {u.criadoEm.split(" - ")[0]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        </div>

        {/* Tabela de Últimas Notícias com nome do autor */}
        <h3 style={{ color: "#4a148c", marginBottom: "15px" }}>
          Últimas Notícias Cadastradas
        </h3>
        <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {ultimasNoticias.map((n) => {
              const autor = usuarios.find((u) => u.id === n.autorId);
              return (
                <tr key={n.id}>
                  <td style={{ fontWeight: "bold", color: "#d81b60" }}>
                    {n.titulo.length > 50 ? n.titulo.slice(0, 50) + "..." : n.titulo}
                  </td>
                  <td>{autor?.nome || `ID ${n.autorId}`}</td>
                  <td>
                    <span className={n.publicada ? "badge-publicado" : "badge-despublicado"}>
                      {n.publicada ? "Publicada" : "Rascunho"}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.9rem", color: "#666" }}>
                    {n.criadoEm.split(" - ")[0]}
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
