import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { usuarios } from "../../data/usuarios";
import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";
import type { Perfil } from "../../types";

export function FormUsuarioPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const usuarioOriginal = usuarios.find((u) => u.id === Number(id));
  const cidadeOriginal = cidades.find((c) => c.id === usuarioOriginal?.cidadeId);
  const ufOriginal = ufs.find((u) => u.id === cidadeOriginal?.ufId);

  const [nome, setNome] = useState(usuarioOriginal?.nome || "");
  const [perfil, setPerfil] = useState<Perfil>(usuarioOriginal?.perfil || "LEITOR");
  const [bio, setBio] = useState(usuarioOriginal?.bio || "");
  const [ativo, setAtivo] = useState(usuarioOriginal?.ativo ?? true);
  const [ufSelecionada, setUfSelecionada] = useState(ufOriginal?.sigla || "");
  const [cidadeId, setCidadeId] = useState(usuarioOriginal?.cidadeId || 0);

  const cidadesFiltradas = cidades.filter(
    (c) => c.ufId === ufs.find((u) => u.sigla === ufSelecionada)?.id
  );

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Dados do usuário atualizados com sucesso!");
    navigate("/admin/usuarios");
  };

  return (
    <main className="admin-layout">
      <AdminSidebar />
      <section style={{ flex: 1, padding: "30px", backgroundColor: "#fff", minWidth: 0, overflow: "hidden" }}>
        <div className="form-container" style={{ margin: 0, maxWidth: "700px" }}>
          <h2 className="section-title">
            {usuarioOriginal
              ? `Editar Usuário — ${usuarioOriginal.nome}`
              : `Editar Usuário #${id}`}
          </h2>

          <form onSubmit={handleSalvar}>
            <div style={{ display: "flex", gap: "15px" }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Nome Completo</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>E-mail de Acesso</label>
                <input
                  type="email"
                  value={usuarioOriginal?.email || ""}
                  readOnly
                  style={{ backgroundColor: "#eee", color: "#666", cursor: "not-allowed" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "15px" }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Perfil do Sistema</label>
                <select
                  value={perfil}
                  onChange={(e) => setPerfil(e.target.value as Perfil)}
                  required
                >
                  <option value="LEITOR">Leitor</option>
                  <option value="AUTOR">Autor</option>
                  <option value="EDITOR">Editor</option>
                  <option value="SUPERADMIN">SuperAdmin</option>
                </select>
              </div>

              {/* UF → Cidade dinâmicos */}
              <div className="form-group" style={{ flex: 1 }}>
                <label>Estado (UF)</label>
                <select
                  value={ufSelecionada}
                  onChange={(e) => {
                    setUfSelecionada(e.target.value);
                    setCidadeId(0);
                  }}
                >
                  <option value="">Selecione...</option>
                  {ufs.map((u) => (
                    <option key={u.id} value={u.sigla}>
                      {u.sigla} — {u.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Cidade</label>
              <select
                value={cidadeId}
                onChange={(e) => setCidadeId(Number(e.target.value))}
                disabled={!ufSelecionada}
              >
                <option value={0}>
                  {ufSelecionada ? "Selecione a cidade..." : "Escolha um estado primeiro"}
                </option>
                {cidadesFiltradas.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Biografia Curta</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #f8bbd0",
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
              />
            </div>

            <div
              className="checkbox-group"
              style={{
                backgroundColor: "#faf5f7",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #fce4ec",
              }}
            >
              <input
                type="checkbox"
                id="ativo"
                checked={ativo}
                onChange={(e) => setAtivo(e.target.checked)}
              />
              <label
                htmlFor="ativo"
                style={{ marginBottom: 0, fontWeight: "bold", color: "#4a148c" }}
              >
                Conta Ativa (Pode acessar o sistema)
              </label>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="submit" className="btn">
                Salvar Alterações
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/usuarios")}
                className="btn"
                style={{ backgroundColor: "#999" }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
