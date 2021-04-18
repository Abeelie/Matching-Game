if (getTaskFromLocalStorage('tasks')) {
    tasks = JSON.parse(getTaskFromLocalStorage('tasks'))
}

function getTaskFromLocalStorage(name){
    return localStorage.getItem(name);
}

function saveInLocalStorage(name, data){
    localStorage.setItem(name, data);
}

