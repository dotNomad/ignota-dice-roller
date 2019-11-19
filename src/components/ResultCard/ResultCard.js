import React from 'react';

import './ResultCard.css';

export function ResultCard(props) {
  return (
    <div className="result-card">
      <div className="result-card-content">
        <h3 className="result-card-title">{props.result}</h3>
        <div className="result-card-detail">
          <p className="result-card-dice">dice: {props.dice.map(die => (
            `${die.result}`
          )).join(', ')}</p>
          <p className="result-card-command">command: {props.command}</p>
        </div>
      </div>
    </div>
  );
}
