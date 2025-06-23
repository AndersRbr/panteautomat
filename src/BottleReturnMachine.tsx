import "../src/BottleReturnMachine.css";
import Banner from "./components/Banner/Banner";
import Buttons from "./components/Buttons/Buttons";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Receipt from "./components/Receipt/Receipt";
import Screen from "./components/Screen/Screen";
import { usePant } from "./context/PantContext";

export default function BottleReturnMachine() {
  const {
    showReceipt,
    lastPant,
    backToMachine,
    bottles,
    cans,
    pantSum,
    isLoading,
  } = usePant();

  if (showReceipt) {
    return (
      <main className="machine" aria-label="Kvittering for pant">
        <Receipt lastPant={lastPant} onBack={backToMachine} />
      </main>
    );
  }

  return (
    <main className="machine" aria-label="Pantautomat">
      <header>
        <Banner />
      </header>

      <Screen bottles={bottles} cans={cans} pantSum={pantSum} />

      <div className="progress-bar-container">
        {isLoading && <ProgressBar />}
      </div>

      <section aria-label="Pant-handlinger">
        <Buttons />
      </section>
    </main>
  );
}
