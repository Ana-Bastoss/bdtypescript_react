import { useState } from "react";
import { Link } from "react-router";
import { usuarios } from "../../data/usuarios";
import { cidades } from "../../data/cidades";
import { ufs } from "../../data/ufs";
import { comentarios } from "../../data/comentarios";
import { noticias } from "../../data/noticias";

// Simulando usuário logado como o leitor de id=1
const USUARIO_LOGADO_ID = 1;

export function PerfilLeitorPage() {
  const usuario = usuarios.find((u) => u.id === USUARIO_LOGADO_ID)!;
  const cidade = cidades.find((c) => c.id === usuario.cidadeId);
  const uf = ufs.find((u) => u.id === cidade?.ufId);

  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [bio, setBio] = useState(usuario.bio || "");

  // Comentários leitor
  const meusComentarios = comentarios.filter(
    (c) => c.autorId === USUARIO_LOGADO_ID
  );

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <main>
      <div className="form-container" style={{ maxWidth: "800px" }}>
        {/* Cabeçalho do Perfil */}
        <div
          className="profile-header"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <img
            src={usuario.avatar || `https://i.pravatar.cc/120?img=${usuario.id}`}
            alt="Foto de Perfil"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #d81b60",
            }}
          />
          <div>
            <h2 style={{ color: "#4a148c", marginBottom: "5px" }}>{nome}</h2>
            <p style={{ color: "#666" }}>
              {usuario.email} | {cidade?.nome} / {uf?.sigla}
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#880e4f",
                marginTop: "5px",
              }}
            >
              Membro desde: {usuario.criadoEm}
            </p>
            <span
              className="tag"
              style={{ marginTop: "10px", display: "inline-block" }}
            >
              Nível: {usuario.perfil}
            </span>
          </div>
        </div>

        {/* Sobre mim */}
        <div
          style={{
            backgroundColor: "#faf5f7",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #fce4ec",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ color: "#880e4f", marginBottom: "15px" }}>Sobre mim</h3>

          {!isEditing ? (
            <div>
              <p style={{ color: "#444", marginBottom: "20px" }}>
                {bio || "Nenhuma bio cadastrada ainda."}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="btn"
              >
                Editar Perfil
              </button>
            </div>
          ) : (
            <form onSubmit={handleSalvar}>
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
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" className="btn">
                  Salvar
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

        {/* Histórico de Comentários */}
        <h3 className="section-title">Meus Comentários</h3>

        {meusComentarios.length === 0 ? (
          <p style={{ color: "#999" }}>Você ainda não fez nenhum comentário.</p>
        ) : (
          meusComentarios.map((com) => {
            const noticia = noticias.find((n) => n.id === com.noticiaId);
            return (
              <div
                key={com.id}
                style={{
                  borderLeft: "4px solid #d81b60",
                  paddingLeft: "15px",
                  marginBottom: "15px",
                }}
              >
                <p style={{ color: "#666", fontSize: "0.85rem" }}>
                  {com.criadoEm} em{" "}
                  {noticia ? (
                    <Link
                      to={`/noticia/${noticia.id}`}
                      style={{ color: "#4a148c", fontWeight: "bold" }}
                    >
                      {noticia.titulo.length > 50
                        ? noticia.titulo.slice(0, 50) + "..."
                        : noticia.titulo}
                    </Link>
                  ) : (
                    "Notícia removida"
                  )}
                </p>
                <p
                  style={{
                    color: "#444",
                    fontStyle: "italic",
                    marginTop: "5px",
                    fontSize: "0.95rem",
                  }}
                >
                  "{com.texto.length > 120
                    ? com.texto.slice(0, 120) + "..."
                    : com.texto}"
                </p>
                <span
                  className={com.aprovado ? "badge-publicado" : "badge-despublicado"}
                  style={{ fontSize: "0.75rem", marginTop: "4px", display: "inline-block" }}
                >
                  {com.aprovado ? "Aprovado" : "Pendente"}
                </span>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
