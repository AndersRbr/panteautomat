import React from "react";
import "./Knapper.css";

interface KnapperProps {
  isLoading: boolean;
  pantSum: number;
  leggTilPant: (type: "flaske" | "boks") => void;
  hentKvittering: () => void;
}

const Knapper: React.FC<KnapperProps> = ({
  isLoading,
  pantSum,
  leggTilPant,
  hentKvittering,
}) => {
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
