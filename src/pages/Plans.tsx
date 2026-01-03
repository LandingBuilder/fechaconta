import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan } from "@/contexts/PlanContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import Header from "@/components/Header";
import ErrorMessage from "@/components/ErrorMessage";
import { createCheckoutSession } from "@/lib/api";

const monthlyPrice = parseInt(import.meta.env.VITE_MONTHLY_PRICE) || 30;
const freeTrialDays = parseInt(import.meta.env.VITE_FREE_TRIAL_DAYS) || 7;

export const Plans = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { isPremium, loading } = usePlan();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Verificar se voltou do Stripe checkout com sucesso
    if (searchParams.get("success") === "true") {
      setSuccess(true);
      setTimeout(() => navigate("/"), 3000);
    }
    if (searchParams.get("canceled") === "true") {
      setError("Checkout cancelado. Tente novamente.");
    }
  }, [searchParams, navigate]);

  const handleUpgrade = async () => {
    if (!user) return;

    setError(null);
    setIsProcessing(true);

    try {
      // Obter dados do usuário do backend
      const userDoc = await import("@/lib/api").then(m => m.getUserData());
      
      if (!userDoc.stripeCustomerId) {
        setError("Erro ao processar pagamento. Tente novamente.");
        return;
      }

      // Criar sessão de checkout
      const { sessionUrl } = await createCheckoutSession(
        userDoc.stripeCustomerId,
        import.meta.env.VITE_STRIPE_PRICE_ID
      );

      // Redirecionar para Stripe Checkout
      if (sessionUrl) {
        window.location.href = sessionUrl;
      }
    } catch (err: any) {
      console.error("Erro ao processar upgrade:", err);
      setError(err.message || "Erro ao processar upgrade. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Carregando...</div>;
  }

  if (success) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-2xl font-bold">Parabéns!</h2>
              <p className="text-muted-foreground">
                Seu upgrade para Premium foi realizado com sucesso!
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecionando em instantes...
              </p>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
        {error && <div className="mb-6"><ErrorMessage message={error} /></div>}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Escolha seu Plano
          </h1>
          <p className="mt-2 text-muted-foreground">
            Comece grátis, upgrade quando precisar
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
          {/* Free Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-2xl">Gratuito</CardTitle>
              <p className="text-sm text-muted-foreground">
                Perfeito para começar
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>1 fechamento por dia</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Impressão térmica</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Cálculos precisos</span>
                </div>
                <div className="flex items-center gap-3">
                  <X className="h-5 w-5 text-red-600" />
                  <span className="text-muted-foreground">
                    Fechamentos ilimitados
                  </span>
                </div>
              </div>

              {!isPremium ? (
                <Button variant="outline" className="w-full" disabled>
                  Você está usando este plano
                </Button>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  Upgrade ativo
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-2 border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              MAIS POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Premium</CardTitle>
              <p className="text-sm text-muted-foreground">
                Para crescer sem limites
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  R$ {monthlyPrice}
                  <span className="text-lg text-muted-foreground">/mês</span>
                </div>
                <p className="text-sm text-green-600 font-semibold">
                  ✨ {freeTrialDays} dias grátis
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Fechamentos ilimitados</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Impressão térmica</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Cálculos precisos</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Suporte prioritário</span>
                </div>
              </div>

              {isPremium ? (
                <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
                  ✓ Você tem acesso premium
                </Button>
              ) : (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleUpgrade}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processando..." : `Iniciar ${freeTrialDays} dias grátis`}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Precisa de ajuda? Entre em contato com{" "}
            <a
              href={`mailto:${import.meta.env.VITE_SUPPORT_EMAIL}`}
              className="font-semibold text-blue-600 hover:underline"
            >
              {import.meta.env.VITE_SUPPORT_EMAIL}
            </a>
          </p>
        </div>
        </div>
      </div>
    </>
  );
};

export default Plans;
