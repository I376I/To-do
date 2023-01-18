changeModeButton = document.getElementById("changeMode");
changeModeButton.onclick = function() {changeMode();}
current = "dark";
function changeMode(){
    if(current == "dark"){
        current = "light";
        changeModeButton.innerText = "☀";
    }
    else{
        current = "dark";
        changeModeButton.innerText = "🌙";
    }
    document.documentElement.setAttribute("data-bs-theme", current)
}

data = [];
window.onload = function(){
    input = localStorage.getItem("list");
    data = JSON.parse(input)
    display();
}

const newItem = document.getElementById("newItem");
const itemTextField = document.getElementById("taskInput");
const taskRow = document.getElementById("taskRow");
const showCompleted = document.getElementById("showCompleted");

newItem.onclick = function() {addNewItem();}
function addNewItem(){
    object = itemTextField.value;
    data.push({name: itemTextField.value, status: "pending"});
    console.log(data);
    display();
}

function display(){
    removeAllChildNodes(taskRow);
    for(let i = 0; i < data.length; i++){
        if(data[i].status == "pending") displayPending(i);
        else if(data[i].status == "completed" && showCompleted.checked) displayCompleted(i)
    }

    localStorage.setItem("list", JSON.stringify(data));
    // if(showCompleted.checked) displayCompleted();
}

draginated = null;

function displayPending(index){
    newDiv = document.createElement("div");
    newDiv.classList.add("col-md-12");
    newDiv.classList.add("px-3");
    newDiv.classList.add("py-3");
    newDiv.classList.add("fs-5");
    newDiv.classList.add("rounded-2");
    newDiv.classList.add("border");
    newDiv.classList.add("mt-2");
    newDiv.style = "background-color: var(--bs-body-bg); color: var(--bs-body-color);";

    newDiv.id = index;

    newDiv.setAttribute("draggable", "true");
    newDiv.addEventListener("dragover", (event)=>{
        event.preventDefault();
    })
    newDiv.addEventListener("dragstart", (event)=>{
        draginated = event.target;
    })
    newDiv.addEventListener("drop", (event)=>{
        item = event.target.id;
        temp = data[item];
        data[item] = data[draginated.id];
        data[draginated.id] = temp;
        display();
    })
    

    checkBox = document.createElement("input");
    checkBox.classList.add("form-check-input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.onclick = function() {complete(index)}

    text = document.createTextNode(" " + data[index].name + " ");

    trashCan = document.createElement("button");
    trashCan.style = "float: right; background-color: rgba(0, 0, 0, 0); border: hidden;"
    trashText = document.createTextNode("🗑");
    trashCan.appendChild(trashText);
    trashCan.onclick = function(){remove(index);}

    newDiv.appendChild(trashCan);
    newDiv.appendChild(checkBox);
    newDiv.appendChild(text)
    newDiv.appendChild(trashCan);
    taskRow.appendChild(newDiv);
}

function complete(i){
    data[i].status = "completed";
    display();
}

function displayCompleted(index){
    newDiv = document.createElement("div");
    newDiv.classList.add("col-md-12");
    newDiv.classList.add("px-3");
    newDiv.classList.add("py-3");
    newDiv.classList.add("fs-5");
    newDiv.classList.add("rounded-2");
    newDiv.classList.add("border");
    newDiv.classList.add("mt-2");
    newDiv.style = "background-color: var(--bs-body-bg); color: var(--bs-body-color); text-decoration-line: line-through;";

    newDiv.id = index;

    newDiv.setAttribute("draggable", "true");
    newDiv.addEventListener("dragover", (event)=>{
        event.preventDefault();
    })
    newDiv.addEventListener("dragstart", (event)=>{
        draginated = event.target;
    })
    newDiv.addEventListener("drop", (event)=>{
        item = event.target.id;
        temp = data[item];
        data[item] = data[draginated.id];
        data[draginated.id] = temp;
        display();
    })
    

    checkBox = document.createElement("input");
    checkBox.classList.add("form-check-input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.checked = true;
    checkBox.onclick = function() {unComplete(index)}

    text = document.createTextNode(" " + data[index].name + " ");

    trashCan = document.createElement("button");
    trashCan.style = "float: right; background-color: rgba(0, 0, 0, 0); border: hidden;"
    trashText = document.createTextNode("🗑");
    trashCan.appendChild(trashText);
    trashCan.onclick = function(){remove(index);}

    newDiv.appendChild(trashCan);
    newDiv.appendChild(checkBox);
    newDiv.appendChild(text)
    newDiv.appendChild(trashCan);
    taskRow.appendChild(newDiv);
}

function unComplete(i){
    data[i].status = "pending";
    display();
}

function remove(index){
    temp = [];
    for(let i = 0; i < data.length; i++){
        if(i != index) temp.push(data[i]);
    }
    data = temp;
    display();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
