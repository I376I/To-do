button = document.getElementById("changeMode");
button.onclick = function() {changeMode();}
current = "dark";
function changeMode(){
    if(current == "dark") current = "light";
    else current = "dark";
    document.documentElement.setAttribute("data-bs-theme", current)
}