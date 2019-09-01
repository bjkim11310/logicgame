let colors = [
    'red', 'orange', 'green', 'blue'
];

let board = document.querySelector('.WCboard');

let topLayer = document.createElement('div');
topLayer.classList.add('top');
topLayer.innerText = 'Press space to start';
board.appendChild(topLayer);

let direction = document.createElement('div');
direction.classList.add('direction');
direction.innerText = "right-arrow: definition = color\nleft-arrow: definition ≠ color";
board.appendChild(direction);

let div = document.createElement('div');
div.classList.add('wordContainer');
board.appendChild(div);

let score = 0;
let time = 15;
let match = false;
begun = false;

document.addEventListener('keydown', (event)=>{
    if(!begun && event.keyCode==32){
        begun = true;
        topLayer.innerText = '';

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

        let word = document.createElement('div');
        word.classList.add('word');
        div.appendChild(word);
        getWord(word);

        document.addEventListener('keydown', (event)=>{
            if(event.keyCode==39 || event.keyCode==37){
                if((event.keyCode==39 && match) || (event.keyCode==37 && !match)){
                    score++;
                }
                else if((event.keyCode==39 && !match) || (event.keyCode==37 && match)) {
                    score--;
                }
                scoreDisplay.innerText = 'Score: ' + score;
                getWord(word);
            }
        })
    }
});


let getWord = (word)=>{
    word.innerText = '';
    let textIndex = Math.floor(Math.random()*4);
    colors[4] = colors[textIndex];
    let colorIndex = Math.floor(Math.random()*5);
    word.innerText = colors[textIndex];
    word.style.color = colors[colorIndex];
    match = false;
    if(colors[textIndex]==colors[colorIndex]) match = true;
};