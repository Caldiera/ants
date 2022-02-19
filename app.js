// ______Config Section_______________
const milisecondsPerMove = 30; // 





let moving;
let dir;
let newDir;
let x;
let y;
let currentDir = [6];
let antId = 0;
let thisCurrentDir;
let walkingAnt;
let dpi = window.devicePixelRatio;
let right;
let up;
let dirChange;
// 1 = right
// 2 = right-down
// 3 = down
// 4 = left-down
// 5 = left
// 6 = left-up
// 7 = up
// 8 = right-up

let ants = []
const canvas = document.getElementById('canvas');
canvas.setAttribute('width', 2000);
canvas.setAttribute('height', 1000);
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';

class ant {
    constructor(x, y, dir) {
        this.x   =  x;
        this.y   =  y;
        this.dir =  dir;
    }
  }

function getNewDir(currentDir){
    dirId = Math.floor(Math.random() * 11);
    if (dirId<3){
        dirChange = -1
    };
    if (dirId>7){
        dirChange = 1
    }
    if (dirId>2){
        if (dirId<8){
            dirChange = 0
        }
    }
    newDir = currentDir + dirChange
    if (newDir == 0){
        return 8
    }
    if (newDir == 9){
        return 1
    }
    return newDir
}

function directionBias( currentX , currentY , target){
    targetX = target[0]
    targetY = target[1]
    if (currentX<targetX){
        right = 1;
    }else if(currentX==targetX){
        right=0
    }else{ right = -1}

    if (currentY<targetY){
        up = -1;
    }else if (currentY==targetY){
        up=0
    }else{ up=1 }


    // up-right
    if ((right==1)&&(up==-1)){
        dir=2
    }
    // right
    if ((right==1)&&(up==0)){
        dir=1
    }
    // right-down
    if ((right==1)&&(up==1)){
        dir=8
    }
    // up
    if ((right==0)&&(up==-1)){
        dir=3
    }
    // on the exact target location
    if ((right==0)&&(up==0)){
        dir=1+Math.floor(Math.random() * 8);
    }
    // down
    if ((right==0)&&(up==1)){
        dir=7
    }
    // left-up
    if ((right==-1)&&(up==-1)){
        dir=4
    }
    // left
    if ((right==-1)&&(up==0)){
        dir=5
    }
    // left-down
    if ((right==-1)&&(up==1)){
        dir=6
    }
    console.log('from x = ',currentX,'to x = ',targetX   )
    console.log(right)
    console.log('from Y = ',currentY,'to Y = ',targetY   )
    console.log(up)
    return(dir)

}

function walk(x ,y, dir){
    // accept current pos and new direction and return the x,y components
    if (dir==1 || dir==2 || dir==8){
        x+=1;
    }
    if (dir==4 || dir==5 || dir==6){
        x-=1;
    }
    if (dir==2 || dir==3 || dir==4){
        y+=1;
    }
    if (dir==6 || dir==7 || dir==8){
        y-=1;
    }
    return [x,y]
}

function createAnts(list,numberOfAnts){
    for (let i=0;i<numberOfAnts;i++){
        x = Math.floor(Math.random() * (canvas.width));
        // console.log(canvas.width)
        // console.log('x= ',x)
        y = Math.floor(Math.random() * (canvas.height));
        // console.log('y= ',y)
        dir = Math.floor(Math.random() * 8)+1;
        anty = new ant(x,y,dir);
        list.push(anty)
    }
}

function antPrinter(x,y){
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, 5, 5);
}

function PrintSq(x,y,size,color){
   
    ctx.fillStyle = color;
    // ctx.fillStyle = 'rgb(102, 204, 0)';
    ctx.fillRect(x, y, size, size);
}

function printGrid(){
    for (let i=0;i<2500;i+=100){
        for (let a=0;a<2500;a+=100){
            PrintSq(i,a,10,'rgb(150, 150, 0, 1)')
        }
    }
    for (let i in ants0){
        PrintSq(ants0[i].x,ants0[i].y,5,'rgb(150,150,150)')
    }
}

createAnts(ants , 200)
const targetPercentage = 80 
let ants0 = JSON.parse(JSON.stringify(ants));
let antTarget = [1000,500]
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i in ants){
        let targetDir = directionBias(ants[i].x,ants[i].y,antTarget)
        if (Math.abs(ants[i].dir - targetDir)<=1){
            if ((Math.floor(Math.random() * 100))<targetPercentage){
                newDir = targetDir
            }
        }
        else{newDir = getNewDir(ants[i].dir)}
        ants[i].dir = newDir
        pos = walk(ants[i].x,ants[i].y,newDir)
        ants[i].x = pos[0];
        ants[i].y = pos[1];
        antPrinter(pos[0],pos[1])
        
    }
    
    
    requestAnimationFrame(animate)
}
animate()


