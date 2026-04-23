import { useState } from "react";
import { useParams, Link } from "react-router";
import { noticias } from "../../data/noticias";

export function ComentarLeitorPage() {
  const { noticiaId } = useParams();
  const noticia = noticias.find((n) => n.id === Number(noticiaId));
  
  const [texto, setTexto] = useState("");
  const [enviado, setEnviado] = useState(false); // Controla se mostra o form ou a tela de sucesso

  // Limite exigido pelo PDF
  const limite = 500;

  if (!noticia) {
    return <main style={{ textAlign: "center", padding: "50px" }}><h2>Notícia não encontrada!</h2></main>;
  }

  const handleEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (texto.length > 0 && texto.length <= limite) {
      setEnviado(true); // Muda a tela para a mensagem de sucesso
    }
  };

  return (
    <main>
      <div className="form-container" style={{ maxWidth: "800px" }}>
        <h2 className="section-title">Adicionar Comentário</h2>

        {/* Resumo da Notícia */}
        <div style={{ display: "flex", gap: "15px", alignItems: "center", backgroundColor: "#faf5f7", padding: "15px", borderRadius: "8px", marginBottom: "25px" }}>
          <img src={noticia.imagemCapa} alt="Capa" style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }} />
          <div>
            <p style={{ fontSize: "0.85rem", color: "#880e4f", fontWeight: "bold" }}>Comentando em:</p>
            <h4 style={{ color: "#4a148c", margin: 0 }}>{noticia.titulo}</h4>
          </div>
        </div>

        {!enviado ? (
          // Formulário de Comentário
          <form onSubmit={handleEnviar}>
            <div className="form-group">
              <label>Seu Comentário</label>
              <textarea 
                rows={5} 
                value={texto} 
                onChange={(e) => setTexto(e.target.value)} 
                placeholder="Escreva sua opinião de forma respeitosa..."
                style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #f8bbd0" }}
                required
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px", fontSize: "0.85rem" }}>
                {/* Contador de caracteres que fica vermelho se passar do limite */}
                <span style={{ color: texto.length > limite ? "red" : "#666" }}>
                  {texto.length} / {limite} caracteres
                </span>
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="submit" className="btn" disabled={texto.length === 0 || texto.length > limite}>Enviar Comentário</button>
              <Link to={`/noticia/${noticia.id}`} className="btn" style={{ backgroundColor: "#999" }}>Cancelar</Link>
            </div>
          </form>
        ) : (
          // Tela de Sucesso
          <div style={{ textAlign: "center", padding: "30px 10px" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}></div>
            <h3 style={{ color: "#2e7d32", marginBottom: "15px" }}>Comentário enviado com sucesso!</h3>
            <p style={{ color: "#666", marginBottom: "25px" }}>Sua interação já está visível na página da notícia.</p>
            <Link to={`/noticia/${noticia.id}`} className="btn">Voltar para a Notícia</Link>
          </div>
        )}
      </div>
    </main>
  );
}