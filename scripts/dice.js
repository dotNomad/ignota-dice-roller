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
        let dIndex = this.command.indexOf('d');
        this.numberOfDice = Number(this.command.slice(0, dIndex));
        this.sidesOnDice = Number(this.command.slice(dIndex + 1));
    }

    rollPool() {
        this.sum = 0;
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

    let dicePoolResult = new DicePool(dicePoolCommand);
    addResultElement(dicePoolResult);
}

function resetDicePoolInput() {
    dicePoolInput.value = '';
    dicePoolInput.focus();
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
