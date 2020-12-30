var expected_date = new Date("2021-10-31");
var print_t = 0;

print_t = window.setInterval(printTime,1000);

function printTime() {
  if(expected_date.getTime()-Date.now()<0)
  {
    clearInterval(print_t);
    return;
  }
  document.getElementById("days").innerHTML=Math.floor((expected_date.getTime()-Date.now())/1000/60/60/24);
  document.getElementById("hours").innerHTML=Math.floor((expected_date.getTime()-Date.now())/1000/60/60%24);
  document.getElementById("minutes").innerHTML=Math.floor((expected_date.getTime()-Date.now())/1000/60%60);
  document.getElementById("seconds").innerHTML=Math.floor((expected_date.getTime()-Date.now())/1000%60);
}
