import React from 'react';
import { DicePool, validateDicePoolInput } from '../../utils/dice';

import './DicePoolForm.css';

export class DicePoolForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dicePool: '', error: false };
  }

  handleChange = (event) => {
    this.setState({ dicePool: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (validateDicePoolInput(this.state.dicePool)) {
      this.setState({ dicePool: '', error: false });
      this.addResultCard(new DicePool(this.state.dicePool));
    } else {
      this.setState({ error: true });
    }
  }

  addResultCard = (result) => {
    this.props.addResultCard(result);
  }

  render() {
    return (
      <form id="dice-pool-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          id="dice-pool"
          name="roll"
          aria-label="Roll"
          value={this.state.dicePool}
          onChange={this.handleChange}
        />
        {this.state.error &&
          <div className="dice-pool-error">
            <div className="dice-pool-error-content">
              <p>Enter a valid dice pool</p>
              <p>For example, 1d20+3</p>
            </div>
          </div>
        }
      </form>
    );
  };
}
