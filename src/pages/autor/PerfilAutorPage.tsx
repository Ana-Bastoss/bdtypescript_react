import { useState } from "react";
import { usuarios } from "../../data/usuarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";
import { noticias } from "../../data/noticias";
import { comentarios } from "../../data/comentarios";

// Simulando autor logado (id=6 = Pedro Alves, perfil AUTOR)
const AUTOR_ID = 6;

export function PerfilAutorPage() {
  const usuario = usuarios.find((u) => u.id === AUTOR_ID)!;
  const cidade = cidades.find((c) => c.id === usuario.cidadeId);
  const uf = ufs.find((u) => u.id === cidade?.ufId);

  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [bio, setBio] = useState(usuario.bio || "");

  // Stats calculados dinamicamente
  const minhasNoticias = noticias.filter((n) => n.autorId === AUTOR_ID);
  const publicadas = minhasNoticias.filter((n) => n.publicada);
  const rascunhos = minhasNoticias.filter((n) => !n.publicada);
  const totalVisualizacoes = minhasNoticias.reduce((acc, n) => acc + n.visualizacoes, 0);
  const totalComentarios = comentarios.filter((c) =>
    minhasNoticias.some((n) => n.id === c.noticiaId)
  ).length;

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const stats = [
    { label: "Total de Notícias", valor: minhasNoticias.length, cor: "#d81b60" },
    { label: "Publicadas", valor: publicadas.length, cor: "#2e7d32" },
    { label: "Rascunhos", valor: rascunhos.length, cor: "#f57c00" },
    { label: "Visualizações", valor: totalVisualizacoes.toLocaleString("pt-BR"), cor: "#4a148c" },
    { label: "Comentários recebidos", valor: totalComentarios, cor: "#880e4f" },
  ];

  return (
    <main>
      <div className="form-container" style={{ maxWidth: "800px" }}>
        {/* Cabeçalho do Perfil */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "30px",
            paddingBottom: "20px",
            borderBottom: "2px solid #f8bbd0",
          }}
        >
          <img
            src={usuario.avatar || `https://i.pravatar.cc/120?img=${usuario.id}`}
            alt="Foto de Perfil"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #d81b60",
            }}
          />
          <div>
            <h2 style={{ color: "#4a148c", marginBottom: "5px" }}>{nome}</h2>
            <p style={{ color: "#666", margin: "2px 0" }}>{usuario.email}</p>
            <p style={{ color: "#666", margin: "2px 0", fontSize: "0.9rem" }}>
              📍 {cidade?.nome} / {uf?.sigla}
            </p>
            <span
              className="tag"
              style={{
                marginTop: "8px",
                display: "inline-block",
                backgroundColor: "#f8bbd0",
                color: "#880e4f",
              }}
            >
              Nível: {usuario.perfil}
            </span>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                backgroundColor: "#fff",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #fce4ec",
                textAlign: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ color: "#666", fontSize: "0.8rem", marginBottom: "6px" }}>
                {s.label}
              </p>
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: s.cor,
                }}
              >
                {s.valor}
              </span>
            </div>
          ))}
        </div>

        {/* Área de edição */}
        <h3 style={{ color: "#880e4f", marginBottom: "15px" }}>Meus Dados</h3>

        {!isEditing ? (
          <div>
            <p
              style={{
                color: "#444",
                marginBottom: "20px",
                padding: "15px",
                backgroundColor: "#faf5f7",
                borderRadius: "8px",
                border: "1px solid #fce4ec",
                lineHeight: 1.6,
              }}
            >
              {bio || "Nenhuma bio cadastrada ainda."}
            </p>
            <button onClick={() => setIsEditing(true)} className="btn">
              Atualizar Dados
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSalvar}
            style={{
              backgroundColor: "#faf5f7",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #fce4ec",
            }}
          >
            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Minha Biografia</label>
              <textarea
                rows={4}
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
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" className="btn">
                Salvar Alterações
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn"
                style={{ backgroundColor: "#999" }}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
