javascript
// ==========================================
// DOM SELECTORS
// ==========================================

const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const loadSamplesBtn = document.querySelector("#loadSamplesBtn");

const taskList = document.querySelector("#taskList");
const taskMessage = document.querySelector("#taskMessage");

const totalCount = document.querySelector("#totalCount");
const pendingCount = document.querySelector("#pendingCount");
const completedCount = document.querySelector("#completedCount");


// ==========================================
// TASK ID COUNTER
// ==========================================

let taskIdCounter = 1;


// ==========================================
// CREATE TASK ELEMENT
// ==========================================

function createTaskElement(taskText, taskId) {

    // Create the main list item
    const taskItem = document.createElement("li");

    taskItem.classList.add("task-item");

    taskItem.dataset.taskId = taskId;
    taskItem.dataset.state = "pending";


    // Create task text
    const textSpan = document.createElement("span");

    textSpan.classList.add("task-text");

    // IMPORTANT:
    // Use textContent instead of innerHTML
    textSpan.textContent = taskText;


    // Create Complete button
    const completeButton = document.createElement("button");

    completeButton.classList.add("complete-btn");
    completeButton.textContent = "Complete";


    // Create Edit button
    const editButton = document.createElement("button");

    editButton.classList.add("edit-btn");
    editButton.textContent = "Edit";


    // Create Remove button
    const removeButton = document.createElement("button");

    removeButton.classList.add("remove-btn");
    removeButton.textContent = "Remove";


    // Add elements to task item
    taskItem.appendChild(textSpan);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(editButton);
    taskItem.appendChild(removeButton);


    // Return the element
    // Do NOT add it to taskList here
    return taskItem;
}


// ==========================================
// ADD TASK
// ==========================================

function addTask(taskText) {

    const cleanText = taskText.trim();


    // Validate task
    if (cleanText === "") {

        taskMessage.textContent = "Task cannot be empty";

        return;
    }


    // Create unique task ID
    const taskId = `task-${taskIdCounter}`;

    taskIdCounter++;


    // Create task
    const taskItem = createTaskElement(cleanText, taskId);


    // Add task to DOM
    taskList.appendChild(taskItem);


    // Clear input
    taskInput.value = "";


    // Clear error message
    taskMessage.textContent = "";


    // Update counters
    updateTaskCounts();
}


// ==========================================
// TOGGLE TASK COMPLETE
// ==========================================

function toggleTaskComplete(taskItem) {

    taskItem.classList.toggle("completed");


    if (taskItem.classList.contains("completed")) {

        taskItem.dataset.state = "completed";

    } else {

        taskItem.dataset.state = "pending";
    }


    // Update counters
    updateTaskCounts();
}


// ==========================================
// BEGIN TASK EDIT
// ==========================================

function beginTaskEdit(taskItem) {

    const textSpan = taskItem.querySelector(".task-text");
    const editButton = taskItem.querySelector(".edit-btn");


    // Get current task text
    const currentText = textSpan.textContent;


    // Create edit input
    const editInput = document.createElement("input");

    editInput.type = "text";
    editInput.classList.add("edit-input");

    // Use value for input
    editInput.value = currentText;


    // Replace text span with input
    textSpan.replaceWith(editInput);


    // Change Edit to Save
    editButton.textContent = "Save";


    // Focus input
    editInput.focus();
}


// ==========================================
// SAVE TASK EDIT
// ==========================================

function saveTaskEdit(taskItem) {

    const editInput = taskItem.querySelector(".edit-input");
    const editButton = taskItem.querySelector(".edit-btn");


    if (!editInput) {
        return;
    }


    const newText = editInput.value.trim();


    // Validate edit
    if (newText === "") {

        taskMessage.textContent = "Task cannot be empty";

        return;
    }


    // Create new span
    const newTextSpan = document.createElement("span");

    newTextSpan.classList.add("task-text");


    // SECURITY:
    // User input is assigned using textContent
    newTextSpan.textContent = newText;


    // Replace input
    editInput.replaceWith(newTextSpan);


    // Change Save back to Edit
    editButton.textContent = "Edit";


    // Clear message
    taskMessage.textContent = "";


    // Update counters
    updateTaskCounts();
}


// ==========================================
// REMOVE TASK
// ==========================================

function removeTask(taskItem) {

    // Remove only this task
    taskItem.remove();


    // Update counters
    updateTaskCounts();
}


// ==========================================
// UPDATE TASK COUNTS
// ==========================================

function updateTaskCounts() {

    // Get all current task items
    const taskItems = taskList.querySelectorAll(".task-item");


    const total = taskItems.length;

    let pending = 0;
    let completed = 0;


    // Traverse current DOM
    taskItems.forEach(function(taskItem) {

        if (taskItem.dataset.state === "completed") {

            completed++;

        } else {

            pending++;
        }
    });


    // Display results
    totalCount.textContent = total;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}


// ==========================================
// EVENT DELEGATION
// ==========================================

function handleTaskListClick(event) {

    // Check whether a task action button was clicked
    const clickedButton = event.target;


    // Find the task that owns the button
    const taskItem = clickedButton.closest(".task-item");


    if (!taskItem) {
        return;
    }


    // Complete
    if (clickedButton.classList.contains("complete-btn")) {

        toggleTaskComplete(taskItem);

        return;
    }


    // Edit / Save
    if (clickedButton.classList.contains("edit-btn")) {

        if (clickedButton.textContent === "Edit") {

            beginTaskEdit(taskItem);

        } else {

            saveTaskEdit(taskItem);
        }

        return;
    }


    // Remove
    if (clickedButton.classList.contains("remove-btn")) {

        removeTask(taskItem);

        return;
    }
}


// ==========================================
// LOAD SAMPLE TASKS
// ==========================================

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


        // Add to fragment
        fragment.appendChild(taskItem);
    });


    // Append fragment only once
    taskList.appendChild(fragment);


    // Update counters
    updateTaskCounts();


    // Clear message
    taskMessage.textContent = "";
}


// ==========================================
// EVENT LISTENERS
// ==========================================

// Add task
addTaskBtn.addEventListener("click", function() {

    addTask(taskInput.value);
});


// Allow Enter key to add task
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask(taskInput.value);
    }
});


// Load sample tasks
loadSamplesBtn.addEventListener("click", function() {

    loadSampleTasks();
});


// EXACTLY ONE delegated click listener
// attached to #taskList
taskList.addEventListener("click", handleTaskListClick);


// ==========================================
// INITIAL STATE
// ==========================================

updateTaskCounts();
