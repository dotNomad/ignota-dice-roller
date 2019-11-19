const dicePoolReg = /^([1-9][0-9]*)(d)([1-9][0-9]*)([+-]\d+)?$/i;

export class Die {
  constructor(sides) {
    this.sides = sides;
    this.roll();
  }

  roll() {
    this.result = Math.floor(Math.random() * this.sides) + 1;
  }
}

export class DicePool {
  constructor(command) {
    this.command = command;
    this.parseCommand();
    this.rollPool();
  }

  parseCommand() {
    let result = dicePoolReg.exec(this.command);

    this.numberOfDice = Number(result[1]);
    this.sidesOnDice = Number(result[3]);
    this.modifier = Number(result[4]) || 0;
  }

  rollPool() {
    this.sum = this.modifier;
    this.dice = [];

    for (let i=0; i<this.numberOfDice; i++) {
      this.addDie();
    }
  }

  addDie() {
    let die = new Die(this.sidesOnDice);
    this.sum += die.result;
    this.dice.push(die);
  }
}

export function validateDicePoolInput(command) {
  return dicePoolReg.test(command);
}
