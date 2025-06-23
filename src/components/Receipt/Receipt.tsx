import React from "react";
import "../Receipt/Receipt.css";

interface ReceiptProps {
  lastPant: {
    bottles: number;
    cans: number;
    sum: number;
  };
  onBack: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ lastPant, onBack }) => {
  return (
    <div className="receipt">
      <h2>🧾 Kvittering</h2>
      <p>{lastPant.bottles + lastPant.cans} enheter</p>
      <p>Totalt: {lastPant.sum.toFixed(2)} kr</p>
      <button className="btn btn-primary" onClick={onBack}>
        Tilbake til automat
      </button>
    </div>
  );
};

export default Receipt;
