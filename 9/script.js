const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const textField = document.getElementById("text");
const amountField = document.getElementById("amount");

/*const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 },
];*/

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransaction: [];

//Add Transaction
function addTransaction(e){
    e.preventDefault();
    if(textField.value.trim() == '' || amountField.value.trim() == ''){
        alert('Please add text and amount');
    }
    else{
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        text.value = '';
        amount.value = '';
        updateLocalStorage();
    }
}

//Generate random ID
const generateID = () => Math.floor(Math.random() * 1000000000);

//Add transactions to DOM List

const addTransactionDOM = (transaction) => {
  //Get the sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  //Add class based on value
  item.classList.add(sign == "-" ? "minus" : "plus");
  item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
  list.appendChild(item);
};

//update the balance, income and expense
function updateValues() {
  const amounts = transactions.map((trans) => trans.amount);
  const total = amounts.reduce((ac, item) => (ac += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((item, ac) => (ac += item), 0)
    .toFixed(2);
  const expense = (amounts
    .filter((item) => item < 0)
    .reduce((item, acc) => (acc += item), 0) *-1).toFixed(2);
    balance.innerText = `$${total}`;
    moneyPlus.innerText = `+$${income}`;
    moneyMinus.innerText = `-${expense}`;
}

function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

//Init app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);