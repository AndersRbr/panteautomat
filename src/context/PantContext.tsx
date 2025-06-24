import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { getLastPantEntry, savePantData } from "../api/pantService";

type PantType = "bottle" | "can";

interface PantStatus {
  bottleCount: number;
  cansCount: number;
  sum: number;
  timestamp?: string;
}

interface PantContextType {
  pantSum: number;
  bottleCount: number;
  cansCount: number;
  isLoading: boolean;
  showReceipt: boolean;
  lastPant: PantStatus;
  addPant: (type: PantType) => void;
  fetchReceipt: () => void;
  backToMachine: () => void;
}

const pantValues = {
  bottle: 3,
  can: 2,
};

const PantContext = createContext<PantContextType | undefined>(undefined);

interface PantProviderProps {
  children: ReactNode;
}

export function PantProvider({ children }: PantProviderProps) {
  const [pantSum, setPantSum] = useState(0);
  const [bottleCount, setBottleCount] = useState(0);
  const [cansCount, setCansCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastPant, setLastPant] = useState<PantStatus>({
    bottleCount: 0,
    cansCount: 0,
    sum: 0,
    timestamp: "",
  });

  const addPant = (type: PantType) => {
    if (showReceipt) return;

    setIsLoading(true);

    const processingTime = type === "bottle" ? 1000 : 500;

    setTimeout(() => {
      if (type === "bottle") {
        setBottleCount((prev) => prev + 1);
        setPantSum((prev) => prev + pantValues.bottle);
      } else {
        setCansCount((prev) => prev + 1);
        setPantSum((prev) => prev + pantValues.can);
      }

      setIsLoading(false);
    }, processingTime);
  };

  const fetchReceipt = async () => {
    try {
      await savePantData(bottleCount, cansCount, pantSum);
      const saved = await getLastPantEntry();

      if (saved) {
        setLastPant({
          bottleCount: saved.bottleCount,
          cansCount: saved.cansCount,
          sum: saved.totalKr ?? saved.total,
          timestamp: saved.timestamp?.toDate().toISOString(),
        });
      }

      setBottleCount(0);
      setCansCount(0);
      setPantSum(0);
      setShowReceipt(true);
    } catch (error) {
      console.error("Kunne ikke lagre eller hente pantdata:", error);
    }
  };

  const backToMachine = () => setShowReceipt(false);

  return (
    <PantContext.Provider
      value={{
        pantSum,
        bottleCount,
        cansCount,
        isLoading,
        showReceipt,
        lastPant,
        addPant,
        fetchReceipt,
        backToMachine,
      }}
    >
      {children}
    </PantContext.Provider>
  );
}

export function usePant() {
  const context = useContext(PantContext);
  if (!context) {
    throw new Error("usePant must be used within a PantProvider");
  }
  return context;
}
