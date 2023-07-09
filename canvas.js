let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let drawFlag = false;
let pencilColor = document.querySelectorAll(".color");
let pencilWidthElem = document.querySelector(".pencil_width input");
let eraserWidthElem = document.querySelector(".eraser_width input");
let download = document.querySelector(".Download");
let pointer = document.querySelector(".pointer");
let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;

let undoRedoData = [];
let track = 0;

let mouseDown = false;

let tool = canvas.getContext("2d");

tool.strokeStyle = penColor;
tool.lineWidth = penWidth;
canvas.addEventListener("mousedown", (e) => {
  if (drawFlag == false) {
    return;
  }
  mouseDown = true;
  beginPath({
    x: e.clientX,
    y: e.clientY,
  });
});
canvas.addEventListener("mousemove", (e) => {
  if (mouseDown)
    drawStroke({
      x: e.clientX,
      y: e.clientY,
    });
});

canvas.addEventListener("mouseup", (e) => {
  mouseDown = false;
  let url = canvas.toDataURL();
  undoRedoData.push(url);
  track = undoRedoData.length - 1;
  console.log(track);
  // console.log(undoRedoData);
});
function beginPath(strokeObj) {
  tool.beginPath();
  tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
  tool.strokeStyle = strokeObj.color;
  tool.lineWidth = strokeObj.width;
  tool.lineTo(strokeObj.x, strokeObj.y);
  tool.stroke();
}
pencilColor.forEach((colorElem) => {
  colorElem.addEventListener("click", (e) => {
    let color = colorElem.classList[0];
    penColor = color;
    tool.strokeStyle = penColor;
  });
});

pencilWidthElem.addEventListener("change", (e) => {
  penWidth = pencilWidthElem.value;
  tool.lineWidth = penWidth;
});
eraserWidthElem.addEventListener("change", (e) => {
  eraserWidth = eraserWidthElem.value;
  tool.lineWidth = eraserWidth;
});
eraser.addEventListener("click", (e) => {
  drawFlag = true;
  tool.strokeStyle = eraserColor;
  tool.lineWidth = eraserWidth;
});
pencil.addEventListener("click", (e) => {
  drawFlag = true;
  tool.strokeStyle = penColor;
  tool.lineWidth = penWidth;
});

download.addEventListener("click", (e) => {
  let url = canvas.toDataURL();

  let a = document.createElement("a");
  a.href = url;
  a.download = "board.jpg";
  a.click();
});

undo.addEventListener("click", (e) => {
  if (track > 0) {
    track--;
  }
  let trackObj = {
    trackValue: track,
    undoRedoData,
  };
  console.log(track);
  undoredoCanvas(trackObj);
});
redo.addEventListener("click", (e) => {
  if (track < undoRedoData.length - 1) {
    track++;
  }
  let trackObj = {
    trackValue: track,
    undoRedoData,
  };
  undoredoCanvas(trackObj);
});
function undoredoCanvas(trackObj) {
  track = trackObj.trackValue;
  undoRedoData = trackObj.undoRedoData;
  tool.clearRect(0, 0, canvas.width, canvas.height);
  let url = undoRedoData[track];
  console.log(url);
  let img = new Image();
  img.src = url;
  img.onload = (e) => {
    tool.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  console.log(`action done`);
}
pointer.addEventListener("click", (e) => {
  drawFlag = false;
});
