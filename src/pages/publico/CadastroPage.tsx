import { useState } from "react";
import { Link } from "react-router";
import { ufs } from "../../data/ufs";
import { cidades } from "../../data/cidades";

export function CadastroPage() {
  const [ufSelecionada, setUfSelecionada] = useState("");

  // Filtra cidades conforme a UF escolhida
  const cidadesFiltradas = cidades.filter(
    (c) => c.ufId === ufs.find((u) => u.sigla === ufSelecionada)?.id
  );

  return (
    <main>
      <div className="form-container">
        <h2 className="section-title" style={{ textAlign: "center" }}>
          Crie sua Conta
        </h2>

        <form>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Crie uma senha forte"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmar_senha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmar_senha"
              name="confirmar_senha"
              placeholder="Repita a senha"
              required
            />
          </div>

          {/* UF e Cidade dinâmicos */}
          <div
            className="form-group"
            style={{ display: "flex", gap: "15px" }}
          >
            <div style={{ flex: 1 }}>
              <label htmlFor="uf">Estado (UF)</label>
              <select
                id="uf"
                value={ufSelecionada}
                onChange={(e) => setUfSelecionada(e.target.value)}
                required
              >
                <option value="">Selecione...</option>
                {ufs.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.sigla} — {uf.nome}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label htmlFor="cidade">Cidade</label>
              <select id="cidade" required disabled={!ufSelecionada}>
                <option value="">
                  {ufSelecionada ? "Selecione..." : "Escolha um estado"}
                </option>
                {cidadesFiltradas.map((cidade) => (
                  <option key={cidade.id} value={cidade.id}>
                    {cidade.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bio opcional */}
          <div className="form-group">
            <label htmlFor="bio">
              Bio{" "}
              <span style={{ color: "#999", fontWeight: 400, fontSize: "0.85rem" }}>
                (opcional)
              </span>
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              placeholder="Conte um pouco sobre você..."
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #f8bbd0",
                fontFamily: "inherit",
                fontSize: "1rem",
                resize: "vertical",
                backgroundColor: "#faf5f7",
                outline: "none",
              }}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn" style={{ width: "100%" }}>
              Criar Conta
            </button>
          </div>

          <div className="form-footer">
            <p>
              Já possui uma conta? <Link to="/login">Faça Login</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
