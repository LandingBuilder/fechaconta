# 📱 Fecha-Caixa - Sistema de Fechamento de Caixa SaaS

Sistema de gerenciamento de fechamento de caixa com integração Stripe para cobranças de assinatura.

## 🎯 O Que É?

**Fecha-Caixa** é uma aplicação SaaS que ajuda pequenos comerciantes (lojistas, pizzarias, bares, restaurantes) a fazer fechamento de caixa de forma rápida e fácil.

### Planos:
- **Free**: 1 fechamento por dia (grátis para sempre)
- **Premium**: Ilimitado (R$ 30/mês com 7 dias de trial grátis)

## 🚀 Deploy Rápido (1-2 HORAS)

Quer colocar sua app online e começar a ganhar dinheiro? **Leia isso agora:**

👉 **[QUICK_START.md](./QUICK_START.md)** - Guia de 1 hora para deploy completo

### Guias Passo-a-Passo:
1. **[SETUP_STRIPE.md](./SETUP_STRIPE.md)** - Configurar Stripe (15 min)
2. **[SETUP_RAILWAY.md](./SETUP_RAILWAY.md)** - Deploy backend (10 min)
3. **[SETUP_VERCEL.md](./SETUP_VERCEL.md)** - Deploy frontend (10 min)
4. **[TESTE_PAGAMENTO.md](./TESTE_PAGAMENTO.md)** - Testar pagamentos (15 min)
5. **[PROXIMOS_PASSOS.md](./PROXIMOS_PASSOS.md)** - Começar a ganhar dinheiro

## 🏗️ Stack Técnico

### Frontend
- React 18 + TypeScript
- Vite (fast bundler)
- Tailwind CSS + Shadcn/ui
- Firebase Authentication
- Stripe.js

### Backend
- Node.js + Express
- TypeScript
- Firebase Admin SDK
- Stripe API

### Cloud
- Firebase (Auth + Firestore)
- Railway (backend)
- Vercel (frontend)
- Stripe (pagamentos)

## 📦 Instalação Local

```bash
# Clonar repositório
git clone <seu-repo>
cd fechaconta

# Instalar dependências
npm install

# Rodar desenvolvimento
npm run dev

# Build de produção
npm run build
```

Acesse `http://localhost:8080`

## 📋 Features

✅ **Dashboard intuitivo** com 11 categorias de fechamento  
✅ **Cálculos automáticos** de entradas, sangrias e despesas  
✅ **Impressão térmica** (para impressoras de PDV)  
✅ **Histórico de fechamentos** com export CSV  
✅ **Autenticação Firebase** (signup/login)  
✅ **Integração Stripe** (pagamentos recorrentes)  
✅ **Trial grátis 7 dias** (automaticamente)  
✅ **Responsivo mobile** (funciona em celular)  
✅ **Suporte offline** (works sem internet)  

## 🎯 Categories

O app tem 11 categorias pré-configuradas:

1. 💰 Dinheiro
2. 💳 Débito
3. 💳 Crédito
4. 🎟️ Vale
5. 📱 PIX
6. 🏦 Banco
7. 🛍️ Merchandise
8. 💸 Sangria Pequena
9. 💸 Sangria Grande
10. 📋 Despesas
11. 🎁 Brinde

Personalize em `src/components/CashRegister.tsx`

## 💰 Monetização

### Modelos de Preço Testados:
- **R$ 30/mês**: Free trial 7 dias
- **R$ 50/mês**: Free trial 14 dias
- **Freemium**: Free com limite de 1/dia, Premium ilimitado

Recomendação: R$ 30/mês (maior taxa de conversão)

### Projeção de Receita:
- **Mês 1**: 5 clientes = R$ 150/mês
- **Mês 3**: 20 clientes = R$ 600/mês
- **Mês 6**: 50 clientes = R$ 1.500/mês
- **Mês 12**: 100+ clientes = R$ 3.000+/mês

## 🔐 Segurança

- ✅ Firebase Auth para segurança
- ✅ Tokens JWT validados
- ✅ Webhook signatures do Stripe
- ✅ CORS configurado
- ✅ Variáveis de ambiente protegidas
- ⚠️ **Não armazena dados de cartão** (Stripe cuida disso)

## 📱 Responsividade

Testado em:
- ✅ iPhone SE (375px)
- ✅ iPhone 12/13/14/15
- ✅ Samsung A12 (500px)
- ✅ iPad (768px)
- ✅ Desktop (1024px+)

## 🚨 Troubleshooting

### "Cannot find module"
```bash
npm install
npm run dev
```

### "VITE_* not found"
Crie `.env.local` com variáveis (veja `.env.example`)

### "Stripe key inválido"
Verifique `VITE_STRIPE_PUBLIC_KEY` em `.env.local`

### "Backend não responde"
Confirme `VITE_API_URL=http://localhost:3000/api`

Para mais, veja os guias específicos (links acima)

## 📈 Estatísticas

- **Tempo de build**: 7 segundos
- **Tamanho do bundle**: 854KB (232KB gzipped)
- **Performance**: Lighthouse 90+
- **SEO**: Meta tags configuradas
- **Mobile**: PWA-ready

## 🎓 Como Aprender

Arquivos importantes:
```
src/
├── App.tsx                 → Rotas
├── components/
│   ├── CashRegister.tsx    → App principal
│   ├── Header.tsx          → Navegação
│   └── UpgradeModal.tsx    → Modal upgrade
├── contexts/
│   ├── AuthContext.tsx     → Auth (login/signup)
│   └── PlanContext.tsx     → Planos (free/premium)
├── hooks/
│   └── useValidation.tsx   → Validações
├── pages/
│   ├── Login.tsx           → Auth
│   ├── Plans.tsx           → Upgrade
│   └── History.tsx         → Histórico
└── lib/
    ├── api.ts              → API client
    └── firebase.ts         → Configuração Firebase
```

## 📞 Suporte

### Dúvidas sobre:
- **Deploy**: Veja guias (SETUP_*.md)
- **Código**: Procure em src/
- **Stripe**: Leia SETUP_STRIPE.md
- **Pricing**: Leia GUIA_MONETIZACAO.md

### Contato
- Email: seu-email@gmail.com
- Repositório: GitHub

## 📄 Licença

MIT License - Use como quiser!

## 🙏 Obrigado

Construído com ❤️ para ajudar pequenos comerciantes

---

**Pronto para deploy?** 👉 Comece com [QUICK_START.md](./QUICK_START.md)

**Data**: 3 de janeiro de 2026  
**Status**: ✅ Pronto para produção

- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
