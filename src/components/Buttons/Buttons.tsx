import React from "react";
import { usePant } from "../../context/PantContext";
import "../Buttons/Buttons.css";

const Buttons: React.FC = () => {
  const { isLoading, pantSum, addPant, fetchReceipt } = usePant();

  const handleSubmit = async () => {
    await fetchReceipt();
  };

  return (
    <div className="buttons">
      <button
        className="btn btn-primary"
        onClick={() => addPant("can")}
        disabled={isLoading}
        aria-label="Legg til boks"
      >
        Boks
      </button>
      <button
        className="btn btn-primary"
        onClick={() => addPant("bottle")}
        disabled={isLoading}
        aria-label="Legg til flaske"
      >
        Flaske
      </button>
      <button
        className="btn btn-success"
        onClick={handleSubmit}
        disabled={isLoading || pantSum === 0}
        aria-label={
          pantSum === 0
            ? "Utbetal knapp deaktivert, ingen pant lagt til"
            : "Utbetal"
        }
      >
        Utbetal
      </button>
    </div>
  );
};

export default Buttons;
