"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { TurnstileField } from "@/components/TurnstileField";

const PROJECT_TYPES = [
  "Site",
  "Sistema web",
  "Landing page",
  "SaaS",
  "Aplicativo",
  "API / integração",
  "Automação",
  "Outro",
] as const;

const MATERIALS = [
  "Não",
  "Design/Figma",
  "Site existente",
  "Sistema existente",
  "Documentação",
] as const;

const DEADLINES = [
  "Não tenho prazo definido",
  "Tenho urgência",
  "Até 7 dias",
  "Até 30 dias",
  "Mais de 30 dias",
] as const;

const BUDGETS = [
  "Até R$ 1.000",
  "R$ 1.000 – R$ 3.000",
  "R$ 3.000 – R$ 5.000",
  "R$ 5.000 – R$ 10.000",
  "Acima de R$ 10.000",
  "Não sei",
] as const;

type Status = "idle" | "loading" | "error";

const turnstileRequired = Boolean(
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim(),
);

export function QuoteForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [projectType, setProjectType] = useState("");
  const [material, setMaterial] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [budget, setBudget] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !projectType || !description.trim()) {
      setStatus("error");
      setError("Preencha nome, contato, tipo de projeto e a descrição.");
      return;
    }
    if (turnstileRequired && !turnstileToken) {
      setStatus("error");
      setError("Confirme que você não é um robô.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          project_type: projectType,
          material: material || null,
          description: description.trim(),
          deadline: deadline || null,
          budget: budget || null,
          website: honeypot,
          turnstileToken,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error || "Não foi possível enviar. Tente de novo.");
        setTurnstileToken(null);
        return;
      }
      router.push("/obrigado");
    } catch {
      setStatus("error");
      setError("Falha de rede. Verifique a conexão e tente outra vez.");
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-elevated px-4 py-3 text-ink outline-none ring-teal/40 placeholder:text-muted/60 focus:ring-2";

  return (
    <form
      onSubmit={onSubmit}
      className="relative grid w-full gap-4"
      aria-label="Formulário de orçamento Galvão Tech"
    >
      {/* Honeypot — bots preenchem; humanos não veem */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-muted">
          Nome
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1.5 ${field}`}
            placeholder="Seu nome"
          />
        </label>
        <label className="block text-sm text-muted">
          E-mail ou WhatsApp
          <input
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={`mt-1.5 ${field}`}
            placeholder="seu@email.com ou 11 9...."
          />
        </label>
      </div>

      <fieldset>
        <legend className="text-sm text-muted">O que você deseja desenvolver?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t) => (
            <label
              key={t}
              className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition ${
                projectType === t
                  ? "border-teal bg-teal/15 text-ink"
                  : "border-line bg-elevated text-muted hover:border-teal/40"
              }`}
            >
              <input
                type="radio"
                name="projectType"
                className="sr-only"
                checked={projectType === t}
                onChange={() => setProjectType(t)}
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm text-muted">Você já possui algum material?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {MATERIALS.map((m) => (
            <label
              key={m}
              className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition ${
                material === m
                  ? "border-sand bg-sand/10 text-ink"
                  : "border-line bg-elevated text-muted hover:border-sand/40"
              }`}
            >
              <input
                type="radio"
                name="material"
                className="sr-only"
                checked={material === m}
                onChange={() => setMaterial(m)}
              />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block text-sm text-muted">
        Conte brevemente sobre o projeto
        <textarea
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`mt-1.5 resize-y ${field}`}
          placeholder='Ex.: "Sistema para cadastrar clientes e gerar relatórios."'
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-muted">
          Existe algum prazo?
          <select
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={`mt-1.5 ${field}`}
          >
            <option value="">Selecione…</option>
            {DEADLINES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-muted">
          Faixa de investimento
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={`mt-1.5 ${field}`}
          >
            <option value="">Selecione…</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
      </div>

      <TurnstileField onToken={setTurnstileToken} />

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 min-h-12 w-full cursor-pointer rounded-xl border-0 bg-teal px-5 py-3 text-base font-semibold text-bg transition hover:bg-teal-dim disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Solicitar orçamento"}
      </button>

      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : (
        <p className="text-caption text-sm text-muted">
          Cada projeto é avaliado individualmente. Estimativa sem compromisso.
        </p>
      )}
    </form>
  );
}
