let recipe_inform;
let star=false;
let search_box=false;
let id_list= new Array();
let index=0;

const star_btn = document.getElementsByClassName('fas fa-star')[0];
const random_btn = document.getElementsByClassName('fas fa-dice')[0];
const searchbox_btn = document.getElementsByClassName('search')[0];
const search_btn = document.getElementById('search-btn');
const view_btn = document.getElementsByClassName('view-recipe')[0];
const close_btn = document.getElementById('recipe-close');
const left_btn = document.getElementsByClassName('left-btn')[0];
const right_btn = document.getElementsByClassName('right-btn')[0];
const delete_btn = document.getElementsByClassName('delete');

getRandomFood();
updateFav();

star_btn.addEventListener("click", changeColor);
random_btn.addEventListener("click", getRandomFood);
searchbox_btn.addEventListener("click", showSearchBox);
search_btn.addEventListener("click", getSearchFood);
view_btn.addEventListener("click", openRecipe);
close_btn.addEventListener("click", closeRecipe);
left_btn.addEventListener("click", showLeft);
right_btn.addEventListener("click", showRight);

for(let i=0; i<3; i++)
{
    delete_btn[i].addEventListener("click", function () {
        deleteFav(i);
    });
}

function showRight()
{
    if(index+3>=id_list.length)
        return;
    index++;
    updateFav();
    
}

function showLeft()
{
    if(index-1<0)
        return;
    index--;
    updateFav();
}

function updateFav()
{
    let i=0;
    for(; i<3 && i+index<id_list.length; i++)
    {
        document.getElementsByClassName('fav-food')[i].style.display='inherit';
        document.getElementsByClassName('fav-img')[i].src=id_list[i+index].src;
        document.getElementsByClassName('fav-name')[i].innerHTML=id_list[i+index].name;
    }
    for(;i<3; i++)
    {
        document.getElementsByClassName('fav-food')[i].style.display='none';
    }
    if(index==0)
    {
        left_btn.style.color="rgb(163, 160, 160)";
    }
    else
    {
        left_btn.style.color='orange';
    }
    if(index+3==id_list.length || id_list.length<4)
    {
        right_btn.style.color="rgb(163, 160, 160)";
    }
    else
    {
        right_btn.style.color='orange';
    }
}

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

    document.getElementById('recipe-id').innerHTML= recipe_inform.idMeal;
    document.getElementById('recipe-img').src=document.getElementById('main-img').src;
    document.getElementById('recipe-name').innerHTML=document.getElementById('main-name').innerHTML;
    document.getElementById('instruction').innerHTML=recipe_inform.strInstructions;

    if(star==true)
    {
        star_btn.style.color = 'rgb(163, 160, 160)';
        star=false;
    }
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
        addFav();
    }
    else
    {
        star_btn.style.color = 'rgb(163, 160, 160)';
        star=false;
        deleteFav();
    }
}

function addFav()
{
    id_list.unshift({id : document.getElementById('recipe-id').innerHTML, src : document.getElementById('recipe-img').src, name : document.getElementById('recipe-name').innerHTML});
    updateFav();
}

function deleteFav(k=0)
{
    if(id_list[k+index].id==document.getElementById('recipe-id').innerHTML)
    {
        star_btn.style.color = 'rgb(163, 160, 160)';
        star=false;
    }
    id_list.splice(k+index,1);
    updateFav();
}