import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AdminSidebar } from "../../components/layout/AdminSidebar";

export function FormTagPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id; 

  const [nome, setNome] = useState(isEditing ? "tecnologia" : "");
  
  // Transforma o nome em slug automaticamente (ex: "Inteligência Artificial" vira "inteligencia-artificial")
  const slugGerado = nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Tag salva!");
    navigate("/admin/tags"); 
  };

  return (
    <main className="admin-layout">
      <AdminSidebar />
      <section style={{ flex: 1, padding: "30px", backgroundColor: "#fff", minWidth: 0, overflow: "hidden" }}>
        <div className="form-container" style={{ margin: 0, maxWidth: "600px" }}>
          <h2 className="section-title">{isEditing ? `Editar Tag #${id}` : "Cadastrar Nova Tag"}</h2>
          
          <form onSubmit={handleSalvar}>
            <div className="form-group">
              <label>Nome da Categoria/Assunto</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>

            {/* Preview do Slug e do Badge */}
            <div style={{ backgroundColor: "#faf5f7", padding: "15px", borderRadius: "8px", border: "1px solid #fce4ec", marginBottom: "20px" }}>
               <p style={{ margin: "0 0 10px 0", fontSize: "0.9rem", color: "#666" }}><strong>Slug automático:</strong> {slugGerado || "..."}</p>
               <p style={{ margin: "0 0 5px 0", fontSize: "0.9rem", color: "#666" }}><strong>Preview Visual:</strong></p>
               {nome ? <span className="tag">#{nome}</span> : <span style={{ color: "#aaa", fontSize: "0.9rem" }}>Digite um nome...</span>}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" className="btn">Salvar Tag</button>
              <button type="button" onClick={() => navigate("/admin/tags")} className="btn" style={{ backgroundColor: "#999" }}>Cancelar</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}