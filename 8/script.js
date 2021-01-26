const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const meals = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMeal = document.getElementById('single-meal');


//Search meal and fetch from API
const searchMeal = (e) => {
    e.preventDefault();
    //clear single meal
    singleMeal.innerHTML = '';
    //get term search
    const term = search.value;
    
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term.trim()}`)
        .then(res => res.json())
        .then(data => {
            resultHeading.innerHTML = `<h2>Search Result for ${term}:</h2>`;
            if(data.meals == null){
                resultHeading.innerHTML = '<h2>There are no results, try again!</h2>';
            }
            else{
                meals.innerHTML = data.meals.map(meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>`).join('');
            }
        });
        //clear search text
        search.value = '';
    }
    else{
        alert('fill the field to search something!');
    }

};

const randomMeal = () => {
    //clear meals
    meals.innerHTML = '';
    resultHeading.innerHTML = '';
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];
        addMealToDOMM(meal);
    });
};

const getMealByID = mealID =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];
        addMealToDOMM(meal);
    });
};

const addMealToDOMM = meal => {
    const ingredients = [];
    for(let i=1; i<=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }
        else{
            break;
        }
    }
    singleMeal.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    console.log(ingredients);
}

//Event Listener


submit.addEventListener('submit', searchMeal);
meals.addEventListener('click', e =>{
    const mealInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info');
        }
        else{
            return false;
        }
    });
    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealID');
        getMealByID(mealID);
    }
});
random.addEventListener('click', randomMeal);