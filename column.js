class Column{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.queue = [];
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
                r: lerp(150, 255, u),
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
                r: lerp(150, 255, u),
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

        const left = this.x - this.width/2;
        const top = this.y - this.height;
        const right = this.x + this.width/2;
        
        ctx.beginPath(); //開始畫column
        const {r, g, b} = this.color;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`; //重要!!!
        ctx.moveTo(left, top); //移動滑鼠
        ctx.lineTo(left, this.y); //連直線到
        ctx.ellipse(this.x, this.y, this.width/2, this.width/4, 0, Math.PI, Math.PI*2, true);
        ctx.lineTo(right, top); 
        ctx.ellipse(this.x, top, this.width/2, this.width/4, 0, 0, Math.PI*2, true);
        ctx.fill();
        ctx.stroke();

        return changed;
    }

}

