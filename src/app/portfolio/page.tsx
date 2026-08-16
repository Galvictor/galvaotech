import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { experience, projects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Experiência profissional e projetos selecionados — apps na Play Store, SaaS e automação. Capco, Loja Interativa e freela hotelaria.",
};

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(ellipse_at_30%_0%,rgba(46,196,160,0.14),transparent_55%)]"
      />

      <SiteHeader />

      <main>
        <section className="mx-auto max-w-6xl px-5 pb-8 pt-10 sm:px-8 sm:pt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            Portfólio
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
            Experiência e projetos no ar
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Do produto publicado à consultoria enterprise — o que entreguei e
            onde atuo hoje.
          </p>
        </section>

        <section
          id="experiencia"
          className="scroll-mt-20 border-t border-line bg-surface/80"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Experiência
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Emprego atual, trajetória full stack e freela contínuo.
            </p>
            <ol className="mt-10 space-y-10">
              {experience.map((item) => (
                <li
                  key={`${item.company}-${item.period}`}
                  className="border-l-2 border-teal/50 pl-4 sm:pl-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                    {item.period}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-ink/80">
                    {item.company}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    {item.summary}
                  </p>
                  {item.skills && item.skills.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-md border border-line bg-elevated/60 px-2.5 py-1 text-xs text-muted"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="projetos"
          className="scroll-mt-20 border-t border-line"
        >
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Projetos selecionados
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Apps publicados, SaaS e automação — prova de entrega ponta a
              ponta.
            </p>
            <ul className="mt-10 space-y-8">
              {projects.map((project) => (
                <li
                  key={project.title}
                  className="border-l-2 border-sand/50 pl-4 sm:pl-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sand">
                    {project.kind}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    {project.summary}
                  </p>
                  {project.href ? (
                    <Link
                      href={project.href}
                      {...(project.href.startsWith("http")
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                      className="mt-4 inline-flex cursor-pointer text-sm font-semibold text-teal transition hover:text-teal-dim"
                    >
                      {project.hrefLabel || "Abrir"} →
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-line bg-surface/90">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Quer algo parecido para o seu negócio?
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Conte o essencial do projeto — retorno com estimativa sem
              compromisso.
            </p>
            <Link
              href="/#orcamento"
              className="mt-8 inline-flex min-h-12 cursor-pointer items-center rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-bg transition hover:bg-teal-dim"
            >
              Solicitar orçamento
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
