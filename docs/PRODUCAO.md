# Galvão Tech — Produção

## Ordem

1. Supabase — rode [`supabase/schema.sql`](../supabase/schema.sql)
2. Resend — API key + `LEADS_NOTIFY_EMAIL`
3. Vercel — importar repo, root = pasta do projeto
4. Env vars (ver `.env.local.example`)
5. Testar form → lead no banco → e-mail → `/admin`

## Env Vercel

```env
NEXT_PUBLIC_SITE_URL=https://SEU-PROJETO.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SECRET_KEY=...          # Secret / service_role — NÃO a Publishable
RESEND_API_KEY=...
RESEND_FROM=Galvão Tech <onboarding@resend.dev>
LEADS_NOTIFY_EMAIL=seu@email.com
ADMIN_PASSWORD=senha-forte
```

A `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (anon) **não basta** para gravar leads com RLS. Use a **Secret key**.

## Checklist

- [ ] Home carrega com marca Galvão Tech
- [ ] Orçamento grava em `leads`
- [ ] E-mail de notificação chega
- [ ] `/admin` com senha lista leads
- [ ] OG preview ok

## Dev sem Supabase

A API salva leads em memória do processo (só para testes locais). Reiniciar o server limpa a lista.
