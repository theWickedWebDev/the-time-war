function handleKeyDown(event) {
  if (event.keyCode == 32) {
    event.preventDefault();
    clicked = true;
  }
};

function handleKeyUp(event) {
  if (event.keyCode == 32) {
    event.preventDefault();
    clicked = false;
  }
};

function handleClick() {
  canvas.onclick = null;
  stage.removeChild(gameTxt);
  
  play = true;
};

function onMouseDown() {
  if(!e){var e = window.event;}
  clicked = true;
};

function onMouseUp() {
  clicked = false;
};
