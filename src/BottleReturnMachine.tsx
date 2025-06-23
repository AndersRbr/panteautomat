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
      <div className="machine">
        <Receipt lastPant={lastPant} onBack={backToMachine} />
      </div>
    );
  }

  return (
    <div className="machine">
      <Banner />
      <Screen bottles={bottles} cans={cans} pantSum={pantSum} />
      {isLoading && <ProgressBar />}
      <Buttons />
    </div>
  );
}
