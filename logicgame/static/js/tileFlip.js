let colors = [
    'salmon', 'orange', 'lightgreen', 'skyblue', 'royalblue', 'peachpuff', 'mediumpurple', 'rosybrown',
    'salmon', 'orange', 'lightgreen', 'skyblue', 'royalblue', 'peachpuff', 'mediumpurple', 'rosybrown'
];

for(let i=0; i<16; i++){
        let index = Math.floor(Math.random()*16);
        let dummy = colors[i];
        colors[i] = colors[index];
        colors[index] = dummy;
}

let board = document.querySelector('.TFboard');

let topLayer = document.createElement('div');
topLayer.classList.add('top');
board.appendChild(topLayer);

let startbtn = document.createElement('button');
startbtn.innerText = "Start";
topLayer.appendChild(startbtn);

let container = document.createElement('div');
container.classList.add('cellContainer');
board.appendChild(container);

let div = [];
for(let i=0; i<16; i++){
    div[i] = document.createElement('div');
    div[i].classList.add('cell');
    div[i].style.backgroundColor = '#b2b6bf';
    container.appendChild(div[i]);
}

let time = 0;
let n = 0;
let completed = 0;
let selected = [];

startbtn.addEventListener('click', (event)=>{

    topLayer.innerText = time;
    let timer = setInterval(()=>{
        time+=0.1;
        topLayer.innerText = Math.floor(time);
    }, 100);

    for(let i=0; i<16; i++){
        div[i].addEventListener('click', (event)=>{
            if(n<2 && div[i].style.backgroundColor!=colors[i]){
                div[i].style.backgroundColor = colors[i];
                if(n==0){
                    selected[n] = i;
                    n++;
                }
                else if(n==1 && selected[0]!=i){
                    selected[n] = i;
                    n++;
                }
                if(n==2){
                    if(colors[selected[0]]==colors[selected[1]]){
                        n=0;
                        completed++;
                        //go to rankInput and give score
                        if(completed==8){
                            let score = Math.round(1000/time);
                            let form = document.getElementById('form');
                            let input = document.getElementById('input');
                            input.setAttribute('value', score);
                            form.submit();
                        }
                    } else{
                        setTimeout(()=>{
                            div[selected[0]].style.backgroundColor = '#b2b6bf';
                            div[selected[1]].style.backgroundColor = '#b2b6bf';
                            n=0;
                        }, 1000);
                    }
                }
            }
        });
    }
});


