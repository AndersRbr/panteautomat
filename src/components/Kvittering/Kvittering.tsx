import React from "react";
import "../styles/automat.css";

interface KvitteringProps {
  sistePant: {
    flasker: number;
    bokser: number;
    sum: number;
  };
  onBack: () => void;
}

const Kvittering: React.FC<KvitteringProps> = ({ sistePant, onBack }) => {
  return (
    <div className="kvittering">
      <h4>🧾 Kvittering</h4>
      <p>{sistePant.flasker + sistePant.bokser} enheter</p>
      <p>Totalt: {sistePant.sum.toFixed(2)} kr</p>
      <button className="btn btn-primary" onClick={onBack}>
        Tilbake til automat
      </button>
    </div>
  );
};

export default Kvittering;
