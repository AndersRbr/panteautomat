import React from "react";
import "../styles/automat.css";

const ProgressBar: React.FC = () => {
  return (
    <div className="progress-bar">
      <span>Vent litt...</span>
      <div className="track">
        <div className="filler" />
      </div>
    </div>
  );
};

export default ProgressBar;
