let board = document.querySelector('.NMboard');

let topLayer = document.createElement('div');
topLayer.classList.add('top');
board.appendChild(topLayer);

let startbtn = document.createElement('button');
startbtn.innerText = "Start";
topLayer.appendChild(startbtn);

let numContainer = document.createElement('div');
numContainer.classList.add('numContainer');
board.appendChild(numContainer);

let score = 0;
let time = 45;
let num = -1;

startbtn.addEventListener('click', (event)=>{
    topLayer.removeChild(startbtn);

    let scoreDisplay = document.createElement('div');
    scoreDisplay.innerText = 'Score: ' + score;
    scoreDisplay.style.marginRight = '70px';
    topLayer.appendChild(scoreDisplay);

    let timeDisplay = document.createElement('div');
    timeDisplay.innerText = 'Time left: ' + time;
    topLayer.appendChild(timeDisplay);

    let timer = setInterval(()=>{
        time-=1;
        //go to rankInput and give score
        if(time==0){
            let form = document.getElementById('form');
            let input = document.getElementById('input');
            input.setAttribute('value', score);
            form.submit();
        }

        timeDisplay.innerText = 'Time left: ' + time;
    }, 1000);

    let numDisplay = document.createElement('div');
    numDisplay.classList.add('numDisplay');
    numContainer.appendChild(numDisplay);
    let input = document.createElement('input');
    numContainer.appendChild(input);

    getNum(input, numDisplay);

    document.addEventListener('keydown', (event)=>{
        if(event.keyCode==13){
            if(input.value==num){
                score++;
            }
            scoreDisplay.innerText = 'Score: ' + score;

            getNum(input, numDisplay);
        }
    });
});

let getNum = (input, numDisplay)=>{
    input.readOnly = true;
    num = Math.floor(Math.random()*9000000)+1000000;
    numDisplay.innerText = num;
    numDisplay.style.visibility = 'visible';
    input.value = '';
    setTimeout(()=>{
        numDisplay.style.visibility = 'hidden';
        input.readOnly = false;
    }, 2750)
}