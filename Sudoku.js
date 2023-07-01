var boxes = new Array(' ', 81);
let numPrint;
let buttonElement = '';
makeGrid();

function selectedNum(buttonName){
  const tempButton = document.querySelector(buttonName);

  if (buttonElement === ''){
    buttonElement = tempButton
    tempButton.classList.add('button-selected');
  }

  else if (buttonElement !== tempButton){
    buttonElement.classList.remove('button-selected');
    buttonElement = tempButton;
    tempButton.classList.add('button-selected');
  }
  
  else if (buttonElement === tempButton){ 
    buttonElement = '';
    tempButton.classList.remove('button-selected');
  }

}

function makeGrid(){
  let HTMLList = '';
  for (let i = 0; i < 81; i++){

    const html = `
      <button 
      " class = css-Buttongrid${i} css-Buttongrid></button> 
      `;
    HTMLList += html;
  }
  document.querySelector('.Sudoku-grids').innerHTML = HTMLList;
}