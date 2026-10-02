
const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const loadSamplesBtn = document.querySelector("#loadSamplesBtn");

const taskList = document.querySelector("#taskList");
const taskMessage = document.querySelector("#taskMessage");

const totalCount = document.querySelector("#totalCount");
const pendingCount = document.querySelector("#pendingCount");
const completedCount = document.querySelector("#completedCount");


let taskIdCounter = 1;


function createTaskElement(taskText, taskId) {

    const taskItem = document.createElement("li");

    taskItem.classList.add("task-item");

    taskItem.dataset.taskId = taskId;
    taskItem.dataset.state = "pending";


   
    const textSpan = document.createElement("span");

    textSpan.classList.add("task-text");

    textSpan.textContent = taskText;


   
    const completeButton = document.createElement("button");

    completeButton.classList.add("complete-btn");

    completeButton.textContent = "Complete";


 
    const editButton = document.createElement("button");

    editButton.classList.add("edit-btn");

    editButton.textContent = "Edit";


    
    const removeButton = document.createElement("button");

    removeButton.classList.add("remove-btn");

    removeButton.textContent = "Remove";


   
    taskItem.appendChild(textSpan);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(editButton);
    taskItem.appendChild(removeButton);


   
    return taskItem;
}


function addTask(taskText) {

    const cleanText = taskText.trim();


  
    if (cleanText === "") {

        taskMessage.textContent = "Task cannot be empty";

        return;
    }

    
    const taskId = `task-${taskIdCounter}`;

    taskIdCounter++;


    
    const taskItem = createTaskElement(cleanText, taskId);


    taskList.appendChild(taskItem);


    taskInput.value = "";



    taskMessage.textContent = "";

    updateTaskCounts();
}



function toggleTaskComplete(taskItem) {

    taskItem.classList.toggle("completed");


    if (taskItem.classList.contains("completed")) {

        taskItem.dataset.state = "completed";

    } else {

        taskItem.dataset.state = "pending";
    }


    updateTaskCounts();
}

function beginTaskEdit(taskItem) {

    const textSpan = taskItem.querySelector(".task-text");

    const editButton = taskItem.querySelector(".edit-btn");


    const currentText = textSpan.textContent;


    const editInput = document.createElement("input");

    editInput.type = "text";

    editInput.classList.add("edit-input");

    editInput.value = currentText;


    textSpan.replaceWith(editInput);


   
    editButton.textContent = "Save";


    editInput.focus();
}


function saveTaskEdit(taskItem) {

    const editInput = taskItem.querySelector(".edit-input");

    const editButton = taskItem.querySelector(".edit-btn");


    if (!editInput) {
        return;
    }


    const newText = editInput.value.trim();


    if (newText === "") {

        taskMessage.textContent = "Task cannot be empty";

        return;
    }



    const newTextSpan = document.createElement("span");

    newTextSpan.classList.add("task-text");

    newTextSpan.textContent = newText;


    editInput.replaceWith(newTextSpan);


    editButton.textContent = "Edit";


    taskMessage.textContent = "";


    updateTaskCounts();
}


function removeTask(taskItem) {

    taskItem.remove();

    updateTaskCounts();
}


function updateTaskCounts() {

    const taskItems = taskList.querySelectorAll(".task-item");


    const total = taskItems.length;

    let pending = 0;

    let completed = 0;


    taskItems.forEach(function(taskItem) {

        if (taskItem.dataset.state === "completed") {

            completed++;

        } else {

            pending++;
        }

    });


    totalCount.textContent = total;

    pendingCount.textContent = pending;

    completedCount.textContent = completed;
}


function handleTaskListClick(event) {

    const clickedButton = event.target;


    const taskItem = clickedButton.closest(".task-item");


    if (!taskItem) {
        return;
    }



    if (clickedButton.classList.contains("complete-btn")) {

        toggleTaskComplete(taskItem);

        return;
    }


    if (clickedButton.classList.contains("edit-btn")) {

        if (clickedButton.textContent === "Edit") {

            beginTaskEdit(taskItem);

        } else {

            saveTaskEdit(taskItem);
        }

        return;
    }


    if (clickedButton.classList.contains("remove-btn")) {

        removeTask(taskItem);

        return;
    }
}


function loadSampleTasks() {

    const fragment = document.createDocumentFragment();


    const sampleTasks = [
        "Review DOM selectors",
        "Practice createElement",
        "Study event delegation"
    ];


    sampleTasks.forEach(function(taskText) {

        const taskId = `task-${taskIdCounter}`;

        taskIdCounter++;


        const taskItem = createTaskElement(
            taskText,
            taskId
        );


        fragment.appendChild(taskItem);
    });


    taskList.appendChild(fragment);


    updateTaskCounts();

    taskMessage.textContent = "";
}



addTaskBtn.addEventListener("click", function() {

    addTask(taskInput.value);

});



taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask(taskInput.value);

    }

});


loadSamplesBtn.addEventListener("click", function() {

    loadSampleTasks();

});



taskList.addEventListener("click", handleTaskListClick);



updateTaskCounts();