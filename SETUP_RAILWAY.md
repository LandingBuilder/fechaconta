# 🚀 DEPLOY BACKEND NO RAILWAY - Guia Prático

## 1️⃣ Criar Conta no Railway

1. Acesse **https://railway.app**
2. Clique em **"Start Project"**
3. Clique em **"GitHub"** para conectar com seu GitHub
4. Autorize o Railway acessar seus repositórios
5. Escolha o repositório **fechaconta** (ou o nome do seu)

## 2️⃣ Criar Variáveis de Ambiente

Após conectar o GitHub, o Railway vai te pedir para:

1. Clique em **"Add Variables"** (ou **"Configure"**)
2. Preencha **EXATAMENTE** essas variáveis:

```bash
# Ambiente
PORT=3000
NODE_ENV=production

# Firebase Admin SDK
FIREBASE_PROJECT_ID=firestone-a1e60
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@firestone-a1e60.iam.gserviceaccount.com

# Stripe (obtenha no SETUP_STRIPE.md)
STRIPE_SECRET_KEY=sk_live_51SlZhB...
STRIPE_WEBHOOK_SECRET=whsec_...

# URLs
FRONTEND_URL=https://seu-dominio.com
BACKEND_URL=https://seu-projeto-railway.up.railway.app
```

### ⚠️ Como Obter Credenciais Firebase:

1. Vá para **Firebase Console**: https://console.firebase.google.com
2. Selecione o projeto **firestone-a1e60**
3. Vá para **Project Settings** (ícone de engrenagem)
4. Clique em **Service accounts**
5. Clique **"Generate new private key"**
6. Um arquivo JSON será baixado

Abra o JSON e copie:
- `project_id` → `FIREBASE_PROJECT_ID`
- `private_key` → `FIREBASE_PRIVATE_KEY` (copie exatamente como está, com `\n`)
- `client_email` → `FIREBASE_CLIENT_EMAIL`

## 3️⃣ Fazer Deploy

1. No Railway, você verá um botão **"Deploy"**
2. Clique nele e espere (leva 2-5 minutos)
3. Se der erro, vá para **Deployments** e veja o log

## 4️⃣ Obter URL do Backend

1. Na página do projeto, vá para **Settings**
2. Procure por **Domain** ou **Public URL**
3. Você verá algo como: `https://seu-projeto-railway.up.railway.app`
4. **COPIE** essa URL

## 5️⃣ Testar Backend

Acesse a URL do webhook (deve retornar erro 400, mas isso é normal):
```
https://seu-projeto-railway.up.railway.app/api/stripe/webhook
```

Se retornar alguma coisa (mesmo erro), o backend está funcionando! ✅

## 6️⃣ Estrutura do Backend

O backend deve estar assim:

```
/backend
  ├── src/
  │   ├── index.ts           (servidor principal)
  │   ├── config/
  │   │   ├── firebase.ts
  │   │   └── stripe.ts
  │   ├── services/
  │   │   └── subscription.service.ts
  │   └── routes/
  │       ├── stripe.routes.ts
  │       ├── users.routes.ts
  │       └── closings.routes.ts
  ├── package.json
  ├── tsconfig.json
  └── .env (local development only)
```

## 7️⃣ Troubleshooting

### Erro: "FIREBASE_PRIVATE_KEY is not valid"
- Certifique-se que copiou a chave completa com `\n` no final
- Pode ser necessário escapar como `"...\n"`

### Erro: "Cannot find module 'express'"
- Rode `npm install` no `/backend` antes de fazer push
- Verifique se `package.json` tem todas as dependências

### Backend não recebe requisições do Frontend
- Verifique se `FRONTEND_URL` está correto em Railway
- Verifique CORS em `src/index.ts`

## ✅ Pronto!

Você tem:
- ✅ Backend rodando no Railway
- ✅ Banco de dados Firebase conectado
- ✅ Stripe configurado
- ✅ URL do backend para usar no Vercel

**Próximo passo**: Fazer deploy do frontend no Vercel!
