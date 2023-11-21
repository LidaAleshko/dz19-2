
const app = document.querySelector('.app');
const title = document.createElement('title')
title.textContent = 'dz18'
document.head.appendChild(title);
const html = document.querySelector('html');
html.setAttribute("lang", 'en');
const head = document.querySelector('head');
head.innerHTML = `
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="style.css">`
function ToDoList () {                                                      
    let todos = [
        {
            id: '1',
            task: 'Выучить js',
            isDone: false,
            isEdit: false,             
        },
        {
            id: '2',
            task: 'Выучить css',
            isDone: false,
            isEdit: false,               
        }
    ];                                                       

    this.init = (className) => {                                            
        const parentConteiner = document.querySelector(`.${className}`);    
        if(!parentConteiner) {                                              
            console.log('Ошибка в указании селектора класса');
            return;
        }
        
        const elementHTMLToDo = createHTMLToDo();                           
        parentConteiner.appendChild(elementHTMLToDo);                       
        addToDoInputEvent();                                               
        showToDoTask();
        addDeleteAllTodosEvent();    
        addCompletedAllTodosEvent();                           
        
    }
    
    const addDeleteAllTodosEvent = () => {                            
        const deleteAllBtn = document.querySelector('.delete__all__btn');  
        deleteAllBtn.addEventListener('click', () => {                      
            if(todos.length !== 0) {                                       
                todos = [];
                showToDoTask();
            }
            return;
        })
    }
    const addCompletedAllTodosEvent = () => {
        const completedAll = document.querySelector('.all_tasks_are_completed');
        completedAll.addEventListener('click', () =>{
            todos.forEach((todo) => {                                      
                if(todo.isDone === false) {                             
                    todo.isDone = !todo.isDone                                            
                }
                return todo;                                                
            })
            showToDoTask();                                                 
        })         
    }

    const addToDoInputEvent = () => {                                       
        const toDoInput = document.querySelector('.todo__input');           
        toDoInput.addEventListener('keydown', (event) => {                  
            if(event.keyCode === 13) {                                     
                todos.push(
                    {
                        id: `${new Date().getTime()}`,
                        task: event.target.value,
                        isDone: false,
                        isEdit: false,     
                    }
                )                       
                event.target.value = '';
                showToDoTask();
            }
        })
    }

    const createHTMLToDo = () => {                                          
        const todoElement = document.createElement('div');                  
        todoElement.classList.add('todo');                                  
        todoElement.innerHTML = `<div class="todo__wrapper">    
                                    <div class="todo__header">
                                    <button class="all_tasks_are_completed">Все задачи выполнены</button>
                                        <h2 class="h2">Список дел</h2>
                                        <input type="text" class="todo__input">
                                        <button class="delete__all__btn">Очистить список дел</button>
                                    </div>
                                    <div class="todo__body"></div>
                                 </div>`                                    
        return todoElement;                                                 
    }

    const showToDoTask = () => {                                            
        const todoBody = document.querySelector('.todo__body');
        if(todos.length === 0){
            todoBody.innerHTML = '<h2 class="empty__resalt">Список дел пуст</h2>';
            return;
        }

        console.log(todos);

        const ul = document.createElement('ul');
        ul.classList.add('todo__tasks');

        let listToDo = '';
        const chackEdit = checkEditTodoHelper();
        const style =document.createElement('style');
        todos.forEach(({id, task, isDone, isEdit}) => {
            listToDo += style.innerHTML =
            `<li class="todo__task${isDone ? " isDone": ""}">
                            ${!isEdit ? `<input class="input1" type="checkbox" ${isDone ? "checked": ""} id="${id}" class="todo__checkbox">
                            <p class="todo__task__content">${task}</p>
                            <button class="tood__delete__btn btn" ${!isDone ? "disabled": ""} data-delete="${id}">Удалить</button> 
                            <button class="tood__edit__btn btn" ${chackEdit ? "disabled": ""} data-edit="${id}">Редактировать</button>`
                            :`
                            <input type="text" value="${task}" class="todo__edit__input">
                            <button class="tood__edit__cancel btn" data-edit-cancel="${id}">Отменить</button>
                            <button class="tood__edit__save btn" data-edit-save="${id}">Сохранить</button>                            
                            `}                            
                        </li>`;
        })
    
        style.innerHTML = `
.app{
    .isDone .todo_task_content {
        text-decoration: line-through;
        color: red;
    }
    .tood__delete__btn {
        color: red;
    }
    .all_tasks_are_completed {
        margin-top: 100px;
        margin-left: 1000px;
        border-radius: 40%;
        height: 150px;
        width: 300px;
        color: green;
        font-size: 40px;
    }
    .h2{
    
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 100px;
        height: 50px;
        color: blue;
    }
    .delete__all__btn{
        font-size: 20px;
        width: 300px;
        height: 50px;
        border-color: black;
        color: red;
    }
    .tood__edit__btn{
     
    color: green;
    }
    .tood__edit__cancel{
        color: aqua;
    }
    .todo__input{
       width: 300px;
       height: 50px;
        border-color: black;
    }
    
    
    }
    body{
    
        background-image: url("https://gas-kvas.com/uploads/posts/2023-02/1675489745_gas-kvas-com-p-izobrazheniya-i-kartinki-na-fonovii-risuno-18.jpg");
    
        background-repeat: no-repeat;
    
        background-position: center;
    
        background-size: 100%;
    
    }

    }
}`
document.head.appendChild(style);
        ul.innerHTML = listToDo;
        todoBody.innerHTML = '';
        todoBody.appendChild(ul);

        addCheckBoxEvent();        
        addDeleteTodoEvent();
        addEditTodoEvent();
        
        if(chackEdit) {
            addEditCancelTodo();
            addEditSavelTodo();
        }
        
    }

    const checkEditTodoHelper = () => {
        return todos.some(({isEdit}) => isEdit)
    }

    const addEditCancelTodo = () => {
        const cancelButton = document.querySelector('.tood__edit__cancel');
        cancelButton.addEventListener('click', (event) => {
            const btn = event.target;
            const todoId = btn.dataset.editCancel;
            // todos = todos.map((todo) => {
            //     if(todo.id === todoId){
            //         todo.isEdit = false;
            //     }
            //     return todo;
            // });
            todos = todos.map((todo) => ({                            
                    ...todo,                                         
                    ...(todo.id === todoId ? {isEdit: false} : undefined)
                })
            );
            showToDoTask();
        })
    }

    const addEditSavelTodo = () => {
        const saveButton = document.querySelector('.tood__edit__save');
        saveButton.addEventListener('click', (event) => {
            const btn = event.target;
            const todoId = btn.dataset.editSave;
            const newTaskValue = document.querySelector('.todo__edit__input').value;
            todos = todos.map((todo) => {
                if(todo.id === todoId){
                    todo.isEdit = false;
                    todo.task = newTaskValue;
                }
                return todo;
            });           
            showToDoTask();
        })
    }

    const addEditTodoEvent = () => {
        const editButtons = document.querySelectorAll('.tood__edit__btn');
        editButtons.forEach((editButton) => {
            editButton.addEventListener('click', (event) => {
                const btn = event.target;
                const todoId = btn.dataset.edit;                     
                todos = todos.map((todo) =>{
                    if(todo.id === todoId){
                        todo.isEdit = true;
                    }
                    return todo;
                });
                showToDoTask();
            })
        })
    }

    const addDeleteTodoEvent = () => {
        const deleteButtons = document.querySelectorAll('.tood__delete__btn');
        deleteButtons.forEach((deleteButton) => {
            deleteButton.addEventListener('click', (event) => {
                const btn = event.target;
                const todoId = btn.dataset.delete;                 
                const isDisabled = btn.disabled;
                todos = todos.filter((todo) => todo.id !== todoId);
                showToDoTask();
            })
        })
    }
   
   
    const addCheckBoxEvent = () => {
        const checkBoxs = document.querySelectorAll('.todo__checkbox');     
        checkBoxs.forEach((checkbox) => {                                  
            checkbox.addEventListener('change', (event) => {
                const todoId = event.target.id;
                changeStatusTodo(todoId);
            })
        })
    }
     

    const changeStatusTodo = (todoId) => {
        todos = todos.map((todo) => {
            if(todo.id === todoId) {
                todo.isDone = !todo.isDone
            }
            return todo
        })
        showToDoTask();
    }
}

window.addEventListener('load', () => {                                     
    const todo = new ToDoList();                                           
    todo.init('app');                                                      
    
})



