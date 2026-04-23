import { BrowserRouter, Routes, Route } from "react-router";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

// Importando as páginas públicas
import { HomePage } from "./pages/publico/HomePage";
import { LoginPage } from "./pages/publico/LoginPage";
import { CadastroPage } from "./pages/publico/CadastroPage";
import { LembrarSenhaPage } from "./pages/publico/LembrarSenhaPage";
import { BuscaPorUFPage } from "./pages/publico/BuscaPorUFPage";
import { BuscaPorTagPage } from "./pages/publico/BuscaPorTagPage";
import { DetalheNoticiaPage } from "./pages/publico/DetalheNoticiaPage";

// Importando as páginas de Leitor
import { PerfilLeitorPage } from "./pages/leitor/PerfilLeitorPage";
import { ComentarLeitorPage } from "./pages/leitor/ComentarLeitorPage";

// Importando as páginas de Autor
import { PerfilAutorPage } from "./pages/autor/PerfilAutorPage";
import { MinhasNoticiasPage } from "./pages/autor/MinhasNoticiasPage";
import { ComentarLeitorPage as ComentarAutorPage } from "./pages/leitor/ComentarLeitorPage";
import { NovaNoticiaPage } from "./pages/autor/NovaNoticiaPage";
import { EditarNoticiaPage } from "./pages/autor/EditarNoticiaPage";

// Importando as páginas de Editor
import { PainelEditorPage } from "./pages/editor/PainelEditorPage";
import { PublicarDespublicarPage } from "./pages/editor/PublicarDespublicarPage";
import { EditarQualquerNoticiaPage } from "./pages/editor/EditarQualquerNoticiaPage";
import { PerfilAutorPage as PerfilEditorPage } from "./pages/autor/PerfilAutorPage";

// Importando as páginas de SuperAdmin
import { DashboardPage } from "./pages/superadmin/DashboardPage";
import { CrudUFsPage } from "./pages/superadmin/CrudUFsPage";
import { FormUFPage } from "./pages/superadmin/FormUFPage";
import { CrudCidadesPage } from "./pages/superadmin/CrudCidadesPage";
import { FormCidadePage } from "./pages/superadmin/FormCidadePage";
import { CrudTagsPage } from "./pages/superadmin/CrudTagsPage";
import { FormTagPage } from "./pages/superadmin/FormTagPage";
import { CrudPerfisPage } from "./pages/superadmin/CrudPerfisPage";
import { CrudUsuariosPage } from "./pages/superadmin/CrudUsuariosPage";
import { FormUsuarioPage } from "./pages/superadmin/FormUsuarioPage";
import { CrudNoticiasPage as CrudNoticiasAdminPage } from "./pages/superadmin/CrudNoticiasPage";
import { FormNoticiaAdminPage } from "./pages/superadmin/FormNoticiaAdminPage";
import { GerenciarComentariosPage } from "./pages/superadmin/GerenciarComentariosPage";
import { NotFoundPage } from "./pages/publico/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          {/* === ROTAS PÚBLICAS === */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/lembrar-senha" element={<LembrarSenhaPage />} />
          <Route path="/busca/uf/:sigla" element={<BuscaPorUFPage />} />
          <Route path="/busca/tag/:slug" element={<BuscaPorTagPage />} />
          <Route path="/noticia/:id" element={<DetalheNoticiaPage />} />

          {/* === ROTAS DO LEITOR === */}
          <Route path="/leitor/perfil" element={<PerfilLeitorPage />} />
          <Route path="/leitor/comentar/:noticiaId" element={<ComentarLeitorPage />} />

          {/* === ROTAS DO AUTOR === */}
          <Route path="/autor/perfil" element={<PerfilAutorPage />} />
          <Route path="/autor/noticias" element={<MinhasNoticiasPage />} />
          <Route path="/autor/comentar/:noticiaId" element={<ComentarAutorPage />} />
          <Route path="/autor/noticias/nova" element={<NovaNoticiaPage />} />
          <Route path="/autor/noticias/:id/editar" element={<EditarNoticiaPage />} />

          {/* === ROTAS DO EDITOR === */}
          <Route path="/editor/painel" element={<PainelEditorPage />} />
          <Route path="/editor/perfil" element={<PerfilEditorPage />} />
          <Route path="/editor/publicar/:id" element={<PublicarDespublicarPage />} />
          <Route path="/editor/noticias/:id/editar" element={<EditarQualquerNoticiaPage />} />

          {/* === ROTAS DO SUPERADMIN === */}
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/ufs" element={<CrudUFsPage />} />
          <Route path="/admin/ufs/nova" element={<FormUFPage />} />
          <Route path="/admin/ufs/:id/editar" element={<FormUFPage />} />
          <Route path="/admin/cidades" element={<CrudCidadesPage />} />
          <Route path="/admin/cidades/nova" element={<FormCidadePage />} />
          <Route path="/admin/cidades/:id/editar" element={<FormCidadePage />} />
          <Route path="/admin/tags" element={<CrudTagsPage />} />
          <Route path="/admin/tags/nova" element={<FormTagPage />} />
          <Route path="/admin/tags/:id/editar" element={<FormTagPage />} />
          <Route path="/admin/perfis" element={<CrudPerfisPage />} />
          <Route path="/admin/noticias" element={<CrudNoticiasAdminPage />} />
          <Route path="/admin/noticias/:id/editar" element={<FormNoticiaAdminPage />} />
          <Route path="/admin/usuarios" element={<CrudUsuariosPage />} />
          <Route path="/admin/usuarios/novo" element={<FormUsuarioPage />} />
          <Route path="/admin/usuarios/:id/editar" element={<FormUsuarioPage />} />
          <Route path="/admin/comentarios" element={<GerenciarComentariosPage />} />

          {/* === ROTA CORINGA (404) === */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;