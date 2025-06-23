import "../src/PanteAutomat.css";
import Banner from "./components/Banner/Banner";
import Knapper from "./components/Knapper/Knapper";
import Kvittering from "./components/Kvittering/Kvittering";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Skjerm from "./components/Skjerm/Skjerm";
import { usePant } from "./context/PantContext";

export default function PanteAutomat() {
  const {
    visKvittering,
    sistePant,
    tilbakeTilAutomat,
    flasker,
    bokser,
    pantSum,
    isLoading,
  } = usePant();

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
      <Knapper />
    </div>
  );
}
