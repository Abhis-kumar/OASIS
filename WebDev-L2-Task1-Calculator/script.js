const display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    let expression = display.value;

    if (expression === "") return 0;

    let numbers = [];
    let operators = [];
    let current = "";

    // Separate numbers and operators
    for (let i = 0; i < expression.length; i++) {
        let ch = expression[i];

        if ("+-*/%".includes(ch)) {
            numbers.push(parseFloat(current));
            operators.push(ch);
            current = "";
        } else {
            current += ch;
        }
    }

    numbers.push(parseFloat(current));

    // Evaluate from left to right
    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
        switch (operators[i]) {
            case "+":
                result += numbers[i + 1];
                break;
            case "-":
                result -= numbers[i + 1];
                break;
            case "*":
                result *= numbers[i + 1];
                break;
            case "/":
                if (numbers[i + 1] === 0) {
                    display.value = "Cannot divide by 0";
                    return;
                }
                result /= numbers[i + 1];
                break;
            case "%":
                result %= numbers[i + 1];
                break;
        }
    }

    display.value = result;
}