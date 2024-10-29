// TODO: Ad comments explain what each line of code is doing

const POLLING_DELAY = 500;

// VARIABLE TO HOLD THE MODAL INSTANCE
let modal;

// COMPARE WHETHER TWO DATES ARE THE SAME DAY
function sameDay(d1, d2) {
  return (
    d1.year() === d2.year() && d1.date() === d2.date() && d1.day() === d2.day()
  );
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function geTaskById(taskId) {
  return getTasks()[taskId];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// GENERATE UNIQUE TASK ID
function generateTaskId() {
  let nextId = JSON.parse(localStorage.getItem("nextId")) || 0;
  const id = nextId++;
  localStorage.setItem("nextId", JSON.stringify(nextId));
  return id;
}

// ADD CLICK LISTENER TO BUTTON
function createBtnListener(btn, div) {
  btn.on("click", function (event) {
    handleDeleteTask(event);
  });
}

function createParagraph(text) {
  let para3 = $("<p>" + text + "</p>");
  return para3;
}

// CREATE DELETE BUTTON
function createBtn() {
  let btn1 = $("<button>" + "Delete" + "</button>");
  btn1.css("background-color", "red");

  return btn1;
}

// CREATE TASK CARD
function createTaskCard(task, taskId) {
  let card = $("<div></div>");
  card.attr("data-task-id", taskId);

  let para1 = createParagraph(task.name);
  let para2 = createParagraph(dayjs(task.dueDate).format("M/DD/YYYY"));
  let para3 = createParagraph(task.description);
  card.append(para1);
  card.append(para3);
  card.append(para2);
  let btn1 = createBtn();
  createBtnListener(btn1, card);
  card.append(btn1);
  card.attr("id", "dragdiv" + taskId);
  condition = para2;
  condition = condition.text();
  condition = condition.toLowerCase();

  const today = dayjs().format();
  const target = dayjs(task.DueDate).format();

  createDraggable(card);

  return card;
}

// FUNCTION MAKES DIV DRAGGABLE
function createDraggable(card) {
  $(card).draggable({
    revert: true,
    stack: "#done-cards",
    snap: ".snap-box",
    start: function (event, ui) {
      $(this).css("z-index", 1000);
    },
    stop: function (event, ui) {
      $(this).css("z-index", 999);
    },
  });
}

function setCardColor(card, task) {
  const dueDate = dayjs(task.dueDate)
  const today = dayjs()
  if(task.status == 'done') {
    card.addClass("whiteBox");
    card.removeClass("redBox yellowBox");
  } else {
    // BACKGROUND COLOR OF TASK CARD IS SET BASED ON THE TASK DUE DATE
    if (sameDay(dueDate, today)) {
      card.addClass("yellowBox");
      card.removeClass("redBox whiteBox");
    } else if (today.isAfter(dueDate)) {
      card.addClass("redBox");
      card.removeClass("whiteBox yellowBox");
    } else {
      card.addClass("whiteBox");
      card.removeClass("redBox yellowBox");
    }
  }
}

function colorAllCards() {
  const todoSwimLane = $("#todo-cards");
  const inProgressSwimLane = $("#in-progress-cards");
  const doneSwimLane = $("#done-cards");
  const cardList = [
    ...todoSwimLane.children(),
    ...inProgressSwimLane.children(),
    ...doneSwimLane.children()
  ];
 
  // RETRIEVE TASKS AND nextId FROM localStorage
  const taskList = getTasks();
  
  // RECOLOR ALL TASKS
  for(let el of cardList) {
    const card = $(el);
    const taskId = +card?.data('task-id');
    const task = taskList[taskId];
    setCardColor(card, task);
  }
}

// RENDER TASK LIST AND MAKE CARDS DRAGGABLE
function renderTaskList() {
  // Retrieve tasks and nextId from localStorage
  let taskList = getTasks();
  console.log({taskList}) 
  const todoSwimLane = $("#todo-cards");
  const inProgressSwimLane = $("#in-progress-cards");
  const doneSwimlane = $("#done-cards");
  todoSwimLane.empty();
  inProgressSwimLane.empty();
  doneSwimlane.empty();
  const numTasks = taskList.length;
  
  for (let i = 0; i < numTasks; i++) {
    const task = taskList[i];
    const card = createTaskCard(task, i);
    card.data("task-id", i);
  
    switch(task.status) {
      case "todo":
        todoSwimLane.append(card);
        break;
      case "in-progress":
        inProgressSwimLane.append(card);
        break;
      case "done":
        doneSwimlane.append(card);
        break;
    }
    
    colorAllCards();
  }
}

// FUNCTION TO HANDLE ADDING A NEW TASK
function handleAddTask(event) {
  const task = {
    id: generateTaskId(),
    name: $("#task-name").val(),
    dueDate: $("#due-date").val(),
    description: $("#task-description").val(),
    status: 'todo'
  };
  // RETRIEVE TASKS AND nextId FROM localStorage
  let taskList = getTasks();
  taskList.push(task);
  saveTasks(taskList);
  renderTaskList();
}

// DELETE TASKS
function handleDeleteTask(event) {
  const taskId = +event.target.parentNode.dataset.taskId;
  // RETRIEVE TASKS AND nextId FROM localStorage
  let taskList = getTasks();
  tasklist = taskList.splice(taskId, 1);
  saveTasks(taskList);
  renderTaskList();
}

// DROP TASK INTO NEW STATUS LANE
function handleDropx(event, ui) {
  console.log({this:this, event: event})
  renderTaskList();
}

/* UPON PAGE LOADING:
      TASK LIST IS RENDERED 
      EVENT LISTENERS ADDED,
      LANES MADE DROPPABLE,
      DUE DATE FIELD IS MADE INTO A DATE PICKER
*/

$(document).ready(function () {
  modal = new bootstrap.Modal(document.getElementById("formModal"), {});

  // SHOW MODEL WHEN BUTTON IS CLICKED
  $("#btn").click(function () {
    modal.show();
  });

  // WHEN 'Add Task' (CLOSE) BUTTON IS CLICKED, HIDE MODEL AND HANDLE
  $("#close-btn").click(function () {
    modal.hide();
    handleAddTask(modal);
  });

  renderTaskList();

  // MAKE ELEMENTS WITH CLASS "dropTarget" DROPPABLE
  $(".dropTarget").droppable({
    greedy: true,
    drop: function (ev, ui) {
      console.log('drop', {dropTarget:this, ev, ui})
      const card = ui.draggable;
      let taskList = getTasks();
      const taskId = +card.data('task-id');
      const task = taskList[taskId];
      switch($(this).attr("id")) {
        case "todo-cards":
          task.status = 'todo';
          break;
        case "in-progress-cards":
          task.status = 'in-progress';
          break;
        case "done-cards":
          task.status = 'done';
          console.log(`Task ${taskId} is Complete!`);
      };
      card.detach().appendTo(this);
      saveTasks(taskList);
      renderTaskList()
    }
  });

  setInterval(()=>{
    colorAllCards();
  }, POLLING_DELAY)
  
});