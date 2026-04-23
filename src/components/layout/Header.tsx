import { Link } from "react-router";

export function Header() {
  return (
    <header>
      <div className="logo-container">
        {/* A imagem puxa direto da pasta public/ */}
        <img src="/logo.png" alt="Logo Fake News" />
        <h1>Fake News</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/busca/uf/DF">Por Estado</Link></li>
          <li><Link to="/busca/tag/tecnologia">Por Tag</Link></li>
          <li><Link to="/login">Minha Conta</Link></li>
        </ul>
      </nav>
    </header>
  );
}