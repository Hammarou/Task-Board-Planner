let count = 0
let taskId = 0

// GENERATE UNIQUE TASK ID
function generateTaskId() {
    taskId++
}

let modal = new bootstrap.Modal(document.getElementById("formModal"), {});

// SHOW MODEL WHEN BUTTON IS CLICKED
$("#btn").click(function() {
    modal.show()
})

// WHEN 'Add Task' (CLOSE) BUTTON IS CLICKED, HIDE MODEL AND HANDLE
$("#close-btn").click(function() {
    modal.hide()
    handleAddTask(modal)   
})

// CREATE DELETE BUTTON
function createBtn() {
    let btn1 = $('<button>'+"Delete"+'</button>')
    btn1.css("background-color", "red")

return btn1
}

// COMPARE WHETHER TWO DATES ARE THE SAME DAY
function sameDay(d1, d2) {
    return d1.year() === d2.year() &&
      d1.date() === d2.date() &&
      d1.day() === d2.day();
  }

// FUNCTION CREATES TASK CARD DIV
function createDiv(task) {

    let div = $('<div></div>')
    
    let para1 = createParagraph(task.Name)
    let para2 = createParagraph(dayjs(task.DueDate).format("M/DD/YYYY"))
    let para3 = createParagraph(task.Description)
    div.append(para1)
    div.append(para3)
    div.append(para2)
    let btn1 = createBtn()
    createBtnListener(btn1, div)
    div.append(btn1)
    div.attr('id','dragdiv' + count)
    condition = para2
    condition = (condition.text())
    condition = condition.toLowerCase()

    const today = dayjs().format();
    const target = dayjs(task.DueDate).format();


// BACKGROUND COLOR OF TASK CARD IS SET BASED ON THE TASK DUE DATE
    if(sameDay(dayjs(), dayjs(task.DueDate))) {
        div.css("background-color", "yellow")
        const ms_red = dayjs(task.DueDate).diff(dayjs(), "milliseconds") + 24 * 60 * 60 * 1000
        setTimeout(function() {
            if(div.parent().attr("id") == "done-cards") {
                div.css("background-color", "red")
                div.addClass("redBox")
                div.removeClass("yellowBox")
            }  
        }, ms_red)
        div.addClass("yellowBox")
    }  else if( dayjs(task.DueDate).isBefore(dayjs()) ) {
        div.css("background-color", "red")
        div.addClass("redBox")
    } else {
        div.css("background-color", "white")
        const ms_yellow = dayjs(task.DueDate).diff(dayjs(), "milliseconds")
        setTimeout(function() {
            if(div.parent().attr("id") == "done-cards") {
                div.css("background-color", "yellow")
                div.addClass("yellowBox")
                div.removeClass("whiteBox")
            }    
        }, ms_yellow)
        const ms_red = ms_yellow + 24 * 60 * 60 * 1000
        setTimeout(function() {
            if(div.parent().attr("id") == "done-cards") {
                 div.css("background-color", "red")
                div.addClass("redBox")
                div.removeClass("yellowBox")
            }
        }, ms_red)

        div.addClass("whiteBox")   
    }
    
    createDraggable(div)

    $("#todo-cards").append(div)
    
    count++  
}

// FUNCTION MAKES DIV DRAGGABLE
function createDraggable(div) {
    
    div.draggable({
        revert: true,
        stack: "#done-cards",
        snap: ".snap-box",
        start: function(event, ui) {
            $(this).css("z-index", 1000)
        },
        stop: function(event, ui) {
            $(this).css("z-index", 999)
        }
    });
};

// ADD CLICK LISTENER TO BUTTON
function createBtnListener(btn, div) {
    btn.on("click", function() {
        div.css("display", "none")
    })
}

function createParagraph(text) {
    let para3 = $('<p>'+text+'</p>')
    return para3
}

// MAKE ELEMENTS WITH CLASS "dropTarget" DROPPABLE
$('.dropTarget').droppable({
    drop: function(ev, ui) {
        $(ui.draggable).detach().css({top: 0, left: 0}).appendTo(this);
        console.log($(this).attr("id"))
        if($(this).attr("id") == "done-cards") {
            console.log("Task complete!")
           $(ui.draggable).css("background-color", "white") 
            $(ui.draggable).addClass("whiteBox")
           $(ui.draggable).removeClass("yellowBox redBox")
        }          
    }
});




