import { createContext, ReactNode, useContext, useState } from "react";

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

const PantContext = createContext<PantContextType | undefined>(undefined);

export const usePant = (): PantContextType => {
  const context = useContext(PantContext);
  if (!context) {
    throw new Error("usePant must be used within PantProvider");
  }
  return context;
};

export const PantProvider = ({ children }: { children: ReactNode }) => {
  const pantVerdier = { flaske: 3, boks: 2 };

  const [pantSum, setPantSum] = useState<number>(0);
  const [flasker, setFlasker] = useState<number>(0);
  const [bokser, setBokser] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visKvittering, setVisKvittering] = useState<boolean>(false);
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
        setFlasker((prev) => prev + 3);
        setPantSum((prev) => prev + pantVerdier.flaske);
      } else {
        setBokser((prev) => prev + 2);
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
};
