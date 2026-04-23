import type { Usuario } from "../types";

export const usuarios: Usuario[] = [
  // ── LEITORES (5) ────────────────────────────────────────────
  {
    id: 1,
    nome: "Ana Souza",
    email: "ana.souza@email.com",
    perfil: "LEITOR",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Apaixonada por tecnologia e notícias do cotidiano.",
    cidadeId: 1, // Brasília
    ativo: true,
    criadoEm: "10/01/2026 - 08:00",
  },
  {
    id: 2,
    nome: "Carlos Lima",
    email: "carlos.lima@email.com",
    perfil: "LEITOR",
    avatar: "https://i.pravatar.cc/150?img=2",
    bio: "Curioso por natureza, leitor assíduo.",
    cidadeId: 4, // São Paulo
    ativo: true,
    criadoEm: "12/01/2026 - 09:30",
  },
  {
    id: 3,
    nome: "Fernanda Rocha",
    email: "fernanda.rocha@email.com",
    perfil: "LEITOR",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "Professora e leitora voraz.",
    cidadeId: 7, // Rio de Janeiro
    ativo: true,
    criadoEm: "15/01/2026 - 11:00",
  },
  {
    id: 4,
    nome: "João Mendes",
    email: "joao.mendes@email.com",
    perfil: "LEITOR",
    avatar: "https://i.pravatar.cc/150?img=4",
    bio: "Estudante de jornalismo.",
    cidadeId: 10, // Belo Horizonte
    ativo: false,
    criadoEm: "18/01/2026 - 14:00",
  },
  {
    id: 5,
    nome: "Mariana Costa",
    email: "mariana.costa@email.com",
    perfil: "LEITOR",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Curiosa sobre política e economia.",
    cidadeId: 13, // Salvador
    ativo: true,
    criadoEm: "20/01/2026 - 10:00",
  },

  // ── AUTORES (5) ─────────────────────────────────────────────
  {
    id: 6,
    nome: "Pedro Alves",
    email: "pedro.alves@email.com",
    perfil: "AUTOR",
    avatar: "https://i.pravatar.cc/150?img=6",
    bio: "Desenvolvedor e redator técnico. Especialista em Python e APIs.",
    cidadeId: 1, // Brasília
    ativo: true,
    criadoEm: "05/01/2026 - 08:00",
  },
  {
    id: 7,
    nome: "Beatriz Nunes",
    email: "beatriz.nunes@email.com",
    perfil: "AUTOR",
    avatar: "https://i.pravatar.cc/150?img=7",
    bio: "Especialista em cloud computing e segurança da informação.",
    cidadeId: 4, // São Paulo
    ativo: true,
    criadoEm: "06/01/2026 - 09:00",
  },
  {
    id: 8,
    nome: "Lucas Ferreira",
    email: "lucas.ferreira@email.com",
    perfil: "AUTOR",
    avatar: "https://i.pravatar.cc/150?img=8",
    bio: "Cobrindo hackathons e eventos de inovação pelo Brasil.",
    cidadeId: 7, // Rio de Janeiro
    ativo: true,
    criadoEm: "07/01/2026 - 10:00",
  },
  {
    id: 9,
    nome: "Camila Torres",
    email: "camila.torres@email.com",
    perfil: "AUTOR",
    avatar: "https://i.pravatar.cc/150?img=9",
    bio: "Jornalista econômica com foco em startups.",
    cidadeId: 17, // Curitiba
    ativo: true,
    criadoEm: "08/01/2026 - 11:00",
  },
  {
    id: 10,
    nome: "Rafael Dias",
    email: "rafael.dias@email.com",
    perfil: "AUTOR",
    avatar: "https://i.pravatar.cc/150?img=10",
    bio: "Repórter de política e gestão pública.",
    cidadeId: 23, // Goiânia
    ativo: false,
    criadoEm: "09/01/2026 - 12:00",
  },

  // ── EDITORES (3) ────────────────────────────────────────────
  {
    id: 11,
    nome: "Tatiane Borges",
    email: "tatiane.borges@email.com",
    perfil: "EDITOR",
    avatar: "https://i.pravatar.cc/150?img=11",
    bio: "Editora-chefe com 10 anos de experiência em portais de notícias.",
    cidadeId: 4, // São Paulo
    ativo: true,
    criadoEm: "02/01/2026 - 08:00",
  },
  {
    id: 12,
    nome: "Rodrigo Pinto",
    email: "rodrigo.pinto@email.com",
    perfil: "EDITOR",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Editor de tecnologia e inovação.",
    cidadeId: 1, // Brasília
    ativo: true,
    criadoEm: "03/01/2026 - 09:00",
  },
  {
    id: 13,
    nome: "Larissa Melo",
    email: "larissa.melo@email.com",
    perfil: "EDITOR",
    avatar: "https://i.pravatar.cc/150?img=13",
    bio: "Editora de conteúdo regional e política.",
    cidadeId: 7, // Rio de Janeiro
    ativo: true,
    criadoEm: "04/01/2026 - 10:00",
  },

  // ── SUPERADMINS (2) ─────────────────────────────────────────
  {
    id: 14,
    nome: "Admin Master",
    email: "admin@fakenews.com",
    perfil: "SUPERADMIN",
    avatar: "https://i.pravatar.cc/150?img=14",
    bio: "Administrador geral do portal.",
    cidadeId: 1, // Brasília
    ativo: true,
    criadoEm: "01/01/2026 - 00:00",
  },
  {
    id: 15,
    nome: "Suporte Técnico",
    email: "suporte@fakenews.com",
    perfil: "SUPERADMIN",
    avatar: "https://i.pravatar.cc/150?img=15",
    bio: "Responsável pela infraestrutura e suporte.",
    cidadeId: 4, // São Paulo
    ativo: true,
    criadoEm: "01/01/2026 - 01:00",
  },
];
