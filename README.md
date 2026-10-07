# Site da Personal — landing page + agenda

Next.js (App Router) + TypeScript + Tailwind. Os horários ocupados vêm do
**Google Calendar** da profissional; os livres são calculados a partir do
expediente definido em `lib/config.ts`. Não há banco de dados.

Fluxo: visitante vê os horários → clica num horário livre → preenche o
formulário → abre o WhatsApp com a mensagem pronta (nada é salvo no servidor).

## Rodando

```bash
npm install next react react-dom @googleapis/calendar
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss
cp .env.example .env.local   # preencha os valores
npm run dev
```

Sem as credenciais do Google, em desenvolvimento todos os horários do
expediente aparecem como livres (dá para testar o visual e o formulário).
Em produção, sem credenciais a API retorna erro.

> Este projeto foi escrito sem poder rodar `npm install`/`build` no ambiente
> de criação. Rode `npm run typecheck` e `npm run build` na primeira vez e
> corrija qualquer ajuste de versão que aparecer.

## Configurando o Google Calendar (uma vez)

1. **Calendário dedicado:** no Google Calendar da profissional, crie uma
   agenda nova (ex.: "Agenda Personal"). Ela cria eventos nessa agenda nos
   horários em que **não** estará disponível (aluno marcado, compromisso etc.).
2. **Projeto no Google Cloud:** em console.cloud.google.com crie um projeto e
   ative a **Google Calendar API**.
3. **Conta de serviço:** em *IAM e administrador → Contas de serviço*, crie
   uma conta e gere uma **chave JSON**. Dela você usa `client_email` e
   `private_key`.
4. **Compartilhe a agenda** com o e-mail da conta de serviço, com permissão
   **"Ver apenas disponível/ocupado"** (basta isso — o site nunca lê títulos
   nem nomes de clientes).
5. Em *Configurações da agenda → Integrar agenda*, copie o **ID da agenda**.
6. Preencha `.env.local` (veja `.env.example`). Na hospedagem (ex.: Vercel),
   cadastre as mesmas variáveis em *Environment Variables*.

## Personalização rápida

- Expediente, duração da sessão e quantos dias mostrar: `lib/config.ts`
- Textos da landing page (nome, CREF, serviços): `app/page.tsx`
- Mensagem enviada ao WhatsApp: `components/FormAgendamento.tsx`
- Número do WhatsApp: variável `NEXT_PUBLIC_WHATSAPP`

## Limitação conhecida

O horário não é bloqueado no clique: a confirmação acontece no WhatsApp, e
ela cria o evento na agenda para o horário sumir do site (cache de até 60s).
Dois visitantes podem pedir o mesmo horário antes disso.
