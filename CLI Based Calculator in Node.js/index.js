
const crypto = require('crypto');

function generateRandomNumber(length) {
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
    return parseInt(randomBytes.toString('hex').slice(0, length), 16);
}

function calculate(operation, operands) {
    switch (operation) {
        case 'add':
            let ans = operands.reduce((acc, num) => {
               return acc + parseFloat(num);
            },0);
            return ans ;
        case 'sub':
            return operands.slice(1).reduce((acc, num) => acc - parseFloat(num), parseFloat(operands[0]));
        case 'mult':
            return operands.reduce((acc, num) => acc * parseFloat(num), 1);
        case 'divide':
            return operands.slice(1).reduce((acc, num) => acc / parseFloat(num), parseFloat(operands[0]));
        case 'sin':
            return Math.sin(parseFloat(operands[0]));
        case 'cos':
            return Math.cos(parseFloat(operands[0]));
        case 'tan':
            return Math.tan(parseFloat(operands[0]));
        case 'random':
            if (operands.length === 0) {
                return 'Provide length for random number generation.';
            }
            const length = parseInt(operands[0]);
            if (isNaN(length) || length <= 0) {
                return 'Invalid length for random number generation.';
            }
            return generateRandomNumber(length);
        default:
            return 'Invalid operation.';
    }
}

const [,, operation, ...operands] = process.argv;


if (!operation) {
    console.log('Please provide a mathematical operation.');
    process.exit(1);
}

const result = calculate(operation, operands);

console.log(result);
