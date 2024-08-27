myCanvas.height = 500;
myCanvas.width = 1200;

const ctx = myCanvas.getContext("2d");

const nodes = [];
let i = 0;
const margin = 30;
let root_x = 600;
let root_y = 30;

const bst = new BinarySearchTree(root_x, root_y);

//接收輸入的值
const form = document.getElementById("insert");
form.addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表單的默認提交行為

    // 獲取表單數據
    const formData = new FormData(form);

    // 獲取每個輸入框的值
    const num = parseInt(formData.get('val'));

    // 將數據顯示在控制台
    //console.log(num);
    if(num>0&&num<100) bst.insert(num);
    document.getElementById('val').value = ""; //清空input
});


const form2 = document.getElementById("delete");
form2.addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表單的默認提交行為

    // 獲取表單數據
    const formData = new FormData(form2);

    // 獲取每個輸入框的值
    const num = parseInt(formData.get('val2'));

    // 將數據顯示在控制台
    //console.log(num);
    if(num>0&&num<100) bst.delete(num);
    document.getElementById('val2').value = ""; //清空input
});

function randomBST(){
    const l = Math.floor(Math.random() * (10 - 1) + 1); // The maximum is exclusive and the minimum is inclusive
    
    for(let i=0;i<l;i++){
        bst.insert(Math.floor(Math.random() * (99 - 1) + 1));
    }
}

animate();

function animate(){
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    bst.drawTree();



    requestAnimationFrame(animate); //repeat animate function 
}