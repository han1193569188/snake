if(localStorage.maxscore==[]||!localStorage.maxscore){
    localStorage.maxscore=0;
}
window.onload=function () {
    let gradelist=document.querySelector(".grade");
    function Snake(par) {
        this.par=par;
        this.score=document.querySelector("div.score").firstElementChild;
        this.grade=document.querySelector(".grade");
        this.endscore=document.querySelector("p.score");
        this.maxscore=document.querySelector("p.maxscore");
        this.btn1=document.querySelector("#btn1");
        this.btn2=document.querySelector("#btn2");
    }
    Snake.prototype= {
        play() {
            gradelist.style.display="none";
            this.flag=true;
            this.drawDiv();
            this.drawSnake();
            this.newFood=this.drawFood();
            this.t=100;
            this.move();
        },
        drawDiv() {
            let str="";
            for(let i=0;i<20;i++){
                for(let j=0;j<20;j++){
                    str+=`<div id="c${j}-${i}"></div>`
                }
            }
            this.par.innerHTML=str;
        },
        drawSnake() {
            this.arr=[
                {x:0,y:0},
                {x:1,y:0},
                {x:2,y:0}
            ];
            this.arr.forEach((val)=>{
                document.querySelector(`#c${val.x}-${val.y}`).classList.add("snake");
        })
        },
        drawFood() {
            let x;
            let y;
            do{
                x=Math.floor(Math.random()*20);
                y=Math.floor(Math.random()*20);
                if(!this.decide(x,y)){
                  document.querySelector(`#c${x}-${y}`).classList.add("food");
                }
            }while(this.decide(x,y));
            return {x,y};
        },
        decide(a,b){
            return this.arr.some((val)=>val.x==a&&val.y==b);
        },
        move() {
            this.way="right";
            let t=setInterval(()=>{
                this.control();
                this.flag=true;
                let snakeHead=this.arr[this.arr.length-1];
                let newHead;
                switch (this.way){
                    case "right":
                        newHead={x:snakeHead.x+1,y:snakeHead.y};
                        break;
                    case "left":
                        newHead={x:snakeHead.x-1,y:snakeHead.y};
                        break;
                    case "top":
                        newHead={x:snakeHead.x,y:snakeHead.y-1};
                        break;
                    case "bottom":
                        newHead={x:snakeHead.x,y:snakeHead.y+1};
                        break;
                }
                let newHeader=document.querySelector(`#c${newHead.x}-${newHead.y}`);
                if(!newHeader||this.decide(newHead.x,newHead.y)){
                    clearInterval(t);
                    this.grade.style.display="block";
                    this.btn1.onclick=function () {
                        newSnake.play();
                    };
                    this.endscore.innerText=this.arr.length-3;

                    if(this.endscore.innerText>Number(localStorage.maxscore)){
                        localStorage.maxscore=this.endscore.innerText;
                        console.log(this.endscore.innerText)
                    }
                    this.maxscore.innerText=localStorage.maxscore;
                    return;
                }
                newHeader.className="snake";
                this.arr.push(newHead);
                if(this.decide(this.newFood.x,this.newFood.y)) {
                    this.newFood = this.drawFood();
                }else{
                    let tail=this.arr.shift();
                    document.querySelector(`#c${tail.x}-${tail.y}`).classList.remove("snake");
                }
                this.score.innerHTML=this.arr.length-3;
            },this.t);
        },
        control() {
            document.onkeydown = (e)=> {
                switch (e.which) {
                    case 37:
                        if (this.way == "right"||this.flag==false) {
                            return;
                        }
                        this.flag=false;
                        this.way = "left";
                        break;
                    case 38:
                        if (this.way == "bottom"||this.flag==false) {
                            return;
                        }
                        this.flag=false;
                        this.way = "top";
                        break;
                    case 39:
                        if (this.way == "left"||this.flag==false) {
                            return;
                        }
                        this.flag=false;
                        this.way = "right";
                        break;
                    case 40:
                        if (this.way == "top"||this.flag==false) {
                            return;
                        }
                        this.flag=false;
                        this.way = "bottom";
                        break;
                }
            }
        }
    };
    let box=document.querySelector(".box");
    let newSnake=new Snake(box);
    newSnake.play();
};
