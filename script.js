const calculator = document.getElementById("calculator");
const toggle = document.getElementById("handednessToggle");
const modeLabel = document.getElementById("modeLabel");
const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");

let currentInput = "0";
let previousValue = null;
let operator = null;
let waitingForOperand = false;

/* ---------------- Handedness toggle ---------------- */

toggle.addEventListener("click", () => {
    const enabled = toggle.classList.toggle("on");

    calculator.classList.toggle("left-handed", enabled);

    toggle.setAttribute("aria-pressed", String(enabled));
    toggle.setAttribute(
        "aria-label",
        enabled
            ? "Switch to right-handed layout"
            : "Switch to left-handed layout"
    );

    // The control itself does not move.
    // Only the keypad direction is changed by CSS.
    modeLabel.textContent = enabled ? "Right-handed" : "Left-handed";
});

/* ---------------- Calculator functionality ---------------- */

function formatNumber(value) {
    if (!Number.isFinite(value)) return "Error";

    const rounded = Number.parseFloat(Number(value).toPrecision(12));
    return String(rounded);
}

function updateDisplay() {
    if (operator && previousValue !== null) {
        expressionEl.textContent =
            `${formatNumber(previousValue)} ${operator} ${currentInput}`;
    } else {
        expressionEl.textContent = currentInput;
    }

    resultEl.textContent = `=${currentInput}`;
}

function inputNumber(value) {
    if (currentInput === "Error") {
        clearCalculator();
    }

    if (waitingForOperand) {
        currentInput = value;
        waitingForOperand = false;
    } else if (value === "." && currentInput.includes(".")) {
        return;
    } else if (currentInput === "0" && value !== ".") {
        currentInput = value;
    } else {
        currentInput += value;
    }

    updateDisplay();
}

function chooseOperator(nextOperator) {
    const inputValue = Number(currentInput);

    if (operator && waitingForOperand) {
        operator = nextOperator;
        updateDisplay();
        return;
    }

    if (previousValue === null) {
        previousValue = inputValue;
    } else if (operator) {
        const calculated = calculate(previousValue, inputValue, operator);

        if (calculated === null) {
            currentInput = "Error";
            previousValue = null;
            operator = null;
            updateDisplay();
            return;
        }

        currentInput = formatNumber(calculated);
        previousValue = calculated;
    }

    operator = nextOperator;
    waitingForOperand = true;
    updateDisplay();
}

function calculate(a, b, op) {
    switch (op) {
        case "+":
            return a + b;
        case "−":
            return a - b;
        case "×":
            return a * b;
        case "÷":
            return b === 0 ? null : a / b;
        default:
            return b;
    }
}

function performEquals() {
    if (operator === null || previousValue === null) {
        return;
    }

    const inputValue = Number(currentInput);
    const answer = calculate(previousValue, inputValue, operator);

    if (answer === null) {
        currentInput = "Error";
    } else {
        currentInput = formatNumber(answer);
    }

    previousValue = null;
    operator = null;
    waitingForOperand = true;
    updateDisplay();
}

function clearCalculator() {
    currentInput = "0";
    previousValue = null;
    operator = null;
    waitingForOperand = false;
    updateDisplay();
}

function backspace() {
    if (waitingForOperand || currentInput === "Error") return;

    currentInput =
        currentInput.length > 1
            ? currentInput.slice(0, -1)
            : "0";

    updateDisplay();
}

function percent() {
    const value = Number(currentInput);
    currentInput = formatNumber(value / 100);
    updateDisplay();
}

function power() {
    const value = Number(currentInput);
    currentInput = formatNumber(value * value);
    updateDisplay();
}

document.querySelectorAll(".key").forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (value && /^[0-9.]$/.test(value)) {
            inputNumber(value);
            return;
        }

        if (value && ["+", "−", "×", "÷"].includes(value)) {
            chooseOperator(value);
            return;
        }

        switch (action) {
            case "clear":
                clearCalculator();
                break;
            case "backspace":
                backspace();
                break;
            case "percent":
                percent();
                break;
            case "power":
                power();
                break;
            case "equals":
                performEquals();
                break;
        }
    });
});

/* Optional keyboard support */
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (/^[0-9.]$/.test(key)) {
        inputNumber(key);
    } else if (key === "+") {
        chooseOperator("+");
    } else if (key === "-") {
        chooseOperator("−");
    } else if (key === "*") {
        chooseOperator("×");
    } else if (key === "/") {
        event.preventDefault();
        chooseOperator("÷");
    } else if (key === "Enter" || key === "=") {
        performEquals();
    } else if (key === "Escape") {
        clearCalculator();
    } else if (key === "Backspace") {
        backspace();
    } else if (key === "%") {
        percent();
    }
});

updateDisplay();
