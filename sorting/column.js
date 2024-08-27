

class Column{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.queue = [];   //用來記錄每次位置、顏色變化
        this.color = {
            r: 150,
            g: 150,
            b: 150
        }
    }
    
    red(frameCount = 20){  //column turn red
        for(let i=1;i<=frameCount;i++){  //frameCount決定動畫長度
            const t = i / frameCount;
            const u = Math.sin(t * Math.PI);
            this.queue.push({
                x: this.x,
                y: this.y - u*this.width,
                r: lerp(150, 255, u),  //灰色變紅色
                g: lerp(150, 0, u),
                b: lerp(150, 0, u)
            });
        }
    }


    select(frameCount = 20){ //column turn dark gray
        for(let i=1;i<=frameCount;i++){  //frameCount決定動畫長度
            const t = i / frameCount;
            const u = Math.sin(t * Math.PI);
            this.queue.push({
                x: this.x,
                y: this.y - u*this.width,
                r: lerp(150, 100, u),
                g: lerp(150, 100, u),
                b: lerp(150, 100, u)
            });
        }
    }

    moveTo(loc, yOffset = 1, frameCount = 30){
        for(let i=1;i<=frameCount;i++){  //frameCount決定動畫長度
            const t = i / frameCount;
            const u = Math.sin(t * Math.PI);
            this.queue.push({
                x: lerp(this.x, loc.x, t), //The lerp() function is used to find a number between two numbers.
                y: lerp(this.y, loc.y, t) + u*this.width/2 * yOffset,
                r: lerp(150, 255, u), //a lerp function “eases” the transition between two values over time
                g: lerp(150, 0, u),
                b: lerp(150, 0, u)
            });
        }
    } 

    jump(frameCount = 20){
        for(let i=1;i<=frameCount;i++){
            const t = i/frameCount;
            const u = Math.sin(t * Math.PI);
            this.queue.push({
                x: this.x,
                y: this.y - u*this.width,
                r: lerp(150, 100, u),
                g: lerp(150, 100, u),
                b: lerp(150, 100, u)
            });
        }
    }


    draw(ctx){
        let changed = false;

        if(this.queue.length>0){
            const {x, y, r, g, b} = this.queue.shift(); //pop第一個元素
            this.x = x;
            this.y = y;
            this.color = {r, g, b};
            changed = true;
        }

        const left = this.x - this.width;
        const top = this.y - this.height;
        
        ctx.beginPath(); //開始畫column
        const {r, g, b} = this.color;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`; //重要!!!
        ctx.rect(left, top, this.width, this.height);
        ctx.fill();
        ctx.stroke();
        ctx.textAlign="center";
        //ctx.textBaseline="middle";
        ctx.font = "18px Arial";
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillText(`${Math.round(this.height)}`, left+this.width/2, top+18+this.height);
        
        return changed;
    }

}

