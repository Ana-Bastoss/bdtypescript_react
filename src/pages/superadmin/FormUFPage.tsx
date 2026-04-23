import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AdminSidebar } from "../../components/layout/AdminSidebar";
import { ufs } from "../../data/ufs";

export function FormUFPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const ufOriginal = ufs.find((u) => u.id === Number(id));

  const [sigla, setSigla] = useState(ufOriginal?.sigla || "");
  const [nome, setNome] = useState(ufOriginal?.nome || "");

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isEditing ? "UF atualizada com sucesso!" : "UF criada com sucesso!");
    navigate("/admin/ufs");
  };

  return (
    <main className="admin-layout">
      <AdminSidebar />
      <section style={{ flex: 1, padding: "30px", backgroundColor: "#fff", minWidth: 0, overflow: "hidden" }}>
        <div className="form-container" style={{ margin: 0, maxWidth: "600px" }}>
          <h2 className="section-title">
            {isEditing ? `Editar UF — ${ufOriginal?.sigla || id}` : "Cadastrar Nova UF"}
          </h2>

          <form onSubmit={handleSalvar}>
            <div className="form-group">
              <label>Sigla da UF</label>
              <input
                type="text"
                maxLength={2}
                value={sigla}
                onChange={(e) => setSigla(e.target.value.toUpperCase())}
                placeholder="Ex: DF"
                required
                style={{ textTransform: "uppercase" }}
              />
            </div>

            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Distrito Federal"
                required
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="submit" className="btn">
                Salvar UF
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/ufs")}
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
