let toolContainer = document.querySelector(".tool_bar");
let optionContainer = document.querySelector(".options");
let pencil = document.querySelector(".pencil");
let pencilTool = document.querySelector(".pencil_tool");
let eraser = document.querySelector(".eraser");
let eraserTool = document.querySelector(".eraser_tool");
let upload = document.querySelector(".photo");
let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo");
let p_close = pencilTool.querySelector(".close");
let e_close = eraserTool.querySelector(".close");
let sticky = document.querySelector(".StickyNote");

let optionalFlag = true;
let initialX;
let initialY;
let initialWidth;
let initialHeight;
let ele;
let parent;

optionContainer.addEventListener("click", (e) => {
  optionalFlag = !optionalFlag;
  if (optionalFlag) openTools();
  else closeTools();
});

function openTools() {
  let iconElem = optionContainer.children[0];
  iconElem.classList.remove("fa-xmark");
  iconElem.classList.add("fa-bars");
  toolContainer.style.display = "flex";
}
function closeTools() {
  let iconElem = optionContainer.children[0];
  iconElem.classList.remove("fa-bars");
  iconElem.classList.add("fa-xmark");
  toolContainer.style.display = "none";
  eraserTool.style.display = "none";
  pencilTool.style.display = "none";
}
p_close.addEventListener("click", (e) => {
  pencilTool.style.display = "none";
});
e_close.addEventListener("click", (e) => {
  eraserTool.style.display = "none";
});
pencil.addEventListener("click", (e) => {
  pencilTool.style.display = "block";
  eraserTool.style.display = "none";
});

eraser.addEventListener("click", (e) => {
  eraserTool.style.display = "block";
  pencilTool.style.display = "none";
});
sticky.addEventListener("click", (e) => {
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky_cont");
  stickyCont.innerHTML = `
  <div class="header_cont">
  <div class="minimize"></div>
  <div class="remove"></div>
</div>
<div class="note_cont">
  <textarea class ="textarea"></textarea>
</div>
  `;
  document.body.appendChild(stickyCont);

  let minimize = stickyCont.querySelector(".minimize");
  let remove = stickyCont.querySelector(".remove");
  noteActions(minimize, remove, stickyCont);
  stickyCont.querySelector(".note_cont").onmouseup = function (event) {
    setSize(stickyCont);
  };
  stickyCont.querySelector(".header_cont").onmousedown = function (event) {
    dragAndDrop(stickyCont, event);
  };
  stickyCont.ondragstart = function () {
    return false;
  };
});

function setSize(element) {
  let textArea = element.querySelector(".textarea");
  let noteCont = element.querySelector(".note_cont");
  let header = element.querySelector(".header_cont");
  let height = getComputedStyle(textArea).getPropertyValue("height");
  let width = getComputedStyle(textArea).getPropertyValue("width");
  noteCont.style.height = height;
  noteCont.style.width = width;
  header.style.width = width;
}

function noteActions(minimize, remove, stickyCont) {
  remove.addEventListener("click", (e) => {
    stickyCont.remove();
  });
  minimize.addEventListener("click", (e) => {
    let noteCont = stickyCont.querySelector(".note_cont");
    let display = getComputedStyle(noteCont).getPropertyValue("display");
    if (display === "none") noteCont.style.display = "block";
    else noteCont.style.display = "none";
  });
}
function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the element at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the element on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the element, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}

upload.addEventListener("click", (e) => {
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();
  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky_cont");
    stickyCont.innerHTML = `
    <div class="header_cont">
    <div class="minimize"></div>
    <div class="remove"></div>
  </div>
  <div class="note_cont">
    <img src = "${url}"/>
  </div>
    `;
    document.body.appendChild(stickyCont);
    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);
    stickyCont.querySelector(".note_cont").onmousedown = function (event) {
      reSize(event);
    };
    stickyCont.querySelector(".header_cont").onmousedown = function (event) {
      dragAndDrop(stickyCont, event);
    };
    stickyCont.ondragstart = function () {
      return false;
    };
  });
});

function reSize(e) {
  initialX = e.clientX;
  initialY = e.clientY;
  ele = e.currentTarget;
  parent = ele.offsetParent;
  console.log(parent);
  initialWidth = parseFloat(getComputedStyle(ele).width);
  initialHeight = parseFloat(getComputedStyle(ele).height);
  window.addEventListener("mousemove", doResize);
  window.addEventListener("mouseup", stopResize);
}
function doResize(e) {
  // Calculate the new width and height of the div
  const newWidth = initialWidth + (e.clientX - initialX);
  const newHeight = initialHeight + (e.clientY - initialY);

  // Update the width and height of the div
  parent.querySelector(".header_cont").style.width = `${newWidth}px`;
  ele.style.width = `${newWidth}px`;
  ele.style.height = `${newHeight}px`;
}
function stopResize() {
  // Remove the event listeners for the mousemove and mouseup events
  window.removeEventListener("mousemove", doResize);
  window.removeEventListener("mouseup", stopResize);
}
