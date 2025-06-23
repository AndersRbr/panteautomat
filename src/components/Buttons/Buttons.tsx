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
      >
        Boks
      </button>
      <button
        className="btn btn-primary"
        onClick={() => addPant("bottle")}
        disabled={isLoading}
      >
        Flaske
      </button>
      <button
        className="btn btn-success"
        onClick={handleSubmit}
        disabled={isLoading || pantSum === 0}
      >
        Utbetal
      </button>
    </div>
  );
};

export default Buttons;
