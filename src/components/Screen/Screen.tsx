import React from "react";
import sodaCanIcon from "../../assets/soda-can-icon.png";
import sodaDrinkIcon from "../../assets/soda-drink-icon.png";
import "../Screen/Screen.css";

interface ScreenProps {
  bottleCount: number;
  cansCount: number;
  pantSum: number;
}

const Screen: React.FC<ScreenProps> = ({ bottleCount, cansCount, pantSum }) => {
  return (
    <section className="screen" aria-labelledby="screen-title">
      <p>Registrert: {bottleCount + cansCount} enheter</p>
      <p>Sum: {pantSum.toFixed(2)} kr</p>

      <div className="item-display">
        <div className="item" aria-label={`${cansCount} bokser registrert`}>
          <img src={sodaCanIcon} alt="Boks" />
          <div className="amount">{cansCount}</div>
          <div>Bokser</div>
        </div>
        <div className="item" aria-label={`${bottleCount} flasker registrert`}>
          <img src={sodaDrinkIcon} alt="Flaske" />
          <div className="amount">{bottleCount}</div>
          <div>Flasker</div>
        </div>
      </div>
    </section>
  );
};

export default Screen;
