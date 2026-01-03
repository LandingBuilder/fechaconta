import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore";

export interface ClosingRecord {
  id: string;
  userId: string;
  date: Date;
  categories: Record<string, number>;
  total: number;
  createdAt: Date;
}

/**
 * Salva um fechamento de caixa no histórico
 */
export const saveClosingRecord = async (
  userId: string,
  categories: Record<string, number>,
  total: number
): Promise<string> => {
  try {
    const closingsRef = collection(db, "closings");
    const docRef = await addDoc(closingsRef, {
      userId,
      date: new Date(),
      categories,
      total,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Erro ao salvar fechamento:", error);
    throw error;
  }
};

/**
 * Obtém o histórico de fechamentos do usuário
 */
export const getClosingHistory = async (userId: string): Promise<ClosingRecord[]> => {
  try {
    const closingsRef = collection(db, "closings");
    const q = query(
      closingsRef,
      where("userId", "==", userId),
      orderBy("date", "desc")
    );
    
    const snapshot = await getDocs(q);
    const records: ClosingRecord[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      records.push({
        id: doc.id,
        userId: data.userId,
        date: data.date?.toDate?.() || new Date(data.date),
        categories: data.categories || {},
        total: data.total || 0,
        createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
      });
    });

    return records;
  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
    throw error;
  }
};

/**
 * Obtém fechamentos do último período (dias)
 */
export const getClosingsByPeriod = async (
  userId: string,
  days: number = 30
): Promise<ClosingRecord[]> => {
  try {
    const closingsRef = collection(db, "closings");
    const since = new Date();
    since.setDate(since.getDate() - days);

    const q = query(
      closingsRef,
      where("userId", "==", userId),
      where("date", ">=", since),
      orderBy("date", "desc")
    );

    const snapshot = await getDocs(q);
    const records: ClosingRecord[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      records.push({
        id: doc.id,
        userId: data.userId,
        date: data.date?.toDate?.() || new Date(data.date),
        categories: data.categories || {},
        total: data.total || 0,
        createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
      });
    });

    return records;
  } catch (error) {
    console.error("Erro ao carregar histórico do período:", error);
    throw error;
  }
};
