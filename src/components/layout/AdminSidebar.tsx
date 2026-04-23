import { Link } from "react-router";

export function AdminSidebar() {
  return (
    <aside style={{ width: "250px", backgroundColor: "#faf5f7", padding: "20px", borderRight: "2px solid #fce4ec", minHeight: "80vh" }}>
      <h3 style={{ color: "#880e4f", marginBottom: "20px", fontSize: "1.2rem", textAlign: "center" }}>Painel SuperAdmin</h3>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
        <li><Link to="/admin/dashboard" className="btn" style={{ display: "block", textAlign: "left", backgroundColor: "transparent", color: "#d81b60", border: "1px solid #f8bbd0" }}>📊 Dashboard</Link></li>
        <li><Link to="/admin/ufs" style={{ color: "#4a148c", textDecoration: "none", display: "block", padding: "8px" }}>CRUD UFs</Link></li>
        <li><Link to="/admin/cidades" style={{ color: "#4a148c", textDecoration: "none", display: "block", padding: "8px" }}>CRUD Cidades</Link></li>
        <li><Link to="/admin/tags" style={{ color: "#4a148c", textDecoration: "none", display: "block", padding: "8px" }}>CRUD Tags</Link></li>
        <li><Link to="/admin/noticias" style={{ color: "#4a148c", textDecoration: "none", display: "block", padding: "8px" }}>CRUD Notícias</Link></li>
        <li><Link to="/admin/perfis" style={{ color: "#4a148c", textDecoration: "none", display: "block", padding: "8px" }}>CRUD Perfis</Link></li>
        <li><Link to="/admin/usuarios" style={{ color: "#4a148c", textDecoration: "none", display: "block", padding: "8px" }}>CRUD Usuários</Link></li>
        <li><Link to="/admin/comentarios" style={{ color: "#4a148c", textDecoration: "none", display: "block", padding: "8px" }}>Comentários</Link></li>
      </ul>
    </aside>
  );
}