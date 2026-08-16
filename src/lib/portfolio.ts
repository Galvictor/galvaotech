export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  summary: string;
  skills?: string[];
};

export type ProjectItem = {
  title: string;
  kind: string;
  summary: string;
  href?: string;
  hrefLabel?: string;
};

export const experience: ExperienceItem[] = [
  {
    company: "Capco",
    role: "Consultor Digital",
    period: "set/2025 – o momento",
    summary:
      "Associado a Capco Energy: consultoria digital com automação SAP em Python, dados em SAP HANA e pipelines em Azure Databricks.",
    skills: [
      "Implementação SAP",
      "Produtos SAP",
      "Python",
      "Azure Databricks",
      "SAP HANA",
    ],
  },
  {
    company: "Loja Interativa",
    role: "Desenvolvedor Web e Engenheiro de Software Sênior",
    period: "2014 – 2025",
    summary:
      "Full stack com React, Angular, Laravel e Node.js — do levantamento à entrega. Gestão ágil (Scrum/Kanban), bancos relacionais e apoio em infra Linux, servidores e AWS.",
    skills: ["React", "Angular", "Laravel", "Node.js", "AWS"],
  },
  {
    company: "Freelancer — Hotelaria",
    role: "Automação de relatórios financeiros",
    period: "2024 – atual · trimestral",
    summary:
      "Entregas trimestrais: conversão de planilhas Excel em relatórios Markdown, formatação financeira e suporte à análise com IA — para operação hoteleira.",
    skills: ["Python", "Excel", "IA", "Dados financeiros"],
  },
];

export const projects: ProjectItem[] = [
  {
    title: "Julius Budget Tracker",
    kind: "App Android · Flutter",
    summary:
      "Controle de receitas e despesas no celular — offline, PT/EN, importação de extratos e notificações. Publicado na Google Play.",
    href: "https://play.google.com/store/apps/details?id=com.joaolopes.gastos_simples",
    hrefLabel: "Ver na Play Store",
  },
  {
    title: "Synth Wave Block Rush",
    kind: "Game Android · Flutter",
    summary:
      "Puzzle de blocos neon com trilha synthwave — Arcade, Adventure e Synth Fall, ranking local e global. Publicado na Google Play.",
    href: "https://play.google.com/store/apps/details?id=com.joaolopes.jogo_blocos",
    hrefLabel: "Ver na Play Store",
  },
  {
    title: "FormaCoach",
    kind: "SaaS web · Next.js + API",
    summary:
      "SaaS para personal trainers no Brasil: alunos, treinos, portal e painel — do produto à publicação.",
    href: "https://formacoach.vercel.app",
    hrefLabel: "Abrir demo",
  },
  {
    title: "Galvão Tech",
    kind: "Landing + leads + admin",
    summary:
      "Site de serviços full stack com formulário de orçamento, persistência no Supabase, e-mail e painel de leads.",
    href: "/",
    hrefLabel: "Ver site",
  },
  {
    title: "Automação hotelaria",
    kind: "Python · dados financeiros",
    summary:
      "Processamento de dados financeiros e geração de relatórios legíveis a partir de planilhas — base do freela trimestral.",
    href: "https://github.com/Galvictor/financial-data-processor",
    hrefLabel: "Ver no GitHub",
  },
];

export const socialLinks = {
  github: "https://github.com/Galvictor",
  linkedin: "https://www.linkedin.com/in/joao-victor-souza-lopes",
} as const;
