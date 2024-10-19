let runningTotal = 0;
let buffer = "0";
let previousOperator = null; // Initialize as null
let shouldResetBuffer = false; // Flag to reset buffer after result is shown

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'AC':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null; // Reset previousOperator
            break;

        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer)); // Use parseFloat to handle decimals
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            shouldResetBuffer = true; // Set flag to reset buffer on next number input
            break;

        case '⌫':
            if (buffer.length === 1) {
                buffer = '0';
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;

        case '+':
        case '−':
        case '×':
        case '÷':
        case '%':  // Added % symbol handling
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }
    const intBuffer = parseFloat(buffer); // Use parseFloat to handle decimals
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }
    else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    }
    else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    }
    else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    }
    else if (previousOperator === '÷') {
        if (intBuffer === 0) {
            alert("Cannot divide by zero");
            runningTotal = 0;
        } else {
            runningTotal /= intBuffer;
        }
    }
    else if (previousOperator === '%') {
        runningTotal = (runningTotal * intBuffer) / 100;  // Percentage calculation
    }
}

function handleNumber(numberString) {
    if (shouldResetBuffer) {
        buffer = numberString;
        shouldResetBuffer = false;
    } else {
        if (buffer === "0") {
            buffer = numberString;
        }
        else {
            buffer += numberString;
        }
    }
}

function init() {
    document.querySelector('.calc-btns').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    })
}

init();
