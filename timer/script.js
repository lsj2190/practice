var expected_date = new Date("2020-10-31");

window.setInterval(printTime,1000);

function printTime() {
  document.getElementById("days").innerHTML=Math.floor((expected_date.getTime()-Date.now())/1000/60/60/24);
  document.getElementById("hours").innerHTML=Math.floor((expected_date.getTime()-Date.now())/1000/60/60%24);
  document.getElementById("minutes").innerHTML=Math.floor((expected_date.getTime()-Date.now())/1000/60%60);
  document.getElementById("seconds").innerHTML=Math.floor((expected_date.getTime()-Date.now())/1000%60);
}
