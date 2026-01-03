import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useValidation } from "@/hooks/useValidation";
import ErrorMessage from "@/components/ErrorMessage";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { validateEmail, validatePassword } = useValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validações
    if (!email.trim()) {
      setError("Por favor, insira seu email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor, insira um email válido");
      return;
    }

    if (!password) {
      setError("Por favor, insira sua senha");
      return;
    }

    if (isSignup && !validatePassword(password)) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (err: any) {
      const errorMessage = err.message || "Erro ao autenticar";
      
      // Tratamento de mensagens de erro do Firebase
      if (errorMessage.includes("email-already-in-use")) {
        setError("Este email já está registrado");
      } else if (errorMessage.includes("user-not-found")) {
        setError("Email ou senha incorretos");
      } else if (errorMessage.includes("wrong-password")) {
        setError("Email ou senha incorretos");
      } else if (errorMessage.includes("too-many-requests")) {
        setError("Muitas tentativas de login. Tente novamente mais tarde");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="text-4xl mb-4">💰</div>
          <CardTitle className="text-2xl">Fecha-Caixa</CardTitle>
          <p className="text-sm text-muted-foreground">
            {isSignup ? "Criar nova conta" : "Fazer login"}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <ErrorMessage message={error} />}

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Carregando..." : isSignup ? "Criar Conta" : "Entrar"}
            </Button>
          </form>

          <div className="text-center text-sm">
            {isSignup ? (
              <>
                Já tem conta?{" "}
                <button
                  onClick={() => setIsSignup(false)}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Fazer login
                </button>
              </>
            ) : (
              <>
                Não tem conta?{" "}
                <button
                  onClick={() => setIsSignup(true)}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Criar agora
                </button>
              </>
            )}
          </div>

          <div className="rounded-lg bg-blue-50 p-3 text-xs text-blue-700">
            <strong>Teste grátis:</strong> Primeiros 7 dias com acesso premium!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
