import React, { Component } from 'react';
import { DicePoolForm } from './components/DicePoolForm/DicePoolForm';
import { ResultCard } from './components/ResultCard/ResultCard'

import './Ignota.css';

class Ignota extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] }
  }

  addResultCard = (result) => {
    const results = [result, ...this.state.results];
    this.setState({ results: results });
  }

  render() {
    return (
      <div>
        <h1 className="page-title">IGNOTA</h1>
        <DicePoolForm addResultCard={this.addResultCard}/>
        {this.state.results.map((result, index) => (
          <ResultCard
            command={result.command}
            dice={result.dice}
            key={index}
            result={result.sum}
          />
        ))}
      </div>
    );
  }
}

export default Ignota;
