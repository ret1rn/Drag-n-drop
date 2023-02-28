// const fill = document.querySelector('.fill')
const empties = document.querySelectorAll('.empty')
const form = document.forms.add
const options = form.querySelectorAll("select option")

// fill.addEventListener('dragstart', dragStart)
// fill.addEventListener('dragend', dragEnd)

let todos = [
    {
        id: '1sdffdfwe2543241',
        title: 'buy milk',
        description: 'description will be here',
        status: "todo"
    },
    {
        id: '1sadasd2543241',
        title: 'chek h w',
        description: 'description will be here',
        status: "todo"
    },
    {
        id: '1sdasdasd241',
        title: 'todo h/t',
        description: 'description will be here',
        status: "todo"
    }
]

let temp = []
let obj;

let i = 0

function selector(item) {
    if (item.status == "done") {
        i = 2
    } else if (item.status == "inprogress") {
        i = 1
    } else {
        i = 0
    }
}

for (let todo of todos) {
    let div = document.createElement('div')
    let b = document.createElement('b')
    let p = document.createElement('p')

    div.setAttribute('id', todo.id)
    div.setAttribute('class', 'fill')
    div.setAttribute('draggable', true)

    b.innerHTML = todo.title
    p.innerHTML = todo.description

    div.append(b, p)
    empties[i].append(div)
    
    selector(todo)
    temp.push(div)
}

function reload() {
    let div = document.createElement('div')
    let b = document.createElement('b')
    let p = document.createElement('p')

    div.setAttribute('id', obj.id)
    div.setAttribute('class', 'fill')
    div.setAttribute('draggable', true)

    b.innerHTML = obj.title
    p.innerHTML = obj.description

    div.append(b, p)
    empties[i].append(div)
    temp.push(div)
    obj = ""
}

function reload_two() {
    temp.forEach((item, index) => {
        item.addEventListener('dragstart', dragStart)
        item.addEventListener('dragend', dragEnd)
    })
}

reload_two()

for (empty of empties) {
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}

let temp_id

function dragStart() {
    console.log('dragStart');
    temp_id = this.id
    this.className += ' hold'
    setTimeout(() => (this.className = 'invisible'), 0)
}

function dragEnd() {
    console.log('dragEnd');
    this.className = 'fill'
}

function dragOver(event) {
    event.preventDefault()
}

function dragEnter(event) {
    console.log('');
    event.preventDefault()
    this.className += ' hovered'
}


function dragLeave() {
    console.log('dragLeave');
    this.className = 'empty'
    console.log(this);
}

function dragDrop(params) {
    console.log('dragDrop');
    this.className = 'empty'
    temp.forEach((item, index) => {
        if (item.id === temp_id) {
            this.append(item)
        }
    })
}

form.onsubmit = (event) => {
    event.preventDefault()

    let task = {
        id: Math.random()
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        task[key] = value
    })

    todos.push(task)
    selector(task)
    obj = task
    reload()
    reload_two()
}