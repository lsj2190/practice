const test_time = 10*1000*60;

const quiz = [
  {
    problem : "When did I enter UNIST?",
    a : 2017,
    b : 2018,
    c : 2019,
    correct : 1
  },
  {
    problem : "What is my major?",
    a : "Biologics",
    b : "Computer Engineering",
    c : "Electonic Engineering",
    correct : 3
  },
  {
    problem : "Who is the most handsome person? :)",
    a : "Sun Jun",
    b : "Sue Hyeon",
    c : "Dong Hyeop",
    correct : 1
  }
]

const sendbtn = document.getElementById("send");
const passbtn = document.getElementById('pass');
const temp_problem = document.getElementById('problem');
const temp_a = document.getElementById('a');
const temp_b = document.getElementById('b');
const temp_c = document.getElementById('c');
const cnt_remain = document.getElementById('count-remaining');
const cnt_question = document.getElementById('count-question');

const length = quiz.length;
is_solved = new Array(length).fill(false);

let index=-1;
let cnt_solved=0;
let cnt_correct=0;

var t_update = 0;
var current_time = test_time;

t_update = setInterval(time_update, 1000);
nextProblem();

sendbtn.addEventListener("click", sendAnswer);
passbtn.addEventListener("click", nextProblem);

function time_update() {
  document.getElementById('minute').innerHTML=Math.floor(current_time/1000/60);
  document.getElementById('second').innerHTML=Math.floor((current_time/1000)%60);
  current_time=current_time-1000;
  if(current_time<0)
  {
    clearInterval(t_update);
  }
}

function sendAnswer() {
  if(current_time<0)
  {
    alert('Time Over!');
  }
  if(cnt_solved==length)
  {
    alert('Test is over! \nyour socre : '+ cnt_correct + '/' + length);
    return;
  }
  else if(checkAnswer()==false)
  {
    alert('You should choose answer!');
    return;
  }
  cnt_solved++;
  
  document.getElementById('count-correct').innerHTML=cnt_correct;
  document.getElementById('count-wrong').innerHTML=cnt_solved-cnt_correct;
  nextProblem();
}

function checkAnswer() {
  let answers = document.getElementsByName('choice');
  for(i=0; i<3; i++)
  {
    if(answers[i].checked==true)
    {
      answers[i].checked=false;
      if(i==quiz[index].correct-1)
        cnt_correct++;
        is_solved[index]=true;
      return true;
    }
  }
  return false;
}

function nextProblem() {
  if(cnt_solved==length)
  {
    alert('Finish! \nyour socre : '+ cnt_correct + '/' + length);
    clearInterval(t_update);
    return;
  }
  do{
    index=(index+1)%length;
  }
  while(is_solved[index]);
  
  temp_problem.innerHTML = quiz[index].problem;
  temp_a.innerHTML = quiz[index].a;
  temp_b.innerHTML = quiz[index].b;
  temp_c.innerHTML = quiz[index].c;
  cnt_question.innerHTML = index+1;
  cnt_remain.innerHTML = length-cnt_solved-1;
}
