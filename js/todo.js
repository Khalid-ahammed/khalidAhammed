//selecting elemnets
const form = document.getElementById('todo-form');
const alertBox = document.querySelector('.alert');
const startTime = document.querySelector('#start-time');
const endTime = document.querySelector('#end-time');
const eventDate = document.querySelector('#startDate');
const inputBox = document.getElementById('input-box');
const submitBtn = document.querySelector('.submit-btn');
const clearBtn = document.querySelector('.clear-btn');
const taskContainer = document.querySelector('.todo-content');
const todoBody = document.querySelector('.todo-body');

//setting default date
const newDate = new Date();
const taskDate = `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`;
eventDate.value = taskDate;

// edit elements
let editFlag = false;
let editId = '';
let editParentTask;
let editParent;

//functions
const submitForm = e => {
    e.preventDefault();
    const newDate = new Date();
    const taskId = newDate.getTime();
    const taskText = inputBox.value;
    const dateValue = eventDate.value;
    let startTimeValue = startTime.value
    let endTimeValue = endTime.value
    if (startTime.value === '') {
        startTimeValue = 'unset';
    }
    if (endTime.value === '') {
        endTimeValue = 'unset';
    }

    let isInvalidTime = false;
    if (parseInt(startTime.value.split(':')[0]) >= parseInt(endTime.value.split(':')[0]) && parseInt(startTime.value.split(':')[1]) >= parseInt(endTime.value.split(':')[1]) && startTime.value && endTime.value) {
        isInvalidTime = true;
    }

    //setting main conditions
    if (!editFlag && taskText && !isInvalidTime) {
        createTask(taskText, startTimeValue, endTimeValue, dateValue, taskId);
        displayAlert(`green`, `Task added`);
        setLocalStorage(taskText, startTimeValue, endTimeValue, dateValue, taskId);
        setBackToDefault();
    } else if (editFlag && taskText && !isInvalidTime) {
        const stime = (startTimeValue === `unset`) ? `unset` : getTimeIn12(startTimeValue);
        const etime = (endTimeValue === `unset`) ? `unset` : getTimeIn12(endTimeValue);
        editParentTask.textContent = inputBox.value;
        editParent.querySelector('.task-date').textContent = eventDate.value;
        editParent.querySelector('#task-start-time').textContent = stime;
        editParent.querySelector('#task-end-time').textContent = etime;

        editLocalStorage(taskText, startTimeValue, endTimeValue, dateValue, editId);
        displayAlert(`green`, `Task edited`);
        setBackToDefault();
    } else {
        if (isInvalidTime) {
            displayAlert(`red`, `Invalid time format`)
        } else {
            displayAlert(`brown`, `Please Enter your task`)
        }
    }

}

const getTimeIn12 = (time) => {
    const timeSplit = time.split(':');
    let hour, minute, meridian;
    hour = timeSplit[0];
    minute = timeSplit[1];
    if (hour > 12) {
        meridian = `pm`;
        hour -= 12;
        if (hour < 10) hour = `0${hour}`;
    } else if (hour < 12) {
        meridian = `am`;
        if (hour == 0)
            hour = 12;
    } else {
        meridian = `pm`
    }

    return `${hour}:${minute} ${meridian}`;
}

const displayAlert = (action, text) => {
    alertBox.textContent = text;
    alertBox.classList.add(`${action}-text`);
    setTimeout(() => {
        alertBox.textContent = ``;
        alertBox.classList.remove(`${action}-text`);
    }, 1000)
}

const editTask = e => {
    editParentTask = e.currentTarget.parentElement.previousElementSibling;
    editParent = e.currentTarget.parentElement.parentElement.parentElement;
    editId = editParent.dataset.id;
    editFlag = true;

    inputBox.value = editParentTask.textContent;
    eventDate.value = editParent.querySelector('.task-date').textContent;
    let taskStartTime = editParent.querySelector('#task-start-time').textContent;
    let taskEndTime = editParent.querySelector('#task-end-time').textContent;
    if (taskStartTime === `unset`)
        startTime.value = '';
    else
        startTime.value = timein24(taskStartTime);

    if (taskEndTime === `unset`)
        endTime.value = '';
    else
        endTime.value = timein24(taskEndTime);

    submitBtn.innerHTML = `<i class="fas fa-edit"></i>`;
}

const timein24 = (timeText) => {
    let time = timeText.slice(0, 5);
    let meridian = timeText.slice(6);
    time = time.split(':');
    let hour = time[0],
        minute = time[1];
    if (hour === `12` && meridian === `am`) {
        hour = `00`;
    } else if (parseInt(hour) < 12 && meridian === `pm`) {
        hour = `${parseInt(hour)+12}`;
    } else {
        hour = hour;
    }

    return `${hour}:${minute}`;
}
const deleteTask = e => {
    const deleteParent = e.currentTarget.parentElement.parentElement.parentElement;
    taskContainer.removeChild(deleteParent)
    if (!taskContainer.children.length > 0) {
        todoBody.classList.remove('active');
    }
    setBackToDefault();
    displayAlert(`red`, `Task Deleted`);
    deleteLocalStorage(deleteParent.dataset.id);
}

const clearItems = () => {
    localStorage.removeItem('tasks');
    const items = document.querySelectorAll('.task');
    if (items.length > 0) {
        items.forEach(item => {
            taskContainer.removeChild(item);
        })
    }
    setBackToDefault();
    todoBody.classList.remove('active');
    displayAlert(`red`, `Tasks cleared`);
}

const setLocalStorage = (newTask, newStartTime, newEndTime, newDate, newId) => {
    let storedItems = getLocalStorage();
    const newTaskContent = { text: newTask, startTime: newStartTime, endTime: newEndTime, date: newDate, id: newId };
    storedItems.push(newTaskContent);
    localStorage.setItem('tasks', JSON.stringify(storedItems));
}

const editLocalStorage = (editTask, editStartTime, editEndTime, editDate, id) => {
    let storedItems = getLocalStorage();
    storedItems = storedItems.map(item => {
        if (item.id == id) {
            item.text = editTask;
            item.startTime = editStartTime;
            item.endTime = editEndTime;
            item.date = editDate;
        }
        return item;
    });
    localStorage.setItem('tasks', JSON.stringify(storedItems));
}
const deleteLocalStorage = (deleteId) => {
    let storedItems = getLocalStorage();
    storedItems = storedItems.filter(item => {
        return item.id != deleteId;
    });
    localStorage.setItem('tasks', JSON.stringify(storedItems));
}

const setupTask = () => {
    const storedItems = getLocalStorage();
    if (storedItems.length > 0) {
        storedItems.forEach(item => {
            createTask(item.text, item.startTime, item.endTime, item.date, item.id);
        })
    }
}

const setBackToDefault = () => {
    editId = '';
    editFlag = false;
    submitBtn.innerHTML = `<i class="fas fa-plus"></i>`;
    inputBox.value = '';
    eventDate.value = taskDate;
    startTime.value = '';
    endTime.value = '';
}

const getLocalStorage = () => {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}


const createTask = (task, startTime, endTime, date, id) => {
    const stime = (startTime === `unset`) ? `unset` : getTimeIn12(startTime);
    const etime = (endTime === `unset`) ? `unset` : getTimeIn12(endTime);

    const element = document.createElement('article');
    element.setAttribute('data-id', id);
    element.classList.add('task');
    element.innerHTML = `<div class="task-header">
    <h4 class="task-date">${date}</h4>
    <p class="task-time"><span id="task-start-time">${stime}</span>-<span id="task-end-time">${etime}</span></p>
</div>
<div class="task-body">
    <p id="task-desc">${task}</p>
    <div class="task-controls">
        <button type="button" class="task-controller" id="edit-btn">
            <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="task-controller" id="delete-btn">
            <i class="fas fa-minus-circle"></i>
        </button>
    </div>
</div>`;
    taskContainer.prepend(element);
    todoBody.classList.add('active');

    document.querySelector('#edit-btn').addEventListener('click', editTask);
    document.querySelector('#delete-btn').addEventListener('click', deleteTask);
}

//Main Event listeners
window.addEventListener('DOMContentLoaded', setupTask);
clearBtn.addEventListener('click', clearItems);
form.addEventListener('submit', submitForm);