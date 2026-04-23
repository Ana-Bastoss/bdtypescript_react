import { useParams } from "react-router";
import { EditarNoticiaPage } from "../autor/EditarNoticiaPage";
import { noticias } from "../../data/noticias";
import { usuarios } from "../../data/usuarios";

export function EditarQualquerNoticiaPage() {
  const { id } = useParams();
  const noticia = noticias.find((n) => n.id === Number(id));
  const autor = noticia
    ? usuarios.find((u) => u.id === noticia.autorId)
    : null;

  return (
    <div>
      {/* Aviso exigido pelo PDF com nome real do autor */}
      <div
        style={{
          backgroundColor: "#fff9c4",
          color: "#f57f17",
          padding: "15px",
          textAlign: "center",
          fontWeight: "bold",
          borderBottom: "2px solid #fbc02d",
          fontSize: "0.95rem",
        }}
      >
        Você está editando uma notícia de{" "}
        <strong>
          {autor?.nome || `Autor ID ${noticia?.autorId ?? id}`}
        </strong>
      </div>

      <EditarNoticiaPage />
    </div>
  );
}
