myCanvas.width = 400;
myCanvas.height = 300;

const margin = 30; //邊界，避免圖案被切到

const n = 20;
const array = [];
let moves = [];
const cols = [];
const spacing = (myCanvas.width-margin*2) / n;
const ctx = myCanvas.getContext("2d");

const maxColumnHeight = 200; 

init();

function init(){
    for(let i=0;i<n;i++){
        array[i] = Math.random();
    }
    moves = [];    
    for(let i=0;i<array.length;i++){
        const x = i*spacing + spacing/2 + margin; 
        const y = myCanvas.height - margin - i*3; //-i*3 利用高度差 可以增加立體感
        const width = spacing - 4;
        const height = maxColumnHeight * array[i]; 
        cols[i] = new Column(x, y, width, height);
    } 
}

function bubbleSortPlay(){
    moves = bubbleSort(array);  
}

function insertionSortPlay(){
    moves = insertionSort(array);
}

function selectionSortPlay(){
    moves = selectionSort(array);
}

function shellSortPlay(){
    moves = shellSort(array);
}


animate();

function bubbleSort(array){
    const moves = [];
    do{
        var swapped = false;
        for(let i=1;i<array.length;i++){
            if(array[i-1]>array[i]){
                swapped = true;
                [array[i-1], array[i]] = [array[i], array[i-1]];
                moves.push({
                    indices:[i-1, i], 
                    swap:true
                });
            }else{
                moves.push({
                    indices:[i-1, i], 
                    swap:false
                });
            }
        }
    }while(swapped);
    
    return moves;
}

function insertionSort(array){
    const moves = [];
    for(let i=1;i<array.length;i++){
        let cur = i;
        while(cur > 0 && array[cur-1]>array[cur]){
            moves.push({
                indices:[cur-1, cur],
                swap: true
            });
            [array[cur-1], array[cur]] = [array[cur], array[cur-1]];
            cur--;
        }
        moves.push({
            indices:[cur, i],
            swap: false 
        });
    }
    return moves;
}

function selectionSort(array){
    const moves = [];
    for(let i=0;i<array.length;i++){
        let cur_min = i;
        for(let j=i+1;j<array.length;j++){
            moves.push({indices:[j, j], select: true});
            if(array[j]<array[cur_min]){
                cur_min = j;
                moves.push({indices:[j, j], red: true});
            }
        }
        moves.push({
            indices: [i, cur_min],
            swap: true
        });
        [array[i], array[cur_min]] = [array[cur_min], array[i]];

    } 
    return moves;
}

function shellSort(array){
    const moves = [];
    const n = array.length;
    let gap = parseInt(n/2);  //取整數，因js預設為浮點數
    while(gap>=1){
        let check = true;
        console.log(gap);
        while(check){
            check = false;
            for(let i=0;i<n-gap;i++){
                if(array[i]>array[i+gap]){
                    moves.push({
                        indices:[i, i+gap],
                        swap: true
                    });
                    [array[i], array[i+gap]] = [array[i+gap], array[i]];
                    check = true;
                }else{
                    moves.push({
                        indices:[i, i+gap],
                        swap: false
                    });
                }
            }
        }
        gap = parseInt(gap/2);
    }
    return moves;
}





function animate(){
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    
    changed = false;

    for(let i=0;i<cols.length;i++){
        changed = cols[i].draw(ctx) || changed;

    }
    if(!changed && moves.length>0){
        const move = moves.shift(); // 回傳並刪除陣列中第一個元素
        const [i, j] = move.indices;
        if(move.swap){  //交換
            cols[i].moveTo(cols[j]);
            cols[j].moveTo(cols[i], -1);
            [cols[i], cols[j]] = [cols[j], cols[i]]; 
        }else if(move.select){
            cols[i].select();
        }else if(move.red){
            cols[i].red();
        }else{
            cols[i].jump();
            cols[j].jump();
        }
    }
    requestAnimationFrame(animate); //repeat animate function
}