let userseq= [];
let gameseq= [];

let started = false;
let level= 0;

let h2 = document.querySelector("h2");

let btn= ["red", "yellow","green","purple"];


document.addEventListener("keypress",function(){

  if (started == false) {
    started = true;
    levelup();
}


})


function btnflash(btn){

  btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    },250)


}

function levelup(){
    userseq=[];

    level++;
    h2.innerText=`level ${level}`;

    let randidx = Math.floor(Math.random()*4);
    let randcolor= btn[randidx];
    let randbtn= document.querySelector(`.${randcolor}`);

    
    gameseq.push(randcolor);
    
    btnflash(randbtn);


}

function checkANs(idx){

    

    if(userseq[idx]==gameseq[idx]){
      if (userseq.length==gameseq.length) {
        
        setTimeout(levelup, 1000);
      }
    }
    else{
        h2.innerText=`Game is over Your Score ${level}`;
        resetgame();
    }
}


function btnpress(){

    let btn = this;
    btnflash(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkANs(userseq.length-1);
    

}


let allbtn = document.querySelectorAll(".btn");

for(let button of allbtn){
    button.addEventListener("click",btnpress);
}

function resetgame(){
    started=false;
    level=0;
    gameseq=[]
    userseq=[];
}