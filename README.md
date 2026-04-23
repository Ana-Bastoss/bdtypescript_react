# 📰 Fake News — Portal de Notícias

> Portal de notícias com 5 níveis de acesso, construído como exercício prático de React, TypeScript e React Router v7. Todas as rotas são públicas nesta fase — o login é simulado por botões de acesso rápido por perfil.

👩🏽‍💻[Clique aqui para acessar o portal](https://fakenewsreact.netlify.app/)
---

## 🚀 Tecnologias

| Tecnologia | Versão | Papel no projeto |
|---|---|---|
| [React](https://react.dev/) | 18+ | Biblioteca de UI — componentes, estado e renderização |
| [TypeScript](https://www.typescriptlang.org/) | 5+ | Tipagem estática — interfaces, types e segurança em tempo de desenvolvimento |
| [React Router v7](https://reactrouter.com/) | 7 | Roteamento SPA — importado de `react-router` (não `react-router-dom`) |
| [Vite](https://vitejs.dev/) | 5+ | Bundler e dev server — `npm run dev` para iniciar |
| CSS Puro | — | Estilização manual em `App.css`, sem Bootstrap, Tailwind ou Material UI |

### Geradores de imagem de placeholder

As imagens de capa das notícias mockadas usam serviços de placeholder que geram imagens dinamicamente via URL, sem necessidade de arquivos locais:

**[via.placeholder.com](https://via.placeholder.com)**
```
https://via.placeholder.com/800x400/fce4ec/880e4f?text=Python+API
                             └─ WxH  └─ bg   └─ cor  └─ texto
```

**[placehold.co](https://placehold.co)**
```
https://placehold.co/800x400/fce4ec/880e4f?text=Python+API
                     └─ WxH  └─ bg  └─ cor  └─ texto
```

Ambos aceitam largura × altura, cor de fundo (hex sem `#`), cor do texto e um parâmetro `text` para o rótulo. São intercambiáveis — `placehold.co` tende a ter melhor disponibilidade. Em produção, substitua por imagens reais.

---

## Como rodar

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/portal-noticias.git
cd portal-noticias

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em `http://localhost:5173`. Não há backend — todos os dados são arrays mockados em `src/data/`.

---

## 📁 Estrutura de pastas

```
portal-noticias/
└── src/
    ├── App.tsx                    # BrowserRouter + todas as Routes
    ├── App.css                    # CSS global do projeto
    ├── main.tsx                   # Ponto de entrada React
    │
    ├── types/
    │   └── index.ts               # Interfaces TypeScript (UF, Cidade, Tag, Usuario, Noticia, Comentario)
    │
    ├── data/                      # Mocks estáticos (sem backend)
    │   ├── ufs.ts                 # 27 estados + DF
    │   ├── cidades.ts             # 30 cidades em 14 UFs
    │   ├── tags.ts                # 10 tags (Tecnologia, Política, Esportes...)
    │   ├── usuarios.ts            # 15 usuários (5 Leitor · 5 Autor · 3 Editor · 2 SuperAdmin)
    │   ├── noticias.ts            # 30 notícias (20 publicadas · 10 rascunhos)
    │   └── comentarios.ts         # 40 comentários (25 aprovados · 15 pendentes)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx         # Logo + navegação principal
    │   │   ├── Footer.tsx         # Rodapé com copyright
    │   │   └── AdminSidebar.tsx   # Sidebar fixa das páginas SuperAdmin
    │   └── ui/
    │       └── NoticiaCard.tsx    # Card de notícia reutilizável (usado na home e nos previews)
    │
    └── pages/
        ├── publico/               # Acessível sem login
        │   ├── HomePage.tsx
        │   ├── LoginPage.tsx
        │   ├── CadastroPage.tsx
        │   ├── LembrarSenhaPage.tsx
        │   ├── BuscaPorUFPage.tsx
        │   ├── BuscaPorTagPage.tsx
        │   ├── DetalheNoticiaPage.tsx
        │   └── NotFoundPage.tsx
        │
        ├── leitor/
        │   ├── PerfilLeitorPage.tsx
        │   └── ComentarLeitorPage.tsx
        │
        ├── autor/
        │   ├── PerfilAutorPage.tsx
        │   ├── MinhasNoticiasPage.tsx
        │   ├── NovaNoticiaPage.tsx
        │   └── EditarNoticiaPage.tsx
        │
        ├── editor/
        │   ├── PainelEditorPage.tsx
        │   ├── PublicarDespublicarPage.tsx
        │   └── EditarQualquerNoticiaPage.tsx
        │
        └── superadmin/
            ├── DashboardPage.tsx
            ├── CrudUFsPage.tsx · FormUFPage.tsx
            ├── CrudCidadesPage.tsx · FormCidadePage.tsx
            ├── CrudTagsPage.tsx · FormTagPage.tsx
            ├── CrudPerfisPage.tsx
            ├── CrudUsuariosPage.tsx · FormUsuarioPage.tsx
            ├── CrudNoticiasPage.tsx · FormNoticiaAdminPage.tsx
            └── GerenciarComentariosPage.tsx
```

---

## Mapa de rotas

### Público

| Rota | Página |
|---|---|
| `/` | HomePage |
| `/login` | LoginPage |
| `/cadastro` | CadastroPage |
| `/lembrar-senha` | LembrarSenhaPage |
| `/busca/uf/:sigla` | BuscaPorUFPage |
| `/busca/tag/:slug` | BuscaPorTagPage |
| `/noticia/:id` | DetalheNoticiaPage |
| `*` | NotFoundPage (404) |

### Leitor

| Rota | Página |
|---|---|
| `/leitor/perfil` | PerfilLeitorPage |
| `/leitor/comentar/:noticiaId` | ComentarLeitorPage |

### Autor

| Rota | Página |
|---|---|
| `/autor/perfil` | PerfilAutorPage |
| `/autor/noticias` | MinhasNoticiasPage |
| `/autor/noticias/nova` | NovaNoticiaPage |
| `/autor/noticias/:id/editar` | EditarNoticiaPage |
| `/autor/comentar/:noticiaId` | ComentarLeitorPage |

### Editor

| Rota | Página |
|---|---|
| `/editor/painel` | PainelEditorPage |
| `/editor/perfil` | PerfilAutorPage |
| `/editor/publicar/:id` | PublicarDespublicarPage |
| `/editor/noticias/:id/editar` | EditarQualquerNoticiaPage |

### SuperAdmin

| Rota | Página |
|---|---|
| `/admin/dashboard` | DashboardPage |
| `/admin/ufs` | CrudUFsPage |
| `/admin/ufs/nova` · `/admin/ufs/:id/editar` | FormUFPage |
| `/admin/cidades` | CrudCidadesPage |
| `/admin/cidades/nova` · `/admin/cidades/:id/editar` | FormCidadePage |
| `/admin/tags` | CrudTagsPage |
| `/admin/tags/nova` · `/admin/tags/:id/editar` | FormTagPage |
| `/admin/perfis` | CrudPerfisPage |
| `/admin/usuarios` | CrudUsuariosPage |
| `/admin/usuarios/:id/editar` | FormUsuarioPage |
| `/admin/noticias` | CrudNoticiasPage |
| `/admin/noticias/:id/editar` | FormNoticiaAdminPage |
| `/admin/comentarios` | GerenciarComentariosPage |

---

## Perfis e acesso

O sistema possui 4 perfis definidos em `src/types/index.ts`. Na tela de login há um bloco **"Acesso Rápido (Desenvolvimento)"** com um botão por perfil que redireciona diretamente para a área correspondente, sem autenticação real.

| Perfil | Acesso rápido via | Permissões |
|---|---|---|
| **LEITOR** | `/leitor/perfil` | Visualizar notícias, comentar, editar próprio perfil |
| **AUTOR** | `/autor/noticias` | Criar e editar próprias notícias, enviar para revisão |
| **EDITOR** | `/editor/painel` | Publicar/despublicar notícias, editar qualquer notícia, moderar comentários |
| **SUPERADMIN** | `/admin/dashboard` | CRUD completo de todas as entidades do sistema |

---

## Modelo de dados

Todas as interfaces ficam em `src/types/index.ts`:

```ts
export type Perfil = "LEITOR" | "AUTOR" | "EDITOR" | "SUPERADMIN";

export interface UF       { id: number; sigla: string; nome: string; }
export interface Cidade   { id: number; nome: string; ufId: number; }
export interface Tag      { id: number; nome: string; slug: string; }

export interface Usuario  {
  id: number; nome: string; email: string; perfil: Perfil;
  avatar?: string; bio?: string; cidadeId: number;
  ativo: boolean; criadoEm: string;
}

export interface Noticia  {
  id: number; titulo: string; subtitulo: string; conteudo: string;
  imagemCapa: string; autorId: number; cidadeId: number;
  tags: number[]; publicada: boolean;
  criadoEm: string; atualizadoEm: string; visualizacoes: number;
}

export interface Comentario {
  id: number; noticiaId: number; autorId: number;
  texto: string; criadoEm: string; aprovado: boolean;
}
```

---

## Observações técnicas

- **Sem autenticação real** — todas as rotas são públicas nesta fase. O "login" é apenas uma simulação via `useNavigate()`.
- **Sem backend** — nenhuma chamada de API. Todo estado vem de arrays `.ts` em `src/data/`.
- **Sem bibliotecas de UI** — Bootstrap, Tailwind, Material UI e similares são proibidos pelo escopo do projeto. Todo CSS é escrito manualmente em `App.css`.
- **React Router v7** — importar sempre de `react-router`, nunca de `react-router-dom`.
- **IDs simulados** — o usuário "logado" em cada área é fixo por constante no topo de cada página (ex: `const AUTOR_ID = 6`). Em produção, viria de um contexto de autenticação.

---
