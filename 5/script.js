const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillonairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

//Fetch random user and add money

async function getRandomUser(){
   const res = await fetch('https://randomuser.me/api');
   const data = await res.json();
   const user = await data.results[0];
   const newUser = {
       name: `${user.name.first} ${user.name.last}`,
       money: Math.floor(Math.random() * 1000000)
   }

   addData(newUser);
}


function doubleMoney(){
    data = data.map(user =>{
        return {...user, money: user.money * 2};
    });
    updateDOM();
}

function addData(obj){
    data.push(obj);
    updateDOM();
}

function updateDOM(providedData = data){
    //clear the main Div
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
    providedData.forEach(item=>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.append(element);
        updateDOM();
    });
}

//Format number as Money
function formatMoney(number){
    return '$' +
     number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function sortByRichest(){
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

function showMillonaires(){
    data = data.filter(item => item.money > 1000000);
    updateDOM();
}

function calculateWealth(){
    const wealth = data.reduce((acc, number) => (acc += number.money), 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${wealth}</strong></h3>`;
    main.appendChild(wealthEl);
}

for(let i=0; i<3; i++){
    getRandomUser();
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillonairesBtn.addEventListener('click', showMillonaires);
calculateWealthBtn.addEventListener('click', calculateWealth);