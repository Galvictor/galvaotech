# Galvão Tech — Produção

## Ordem

1. Supabase — rode [`supabase/schema.sql`](../supabase/schema.sql)
2. Resend — API key + `LEADS_NOTIFY_EMAIL`
3. Cloudflare Turnstile — site key + secret (anti-spam do form)
4. Vercel — importar repo, root = pasta do projeto
5. Env vars (ver `.env.local.example`)
6. Testar form → lead no banco → e-mail → `/admin`

## Env Vercel

```env
NEXT_PUBLIC_SITE_URL=https://SEU-PROJETO.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SECRET_KEY=...          # Secret / service_role — NÃO a Publishable
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
RESEND_API_KEY=...
RESEND_FROM=Galvão Tech <onboarding@resend.dev>
LEADS_NOTIFY_EMAIL=seu@email.com
ADMIN_PASSWORD=senha-forte
```

A `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (anon) **não basta** para gravar leads com RLS. Use a **Secret key**.

## Anti-spam

Já ativo no código:

- **Rate limit** — máx. 5 envios / IP / 15 min
- **Honeypot** — campo oculto (bots são descartados sem e-mail)
- **Turnstile** — se as env keys existirem, o widget aparece e a API valida

### Criar Turnstile (grátis)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Turnstile** → Add site  
2. Domínio: seu `.vercel.app` (e domínio custom se tiver)  
3. Widget Mode: **Managed**  
4. Copie **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`  
5. Copie **Secret Key** → `TURNSTILE_SECRET_KEY`  
6. Redeploy na Vercel  

Sem as keys do Turnstile, honeypot + rate limit ainda protegem; o checkbox do Cloudflare só aparece depois de configurar.

## Checklist

- [ ] Home carrega com marca Galvão Tech
- [ ] Orçamento grava em `leads`
- [ ] E-mail de notificação chega
- [ ] `/admin` com senha lista leads
- [ ] Widget Turnstile no form (após env)
- [ ] OG preview ok

## Dev sem Supabase

A API salva leads em memória do processo (só para testes locais). Reiniciar o server limpa a lista.
