import React from "react";
import "../Receipt/Receipt.css";

interface ReceiptProps {
  lastPant: {
    bottles: number;
    cans: number;
    sum: number;
    timestamp?: string;
  };
  onBack: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ lastPant, onBack }) => {
  return (
    <section className="receipt" aria-label="Kvittering for pant">
      <header>
        <h2>🧾 Kvittering</h2>
      </header>
      <p>{lastPant.bottles + lastPant.cans} enheter</p>
      <p>Totalt: {lastPant.sum.toFixed(2)} kr</p>
      <p>
        Dato:{" "}
        {lastPant.timestamp
          ? new Date(lastPant.timestamp).toLocaleString("no-NO")
          : "Ingen dato tilgjengelig"}
      </p>
      <button className="btn btn-primary" onClick={onBack}>
        Tilbake til automat
      </button>
    </section>
  );
};

export default Receipt;
