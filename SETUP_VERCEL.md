# 🎨 DEPLOY FRONTEND NO VERCEL - Guia Prático

## 1️⃣ Criar Conta no Vercel

1. Acesse **https://vercel.com**
2. Clique em **"Sign Up"** e escolha **"GitHub"**
3. Autorize o Vercel a acessar seus repositórios
4. Você será levado ao dashboard

## 2️⃣ Importar Projeto

1. Clique em **"Add New..."** → **"Project"**
2. Procure pelo repositório **fechaconta**
3. Clique **"Import"**

## 3️⃣ Configurar Variáveis de Ambiente

1. Na página do projeto, vá para **Settings** → **Environment Variables**
2. Adicione **EXATAMENTE** essas variáveis:

```bash
# Backend URL (obtenha do SETUP_RAILWAY.md)
VITE_API_URL=https://seu-projeto-railway.up.railway.app/api

# Stripe (obtenha do SETUP_STRIPE.md)
VITE_STRIPE_PUBLIC_KEY=pk_live_51SlZhB...
VITE_STRIPE_PRICE_ID=price_1SlZhB...

# Firebase (use os mesmos do seu projeto)
VITE_FIREBASE_API_KEY=AIzaSyBzZlekzPc1iykwerZFORuWBc_S2Ko3Z4U
VITE_FIREBASE_AUTH_DOMAIN=firestone-a1e60.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=firestone-a1e60
VITE_FIREBASE_STORAGE_BUCKET=firestone-a1e60.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1037917977900
VITE_FIREBASE_APP_ID=1:1037917977900:web:5575102151d1d6e9614089

# App Config
VITE_SUPPORT_EMAIL=seu-email@gmail.com
VITE_MONTHLY_PRICE=30
VITE_FREE_TRIAL_DAYS=7
VITE_FREE_CLOSINGS_PER_DAY=1
```

3. Clique **"Save"** após cada variável

## 4️⃣ Fazer Deploy

1. Clique em **"Deploy"** (botão no canto superior direito)
2. Aguarde o build (leva 3-10 minutos)
3. Você verá mensagens como:
   - ✅ Building...
   - ✅ Deployed!

4. Clique no link gerado: `https://seu-projeto.vercel.app`

## 5️⃣ Configurar Domínio Customizado (Opcional)

Se quiser usar seu próprio domínio (ex: `fechaconta.com`):

### Comprar Domínio:
1. Compre em **Namecheap**, **GoDaddy**, **Google Domains**, etc
2. Custe em torno de R$ 10-30/ano

### Configurar no Vercel:
1. Vá para **Settings** → **Domains**
2. Clique **"Add Domain"**
3. Digite seu domínio (ex: `fechaconta.com`)
4. Siga as instruções para apontar o DNS

### Apontar DNS:
1. Vá para seu provedor de domínio
2. Procure por **DNS Settings** ou **Domain Settings**
3. Adicione um **CNAME record**:
   ```
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Ou adicione **A record**:
   ```
   Type: A
   Value: 76.76.19.0
   ```

5. Aguarde propagação (até 24h)

## 6️⃣ Testar Aplicação

1. Acesse seu app em **https://seu-projeto.vercel.app** (ou domínio customizado)
2. Você deve ver:
   - ✅ Landing page carregando
   - ✅ Botão "Entrar" funcionando
   - ✅ Redirecionamento para Login

3. Teste o fluxo:
   - Crie uma conta
   - Faça login
   - Vá para Plans
   - Teste criar um fechamento

## 7️⃣ Troubleshooting

### Erro: "Cannot find module"
- Certifique-se que rodou `npm install` ou `bun install` antes de fazer push
- Verifique se todos os imports estão corretos

### Erro: "VITE_API_URL not found"
- Verifique se as variáveis foram adicionadas em **Settings → Environment Variables**
- Aguarde o novo build (clique **Deployments** → **Redeploy**)

### App lentão ou não carrega
- Vercel pode estar otimizando, aguarde 5 minutos
- Limpe cache do navegador (Ctrl+Shift+Delete)
- Tente em modo incógnito

### Stripe não funciona
- Verifique se `VITE_STRIPE_PUBLIC_KEY` está correto
- Verifique se `VITE_API_URL` está apontando para o backend correto
- Teste abrir console (F12) e verificar erros

## 8️⃣ Auto Deploy

Após a primeira vez, qualquer push para `main` fará deploy automático! 🚀

```bash
git add .
git commit -m "Nova feature"
git push origin main
# Vercel fará deploy automaticamente em 2-3 minutos
```

## ✅ Pronto!

Você tem:
- ✅ Frontend rodando no Vercel
- ✅ Conectado ao backend Railway
- ✅ Integrado com Stripe
- ✅ Domínio customizado (opcional)
- ✅ Auto deploy funcionando

**Próximo passo**: Testar pagamento completo!
