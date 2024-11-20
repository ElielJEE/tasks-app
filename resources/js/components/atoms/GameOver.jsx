import React from "react";

const GameOver = ({ onExit, onContinue }) => {
  return (
    <div className="game-over">
      <div className="game-over-content">
        <h1>Game Over</h1>
        <div className="game-over-buttons">
          <button className="btn-exit" onClick={onExit}>
            Salir
          </button>
          <button className="btn-continue" onClick={onContinue}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
