import Link from "next/link";

export default function ObrigadoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-5 text-center text-ink">
      <p className="font-display text-4xl font-semibold">Galvão Tech</p>
      <h1 className="mt-6 font-display text-2xl font-medium sm:text-3xl">
        Pedido recebido
      </h1>
      <p className="mt-3 max-w-md text-muted">
        Obrigado. Vou avaliar o escopo e retorno com uma estimativa sem
        compromisso.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-teal px-5 py-3 text-sm font-semibold text-bg"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
