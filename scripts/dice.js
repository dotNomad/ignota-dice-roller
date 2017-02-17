class Die {
    constructor(sides) {
        this.sides = sides;
        this.roll();
    }

    roll() {
        this.result = Math.floor(Math.random() * this.sides) + 1;
    }
}

class DicePool {
    constructor(command) {
        this.command = command;
        this.parseCommand();
        this.rollPool();
    }

    parseCommand() {
        let dicePoolReg = /^([1-9][0-9]*)(d)([1-9][0-9]*)([\+-]\d+)?$/i;
        let result = dicePoolReg.exec(this.command);

        this.numberOfDice = Number(result[1]);
        this.sidesOnDice = Number(result[3]);
        this.modifier = Number(result[4]);
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


let dicePoolInput = document.querySelector('#dice-pool');

let rollButton = document.querySelector('#roll');
rollButton.addEventListener('click', rollDicePool);

let results = document.querySelector('#results');


function rollDicePool() {
    let dicePoolCommand = dicePoolInput.value;
    resetDicePoolInput();

    if (validateDicePoolInput(dicePoolCommand)) {
        let dicePoolResult = new DicePool(dicePoolCommand);
        addResultElement(dicePoolResult);
    } else {

    }
}

function resetDicePoolInput() {
    dicePoolInput.value = '';
    dicePoolInput.focus();
}

function validateDicePoolInput(command) {
    let dicePoolReg = /^([1-9][0-9]*)(d)([1-9][0-9]*)([\+-]\d+)?$/i;
    return dicePoolReg.test(command);
}

function addResultElement(dicePool) {
    let resultCard = document.createElement('div');
    resultCard.className = 'result-card';

    let resultCardContent = document.createElement('div');
    resultCardContent.className = 'result-card-content';

    let newResultCardTitle = document.createElement('h3');
    newResultCardTitle.className = 'result-card-title';
    newResultCardTitle.appendChild(document.createTextNode(dicePool.sum));

    let newResultCardDetail = document.createElement('div');
    newResultCardDetail.className = 'result-card-detail'

    let newResultCardDice = document.createElement('p');
    newResultCardDice.className = 'result-card-dice';
    newResultCardDice.appendChild(document.createTextNode(
        'dice: ' + dicePool.dice.map((die) => die.result).join(', ')));

    let newResultCardCommand = document.createElement('p');
    newResultCardCommand.className = 'result-card-command';
    newResultCardCommand.appendChild(document.createTextNode(
        'command: ' + dicePool.command));

    newResultCardDetail.appendChild(newResultCardDice);
    newResultCardDetail.appendChild(newResultCardCommand);

    resultCardContent.appendChild(newResultCardTitle);
    resultCardContent.appendChild(newResultCardDetail);

    resultCard.appendChild(resultCardContent);

    results.insertBefore(resultCard, results.firstChild);
}
