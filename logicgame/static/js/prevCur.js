let colors = [
    'red', 'orange', 'royalblue'
];

let board = document.querySelector('.PCboard');

let topLayer = document.createElement('div');
topLayer.classList.add('top');
topLayer.innerText = 'Press space to start';
board.appendChild(topLayer);

let direction = document.createElement('div');
direction.classList.add('direction');
direction.innerText = 'up-arrow: same color\ndown-arrow: same shape\nright-arrow: same color and shape\nleft-arrow: different color and shape';
board.appendChild(direction);

let card = document.createElement('canvas');
let ctx = card.getContext('2d');
board.appendChild(card);

let score = 0;
let time = 45;
let colorMatch = false;
let shapeMatch = false;
let prevShapeIndex;
let curShapeIndex = Math.floor(Math.random()*3);
let prevColorIndex;
let curColorIndex = Math.floor(Math.random()*3);

let flip = ()=>{
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, card.width, card.height);

    colorMatch = false;
    shapeMatch = false;

    prevShapeIndex = curShapeIndex;
    curShapeIndex = Math.floor(Math.random()*3);
    if(prevShapeIndex==curShapeIndex) shapeMatch=true;
    //0==circle; 1==rectangle; 2==triangle
    prevColorIndex = curColorIndex;
    curColorIndex = Math.floor(Math.random()*3);
    if(prevColorIndex==curColorIndex) colorMatch=true;

    ctx.fillStyle = colors[curColorIndex];

    if(curShapeIndex==0){
        ctx.beginPath();
        ctx.arc(card.width/2+0.5, card.height/2, 35, 0, Math.PI*2);
        ctx.strokeStyle = colors[curColorIndex];
        ctx.stroke();
        ctx.fill();
    }
    else if(curShapeIndex==1){
        ctx.fillRect(card.width/2-35+0.5, card.height/2-35, 70, 70);
    }
    else if(curShapeIndex==2){
        ctx.beginPath();
        ctx.moveTo(card.width/2+0.5, card.height/2-30);
        ctx.lineTo(card.width/2-35+0.5, card.height/2+25);
        ctx.lineTo(card.width/2+35+0.5, card.height/2+25);
        ctx.fill();
    }
};

flip();

let begun = false;

document.addEventListener('keydown', ()=>{
    if(!begun && event.keyCode==32){
        begun = true;
        topLayer.innerText = '';

        let scoreDisplay = document.createElement('div');
        scoreDisplay.innerText = 'Score: ' + score;
        scoreDisplay.style.marginRight = '70px';
        topLayer.appendChild(scoreDisplay);

        let timeDisplay = document.createElement('div');
        timeDisplay.innerText = 'Time: ' + time;
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

        flip();

        document.addEventListener('keydown', (event)=>{
            if(event.keyCode==37 || event.keyCode==39 || event.keyCode==38 || event.keyCode==40){
                if(event.keyCode==39 && colorMatch && shapeMatch) score++;
                else if(event.keyCode==37 && !colorMatch && !shapeMatch) score++;
                else if(event.keyCode==38 && colorMatch && !shapeMatch) score++;
                else if(event.keyCode==40 && shapeMatch && !colorMatch) score++;
                else score--;
                scoreDisplay.innerText = 'Score: ' + score;
                flip();
            }
        })
    }
});
