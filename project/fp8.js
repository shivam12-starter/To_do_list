let taskcontainer = document.getElementsByClassName("taskcontainer")
let tasks = document.getElementById("tasks");
let tasklist = document.getElementsByClassName("tasknames");
let checkbox = document.getElementsByClassName("check");
let taskname = document.getElementsByClassName("taskname");
let edit = document.getElementsByClassName("edit");
let deletes = document.getElementsByClassName("delete");
let ongoingtask = document.getElementById("ongoing");
let completedtask = document.getElementById("completed");
let dialog = document.querySelector("dialog");
let addlist = document.getElementById("addlist");
let newtaskname = document.getElementById("task");
let addtask = document.getElementById("add");
let close = document.getElementById("close");
let editbox = document.getElementById("editbox");
let editname = document.getElementById("editname");
let save = document.getElementById("save");
let cancel = document.getElementById("cancel");
let addDialog = document.querySelector(".taskaddcontainer");
let editDialog = document.getElementById("editbox");

addlist.addEventListener("click", function(){
    addDialog.showModal();
});


document.getElementById("close").addEventListener("click", function(){
    addDialog.close();
});

Array.from(document.getElementsByClassName("edit")).forEach((btn, idx) => {
    btn.addEventListener("click", function(){
    
        let label = btn.parentElement.querySelector(".taskname");
        editname.value = label.textContent;
        editDialog.showModal();

    
        save.onclick = function() {
            label.textContent = editname.value;
            editDialog.close();
        };
        
        cancel.onclick = function() {
            editDialog.close();
        };
    });
});
addtask.addEventListener("click", function() {
    let value = taskinput.value.trim();
    if (value) {
        
       let lili = document.createElement("li");
        ul.className = "taskname"
        
        li.innerHTML = `
                    <input type="checkbox" name="check" class ="check">
            <label class = "taskname">${value}</label>
            
        `;

          taskcontainer.appendChild(li);
        taskinput.value = ""; // clear input
        dialog.close();
        let ongoingdiv = document.createElement("div")
ongoingdiv.id = "ot"        
    ongoingdiv.innerHTML = `<label>${value}</label>`
    ongoingtask.appendChild(ongoingdiv)
    ongoingdiv.style.fontFamily = "Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
    } 
   } 
)

 checkbox.addEventListener('change', function() {
 if (checkbox.checked) {
    taskname.style.textDecoration = 'line-through';
    completedtask.innerHTML = 
    `${listitem[0]}`
  } else {
    taskname.style.textDecoration = 'none';
  }})
deletes.addEventListener("click", function(){
 tasklist.remove();
});
edit.addEventListener("click", function(){

});