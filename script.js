const time = document.getElementById("time");

function showtime(){
    let now = new Date();

    let hour= now.getHours();
    let minute= now.getMinutes();
    let sec= now.getSeconds();

    hour= hour<10? "0"+hour:hour;
    minute=minute<10? "0"+minute:minute;
    sec= sec<10?"0"+sec:sec;

    time.innerHTML=`${hour}:${minute}:${sec}`;

}
showtime();
setInterval(showtime,1000);