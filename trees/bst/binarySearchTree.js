
const diff = 25;
const y_diff = 50;


class BinarySearchTree {
    constructor(root_x, root_y) {
        this.root = null;
        this.root_x = root_x;
        this.root_y = root_y;
    }

    // 插入新節點
    insert(val) {
        if(this.find(val)!=null) return;
        const newNode = new Node(val, this.root_x, this.root_y);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.val < node.val) {
            if (node.left === null) {
                this.adjust_tree(this.root, diff);
                newNode.parent = node;
                node.left = newNode;
                newNode.x = node.x - diff;
                newNode.y = node.y + y_diff; //y不變
                this.adjust_tree(this.root, diff);
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                this.adjust_tree(this.root, diff);
                newNode.parent = node;
                node.right = newNode;
                newNode.x = node.x + diff;
                newNode.y = node.y + y_diff;
                this.adjust_tree(this.root, diff);
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // 查找節點
    find(val) {
        return this.findNode(this.root, val);
    }

    findNode(node, val) {
        if (node === null) {
            return null; // 未找到
        } 
        if (val < node.val) {
            return this.findNode(node.left, val);
        } else if (val > node.val) {
            return this.findNode(node.right, val);
        } else {
            return node; // 找到目標節點
        }
    }
    
    
    changePos(root, offset){
        if(root===null) return;
        root.x += offset;
        this.changePos(root.left, offset);
        this.changePos(root.right, offset);
    }
    
    adjust_tree(node, offset){
        if(node==null) return;
        let p = node.parent;
        while(p!=null&&p.x!=node.x) p = p.parent;
        if(p!=null){
            this.changePos(p.left, 0-offset);
            this.changePos(p.right, offset);
        }
        if(node.left!=null) node.left.y = node.y+50;
        if(node.right!=null) node.right.y = node.y+50;
        this.adjust_tree(node.left, offset);
        this.adjust_tree(node.right, offset);
    }


    // 刪除節點
    delete(val) {
        this.root = this.deleteNode(this.root, val);
    }

    deleteNode(node, val) {  //working on it
        if (node === null) return null;
        
        if (val < node.val) {
            node.left = this.deleteNode(node.left, val);
            if(node.left!=null) node.left.parent = node;
        } else if (val > node.val) {

            node.right = this.deleteNode(node.right, val);
            if(node.right!=null) node.right.parent = node;
        } else { // 找到目標節點，開始刪除
            
            // 節點沒有子節點或只有一個子節點
            if (node.left == null) {
                if(node.right!=null&&node.right.parent==this.root) node.right.parent = null;
                return node.right;
            } 
            if (node.right == null) {
                if(node.left!=null&&node.left.parent==this.root) node.left.parent = null;
                return node.left;
            }

            // 節點有兩個子節點，找到右子樹中最小的節點 (要改的地方)
            const minRight = this.findMinNode(node.right);
            node.val = minRight.val;
            // 刪除右子樹中最小的節點
            
            node.right = this.deleteNode(node.right, minRight.val);
            if(node.right!=null) node.right.parent = node;

        }
        this.adjust_tree(this.root, diff);
        return node;
    }

    findMinNode(node) {
        
        while (node!=null && node.left != null) {
            node = node.left;
        }
        return node;
    }

    drawLine(ctx, a, b){
        if(a==null||b==null) return;
        ctx.beginPath();
        if(b.x<a.x){ //left_child
            ctx.moveTo(a.x-14, a.y+14); //processing
        }else{ //right_child
            ctx.moveTo(a.x+14, a.y+14); //processing
        }
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
    }

    drawTree(){
        if(this.root==null) return;
        const queue = [];
        queue.push(this.root);
        while(queue.length!=0){
            const l = queue.length;
            for(let i=0;i<l;i++){
                const k = queue.shift();
                this.drawLine(ctx, k.parent, k);
                k.draw(ctx);
                
                if(k.left!= null) queue.push(k.left);
                if(k.right!= null) queue.push(k.right);
            }
        }
    }
}