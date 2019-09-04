let colors = [
    'red', 'orange', 'lightgreen', 'royalblue'
];

let board = document.querySelector('.LRboard');

let topLayer = document.createElement('div');
topLayer.classList.add('top');
topLayer.innerText = 'Press space to start';
board.appendChild(topLayer);

let direction = document.createElement('div');
direction.classList.add('direction');
direction.innerText = 'up-arrow: same color\ndown-arrow: same shape\nright-arrow: same color and shape\nleft-arrow: different color and shape';
board.appendChild(direction);

let div = document.createElement('div');
div.classList.add('cardContainer');
board.appendChild(div);

let left = document.createElement('canvas');
let leftCtx = left.getContext('2d');
div.appendChild(left);
let right = document.createElement('canvas');
let rightCtx = right.getContext('2d');
div.appendChild(right);

let score = 0;
let time = 30;
let colorMatch = false;
let shapeMatch = false;
let begun = false;
let leftShapeIndex;
let rightShapeIndex;
//0==circle; 1==rect; 2==triangle
let leftColorIndex;
let rightColorIndex;


document.addEventListener('keydown', (event)=>{
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
                leftCtx.fillStyle = '#ffffff';
                leftCtx.fillRect(0, 0, left.width, left.height);
                rightCtx.fillStyle = '#ffffff';
                rightCtx.fillRect(0, 0, right.width, right.height);
                setTimeout(()=>flip(), 50);
            }
        })
    }

});

let flip = ()=>{
    colorMatch = false;
    shapeMatch = false;

    leftColorIndex = Math.floor(Math.random()*4);
    rightColorIndex = Math.floor(Math.random()*4);
    //0==circle; 1==rect; 2==triangle;
    leftShapeIndex = Math.floor(Math.random()*3);
    rightShapeIndex = Math.floor(Math.random()*3);

    if(leftColorIndex==rightColorIndex) colorMatch = true;
    if(leftShapeIndex==rightShapeIndex) shapeMatch = true;

    leftCtx.fillStyle = colors[leftColorIndex];
    rightCtx.fillStyle = colors[rightColorIndex];

    if(leftShapeIndex==0){
        leftCtx.beginPath();
        leftCtx.arc(left.width/2+0.5, left.height/2, 35, 0, Math.PI*2);
        leftCtx.strokeStyle = colors[leftColorIndex];
        leftCtx.stroke();
        leftCtx.fill();
    }
    else if(leftShapeIndex==1) leftCtx.fillRect(left.width/2-35+0.5, left.height/2-35, 70, 70);
    else if(leftShapeIndex==2){
        leftCtx.beginPath();
        leftCtx.moveTo(left.width/2+0.5, left.height/2-30);
        leftCtx.lineTo(left.width/2-35+0.5, left.height/2+25);
        leftCtx.lineTo(left.width/2+35+0.5, left.height/2+25);
        leftCtx.fill();
    }

    if(rightShapeIndex==0){
        rightCtx.beginPath();
        rightCtx.arc(right.width/2+0.5, right.height/2, 35, 0, Math.PI*2);
        rightCtx.strokeStyle = colors[rightColorIndex];
        rightCtx.stroke();
        rightCtx.fill();
    }
    else if(rightShapeIndex==1) rightCtx.fillRect(right.width/2-35+0.5, right.height/2-35, 70, 70);
    else if(rightShapeIndex==2){
        rightCtx.beginPath();
        rightCtx.moveTo(right.width/2+0.5, right.height/2-30);
        rightCtx.lineTo(right.width/2-35+0.5, right.height/2+25);
        rightCtx.lineTo(right.width/2+35+0.5, right.height/2+25);
        rightCtx.fill();
    }
};

