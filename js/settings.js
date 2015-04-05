function buildSettings() {
  if(container) {
    stage.removeChild(container);
    numOfDaleks = document.getElementById('dalekCount').value;
    createDaleks();
  } else {
    numOfDaleks = document.getElementById('dalekCount').value;
  }
};