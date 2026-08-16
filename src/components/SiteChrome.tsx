import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
      <Link
        href="/"
        className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
      >
        Galvão Tech
      </Link>
      <nav className="flex items-center gap-4 text-sm font-medium">
        <Link
          href="/#servicos"
          className="hidden text-muted transition hover:text-ink sm:inline"
        >
          Serviços
        </Link>
        <Link
          href="/#processo"
          className="hidden text-muted transition hover:text-ink md:inline"
        >
          Processo
        </Link>
        <Link
          href="/#orcamento"
          className="rounded-lg bg-teal px-3.5 py-2 font-semibold text-bg transition hover:bg-teal-dim cursor-pointer"
        >
          Orçamento
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-5 py-10 text-center text-sm text-muted sm:px-8">
      <p className="font-display text-lg font-semibold text-ink">Galvão Tech</p>
      <p className="mt-2">
        Full stack · Infraestrutura · Deploy · Segurança
      </p>
      <p className="mt-4 text-xs">
        © {new Date().getFullYear()} Galvão Tech. Marca temporária — em evolução.
      </p>
    </footer>
  );
}
