const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons button');

let currentNumber = '';
let previousNumber = null;
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value) || value === '.') {
            if (currentNumber.length < 10) {
                currentNumber += value;
                display.textContent = currentNumber;
            }
        } else {
            switch (value) {
                case 'AC':
                    currentNumber = '';
                    previousNumber = null;
                    operator = null;
                    display.textContent = '0';
                    break;
                case '±':
                    currentNumber = (parseFloat(currentNumber) * -1).toString();
                    display.textContent = currentNumber;
                    break;
                case '%':
                    currentNumber = (parseFloat(currentNumber) / 100).toString();
                    display.textContent = currentNumber;
                    break;
                case '/':
                case '*':
                case '-':
                case '+':
                    if (currentNumber) {
                        if (previousNumber !== null) {
                            calculate();
                        }
                        previousNumber = currentNumber;
                        operator = value;
                        currentNumber = '';
                    }
                    break;
                case '=':
                    if (previousNumber !== null && operator) {
                        calculate();
                        previousNumber = null;
                        operator = null;
                    }
                    break;
            }
        }
    });
});

function calculate() {
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                result = 'Error';
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }
    currentNumber = result.toString().slice(0, 10);
    display.textContent = currentNumber;
}