const currencyElement_one = document.getElementById('currency-one');
const currencyElement_two = document.getElementById('currency-two');
const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetch exchange rates and update the DOM
function calculate(){
    const currency_one = currencyElement_one.value;
    const currency_two = currencyElement_two.value;
    fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
    .then(res => res.json())
    .then(data =>{
        const rate = data.rates[currency_two];
        rateEl.textContent = `1 ${currency_one} = ${rate} ${currency_two}`;
        
        amount_two.value = (amount_one.value * rate).toFixed(2);
    });
}

//Event Listeners
currencyElement_one.addEventListener('change', calculate);
currencyElement_two.addEventListener('change', calculate);
amount_one.addEventListener('input', calculate);
amount_two.addEventListener('input', calculate);
swap.addEventListener('click', () =>{
    const temp = currencyElement_one.value;
    currencyElement_one.value = currencyElement_two.value;
    currencyElement_two.value = temp;
    calculate();
});

calculate();