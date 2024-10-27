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
const addHistory = (calculation, result) => {
    const listItem = document.createElement('li');

    // 왼쪽 아이콘을 위한 span 요소 생성
    const iconSpan = document.createElement('span');
    iconSpan.classList.add('history-icon'); // 아이콘 스타일을 위한 클래스 추가
    iconSpan.textContent = '🔹'; // 예시 아이콘 (필요에 따라 수정 가능)

    // 연산 과정과 결과를 위한 span 요소 생성
    const calculationText = document.createElement('span');
    calculationText.textContent = `${calculation} = ${formatNumber(result)}`;

    // 아이콘과 계산 텍스트를 listItem에 추가
    listItem.appendChild(iconSpan);
    listItem.appendChild(calculationText);

    historyList.appendChild(listItem);
};

// 초기화 함수
const resetCalculator = (clearHistory = true) => {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    result = '';
    updateDisplay('0');
    if (clearHistory) historyList.innerHTML = '';
};

// 버튼 컨테이너에 이벤트 리스너 등록
const buttonContainer = document.querySelector('.button_container');

buttonContainer.addEventListener('click', function(event) {
    const target = event.target;

    // 숫자 버튼 처리
    if (target.classList.contains('button_number')) {
        if (!operator) {
            firstNumber += target.textContent;
            updateDisplay(parseFloat(firstNumber));
        } else {
            secondNumber += target.textContent;
            updateDisplay(parseFloat(secondNumber));
        }
    }
    // 연산자 버튼 처리
    else if (target.classList.contains('button_operator')) {
        if (firstNumber) {
            operator = target.textContent;
        }
    }
    // = 버튼 처리
    else if (target.classList.contains('button_equal')) {
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
            
            const calculation = `${formatNumber(firstNumber)} ${operator} ${formatNumber(secondNumber)}`;
            addHistory(calculation, result);  // 연산 과정과 결과 전달
            updateDisplay(result);
            firstNumber = result.toString();
            secondNumber = '';
            operator = '';
        }
    }
    // C 버튼 (전체 초기화) 처리
    else if (target.id === 'button_c') {
        resetCalculator();
    }
    // CE 버튼 (현재 입력만 초기화) 처리
    else if (target.id === 'button_ce') {
        resetCalculator(false);
    }
});