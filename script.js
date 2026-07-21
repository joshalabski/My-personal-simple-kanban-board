let taskArray = [{
  id:1,
  title: "Wash dishes",
  status: "todo",
  dueDate: "2025-10-03"
}, {
  id:2,
  title: "sweep floor",
  status: "progress",
  dueDate: "2026-10-04"
}, {
  
  id:3,
  title: "watch tutorial",
  status: "done",
  dueDate: "2026-11-11"
}];


let count = 4;





function render() {

  const dateDue = new Date();
const year = dateDue.getFullYear();
let  month = dateDue.getMonth() + 1;
let  date = dateDue.getDate();

if(month < 10){
  month = "0" + month;
}

if(date < 10){
  date = "0" + date;
}

  const todayString = year + "-" + month + "-" + date;

  

  const allContainers = document.querySelectorAll(".tasks");
  for(let container of allContainers) {
   container.innerHTML = "";
  }

  for(let task of taskArray){
    const newDiv = document.createElement('div');
    newDiv.classList.add('div-class');

    newDiv.id = task.id;
    newDiv.draggable = true;

newDiv.textContent = task.title;

newDiv.addEventListener('dragstart', (e) => {
  // this allows the drop location to know which element is being moved when you release it 
  e.dataTransfer.setData("text/plain", task.id);
})

newDiv.addEventListener('dragend', (e) => {

})

const targetColumn = document.getElementById(task.status);

const targetTasks = targetColumn.querySelector(".tasks");

targetTasks.appendChild(newDiv);


 const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn')
  newDiv.appendChild(deleteBtn);
  const moveBtn = document.createElement('select');
  moveBtn.classList.add('move-btn');
  

  let movePlaceholder = document.createElement('option');
  let  moveButton = document.createElement('option');
  let  moveButton2 = document.createElement('option');
  let  moveButton3 = document.createElement('option');


   movePlaceholder.disabled = true;
   movePlaceholder.selected = true;

  movePlaceholder.value = "";
  moveButton.value = 'todo';
  moveButton2.value = 'progress';
  moveButton3.value = 'done';

 

  movePlaceholder.textContent = "Select Path";
  moveButton.textContent = 'To-do';
  moveButton2.textContent = 'Progress';
  moveButton3.textContent = 'Done';

  const dueDate = document.createElement('span');
dueDate.textContent = task.dueDate;
dueDate.classList.add('date');
newDiv.appendChild(dueDate);

if(task.dueDate){
 if(task.dueDate < todayString){
      dueDate.classList.add("overdue");
    }
  }



  moveBtn.addEventListener('change', () => {
    const taskFind = taskArray.find(item => item.id === task.id);
    taskFind.status = moveBtn.value;
    render();
  })


  newDiv.appendChild(moveBtn);
   moveBtn.appendChild(movePlaceholder);
  moveBtn.appendChild(moveButton);
  moveBtn.appendChild(moveButton2);
  moveBtn.appendChild(moveButton3);
 


  deleteBtn.addEventListener("click", () => {
    //Keep everything where the id is NOT equal to the current task's id
    taskArray = taskArray.filter(item => item.id !== task.id);

    //refresh the screen
    render();
  })
  }

}

const allLists = document.querySelectorAll(".list");

for(let list of allLists){
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  list.addEventListener("dragenter", (e) => {
    e.preventDefault()

    list.classList.add("over");
  });

  list.addEventListener("dragleave", (e) => {
    list.classList.remove("over")
  });

  list.addEventListener("drop", (e) => {
    const id = e.dataTransfer.getData("text/plain");

    const taskFind =  taskArray.find(item => item.id === Number(id));

    taskFind.status = list.id;
    list.classList.remove("over");

    render()
  });
}
  
const addBtn = document.querySelector(".add");

 addBtn.addEventListener("click", () => {
  const userTask = prompt("Enter your task!");
  const userDate = prompt("Enter the due date (YYYY-MM-DD)");
  if(userTask == null || userTask.trim() == ''){
    return;
  }

  const user = {
    id: count,
    title: userTask,
    status: "todo",
    dueDate: userDate
  }

  count++;
  taskArray.push(user);
  render();
  
 });

render();
