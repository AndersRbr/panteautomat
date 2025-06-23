import { useState } from "react";
import "../src/PanteAutomat.css";
import Banner from "./components/Banner/Banner";
import Knapper from "./components/Knapper/Knapper";
import Kvittering from "./components/Kvittering/Kvittering";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Skjerm from "./components/Skjerm/Skjerm";

interface PantStatus {
  flasker: number;
  bokser: number;
  sum: number;
}

const pantVerdier = { flaske: 3, boks: 2 };

export default function PanteAutomat() {
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

  const leggTilPant = (type: "flaske" | "boks") => {
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

  if (visKvittering) {
    return (
      <div className="automat">
        <Kvittering sistePant={sistePant} onBack={tilbakeTilAutomat} />
      </div>
    );
  }

  return (
    <div className="automat">
      <Banner />
      <Skjerm flasker={flasker} bokser={bokser} pantSum={pantSum} />
      {isLoading && <ProgressBar />}
      <Knapper
        isLoading={isLoading}
        pantSum={pantSum}
        leggTilPant={leggTilPant}
        hentKvittering={hentKvittering}
      />
    </div>
  );
}
