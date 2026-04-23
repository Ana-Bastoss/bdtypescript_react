import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";

export function FormCidadePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const cidadeOriginal = cidades.find((c) => c.id === Number(id));
  const ufOriginal = ufs.find((u) => u.id === cidadeOriginal?.ufId);

  const [nome, setNome] = useState(cidadeOriginal?.nome || "");
  const [ufSelecionada, setUfSelecionada] = useState(ufOriginal?.sigla || "");

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isEditing ? "Cidade atualizada!" : "Cidade criada!");
    navigate("/admin/cidades");
  };

  return (
    <main className="admin-layout">
      <AdminSidebar />
      <section style={{ flex: 1, padding: "30px", backgroundColor: "#fff", minWidth: 0, overflow: "hidden" }}>
        <div className="form-container" style={{ margin: 0, maxWidth: "600px" }}>
          <h2 className="section-title">
            {isEditing
              ? `Editar Cidade — ${cidadeOriginal?.nome || id}`
              : "Cadastrar Nova Cidade"}
          </h2>

          <form onSubmit={handleSalvar}>
            <div className="form-group">
              <label>Nome da Cidade</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Brasília"
                required
              />
            </div>

            <div className="form-group">
              <label>Estado (UF)</label>
              <select
                value={ufSelecionada}
                onChange={(e) => setUfSelecionada(e.target.value)}
                required
              >
                <option value="">Selecione...</option>
                {ufs.map((u) => (
                  <option key={u.id} value={u.sigla}>
                    {u.sigla} — {u.nome}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="submit" className="btn">
                Salvar Cidade
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/cidades")}
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
