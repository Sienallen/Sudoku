var boxes = new Array(' ', 81);
let numPrint;
let buttonElement = '';

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