const gameInfo=document.querySelector(".game-info");
const boxes=document.querySelectorAll(".box");
const newGameBtn=document.querySelector(".btn");


let currentPlayer;//starting player hmesha 'x' hoga
let gameGrid;//starting me grid empty hoga
const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//.....................................................................

//lets create the function to initialize the game-
function initGame(){
    currentPlayer="X";
    //starting me grid empty rkha gya h
    gameGrid=["","","","","","","","",""];

    //ui pr bhi toh empty karana h or phle cursor pointer none kr diya tha toh phle ki trh on krna pdega-
 boxes.forEach((box,index)=>{
    box.innerText="";
    boxes[index].style.pointerEvents="all";

    //green color ko bhi remove krna h so initialise box with css properties again
    box.classList=`box tile${index+1}`; 

 });

    newGameBtn.classList.remove("active");
    //ui pr render bhi toh karana h ki konsa player khel rha h
    gameInfo.innerText=`current Player-${currentPlayer}`;
}

initGame();
//.........................................................
function swapTurn(){
    if(currentPlayer==="X"){
        
        currentPlayer="0";
    }
    else{
       
        currentPlayer="X";
    }
    //ui update

    gameInfo.innerText=`Current Player -${currentPlayer}`;

}
//.........................................................................

function checkGameOver(){
    let answer="";
   winningPositions.forEach((position)=>{
 //all 3 boxes should be non empty and exactly same in the value
     if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
     && (gameGrid[position[0]]=== gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){
 
 
         //check if winner is x or 0
 
         if(gameGrid[position[0]]==="X"){
             answer="X";
 
         }
         else{
             answer="0";
         }
 
       
     
 
     //now x/0 is winner showing green colour
 
     boxes[position[0]].classList.add("win");
     boxes[position[1]].classList.add("win");
     boxes[position[2]].classList.add("win");
     }
 
     }); 
   
   //it means we have winner
   if(answer!==""){
     gameInfo.innerText=`Winner Player -${answer}`;
     newGameBtn.classList.add("active");
   return;
 }
 
 //when there is no winner-it will be tie
 let fillCount=0;
 
 gameGrid.forEach((box)=>{
 if(box!==""){
     fillCount++;
 } 
 });
 
 //board is filled ,game TIE
 if(fillCount===9){
     gameInfo.innerText="Game Tied!"
     newGameBtn .classList.add("active");
 }
 } 

 //...................................................................................
 
 function handleClick(index){ 
    //but har bar element dalne se phle vo check krega ki koi jeet toh nhi gya-
   if(gameGrid[index]===""){
    //if box empty h toh curr player dal do
    boxes[index].innerText=currentPlayer;//ye wali line ui me change kregi 
    gameGrid[index]=currentPlayer;//or ye wali line jo hmne jo grid bana rkha h usme change kregi jise hum apna state check kr rhe h
 
    //and ab uspe cursor pointer leke gye toh pointer na bne uske liye--
     boxes[index].style.pointerEvents="none";

    //ab turn jo h switch ho jayegi,means next player ko 
    swapTurn();

    //check koi jeet toh nhi gya
     checkGameOver();

}
   }
   //.............................................................
//sare boxes pr event listener lagana h toh loop lagayenge
boxes.forEach((box,index) => {
box.addEventListener("click",()=>{
    handleClick(index);
})
});
//...............................................................



//new game wale btn pr click kroge toh vo init funct ko call krega
newGameBtn.addEventListener("click",initGame);
  

