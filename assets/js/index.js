const date = document.querySelector('#date')
const activityLog = document.querySelector('#activity-log-list')
const input = document.querySelector('#addnewtask')
const addTask = document.querySelector('#add-task')
const total = document.querySelector('#quantitytodo')

const check = 'fa-circle-check'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id = 0
let LIST = []

const quantityTodo = document.querySelector('#quantitytodo')
const quantityDone = document.querySelector('#quantitydone')



// Función agregar tarea

function addedTask (newTask,id,completed,deleted) {
    if(deleted){
        return
    }
    const COMPLETED = completed ? check : uncheck
    const LINE = completed ? lineThrough : ''

    const newElement = `
                        <li id="todotask">
                        <i class="far ${COMPLETED}" data="done" id="${id}"></i>
                        <p class="text ${LINE}">${newTask}</p>
                        <i class="fas fa-trash de" data="deleted" id="${id}"></i>
                        </li>
                        `
    activityLog.insertAdjacentHTML("beforeend",newElement)

    let totalTask = LIST.length;
    quantityTodo.textContent = ` ${totalTask}`;
    // let completedTasks = LIST.filter(item => item.completed === true).length;
    // quantityDone.textContent = `${completedTasks}`;
}


localStorage.setItem("TODO", JSON.stringify(LIST))

// Función tarea realizada (click en círculo)
function doneTask(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)

    // LIST[element.id].completed = LIST[element.id].completed ?false :true
}

// Función tarea eliminada (click en icono trash)
function deletedTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].deleted = true
}


// agrega una nueva tarea con click en botón

addTask.addEventListener('click',() =>{
    const newTask = input.value
    if(newTask) {
        addedTask(newTask,id,false,false)
        LIST.push({
            nombre: newTask,
            id: Date.now(),
            completed: false,
            deleted: false
        })
    }
    input.value = ''
    id++
})

// agrega una nueva tarea con enter

document.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        const newTask = input.value
        if(newTask) {
            addedTask(newTask,id,false,false)
            LIST.push({
                nombre: newTask,
                id: Date.now(),
                completed: false,
                deleted: false
            })
        }
        input.value = ''
        id++
    }
})


// Evento de click
activityLog.addEventListener('click',function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    console.log(elementData)
    if(elementData == 'done') {
        doneTask(element)
    }
    else if (elementData == 'deleted') {
        deletedTask(element)
    }

})

let data = localStorage.getItem('TODO')
if(data){
    LIST=JSON.parse(data)
    id = LIST.length
    refresh(LIST)
}else{
    LIST = []
    id=1
}

function refresh(LIST) {
    LIST.forEach(function(i){
        addedTask(i.nombre,i.id,i.completed,i.deleted)
    })
}