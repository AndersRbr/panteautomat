import React from "react";
import { usePant } from "../../context/PantContext";
import "../Knapper/Knapper.css";

const Knapper: React.FC = () => {
  const { isLoading, pantSum, leggTilPant, hentKvittering } = usePant();

  return (
    <div className="knapper">
      <button
        className="btn btn-primary"
        onClick={() => leggTilPant("boks")}
        disabled={isLoading}
      >
        Boks
      </button>
      <button
        className="btn btn-primary"
        onClick={() => leggTilPant("flaske")}
        disabled={isLoading}
      >
        Flaske
      </button>
      <button
        className="btn btn-success"
        onClick={hentKvittering}
        disabled={isLoading || pantSum === 0}
      >
        Ferdig (hent kvittering)
      </button>
    </div>
  );
};

export default Knapper;
