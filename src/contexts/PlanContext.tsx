import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserPlan, isUserPremium, recordClosing } from "@/lib/user-service";

interface PlanContextType {
  isPremium: boolean;
  closingsToday: number;
  maxClosingsToday: number;
  canClose: boolean;
  recordClosing: () => Promise<boolean>;
  loading: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [closingsToday, setClosingsToday] = useState(0);
  const [loading, setLoading] = useState(true);

  const maxClosingsToday = isPremium ? Infinity : (parseInt(import.meta.env.VITE_FREE_CLOSINGS_PER_DAY) || 1);
  const canClose = isPremium || closingsToday < maxClosingsToday;

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadPlan = async () => {
      try {
        const premium = await isUserPremium(user.uid);
        const plan = await getUserPlan(user.uid);
        setIsPremium(premium);
        setClosingsToday(plan.closingsToday);
      } catch (error) {
        console.error("Erro ao carregar plano:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlan();
  }, [user]);

  const handleRecordClosing = async (): Promise<boolean> => {
    if (!user) return false;

    try {
      const success = await recordClosing(user.uid);
      if (success) {
        setClosingsToday((prev) => prev + 1);
      }
      return success;
    } catch (error) {
      console.error("Erro ao registrar fechamento:", error);
      return false;
    }
  };

  return (
    <PlanContext.Provider
      value={{
        isPremium,
        closingsToday,
        maxClosingsToday,
        canClose,
        recordClosing: handleRecordClosing,
        loading,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan deve ser usado dentro de PlanProvider");
  }
  return context;
};
