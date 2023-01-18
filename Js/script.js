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

toDoList = [];
completedList = [];
const newItem = document.getElementById("newItem");
const itemTextField = document.getElementById("taskInput");
const taskRow = document.getElementById("taskRow");
const showCompleted = document.getElementById("showCompleted");

window.onload = function(){storage()}
function storage(){
    stored = localStorage.getItem("list");
    toDoList = stored.split(",");
    stored = localStorage.getItem("completedList");
    completedList = stored.split(",");
    display();
}

newItem.onclick = function() {addNewItem();}
function addNewItem(){
    toDoList.push(itemTextField.value);
    display();
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function display(){
    removeAllChildNodes(taskRow);
    for(let i = 0; i < toDoList.length; i++){
        newDiv = document.createElement("div");
        newDiv.classList.add("col-md-12");
        newDiv.classList.add("px-3");
        newDiv.classList.add("py-3");
        newDiv.classList.add("fs-5");
        newDiv.classList.add("rounded-2");
        newDiv.classList.add("border");
        newDiv.classList.add("mt-2");
        newDiv.style = "background-color: var(--bs-body-bg); color: var(--bs-body-color);";
        

        // <input class="form-check-input" type="checkbox">
        checkBox = document.createElement("input");
        checkBox.classList.add("form-check-input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.onclick = function() {complete(i)}

        text = document.createTextNode(" " + toDoList[i] + " ");

        // <div style="float: right;" class="">🗑</div>
        /* trashCan = document.createElement("div");
        trashCan.style = "float: right; background-color: red;";
        trashText = document.createTextNode("🗑");
        trashCan.appendChild(trashText);
        trashCan.onclick = function() {remove(i, "toDoList")} */
        //<button type="button" id="changeMode" class="btn btn-dark" style="background-color: var(--bs-body-bg); color: var(--bs-body-color);">🗑</button>
        trashCan = document.createElement("button");
        trashCan.style = "float: right; background-color: rgba(0, 0, 0, 0); border: hidden;"
        trashText = document.createTextNode("🗑");
        trashCan.appendChild(trashText);
        trashCan.onclick = function(){remove(i, "toDoList");}

        newDiv.appendChild(trashCan);
        newDiv.appendChild(checkBox);
        newDiv.appendChild(text)
        newDiv.appendChild(trashCan);
        taskRow.appendChild(newDiv);
    }
    localStorage.setItem("list", toDoList);
    localStorage.setItem("completedList", completedList);
    if(showCompleted.checked) displayCompleted();
}

function displayCompleted(){
    for(let i = 0; i < completedList.length; i++){
        newDiv = document.createElement("div");
        newDiv.classList.add("col-md-12");
        newDiv.classList.add("px-3");
        newDiv.classList.add("py-3");
        newDiv.classList.add("fs-5");
        newDiv.classList.add("rounded-2");
        newDiv.classList.add("border");
        newDiv.classList.add("mt-2");
        newDiv.style = "background-color: var(--bs-body-bg); color: var(--bs-body-color); text-decoration-line: line-through;";

        // <input class="form-check-input" type="checkbox">
        checkBox = document.createElement("input");
        checkBox.classList.add("form-check-input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.checked = true;

        text = document.createTextNode(" " + completedList[i] + " ");

        trashCan = document.createElement("button");
        trashCan.style = "float: right; background-color: rgba(0, 0, 0, 0); border: hidden;"
        trashText = document.createTextNode("🗑");
        trashCan.appendChild(trashText);
        trashCan.onclick = function(){remove(i, "completedList");}

        newDiv.appendChild(checkBox);
        newDiv.appendChild(text)
        newDiv.appendChild(trashCan);
        taskRow.appendChild(newDiv);
    }
}

function complete(index){
    completedList.push(toDoList[index]);
    temp = [];
    for(let i = 0; i < toDoList.length; i++){
        if(i != index){
            temp.push(toDoList[i]);
        }
    }
    toDoList = temp;
    display();
}

function remove(index, list){
    temp = [];
    switch(list){
        case "toDoList":
            for(let i = 0; i < toDoList.length; i++){
                if(i != index) temp.push(toDoList[i]);
            }
            toDoList = temp;
        break;
        case "completedList":
            for(let i = 0; i < completedList.length; i++){
                if(i != index) temp.push(completedList[i]);
            }
            completedList = temp;
        break;
    }
    display();
}