# 💳 TESTAR FLUXO DE PAGAMENTO - Guia Prático

## Objetivo
Validar que todo o fluxo funciona end-to-end:
- Frontend → Backend → Stripe → Webhook → Firestore → Frontend

## ✅ Checklist Pré-Teste

- [ ] Backend rodando no Railway
- [ ] Frontend rodando no Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Stripe product e price criados
- [ ] Webhook configurado no Stripe

## 🧪 TESTE 1: Signup e Login

### Passo 1: Acessar Landing Page
1. Vá para `https://seu-dominio.com` (ou seu link Vercel)
2. Você deve ver a landing page com:
   - Hero section
   - Features
   - Pricing table
   - Botões de CTA

### Passo 2: Criar Conta
1. Clique em **"Entrar"** → **"Signup"**
2. Preencha:
   - Email: `teste@exemplo.com`
   - Senha: `Senha123!` (mín 6 caracteres)
3. Clique **"Criar Conta"**

### Esperado:
- ✅ Redireciona para dashboard
- ✅ Mostra saudação "Olá, Teste!"
- ✅ Mostra badge "Plano Free"
- ✅ Mostra contador "1/1 fechamentos hoje"

## 🎯 TESTE 2: Fluxo Free (1 fechamento/dia)

### Passo 3: Fazer Primeiro Fechamento
1. Na página do CashRegister, preencha:
   - Dinheiro: 100
   - Débito: 50
   - Crédito: 25
   - (outros campos opcional)

2. Clique **"Calcular"** e depois **"Salvar Fechamento"**

### Esperado:
- ✅ Salva o fechamento
- ✅ Mostra mensagem "Fechamento salvo com sucesso"
- ✅ Vai para histórico
- ✅ Mostra o fechamento na lista

### Passo 4: Tentar Segundo Fechamento (deve bloquear)
1. Clique em **"Nova Sessão"**
2. Preencha dados novamente
3. Clique **"Salvar Fechamento"**

### Esperado:
- ✅ Modal aparece: "Você atingiu o limite de 1 fechamento por dia"
- ✅ Botão **"Fazer Upgrade"**

## 💰 TESTE 3: Fluxo de Pagamento

### Passo 5: Clicar em "Fazer Upgrade"
1. Clique no botão **"Fazer Upgrade"** (no modal)
2. Redireciona para página de plans

### Esperado:
- ✅ Mostra pricing table com Free e Premium
- ✅ Botão **"Iniciar Trial Grátis"** em destaque

### Passo 6: Iniciar Trial
1. Clique em **"Iniciar Trial Grátis"**
2. Uma nova aba abre (Stripe Checkout)

### Esperado:
- ✅ Página do Stripe com email pré-preenchido
- ✅ Mostra "R$ 30 BRL" por mês
- ✅ Mostra "7 dias de trial grátis"

### Passo 7: Preencher Dados de Cartão
1. Na seção de cartão, preencha:
   - **Card number**: `4242 4242 4242 4242` (cartão de teste)
   - **Expiry**: `12/25` (qualquer data futura)
   - **CVC**: `123`
   - **Name**: Seu nome
   - **Country**: Brazil
   - **Postal Code**: 12345

2. Clique **"Assinar"** (ou "Subscribe")

### Esperado:
- ✅ Processa pagamento
- ✅ Redireciona de volta para seu app
- ✅ Mostra mensagem "Bem-vindo ao plano Premium!"

## ✅ TESTE 4: Validar Premium Status

### Passo 8: Verificar Dashboard
1. Volte para o dashboard (CashRegister)
2. Verifique:
   - [ ] Badge mudou de "Free" para "Premium"
   - [ ] Contador mostra "0/Ilimitado fechamentos hoje"
   - [ ] Pode fazer vários fechamentos

### Passo 9: Fazer Múltiplos Fechamentos
1. Faça 3 fechamentos consecutivos
2. Em cada um, clique "Salvar Fechamento"

### Esperado:
- ✅ Todos salvam sem erro
- ✅ Contador incremente (0→1→2→3/Ilimitado)
- ✅ Nenhum modal de limite aparece

## 🔍 TESTE 5: Verificar Backend

### Passo 10: Verificar Firebase
1. Vá para **Firebase Console**: https://console.firebase.google.com
2. Selecione projeto **firestone-a1e60**
3. Vá para **Firestore Database**
4. Clique em **"users"** collection
5. Você deve ver seu documento:
   - Email: `teste@exemplo.com`
   - `isPremium`: `true`
   - `trialEndsAt`: Data futura
   - `subscriptionId`: ID do Stripe

### Passo 11: Verificar Stripe
1. Vá para **Stripe Dashboard**: https://dashboard.stripe.com
2. Clique em **"Customers"** (Clientes)
3. Procure por seu email
4. Clique no cliente

### Esperado:
- ✅ Mostra customer com ID do Stripe
- ✅ Tem uma assinatura ativa ("Subscriptions")
- ✅ Status: "Active" (ativo)
- ✅ Próximo pagamento em 7 dias

## 🚨 TESTE 6: Cancelar Subscription

### Passo 12: Cancelar Premium
1. Na página do CashRegister, clique em **"Cancelar Subscription"** (ou similar)
2. Confirme o cancelamento

### Esperado:
- ✅ Mostra mensagem "Subscription cancelada"
- ✅ Badge volta a "Free"
- ✅ Contador volta a "1/1"

### Passo 13: Verificar Cancelamento
1. Abra Stripe Dashboard
2. Vá para o customer
3. Clique na subscription

### Esperado:
- ✅ Status mudou para "Canceled"

## 📋 Checklist de Sucesso

- [ ] ✅ Signup/Login funciona
- [ ] ✅ Free plan limita a 1 fechamento/dia
- [ ] ✅ Modal de upgrade aparece corretamente
- [ ] ✅ Checkout do Stripe abre
- [ ] ✅ Pagamento processa (com cartão teste)
- [ ] ✅ Usuário vira Premium após pagamento
- [ ] ✅ Premium permite múltiplos fechamentos
- [ ] ✅ Firestore atualiza com status Premium
- [ ] ✅ Stripe mostra subscription ativa
- [ ] ✅ Cancelamento funciona
- [ ] ✅ Usuário volta a Free após cancelamento

## 🆘 Troubleshooting

### Erro: "Stripe key not found"
- Verifique `VITE_STRIPE_PUBLIC_KEY` em Vercel
- Abra console (F12) e veja a URL completa do erro

### Erro: "Could not create checkout session"
- Verifique `VITE_STRIPE_PRICE_ID` em Vercel
- Certifique-se que price ID existe em Stripe

### Checkout redireciona para "success" mas usuário continua Free
- Webhook pode não estar configurado
- Vá para Stripe → Webhooks e verifique se há erros
- Clique no webhook e veja o log

### Sem permissão para acessar Firestore
- Verifique as regras de Firestore
- Deve permitir acesso com Firebase Auth

### Cartão é recusado
- Teste com `4242 4242 4242 4242` (teste Stripe)
- Use qualquer data futura (12/25)
- Use qualquer CVC (123)

## 📞 Próximas Ações

- ✅ Se tudo funcionou: Parabéns! 🎉 Você está pronto para vender!
- ⚠️ Se houve erros: Veja o console (F12) e os logs do Railway/Vercel

Recomende verificar:
1. Logs do Railway (Deployments → View logs)
2. Console do navegador (F12 → Console)
3. Network tab (F12 → Network) para ver requisições

**Você está pronto para vender! 🚀💰**
