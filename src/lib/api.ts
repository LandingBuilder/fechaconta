import { getAuth } from "firebase/auth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Obter token Firebase do usuário logado
 */
const getAuthToken = async (): Promise<string> => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  return await user.getIdToken();
};

/**
 * Fazer requisição para o backend com autenticação
 */
const apiRequest = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  body?: any
) => {
  const token = await getAuthToken();

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro na requisição");
  }

  return response.json();
};

/**
 * Criar sessão de checkout no Stripe
 */
export const createCheckoutSession = async (
  customerId: string,
  priceId: string
) => {
  const token = await getAuthToken();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  const response = await fetch(`${API_BASE_URL}/stripe/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId,
      customerId,
      priceId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao criar checkout");
  }

  return response.json();
};

/**
 * Inicializar usuário
 */
export const initializeUser = async () => {
  return apiRequest("POST", "/users/init");
};

/**
 * Obter dados do usuário
 */
export const getUserData = async () => {
  return apiRequest("GET", "/users/me");
};

/**
 * Cancelar subscrição
 */
export const cancelSubscription = async () => {
  return apiRequest("POST", "/users/cancel-subscription");
};

/**
 * Salvar fechamento
 */
export const saveClosing = async (categories: Record<string, number>, total: number) => {
  return apiRequest("POST", "/closings", {
    categories,
    total,
  });
};

/**
 * Obter histórico de fechamentos
 */
export const getClosingHistory = async (limit: number = 100) => {
  return apiRequest("GET", `/closings?limit=${limit}`);
};

/**
 * Obter um fechamento específico
 */
export const getClosing = async (id: string) => {
  return apiRequest("GET", `/closings/${id}`);
};

/**
 * Deletar um fechamento
 */
export const deleteClosing = async (id: string) => {
  return apiRequest("DELETE", `/closings/${id}`);
};
