-- Galvão Tech — tabela de leads (rode no SQL Editor do Supabase)

create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  contact text not null,
  project_type text not null,
  material text,
  description text not null,
  deadline text,
  budget text,
  status text not null default 'novo'
);

alter table public.leads enable row level security;

-- Acesso apenas via service role (API Next.js). Sem policies públicas.
