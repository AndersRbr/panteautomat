import React from "react";
import "../Receipt/Receipt.css";

interface ReceiptProps {
  lastPant: {
    bottleCount: number;
    cansCount: number;
    sum: number;
    timestamp?: string;
  };
  onBack: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ lastPant, onBack }) => {
  return (
    <section className="receipt" aria-label="Kvittering for pant">
      <header>
        <h2>Kvittering</h2>
      </header>
      <p>
        Dato:{" "}
        {lastPant.timestamp
          ? new Date(lastPant.timestamp).toLocaleString("no-NO")
          : "Ingen dato tilgjengelig"}
      </p>
      <hr />
      <h3>Coop Mega</h3>
      <p>Waldemar Thranes gate 72</p>
      <hr />
      <p>{lastPant.bottleCount + lastPant.cansCount} enheter</p>
      <h4 aria-label={`Totalbeløp: ${lastPant.sum.toFixed(2)} kroner`}>
        Total: {lastPant.sum.toFixed(2)} kr
      </h4>

      <button className="btn btn-primary" onClick={onBack}>
        Tilbake til automat
      </button>
    </section>
  );
};

export default Receipt;
