let countdown;
const timerDisplay = document.querySelector('.time-left');
const endTime = document.querySelector('.end-time');
const workbutton = document.querySelector('.work__button');
const shortbutton = document.querySelector('.short__button');
const pausbutton = document.querySelector('.pause__button');
const resetbutton = document.querySelector('.reset__button');
pausbutton.style.display='none';
resetbutton.style.display='none';
let breakLong = 0;
let activeperiod = 1500;
const worktime = 1500;
const shortchilltime = 300;
const longchilltime = 900;

function timer(seconds) {
    clearInterval(countdown);
    let secondsLeft = seconds;

    displayTimeLeft(secondsLeft);

    countdown = setInterval(() => {
        if(!isPaused){
            secondsLeft = secondsLeft - 1;
            if(secondsLeft < 0) {
                clearInterval(countdown);
                checkWork(seconds);
                return;
            }
            displayTimeLeft(secondsLeft);
        }
    }, 1000);
}

function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds/60);
	const remainderSeconds = seconds % 60; 
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
	timerDisplay.textContent = display;
    pausbutton.style.display='';
    resetbutton.style.display='';
}

function startWork(seconds) {
    isPaused = false;
    if(seconds === worktime){
        checkActive(worktime)
    }
    else{
        checkActive(shortchilltime)
    }
    timer(seconds);
}

function checkActive(seconds){
    if(seconds === worktime){
        workbutton.style.background = 'black'
        shortbutton.style.background = 'none'
    }
    else{
        shortbutton.style.background = 'black'
        workbutton.style.background = 'none'
    }
    
}

function checkWork(seconds){   
    if(seconds === worktime){
        breakLong++;
        if(breakLong != 4){
            startWork(shortchilltime);
        }
        else{
            breakLong = 0;
            startWork(longchilltime);
        }
    }
    else{ startWork(worktime); }
}

function stopTimer(){
    if(!isPaused){ isPaused = true; }
    else{ isPaused = false; } 
}

function resetTimer(){
    if(workbutton.style.background == 'black'){
        startWork(worktime);
    }
    else{
        startWork(shortchilltime);
    }
}


workbutton.addEventListener('click', () => startWork(worktime));
shortbutton.addEventListener('click', () => startWork(shortchilltime));
pausbutton.addEventListener('click', stopTimer);
resetbutton.addEventListener('click', resetTimer);


