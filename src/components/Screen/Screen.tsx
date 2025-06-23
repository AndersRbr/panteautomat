import React from "react";
import sodaCanIcon from "../../assets/soda-can-icon.png";
import sodaDrinkIcon from "../../assets/soda-drink-icon.png";
import "../Screen/Screen.css";

interface ScreenProps {
  bottles: number;
  cans: number;
  pantSum: number;
}

const Screen: React.FC<ScreenProps> = ({ bottles, cans, pantSum }) => {
  return (
    <section className="screen" aria-labelledby="screen-title">
      <p>Registrert: {bottles + cans} enheter</p>
      <p>Sum: {pantSum.toFixed(2)} kr</p>

      <div className="item-display">
        <div className="item" aria-label={`${cans} bokser registrert`}>
          <img src={sodaCanIcon} alt="Boks" />
          <div className="amount">{cans}</div>
          <div>Bokser</div>
        </div>
        <div className="item" aria-label={`${bottles} flasker registrert`}>
          <img src={sodaDrinkIcon} alt="Flaske" />
          <div className="amount">{bottles}</div>
          <div>Flasker</div>
        </div>
      </div>
    </section>
  );
};

export default Screen;
