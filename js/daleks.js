function createDaleks() {
  var container = new createjs.Container();
  stage.addChild(container);
  var l = numOfDaleks;
  bmpList = [];
  for (i=0;i<l;i++) {
    bitmap = new createjs.Bitmap(dalekImage);
    container.addChild(bitmap);
    bitmap.name = "dalek" + i;
    resetEnemy(bitmap);
    bitmap.regX = bitmap.image.width/2|0;
    bitmap.regY = bitmap.image.height/2|0;
    bitmap.mouseEnabled = true;
    bmpList.push(bitmap)
  }
  
  createjs.Ticker.addEventListener('tick', handleTick);
};