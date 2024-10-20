let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = '';
let display = document.querySelector('.display span');
let historyList = document.getElementById('history-list');

const formatNumber = (number) => {
    return number.toLocaleString();
};

const updateDisplay = (value) => {
    display.textContent = formatNumber(value);
};

const addHistory = (record) => {
    const listItem = document.createElement('li');
    
    // `=` 기호를 기준으로 분리하되 공백을 적절히 포함
    const recordParts = record.split('=');
    const calculationSpan = document.createElement('span');
    const resultSpan = document.createElement('span');
    
    // 연산 과정과 결과를 서로 다른 줄로 표시
    calculationSpan.textContent = recordParts[0].trim(); // 첫 줄에 연산 과정
    resultSpan.textContent = `= ${recordParts[1].trim()}`; // 다음 줄에 결과
    
    // 세로로 나란히 배치
    listItem.appendChild(calculationSpan);
    listItem.appendChild(document.createElement('br')); // 줄 바꿈 추가
    listItem.appendChild(resultSpan);
    
    historyList.appendChild(listItem);
};



document.querySelectorAll('.button_number').forEach(button => {
    button.addEventListener('click', function() {
        if (!operator) {
            firstNumber += this.textContent;
            updateDisplay(parseFloat(firstNumber)); // 숫자로 변환하여 포맷
        } else {
            secondNumber += this.textContent;
            updateDisplay(parseFloat(secondNumber)); // 숫자로 변환하여 포맷
        }
    });
});

document.querySelectorAll('.button_operator').forEach(button => {
    button.addEventListener('click', function() {
        if (firstNumber) {
            operator = this.textContent;
        }
    });
});

document.querySelector('.button_equal').addEventListener('click', function() {
    if (firstNumber && secondNumber && operator) {
        firstNumber = parseFloat(firstNumber);
        secondNumber = parseFloat(secondNumber);
        
        switch (operator) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case 'x':
                result = firstNumber * secondNumber;
                break;
            case '÷':
                result = firstNumber / secondNumber;
                break;
        }
        
        const historyRecord = `${formatNumber(firstNumber)} ${operator} ${formatNumber(secondNumber)} = ${formatNumber(result)}`;
        addHistory(historyRecord);
        updateDisplay(result);
        firstNumber = result.toString();
        secondNumber = '';
        operator = '';
    }
});

document.querySelector('#button_c').addEventListener('click', function() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    result = '';
    updateDisplay('0');
    historyList.innerHTML = ''; // 기록도 초기화
});

document.querySelector('#button_ce').addEventListener('click', function() {
    if (operator) {
        secondNumber = '';
    } else {
        firstNumber = '';
    }
    updateDisplay('0');
});
