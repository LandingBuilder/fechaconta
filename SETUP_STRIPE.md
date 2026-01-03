# 🔑 SETUP STRIPE - Guia Prático

## 1️⃣ Criar Conta Stripe

1. Acesse **https://stripe.com** e clique em **"Sign up"**
2. Preencha com seu email e crie uma senha
3. Clique no link que chegará em seu email para confirmar
4. Escolha o país (Brasil) e tipo de conta (Conta pessoal ou empresa)
5. Preencha seus dados pessoais/empresa

## 2️⃣ Configurar Dados Bancários

1. Vá para **Settings** (ícone de engrenagem no canto superior direito)
2. Clique em **"Payout information"** (Informações de transferência)
3. Preencha:
   - **Bank account holder name**: Seu nome
   - **Bank routing number / CNPJ**: CPF ou CNPJ
   - **Beneficiary account**: Sua conta bancária
   - **Account type**: Conta corrente ou poupança
4. Clique **"Add account"**

Stripe fará 2 transferências pequenas em sua conta para validação.

## 3️⃣ Obter Chaves API

1. Vá para **Developers** (no menu esquerdo)
2. Clique em **API keys**
3. **IMPORTANTE**: Alterne para o modo **Live** (não Test!)
4. Você verá:
   - **Publishable key** (pk_live_...): Use no frontend
   - **Secret key** (sk_live_...): Use no backend

### Copiar Chaves:
```bash
# Publishable key (frontend)
pk_live_51SlZhB...

# Secret key (backend)
sk_live_51SlZhB...
```

## 4️⃣ Criar Produto e Preço

### Criar Produto:
1. Vá para **Products** (no menu esquerdo)
2. Clique **"Add product"**
3. Preencha:
   - **Name**: Fecha-Caixa Premium
   - **Description**: Acesso ilimitado a fechamentos de caixa
   - **Type**: Subscription (ou One-time)
4. Clique **"Create product"**

### Criar Preço:
1. Na página do produto, clique em **"Add pricing"**
2. Preencha:
   - **Billing period**: Monthly (mensal)
   - **Price**: 30 (BRL)
   - **Recurring**: Yes, monthly
3. Clique **"Create price"**
4. **COPIE O PRICE ID**: `price_1SlZhB...`

## 5️⃣ Configurar Webhook

O webhook permite que Stripe notifique seu backend quando algo acontece (pagamento, cancelamento, etc).

### URL do Webhook:
```
https://seu-backend.railway.app/api/stripe/webhook
```

### Configurar:
1. Vá para **Developers** → **Webhooks**
2. Clique **"Add endpoint"**
3. Preencha:
   - **URL**: `https://seu-backend.railway.app/api/stripe/webhook`
   - **Events**: Selecione:
     - ✅ checkout.session.completed
     - ✅ customer.subscription.updated
     - ✅ customer.subscription.deleted
4. Clique **"Add endpoint"**
5. Clique no webhook criado
6. Role até **Signing secret** e clique **"Reveal"**
7. **COPIE**: `whsec_...`

## 6️⃣ Salvar as Chaves

Você vai precisar dessas 3 chaves:

### Para o Backend (Railway):
```bash
STRIPE_SECRET_KEY=sk_live_51SlZhB...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Para o Frontend (Vercel):
```bash
VITE_STRIPE_PUBLIC_KEY=pk_live_51SlZhB...
VITE_STRIPE_PRICE_ID=price_1SlZhB...
```

## 7️⃣ Testar com Cartões de Teste (Opcional)

Stripe oferece cartões de teste para testar antes de ir para Live:

```
Cartão: 4242 4242 4242 4242
Mês/Ano: 12/25 (qualquer data no futuro)
CVC: 123 (qualquer número)
```

## ✅ Pronto!

Você tem:
- ✅ Conta Stripe ativa
- ✅ Chaves API (pk_live e sk_live)
- ✅ Produto "Fecha-Caixa Premium" criado
- ✅ Preço de R$ 30/mês configurado
- ✅ Webhook configurado
- ✅ Webhook secret salvo

**Próximo passo**: Salvar essas chaves no Railway e Vercel!
