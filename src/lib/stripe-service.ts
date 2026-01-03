import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

/**
 * Cria uma sessão de checkout no backend e redireciona para Stripe
 */
export const createCheckoutSession = async (userId: string, email: string) => {
  try {
    // Em um ambiente de produção, você chamaria um endpoint do seu servidor
    // que criaria a sessão no Stripe e retornaria a URL de checkout
    
    // Este é um placeholder - você precisa de um servidor para fazer isso com segurança
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        email,
        priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar sessão de checkout");
    }

    const { sessionUrl } = await response.json();
    
    // Redirecionar para Stripe Checkout
    if (sessionUrl) {
      window.location.href = sessionUrl;
    }
  } catch (error) {
    console.error("Erro ao processar pagamento:", error);
    throw error;
  }
};

/**
 * Atualiza o status do usuário para premium após pagamento bem-sucedido
 */
export const upgradeToPremium = async (userId: string, subscriptionId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      plan: "premium",
      subscriptionId,
      upgradedAt: new Date(),
    });
  } catch (error) {
    console.error("Erro ao fazer upgrade:", error);
    throw error;
  }
};

/**
 * Processa o webhook de pagamento bem-sucedido do Stripe
 */
export const handleStripeWebhook = async (event: any) => {
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      // Aqui você faria a lógica de atualizar o banco de dados
      console.log("Checkout completo:", session);
      break;
    case "customer.subscription.updated":
      const subscription = event.data.object;
      console.log("Inscrição atualizada:", subscription);
      break;
    case "customer.subscription.deleted":
      const deletedSubscription = event.data.object;
      console.log("Inscrição cancelada:", deletedSubscription);
      break;
  }
};
