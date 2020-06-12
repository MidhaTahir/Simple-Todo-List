//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event listeners
loadEventListeners();

function loadEventListeners(){
    //DOM load event (to get local storage to li on every load)
    document.addEventListener('DOMContentLoaded',getTasks);

    //Add task event
    form.addEventListener('submit',addTask);
    //Remove task event by delegation(since they are multiple and dynamic) so put listener on ul
    taskList.addEventListener('click',removeTask);
    //Clear task event
    clearBtn.addEventListener('click',clearTasks);
    //Filter tasks event
    filter.addEventListener('keyup',filterTasks);
}

//Get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
            //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link element (for delete)
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
    });
}


//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }else{
    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element (for delete)
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);

    //Store in LS
    storeTaskInLocalStorage(taskInput.value);
    
    //Clear input
    taskInput.value = '';
    }
    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}


//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Do you want to delete this task?')){
        e.target.parentElement.parentElement.remove();
        //remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
//REMOVE from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(e){
    // console.log(e.target.parentElement);
    // taskList.innerHTML = ''; //or use below method
    while(taskList.firstChild){//while there is first child
        taskList.removeChild(taskList.firstChild); //remove first child if there is still one
    }
    //Clear Task From LS
    clearTasksfromLocalStorage();
}

//Clear Task from LS
function clearTasksfromLocalStorage(){
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase(); //get what is typed in

    //query selector returns node list but getelementsby classname these all returns html collection then we have to convert them to array
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text)!= -1)//if there is no match it will be negative one
            {
                task.style.display = 'block';//block to show them
            }else{
                //no match
                task.style.display = 'none';
            }
        }
    )
}