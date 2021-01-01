let recipe_inform;
let star=false;
let favor_list = new Array(5).fill(0);

getRandomFood();
showFav();

const star_btn = document.getElementsByClassName('fas fa-star')[0];
const random_btn = document.getElementsByClassName('fas fa-dice')[0];

star_btn.addEventListener("click", changeColor);
random_btn.addEventListener("click", getRandomFood);

function showFav()
{

}

async function getRandomFood()
{
    const food = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    if(food.ok)
    {
        const recipe_json = await food.json();
        recipe_inform = recipe_json.meals[0];
        updateMain();
        console.log(recipe_inform);    
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