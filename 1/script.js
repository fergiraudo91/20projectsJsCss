const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerHTML = message;
}

function success(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control sucess';
}
//check required field
function checkRequired(inputArr){
    inputArr.forEach(input =>{
        if(input.value === ''){
            showError(input, getFieldName(input) + ' field is required!');
        }
        else{
            success(input);
        }
    });
}

function getFieldName(input){
    return input.id.slice(0, 1).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max){
    if(input.value.length < min || input.value.length > max){
        showError(input, 'The min must to be ' + min + ' and  the max ' + max + ' characters');
    }
    else{
        success(input);
    }
}

function matchPassword(input1, input2){
    if(input1.value === input2.value){
        success(input1);
        success(input2);
    }
    else{
        showError(input2, 'The password doesnt match');
    }
}

//check email
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        success(input);
    }
    else{
        showError(input, 'Email is not valid');
    }
}

form.addEventListener('submit', e =>{
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 5, 15);
    checkLength(password, 8, 20);
    checkEmail(email);
    matchPassword(password, password2);
});