let button = document.querySelector(".st");
let input = document.querySelector(".todo_input");
let taskbox = document.querySelector(".task");
let finishbox = document.querySelector(".finish");
let todo_Icon = document.querySelector(".todoIcon");
let remove = document.querySelector(".todo .header_cont .remove");
let todoBox = document.querySelector(".todo");
todo_Icon.addEventListener("click", (e) => {
  todoBox.style.display = "block";
});
remove.addEventListener("click", (e) => {
  todoBox.style.display = "none";
});
button.addEventListener("click", cb);

function cb() {
  let value = input.value.trim();
  if (value) {
    taskCreator(value);
    input.value = "";
  } else {
    alert("Enter input");
  }
}
function taskCreator(value) {
  console.log(value);
  //create the elements
  let div = document.createElement("div");
  let para = document.createElement("p");
  let cross = document.createElement("button");
  let done = document.createElement("button");
  // Assigning textValue
  para.textContent = value;
  cross.textContent = "❌";
  done.textContent = "✔️";
  // Giving class to newly formed elements
  cross.classList.add("cross");
  done.classList.add("done");
  // Adding the elements to the Main div
  div.appendChild(para);
  div.appendChild(cross);
  div.appendChild(done);
  taskbox.appendChild(div);
  // Providing Functionality to the Buttons
  cross.addEventListener("click", deleteTask.bind(null, div));
  done.addEventListener("click", transfer.bind(null, div, taskbox));
}
function deleteTask(element) {
  element.remove();
}
function transfer(element, currBox) {
  let futBox = currBox == taskbox ? finishbox : taskbox;
  let symbol = currBox == taskbox ? "🔙" : "✔️";
  let elementCopy = element.cloneNode(true);
  elementCopy
    .querySelector(".cross")
    .addEventListener("click", deleteTask.bind(null, elementCopy));
  let doneProp = elementCopy.querySelector(".done");

  doneProp.addEventListener("click", transfer.bind(null, elementCopy, futBox));
  doneProp.textContent = symbol;

  futBox.appendChild(elementCopy);
  element.remove();
}
