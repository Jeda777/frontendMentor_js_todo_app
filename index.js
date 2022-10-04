const bgImg = document.getElementById('bg-img')
const darkModeBtn = document.getElementById('dark-mode-btn')
const darkModeBtnImg = document.getElementById('dark-mode-btn-img')
const body = document.getElementsByTagName('body')
const textInput = document.getElementById('task-input')
const ul = document.getElementById('ul')
const clearBtn = document.getElementById('clear-btn')
const allMobileBtn = document.getElementById('all-mobile-btn')
const activeMobileBtn = document.getElementById('active-mobile-btn')
const completedMobileBtn = document.getElementById('completed-mobile-btn')
const allBtn = document.getElementById('all-btn')
const activeBtn = document.getElementById('active-btn')
const completedBtn = document.getElementById('completed-btn')
const numberLeftText = document.getElementById('number-left')

var darkMode = false;
var screenWidth = window.innerWidth;
var bgImageSrc;
var drag = null;

function chooseBg() {
    if (darkMode && screenWidth <= 375) {
        bgImageSrc = './assets/bg-mobile-dark.jpg'
    } else if (!darkMode && screenWidth <= 375) {
        bgImageSrc = './assets/bg-mobile-light.jpg'
    } else if (darkMode) {
        bgImageSrc = './assets/bg-desktop-dark.jpg'
    } else if (!darkMode) {
        bgImageSrc = './assets/bg-desktop-light.jpg'
    } else {
        bgImageSrc = ''
    }
}
function updateTasks() {
    var li = ul.appendChild(document.createElement('li'))
    li.classList.add('task')
    addHandlers(li)
    var doneBtn = li.appendChild(document.createElement('button'))
    doneBtn.classList.add('done-btn')
    doneBtn.addEventListener('click', () => {
        doneBtn.parentElement.classList.toggle('done')
    })
    var checkedImg = doneBtn.appendChild(document.createElement('img'))
    checkedImg.setAttribute('src', './assets/icon-check.svg')
    checkedImg.setAttribute('alt', 'checked')
    var liText = li.appendChild(document.createElement('p'))
    liText.innerText = textInput.value
    var deleteBtn = li.appendChild(document.createElement('button'))
    deleteBtn.classList.add('delete-btn')
    deleteBtn.addEventListener('click', () => {
        deleteBtn.parentElement.remove()
        updateCountText()
    })
    var deleteBtnImg = deleteBtn.appendChild(document.createElement('img'))
    deleteBtnImg.setAttribute('src', './assets/icon-cross.svg')
    deleteBtnImg.setAttribute('alt', 'delete')
    updateCountText()
}
function updatActiveBtn(btn) {
    updateCountText()
    if (btn === 'all') {
        allMobileBtn.classList.add('active')
        allBtn.classList.add('active')
        activeMobileBtn.classList.remove('active')
        activeBtn.classList.remove('active')
        completedMobileBtn.classList.remove('active')
        completedBtn.classList.remove('active')
    } else if (btn === 'active') {
        allMobileBtn.classList.remove('active')
        allBtn.classList.remove('active')
        activeMobileBtn.classList.add('active')
        activeBtn.classList.add('active')
        completedMobileBtn.classList.remove('active')
        completedBtn.classList.remove('active')
    } else if (btn === 'completed') {
        allMobileBtn.classList.remove('active')
        allBtn.classList.remove('active')
        activeMobileBtn.classList.remove('active')
        activeBtn.classList.remove('active')
        completedMobileBtn.classList.add('active')
        completedBtn.classList.add('active')
    } else {
        return
    }
}
function updateCountText() {
    var tasks = document.getElementsByClassName('task')
    numberLeftText.innerText = `${tasks.length} items left`
}
function handleDragStart(e) {
    drag = this
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', this.outerHTML)
    this.classList.add('dragging');
}
function handleDragOver(e) {
    e.preventDefault()
    this.classList.add('over')
    e.dataTransfer.dropEffect = 'move'
    return false
}
function handleDragLeave() {
    this.classList.remove('over')
}
function handleDrop(e) {
    e.stopPropagation()
    target = this.nextSibling
    if (drag != target) {
        target.parentNode.removeChild(drag)
        var dropHTML = e.dataTransfer.getData('text/html')
        target.insertAdjacentHTML('beforebegin', dropHTML)
        var dropElem = target.previousSibling
        addHandlers(dropElem)
        var check = dropElem.firstChild
        console.log(check.parentElement)
        check.addEventListener('click', () => {
            check.parentElement.classList.toggle('done')
        })
        var close = dropElem.lastChild
        console.log(close.parentElement)
        close.addEventListener('click', () => {
            close.parentElement.remove()
            updateCountText()
        })
    }
    this.classList.remove('over')
    return false
}
function handleDragEnd() {
    this.classList.remove('over')
    this.classList.remove('dragging')
}
function addHandlers(li) {
    li.addEventListener('dragstart', handleDragStart, false)
    li.addEventListener('dragover', handleDragOver, false)
    li.addEventListener('dragleave', handleDragLeave, false)
    li.addEventListener('drop', handleDrop, false)
    li.addEventListener('dragend', handleDragEnd, false)
}

chooseBg();

window.addEventListener('resize', () => {
    screenWidth = window.innerWidth;
    chooseBg();
    bgImg.setAttribute('src', bgImageSrc)
})
darkModeBtn.addEventListener('click', () => {
    darkMode = !darkMode
    if (darkMode) {
        body[0].classList.toggle('dark')
        darkModeBtnImg.setAttribute('src', './assets/icon-sun.svg')
        chooseBg();
        bgImg.setAttribute('src', bgImageSrc)
    } else {
        body[0].classList.remove('dark')
        darkModeBtnImg.setAttribute('src', './assets/icon-moon.svg')
        chooseBg();
        bgImg.setAttribute('src', bgImageSrc)
    }
})
textInput.addEventListener('keydown', (e) => {
    if (e.isComposing || e.code === 'Enter') {
        if (textInput.value !== '') {
            updateTasks()
            textInput.value = ''
        }
    }
})
clearBtn.addEventListener('click', () => {
    const taskToClear = Array.from(document.getElementsByClassName('done'))
    taskToClear.map((i) => {
        i.remove()
    })
    updateCountText()
})
allMobileBtn.addEventListener('click', () => {
    updatActiveBtn('all')
    var tasks = Array.from(document.getElementsByClassName('task'))
    tasks.map((i) => {
        i.classList.remove('hidden')
    })
})
activeMobileBtn.addEventListener('click', () => {
    updatActiveBtn('active')
    var tasksActive = Array.from(document.getElementsByClassName('task'))
    tasksActive.map((i) => {
        i.classList.remove('hidden')
    })
    var tasksDone = Array.from(document.getElementsByClassName('done'))
    tasksDone.map((i) => {
        i.classList.add('hidden')
    })
})
completedMobileBtn.addEventListener('click', () => {
    updatActiveBtn('completed')
    var tasksActive = Array.from(document.getElementsByClassName('task'))
    tasksActive.map((i) => {
        i.classList.add('hidden')
    })
    var tasksDone = Array.from(document.getElementsByClassName('done'))
    tasksDone.map((i) => {
        i.classList.remove('hidden')
    })
})
allBtn.addEventListener('click', () => {
    updatActiveBtn('all')
    var tasks = Array.from(document.getElementsByClassName('task'))
    tasks.map((i) => {
        i.classList.remove('hidden')
    })
})
activeBtn.addEventListener('click', () => {
    updatActiveBtn('active')
    var tasksActive = Array.from(document.getElementsByClassName('task'))
    tasksActive.map((i) => {
        i.classList.remove('hidden')
    })
    var tasksDone = Array.from(document.getElementsByClassName('done'))
    tasksDone.map((i) => {
        i.classList.add('hidden')
    })
})
completedBtn.addEventListener('click', () => {
    updatActiveBtn('completed')
    var tasksActive = Array.from(document.getElementsByClassName('task'))
    tasksActive.map((i) => {
        i.classList.add('hidden')
    })
    var tasksDone = Array.from(document.getElementsByClassName('done'))
    tasksDone.map((i) => {
        i.classList.remove('hidden')
    })
})

bgImg.setAttribute('src', bgImageSrc)