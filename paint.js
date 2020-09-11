const canvas = document.querySelector("#jsCanvas")
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("setColor");
const range = document.getElementById("Range");
const fill = document.querySelector("#Mode");
const save = document.querySelector("#Save");

canvas.width = 700;
canvas.height=700;

ctx.fillStyle= "white";
ctx.fillRect(0,0,canvas.width,canvas.height);//Set canvas background's default color


ctx.strokeStyle="black";
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;



const stop = function(){
    painting=false;
}
const start = function(){
    painting = true;
}
const mouseMove = function(event){
    const x = event.offsetX;
    const y = event.offsetY;
    //console.log(x,y);
    if(!painting){
       ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else{ 
     if(!filling){
        ctx.lineTo(x, y);
        ctx.stroke();
     }
    }
}
const changeColor = function(event){
    const check  = fill.innerText;
    if(check === "Paint"){
            ctx.strokeStyle = event.target.style['background-color'];//event.target.style's type is Object
    }
    // == event.target.style.backgroundColor
    else{
        ctx.fillStyle = event.target.style.backgroundColor;
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    
}
function contextMn(event){
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove",mouseMove);
    canvas.addEventListener("mousedown",start);
    canvas.addEventListener("mouseup",stop);
    canvas.addEventListener("mouseleave",stop);
    //canvas.addEventListener("click",function(){ctx.fillRect(0,0,canvas.width,canvas.height)})
    canvas.addEventListener("contextmenu",contextMn);
}

function rangeChange(event){
  ctx.lineWidth = event.target.value;
}

function modeChange(event){
    if(fill.innerText === "Fill"){
        fill.innerText = "Paint";
        filling = false;
    }
    else{
        fill.innerText = "Fill";
        filling = true;
        
    }
}
function saveImage(){
    const i = canvas.toDataURL();//("image/image type ex)jpeg")
    const link = document.createElement("a");
    link.href = i;
    let cnt = localStorage.getItem("cnt");
    console.log(cnt);
    link.download = `PaintJS🎨`;
    link.click();

}
Array.from(color).forEach(changed => changed.addEventListener("click",changeColor))//Array.from create an array from an object
//before '=>' argument's name and argument in front of .addEventListener's name must always be the same

if(range){
    range.addEventListener("input",rangeChange)
}

if(fill){
    fill.addEventListener("click",modeChange)
}
if(save){
    save.addEventListener("click",saveImage);
}

