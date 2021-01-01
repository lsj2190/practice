let recipe_inform;
let star=false;
let search_box=false;

getRandomFood();

const star_btn = document.getElementsByClassName('fas fa-star')[0];
const random_btn = document.getElementsByClassName('fas fa-dice')[0];
const searchbox_btn = document.getElementsByClassName('search')[0];
const search_btn = document.getElementById('search-btn');
const view_btn = document.getElementsByClassName('view-recipe')[0];
const close_btn = document.getElementById('recipe-close');

star_btn.addEventListener("click", changeColor);
random_btn.addEventListener("click", getRandomFood);
searchbox_btn.addEventListener("click", showSearchBox);
search_btn.addEventListener("click", getSearchFood);
view_btn.addEventListener("click", openRecipe);
close_btn.addEventListener("click", closeRecipe);

function openRecipe()
{
    document.getElementsByClassName('recipe-card')[0].style.visibility = 'visible';
}

function closeRecipe()
{
    document.getElementsByClassName('recipe-card')[0].style.visibility = 'hidden';
}

function showSearchBox()
{
    if(search_box==false)
    {
        document.getElementsByClassName('search-box')[0].style.visibility='visible';
        search_box=true;
    }
    else
    {
        document.getElementsByClassName('search-box')[0].style.visibility='hidden';
        search_box=false;
    }
}

async function getRandomFood()
{
    const food = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    if(food.ok)
    {
        const recipe_json = await food.json();
        recipe_inform = recipe_json.meals[0];
        updateMain();
    }
    else
    {
        alert('Error!');
    }
}

async function getSearchFood()
{
    const keyword = document.getElementById('keyword').value;
    document.getElementById('keyword').value=null;
    const food = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+keyword);
    if(food.ok)
    {
        const recipe_json = await food.json();
        console.log(recipe_json.meals);
        if(!recipe_json.meals)
        {
            alert('Can not find!');
            return;
        }
        recipe_inform = recipe_json.meals[0];
        updateMain();
    }
    else
    {
        alert('Error!');
    }
}

function updateMain()
{
    document.getElementById('main-img').src = recipe_inform.strMealThumb;
    document.getElementById('main-name').innerHTML = recipe_inform.strMeal;

    document.getElementById('recipe-img').src=document.getElementById('main-img').src;
    document.getElementById('recipe-name').innerHTML=document.getElementById('main-name').innerHTML;
    document.getElementById('instruction').innerHTML=recipe_inform.strInstructions;
}

function clickStar() 
{
    changeColor();
}

function changeColor()
{
    if(star==false)
    {
        star_btn.style.color = 'orange';
        star=true;
    }
    else
    {
        star_btn.style.color = 'rgb(163, 160, 160)';
        star=false;
    }
}