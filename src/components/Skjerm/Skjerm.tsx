import React from "react";
import sodaCanIcon from "../../assets/soda-can-icon.png";
import sodaDrinkIcon from "../../assets/soda-drink-icon.png";
import "../Skjerm/Skjerm.css";

interface SkjermProps {
  flasker: number;
  bokser: number;
  pantSum: number;
}

const Skjerm: React.FC<SkjermProps> = ({ flasker, bokser, pantSum }) => {
  return (
    <div className="skjerm">
      <p>Registrert: {flasker + bokser} enheter</p>
      <p>Sum: {pantSum.toFixed(2)} kr</p>

      <div className="item-display">
        <div className="item">
          <img src={sodaCanIcon} alt="Boks" />
          <div className="amount">{bokser}</div>
          <div>Bokser</div>
        </div>
        <div className="item">
          <img src={sodaDrinkIcon} alt="Flaske" />
          <div className="amount">{flasker}</div>
          <div>Flasker</div>
        </div>
      </div>
    </div>
  );
};

export default Skjerm;
