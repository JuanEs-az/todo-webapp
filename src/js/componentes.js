import { Todo } from '../classes/todo.class'
import { todoList } from '../index'

const divTodoList = document.querySelector('.todo-list')
const txtInput = document.querySelector('.new-todo')
const btnBorrarCompl = document.querySelector('.clear-completed')
const ulFiltros = document.querySelector('.filters')
const pentiendesCount = document.querySelector('.todo-count strong')


export const updatePendientes = () => {
    pentiendesCount.innerText = todoList.getPendientes + ''
}

export const crearTodoHtml = ( todo ) => {
    const html = `
    <li class="${  (todo.completado) ? 'completed' : ''  }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${  (todo.completado) ? 'checked' : ''  }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`
    const div = document.createElement('div')
    div.innerHTML = html
    divTodoList.append( div.firstElementChild )
    return div.firstElementChild
}

//Eventos
txtInput.addEventListener('keyup', ( event ) => {

    if( event.keyCode === 13 && txtInput.value.length > 0 ) {

        const todo = new Todo( txtInput.value )
        todoList.nuevoTodo( todo )
        txtInput.value = ""
        crearTodoHtml( todo )

    }
    updatePendientes()
})

divTodoList.addEventListener('click', ( event ) => {
    const nombreElemento = event.target.localName 
    const todoElemento = event.target.parentElement.parentElement
    const todoId = todoElemento.getAttribute('data-id')

    switch( nombreElemento ) {
        case 'input':
            todoList.toggleTodo( todoId )
            todoElemento.classList.toggle('completed')
            break;
        case 'button':
            todoList.eliminarTodo( todoId )
            divTodoList.removeChild( todoElemento )
            break;
    }
    updatePendientes()
})
btnBorrarCompl.addEventListener('click',() => {
    todoList.eliminarCompletados()
    for(let i = divTodoList.children.length - 1; i >= 0; i --) {
        const elemento = divTodoList.children[i]
        elemento.classList.contains('completed') ? divTodoList.removeChild( elemento ) : undefined
    }
    updatePendientes()
})
ulFiltros.addEventListener('click', ( event ) => {
    const filtro = event.target.text
    if( !filtro ) {
        return
    }else{
        document.querySelectorAll('.filtro').forEach(elemento => {
            elemento.classList.remove('selected')
        })
        event.target.classList.add('selected')
    }
    
    
    for(let elemento of divTodoList.children){
        elemento.classList.remove('hidden')
        const completado = elemento.classList.contains('completed')

        switch(filtro){
            case 'Pendientes':
                completado ? elemento.classList.add('hidden') : undefined
                break;
            case 'Completados':
                !completado ? elemento.classList.add('hidden') : undefined
                break;
            default: 
                break;
        }
    }
})