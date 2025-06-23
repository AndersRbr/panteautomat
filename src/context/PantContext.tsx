import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type PantType = "flaske" | "boks";

interface PantStatus {
  flasker: number;
  bokser: number;
  sum: number;
}

interface PantContextType {
  pantSum: number;
  flasker: number;
  bokser: number;
  isLoading: boolean;
  visKvittering: boolean;
  sistePant: PantStatus;
  leggTilPant: (type: PantType) => void;
  hentKvittering: () => void;
  tilbakeTilAutomat: () => void;
}

const pantVerdier = {
  flaske: 3,
  boks: 2,
};

const PantContext = createContext<PantContextType | undefined>(undefined);

interface PantProviderProps {
  children: ReactNode;
}

export function PantProvider({ children }: PantProviderProps) {
  const [pantSum, setPantSum] = useState(0);
  const [flasker, setFlasker] = useState(0);
  const [bokser, setBokser] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [visKvittering, setVisKvittering] = useState(false);
  const [sistePant, setSistePant] = useState<PantStatus>({
    flasker: 0,
    bokser: 0,
    sum: 0,
  });

  const leggTilPant = (type: PantType) => {
    if (visKvittering) return;

    setIsLoading(true);

    setTimeout(() => {
      if (type === "flaske") {
        setFlasker((prev) => prev + 1);
        setPantSum((prev) => prev + pantVerdier.flaske);
      } else {
        setBokser((prev) => prev + 1);
        setPantSum((prev) => prev + pantVerdier.boks);
      }

      setIsLoading(false);
    }, 500);
  };

  const hentKvittering = () => {
    setSistePant({ flasker, bokser, sum: pantSum });
    setFlasker(0);
    setBokser(0);
    setPantSum(0);
    setVisKvittering(true);
  };

  const tilbakeTilAutomat = () => setVisKvittering(false);

  return (
    <PantContext.Provider
      value={{
        pantSum,
        flasker,
        bokser,
        isLoading,
        visKvittering,
        sistePant,
        leggTilPant,
        hentKvittering,
        tilbakeTilAutomat,
      }}
    >
      {children}
    </PantContext.Provider>
  );
}

export function usePant() {
  const context = useContext(PantContext);
  if (!context) {
    throw new Error("usePant må brukes innenfor en PantProvider");
  }
  return context;
}
