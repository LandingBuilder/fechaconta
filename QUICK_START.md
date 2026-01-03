# 🚀 QUICK START - Começar em 1 Hora

Se você está com pressa, siga este passo a passo simples!

## ⏱️ Timeline
- ⏰ Passos 1-3: 10 minutos
- ⏰ Passos 4-6: 20 minutos
- ⏰ Passos 7-9: 20 minutos
- ⏰ Passo 10: 10 minutos
- **Total: ~1 hora até estar online! 🎉**

---

## PASSO 1: Configurar Stripe (10 min)

```bash
1. Vá para https://stripe.com
2. Clique "Sign up" e crie sua conta
3. Confirme o email
4. Preencha dados básicos (nome, país = Brasil)
5. Leia SETUP_STRIPE.md para detalhes completos
```

**Resultado esperado**: Você tem chaves API (pk_live_..., sk_live_...)

---

## PASSO 2: Criar Produto Stripe (5 min)

```bash
1. No Stripe, vá para Products
2. Clique "Add product"
3. Nome: "Fecha-Caixa Premium"
4. Description: "Acesso ilimitado"
5. Clique "Create product"
6. Adicione preço: R$ 30/mês
7. COPIE o Price ID (price_...)
```

**Resultado esperado**: Você tem `VITE_STRIPE_PRICE_ID`

---

## PASSO 3: Configurar Webhook Stripe (5 min)

```bash
1. Em Stripe, vá para Developers → Webhooks
2. Clique "Add endpoint"
3. URL: https://seu-backend.railway.app/api/stripe/webhook
   (você terá isso depois do Passo 6)
4. Selecione eventos:
   ✓ checkout.session.completed
   ✓ customer.subscription.updated
   ✓ customer.subscription.deleted
5. COPIE o Webhook Secret (whsec_...)
```

**Resultado esperado**: Webhook configurado

---

## PASSO 4: Fazer Push para GitHub (5 min)

```bash
# No seu terminal
cd /home/gabriel/Documentos/fechaconta.app/fechaconta

# Verificar status
git status

# Adicionar tudo
git add .

# Fazer commit
git commit -m "Setup para deploy em produção"

# Push para GitHub
git push origin main
```

**Resultado esperado**: Código enviado para GitHub

---

## PASSO 5: Deploy Backend no Railway (10 min)

```bash
1. Vá para https://railway.app
2. Clique "Start Project"
3. Autorize GitHub
4. Selecione repositório "fechaconta"
5. Railway vai perguntar por variáveis de ambiente

ADICIONE ESSAS VARIÁVEIS:
- PORT=3000
- NODE_ENV=production
- FIREBASE_PROJECT_ID=firestone-a1e60
- FIREBASE_PRIVATE_KEY=... (copie de Firebase Console)
- FIREBASE_CLIENT_EMAIL=... (copie de Firebase Console)
- STRIPE_SECRET_KEY=sk_live_... (do Stripe)
- STRIPE_WEBHOOK_SECRET=whsec_... (do Stripe)
- FRONTEND_URL=https://seu-dominio.com (deixe como está por enquanto)
- BACKEND_URL=https://seu-projeto-railway.up.railway.app

6. Clique "Deploy"
7. COPIE a URL: https://seu-projeto-railway.up.railway.app
```

**Resultado esperado**: Backend rodando com URL como `https://seu-projeto-railway.up.railway.app`

---

## PASSO 6: Deploy Frontend no Vercel (10 min)

```bash
1. Vá para https://vercel.com
2. Clique "Sign Up" → "GitHub"
3. Autorize Vercel
4. Clique "Add New Project"
5. Selecione repositório "fechaconta"

ADICIONE ESSAS VARIÁVEIS:
- VITE_API_URL=https://seu-projeto-railway.up.railway.app/api
- VITE_STRIPE_PUBLIC_KEY=pk_live_... (do Stripe)
- VITE_STRIPE_PRICE_ID=price_... (do Stripe)
- VITE_FIREBASE_API_KEY=AIzaSyBzZlekzPc1iykwerZFORuWBc_S2Ko3Z4U
- VITE_FIREBASE_AUTH_DOMAIN=firestone-a1e60.firebaseapp.com
- VITE_FIREBASE_PROJECT_ID=firestone-a1e60
- VITE_FIREBASE_STORAGE_BUCKET=firestone-a1e60.firebasestorage.app
- VITE_FIREBASE_MESSAGING_SENDER_ID=1037917977900
- VITE_FIREBASE_APP_ID=1:1037917977900:web:5575102151d1d6e9614089
- VITE_SUPPORT_EMAIL=seu-email@gmail.com
- VITE_MONTHLY_PRICE=30
- VITE_FREE_TRIAL_DAYS=7
- VITE_FREE_CLOSINGS_PER_DAY=1

6. Clique "Deploy"
7. Aguarde 3-10 minutos
8. Você terá uma URL: https://seu-projeto.vercel.app
```

**Resultado esperado**: Frontend online em `https://seu-projeto.vercel.app`

---

## PASSO 7: Atualizar Stripe Webhook (2 min)

Agora que você tem a URL do backend:

```bash
1. Vá para Stripe → Webhooks
2. Clique no webhook que criou
3. Edite a URL para: https://seu-projeto-railway.up.railway.app/api/stripe/webhook
4. Salve
```

**Resultado esperado**: Webhook apontando para o backend correto

---

## PASSO 8: Testar Tudo (10 min)

```bash
1. Abra https://seu-projeto.vercel.app
2. Clique "Entrar"
3. Crie uma conta
4. Faça um fechamento
5. Tente fazer outro (deve bloquear)
6. Clique "Fazer Upgrade"
7. Clique "Iniciar Trial Grátis"
8. Preencha cartão de teste: 4242 4242 4242 4242
9. Confirme
10. Você deve virar Premium!
```

**Resultado esperado**: Tudo funciona! 🎉

---

## PASSO 9: Domínio Customizado (OPCIONAL - 5 min)

Se quiser seu próprio domínio:

```bash
1. Compre um domínio em Namecheap/GoDaddy (R$ 20/ano)
2. Em Vercel, vá para Settings → Domains
3. Adicione seu domínio
4. Siga as instruções para apontar DNS
5. Aguarde propagação (até 24h)
```

**Resultado esperado**: `https://seu-dominio.com` funciona

---

## PASSO 10: Começar a Vender! (∞)

```bash
1. Vá para Reddit (r/Empreendedorismo)
2. Compartilhe seu app
3. Poste em grupos Facebook de PDV/Comércio
4. Convide amigos para usar
5. Peça feedback
6. GANHE DINHEIRO! 💰
```

**Resultado esperado**: Primeiros clientes pagando!

---

## 📋 Checklist Final

- [ ] Conta Stripe criada
- [ ] Produto e preço criados
- [ ] Webhook configurado
- [ ] Código em GitHub
- [ ] Backend no Railway
- [ ] Frontend no Vercel
- [ ] Teste de pagamento funcionando
- [ ] Domínio customizado (opcional)

---

## 🆘 Se Algo Deu Errado

### Erro: "Backend retorna 500"
→ Verifique variáveis no Railway

### Erro: "Stripe key inválido"
→ Copie as chaves certinho de novo

### Erro: "Webhook não funciona"
→ Leia SETUP_STRIPE.md passo a passo

### Erro: "Frontend não conecta ao backend"
→ Verifique `VITE_API_URL` em Vercel

Para detalhes, leia os arquivos:
- `SETUP_STRIPE.md` - Setup Stripe completo
- `SETUP_RAILWAY.md` - Deploy backend
- `SETUP_VERCEL.md` - Deploy frontend
- `TESTE_PAGAMENTO.md` - Testar fluxo completo

---

## 🎉 Você está pronto!

Se chegou até aqui, parabéns! 🚀

Seu app está online e pronto para ganhar dinheiro.

Próximos passos recomendados:
1. Testar com amigos
2. Fazer marketing (redes sociais)
3. Iterar baseado em feedback
4. Escalar conforme crescimento

**Boa sorte! Você consegue! 💪**
