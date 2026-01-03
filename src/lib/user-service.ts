import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

interface UserPlan {
  plan: "free" | "premium";
  createdAt: Date;
  trialEndsAt?: Date;
  subscriptionId?: string;
  lastClosingDate?: string;
  closingsToday: number;
}

export const initializeUser = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const now = new Date();
    const trialEndsAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 dias

    await setDoc(userRef, {
      plan: "free",
      createdAt: now,
      trialEndsAt: trialEndsAt,
      lastClosingDate: null,
      closingsToday: 0,
    });

    return {
      plan: "free",
      createdAt: now,
      trialEndsAt: trialEndsAt,
      closingsToday: 0,
    };
  }

  return userSnap.data() as UserPlan;
};

export const getUserPlan = async (userId: string): Promise<UserPlan> => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const initialized = await initializeUser(userId);
    return {
      plan: initialized.plan as "free" | "premium",
      createdAt: initialized.createdAt,
      trialEndsAt: initialized.trialEndsAt,
      closingsToday: initialized.closingsToday,
    };
  }

  const data = userSnap.data() as any;
  return {
    plan: data.plan,
    createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
    trialEndsAt: data.trialEndsAt?.toDate?.() || (data.trialEndsAt ? new Date(data.trialEndsAt) : undefined),
    subscriptionId: data.subscriptionId,
    lastClosingDate: data.lastClosingDate,
    closingsToday: data.closingsToday || 0,
  };
};

export const recordClosing = async (userId: string): Promise<boolean> => {
  const userRef = doc(db, "users", userId);
  const userPlan = await getUserPlan(userId);
  const today = new Date().toISOString().split("T")[0];

  // Reset closings se for um novo dia
  if (userPlan.lastClosingDate !== today) {
    await updateDoc(userRef, {
      closingsToday: 1,
      lastClosingDate: today,
    });
    return true;
  }

  // Verificar limite
  const now = new Date();
  const isPremium = userPlan.plan === "premium" || 
    (userPlan.trialEndsAt && now < userPlan.trialEndsAt);
  const maxClosings = isPremium ? Infinity : (parseInt(import.meta.env.VITE_FREE_CLOSINGS_PER_DAY) || 1);

  if (userPlan.closingsToday >= maxClosings) {
    return false;
  }

  await updateDoc(userRef, {
    closingsToday: userPlan.closingsToday + 1,
  });

  return true;
};

export const isUserPremium = async (userId: string): Promise<boolean> => {
  const plan = await getUserPlan(userId);
  const now = new Date();
  
  if (plan.plan === "premium") {
    return true;
  }

  if (plan.trialEndsAt && now < plan.trialEndsAt) {
    return true;
  }

  return false;
};

export const upgradeUserToPremium = async (
  userId: string,
  subscriptionId: string
): Promise<void> => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    plan: "premium",
    subscriptionId: subscriptionId,
  });
};
