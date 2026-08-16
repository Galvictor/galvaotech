import { QuoteForm } from "@/components/QuoteForm";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

const services = [
  {
    title: "Sites profissionais",
    text: "Landing pages, sites institucionais, portfólios e páginas para empresas.",
  },
  {
    title: "Sistemas web",
    text: "Dashboards, painéis administrativos, sistemas internos e ferramentas empresariais.",
  },
  {
    title: "MVPs e SaaS",
    text: "Transforme uma ideia em produto funcional para validar o negócio.",
  },
  {
    title: "APIs e integrações",
    text: "APIs externas, pagamentos, bancos de dados e serviços de terceiros.",
  },
  {
    title: "Infraestrutura",
    text: "Servidores, banco, domínio, DNS, deploy e ambientes de produção.",
  },
  {
    title: "Automação com IA",
    text: "Soluções que usam IA para automatizar processos e acelerar entregas.",
  },
];

const stack = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Python", "APIs REST", "Serverless"],
  },
  {
    label: "Banco",
    items: ["PostgreSQL", "Supabase", "Redis quando necessário"],
  },
  {
    label: "Cloud & Infra",
    items: ["Vercel", "Render", "Cloudflare", "AWS"],
  },
  {
    label: "IA & processo",
    items: [
      "Geração e refatoração assistida",
      "Prototipagem rápida",
      "Automação do fluxo de desenvolvimento",
    ],
  },
];

const steps = [
  {
    n: "01",
    title: "Você explica a ideia",
    text: "Preenche um formulário rápido contando o que precisa.",
  },
  {
    n: "02",
    title: "Eu avalio",
    text: "Analiso funcionalidades, tecnologias e complexidade.",
  },
  {
    n: "03",
    title: "Recebe o orçamento",
    text: "Proposta com escopo, prazo e valor — sem compromisso.",
  },
  {
    n: "04",
    title: "Desenvolvimento",
    text: "Construo a solução com stack moderna e IA como acelerador.",
  },
  {
    n: "05",
    title: "Publicação",
    text: "Deploy e aplicação funcionando em produção.",
  },
];

const packages = [
  { title: "Landing Page", text: "Para empresas, profissionais e produtos." },
  { title: "Site Profissional", text: "Site institucional completo." },
  { title: "Sistema Web", text: "Aplicação personalizada para o seu fluxo." },
  { title: "MVP / SaaS", text: "Produto inicial para validação." },
  { title: "Manutenção & Infra", text: "Hospedagem, atualizações e suporte." },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-ink">
      <section className="relative isolate min-h-screen overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_0%,rgba(46,196,160,0.18),transparent_55%),radial-gradient(ellipse_at_90%_20%,rgba(232,192,122,0.12),transparent_45%),linear-gradient(160deg,#070a09_0%,#0e1412_55%,#070a09_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-24 -z-10 h-[28rem] w-[28rem] animate-[drift_12s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(46,196,160,0.22),transparent_68%)]"
        />

        <SiteHeader />

        <div className="mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-6xl flex-col justify-center px-5 pb-16 pt-8 sm:px-8">
          <p className="font-display text-5xl font-semibold leading-none tracking-tight opacity-0 animate-[rise_0.75s_ease-out_forwards] sm:text-6xl md:text-7xl">
            Galvão Tech
          </p>
          <h1 className="mt-6 max-w-2xl font-display text-2xl font-medium leading-snug text-ink/95 opacity-0 [animation:rise_0.75s_ease-out_0.12s_forwards] sm:text-3xl md:text-[2.35rem]">
            Sua ideia pode estar online muito mais rápido do que você imagina.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted opacity-0 [animation:rise_0.75s_ease-out_0.24s_forwards] sm:text-lg">
            Desenvolvo sites, sistemas e aplicações web completas — interface,
            backend, banco, deploy e segurança — com tecnologias modernas e IA
            para acelerar o processo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 opacity-0 [animation:rise_0.75s_ease-out_0.24s_forwards]">
            <a
              href="#orcamento"
              className="inline-flex min-h-12 items-center rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-bg transition hover:bg-teal-dim"
            >
              Quero fazer um orçamento
            </a>
            <a
              href="#servicos"
              className="inline-flex min-h-12 items-center rounded-xl border border-line bg-elevated/60 px-5 py-3 text-sm font-semibold text-ink transition hover:border-teal/40"
            >
              Ver o que desenvolvo
            </a>
          </div>
          <p className="mt-6 text-sm text-muted opacity-0 [animation:rise_0.75s_ease-out_0.3s_forwards]">
            Projetos personalizados · Full Stack · Infraestrutura · Deploy ·
            Segurança
          </p>
        </div>
      </section>

      <main>
        <section
          id="servicos"
          className="scroll-mt-20 border-t border-line bg-surface/80"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              O que eu posso desenvolver?
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Do site institucional ao SaaS — com infra e publicação inclusas
              quando o projeto pedir.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="border-l-2 border-teal/50 pl-4"
                >
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Tecnologia a favor da velocidade
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Utilizo IA como parte do processo — para prototipar, implementar e
              evoluir com mais velocidade. O cliente compra resultado: ideia no
              ar, não “código gerado por botão”.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {stack.map((g) => (
                <div key={g.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
                    {g.label}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted">
                    {g.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="processo"
          className="scroll-mt-20 border-t border-line bg-surface/80"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Da ideia ao ar em poucas horas
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Dependendo da complexidade — com um fluxo claro do primeiro
              contato à publicação.
            </p>
            <ol className="mt-10 space-y-8">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="grid gap-2 sm:grid-cols-[4.5rem_1fr] sm:gap-6"
                >
                  <span className="font-display text-2xl font-semibold text-teal/80">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted sm:text-base">
                      {s.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Formatos de projeto
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Sem preço fixo genérico na página. Cada caso é orçado sob medida —
              estimativa sem compromisso.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-line bg-elevated/50 px-5 py-4"
                >
                  <h3 className="font-display font-semibold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{p.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <a
                href="#orcamento"
                className="inline-flex min-h-12 items-center rounded-xl bg-sand px-5 py-3 text-sm font-semibold text-bg transition hover:brightness-110"
              >
                Quero tirar minha ideia do papel
              </a>
            </div>
          </div>
        </section>

        <section
          id="orcamento"
          className="scroll-mt-20 border-t border-line bg-surface/90"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Solicitar orçamento
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Conte o essencial. Eu retorno com uma proposta alinhada ao seu
              prazo e investimento.
            </p>
            <div className="mt-10">
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
