let firstNumber = '0'
let operator = null
let secondNumber = '0'

let display = document.querySelector('p')
let buttonWrapper = document.querySelector('.button-wrapper')

buttonWrapper.addEventListener('click', (e) => {
    let buttonClicked = e.target
    let buttonTextContent = buttonClicked.textContent
    
    if(buttonClicked.classList.contains('delete')){
        clearAll()
        return
    }

    if(buttonClicked.classList.contains('undo')){
        undo()
        return
    }

    if(buttonClicked.classList.contains('number')
        || buttonClicked.classList.contains('operator') 
    ){
        if(!operator){
            if(isNumber(buttonTextContent) || buttonTextContent === '.'){
                setFirstNumber(buttonTextContent)
            }
            else if(isOperator(buttonTextContent)){
                setOperator(buttonTextContent)
            }
        }

        else {
            if(isNumber(buttonTextContent) || buttonTextContent === '.'){
                setSecondNumber(buttonTextContent)
            } 
            else {
                let result = operate(operator, firstNumber, secondNumber)
                firstNumber = `${result}`
                operator = buttonTextContent
                secondNumber = '0'
                updateDisplay(firstNumber)
            }
        }
    }

    else if(buttonClicked.classList.contains('equals')){
        if(operator){
            let result = operate(operator, firstNumber, secondNumber)
            firstNumber = `${result}`
            operator = null
            secondNumber = '0'
            updateDisplay(firstNumber)
        }
    }
     
})

let operators = ['+', '-', '*', '/']
let numbers = ['0','1','2','3','4','5','6','7','8','9']

function clearAll(){
    firstNumber = '0'
    operator = null
    secondNumber = '0'
    display.textContent = firstNumber
}

function undo(){
    if(firstNumber !== '0' && secondNumber === '0'){
        if(firstNumber.length > 1){
            firstNumber = firstNumber.slice(0, -1);
            updateDisplay(firstNumber)
        } else {
            firstNumber = '0'
            updateDisplay(firstNumber)
        }
    } else if(secondNumber !== '0'){
        if(secondNumber.length > 1){
            secondNumber = secondNumber.slice(0, -1);
            updateDisplay(secondNumber)
        } else {
            secondNumber = '0'
            updateDisplay(secondNumber)
        }
    }
}

function updateDisplay(input){
    display.textContent = input
}

function setFirstNumber(input){
    if(firstNumber.includes('.') && input === '.'){
        return 
    }
    else if(firstNumber === '0' && numbers.includes(input)){
        firstNumber = input
        updateDisplay(firstNumber)
    }
    else {
        firstNumber += input
        updateDisplay(firstNumber)
    }
}

function setSecondNumber(input){
    if(secondNumber.includes('.') && input === '.'){
        return 
    }
    else if(secondNumber === '0' && numbers.includes(input)){
        secondNumber = input
        updateDisplay(secondNumber)
    }
    else {
        secondNumber += input
        updateDisplay(secondNumber)
    }
}

function setOperator(input){
    operator = input
}


function isOperator(input){
    return operators.includes(input)
}

function isNumber(input){
    return numbers.includes(input)
}

function operate(operator, num, num2){
    let a = parseFloat(num)
    let b = parseFloat(num2)
    switch(operator){
        case '+':
            return a+b
        case '-':
            return a-b
        case '*':
            return a*b
        case '/':
            return a/b
    }  
}

