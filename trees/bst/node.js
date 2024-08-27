class Node{
    constructor(val, x, y){
        this.val = val;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.x = x;
        this.y = y;
        this.queue = [];
        this.color = {
            r: 200,
            g: 200,
            b: 200 
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

        
        ctx.beginPath(); //開始畫column
        const {r, g, b} = this.color;
        const node_size = 20;  //node 半徑大小
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`; //重要!!!
        ctx.arc(this.x, this.y, node_size, 0, 2*Math.PI);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.font = "20px serif";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillText(`${this.val}`, this.x, this.y, 20);
        ctx.stroke();
        
        return changed;
    }


}
/*
//連到右child node線
ctx.beginPath();
ctx.moveTo(root_x+node_size-8, root_y+node_size-8);
ctx.lineTo(root_x+node_size*2-17, root_y+node_size*2-17);
ctx.stroke();

//連到左child node線
ctx.beginPath();
ctx.moveTo(root_x-node_size+8, root_y+node_size-8);
ctx.lineTo(root_x-node_size*2+17, root_y+node_size*2-17);
ctx.stroke();
*/