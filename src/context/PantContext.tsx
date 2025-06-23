import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { getLastPantEntry, savePantData } from "../api/pantService";

type PantType = "bottle" | "can";

interface PantStatus {
  bottles: number;
  cans: number;
  sum: number;
  timestamp?: string;
}

interface PantContextType {
  pantSum: number;
  bottles: number;
  cans: number;
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
  const [bottles, setBottles] = useState(0);
  const [cans, setCans] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastPant, setLastPant] = useState<PantStatus>({
    bottles: 0,
    cans: 0,
    sum: 0,
    timestamp: "",
  });

  const addPant = (type: PantType) => {
    if (showReceipt) return;

    setIsLoading(true);

    setTimeout(() => {
      if (type === "bottle") {
        setBottles((prev) => prev + 1);
        setPantSum((prev) => prev + pantValues.bottle);
      } else {
        setCans((prev) => prev + 1);
        setPantSum((prev) => prev + pantValues.can);
      }

      setIsLoading(false);
    }, 500);
  };

  const fetchReceipt = async () => {
    try {
      await savePantData(bottles, cans, pantSum);
      const saved = await getLastPantEntry();

      if (saved) {
        setLastPant({
          bottles: saved.bottles,
          cans: saved.cans,
          sum: saved.totalKr ?? saved.total,
          timestamp: saved.timestamp?.toDate().toISOString(),
        });
      }

      setBottles(0);
      setCans(0);
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
        bottles,
        cans,
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
