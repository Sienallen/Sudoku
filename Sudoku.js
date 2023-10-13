window.onload = function(){
  makeGrid();
  makeDigits();
}

let problem = 
 [[0,3,0,0,1,0,9,2,0],
  [2,0,0,8,0,7,0,3,1],
  [0,1,0,2,9,0,6,0,0],
  [0,0,9,0,3,4,0,8,2],
  [1,2,0,0,0,0,5,0,0],
  [0,0,8,0,2,9,0,6,3],
  [6,5,0,0,8,0,3,0,0],
  [0,0,0,0,0,0,0,0,0],
  [3,0,0,9,0,2,8,1,0]]

let solution = 
 [[8,3,5,4,1,6,9,2,7],
  [2,9,6,8,5,7,4,3,1],
  [4,1,7,2,9,3,6,5,8],
  [5,6,9,1,3,4,7,8,2],
  [1,2,3,6,7,8,5,4,9],
  [7,4,8,5,2,9,1,6,3],
  [6,5,2,7,8,1,3,9,4],
  [9,8,1,3,4,5,2,7,6],
  [3,7,4,9,6,2,8,1,5]]



//Creates the sudoku grid when the site is loaded
function makeGrid(){
  for (let r = 0; r < 9; r++){
    for (let c = 0; c < 9; c++){

    let box = document.createElement("div");
    box.id = "box_" + r.toString() + "_" + c.toString();

    if(problem[r][c] !== 0){
      box.innerText = problem[r][c];
      box.classList.add("givenBox");
    }
    else{
      box.classList.add("answerBox");
    }
    
    box.classList.add("box")
    if(c === 2 || c === 5){
      box.classList.add("vertical");
    }
    if(r === 2 || r === 5 ){
      box.classList.add("horizontal");
    }
    box.addEventListener("click", selectedBox);
    document.getElementById("sudokuGrid").appendChild(box);
    }  
  }
}

//creates the digits 1-9 below the sudoku grid
function makeDigits(){
  for (let i = 1; i < 10; i++){
    // <div id ="digit{i}" classname = "digit" onclick = selectedNum> i </digit>
    let num = document.createElement("div");
    num.id = "digit" + i.toString();
    num.innerText = i;
    num.classList.add("digit");
    num.addEventListener("click", addNum);
    document.getElementById("digitList").appendChild(num);
  }
}

//highlights the selected box along with the row and the col the box is in.
let boxElement = null;
function selectedBox(){
  const tempBox = this;

  if (boxElement === null){
    if(tempBox.classList.contains("answerBox")){
      boxElement = tempBox
      tempBox.classList.add('box-selected');
      //adds box-selected class to the row and col
      changeBoxSelected(boxElement, "add");

    }else if(tempBox.classList.contains("givenBox")){
      boxElement = tempBox;
      highlightBox(boxElement, "add");
    }
    

  }

  else if (boxElement !== tempBox){
    if(boxElement.classList.contains("givenBox")){

      highlightBox(boxElement, "remove");
    }else if (boxElement.classList.contains("answerBox")){
      boxElement.classList.remove('box-selected');
      //removes box-selected class to the row and col
      changeBoxSelected(boxElement, "remove");
    }
    

    boxElement = tempBox;
    
    if(boxElement.classList.contains("givenBox")){

      highlightBox(boxElement, "add");

    }else if (boxElement.classList.contains("answerBox")){
      boxElement.classList.add('box-selected');
      //removes box-selected class to the row and col
      changeBoxSelected(boxElement, "add");
    }

  }
  
  else if (boxElement === tempBox){ 

    if(boxElement.classList.contains("givenBox")){

      highlightBox(boxElement, "remove");

    }else if (boxElement.classList.contains("answerBox")){

      boxElement.classList.remove('box-selected');
      //removes box-selected class to the row and col
      changeBoxSelected(boxElement, "remove");
    }

    boxElement = null;
  }
  
}

function highlightBox(box, change){
  
  if(change === "add"){

    for(let i = 0; i < 9; i++ ){
      for(let j = 0; j <9; j++){
        let temp = document.getElementById(`box_${i}_${j}`)
        if(temp.classList.contains("givenBox") && temp.innerText === box.innerText){
          temp.classList.add("numMatch");
        }
      }
    }
  }else if(change === "remove"){

    for(let i = 0; i < 9; i++ ){
      for(let j = 0; j <9; j++){
        let temp = document.getElementById(`box_${i}_${j}`)
        if(temp.classList.contains("numMatch")){
          temp.classList.remove("numMatch");
        }
      }
    }
  }
}

//Used to highlight the rows and cols of the selected box in the grid.
function changeBoxSelected(box, change){
  r = parseInt(box.id[4]);
  c = parseInt(box.id[6]);

  if(change === "add"){
    for (let i = 0; i < 9; i++){
      //getting the boxes in row r
      let row_item = `box_${r}_${i}`;
      let col_item = `box_${i}_${c}`;
      document.getElementById(row_item).classList.add('box-selected');
      document.getElementById(col_item).classList.add('box-selected');
    }
    
  }else if(change === "remove"){
    for (let i = 0; i < 9; i++){
      //getting the boxes in row r
      let row_item = `box_${r}_${i}`;
      let col_item = `box_${i}_${c}`;
      document.getElementById(row_item).classList.remove('box-selected');
      document.getElementById(col_item).classList.remove('box-selected');
    }

  }
}

function addNum(){
  if(boxElement !== null){
    const digit = this;
    r = parseInt(boxElement.id[4]);
    c = parseInt(boxElement.id[6]);

    problem[r][c] = parseInt(digit.innerText);
    document.getElementById(`box_${r}_${c}`).innerText = problem[r][c];
    compareArray();
  }
}

function Erase(){
  if(boxElement !== null){
    if(boxElement.classList.contains("answerBox"))
      r = parseInt(boxElement.id[4]);
      c = parseInt(boxElement.id[6]);

      console.log("erasing");
      problem[r][c] = 0;
      document.getElementById(`box_${r}_${c}`).innerText = null;
      compareArray();
  }
}

function compareArray(){
  for(let i = 0; i < 9; i++ ){
    for(let j = 0; j <9; j++){

      if(problem[r][c] !== solution[r][c] && problem[r][c] !== 0){
        document.getElementById(`box_${r}_${c}`).classList.add("incorrect");
      }
      
      else if((problem[r][c] === solution[r][c] || problem[r][c] === 0) && document.getElementById(`box_${r}_${c}`).classList.contains("inccorect")){
        
        document.getElementById(`box_${r}_${c}`).classList.remove("incorrect")
      }

    }
  }
}