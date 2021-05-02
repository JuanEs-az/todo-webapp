import { Todo } from './todo.class'

export class TodoList {
    todos;
    pendientes = 0

    constructor() {

        this.cargarLocalStorage()

    }

    nuevoTodo( ...todos ) {
        for( let todo of todos ) {
           this.todos.push( todo ) 
           this.pendientes += todo.completado ? 0 : 1
        }
        
        this.guardarLocalStorage()
    }
    
    eliminarTodo( id ) {
        this.todos = this.todos.filter( todo => {
            if( todo.id == id ){
                this.pendientes += todo.completado ? 0 : -1
            }
            return todo.id != id
        })
        this.guardarLocalStorage()
    }

    toggleTodo( id ) {
        for(let todo of this.todos){
            if( todo.id == id ){
                todo.completado = !todo.completado
                this.pendientes += todo.completado ? -1 : 1
            }
        }
        this.guardarLocalStorage()
    }

    eliminarCompletados() {
        this.todos = this.todos.filter( todo => !todo.completado )
        this.pendientes = this.todos.length
        this.guardarLocalStorage()
    }

    guardarLocalStorage() {

        localStorage.setItem('todo', JSON.stringify( this.todos ) )

    }

    cargarLocalStorage() {

        this.todos = localStorage.getItem("todo") ? JSON.parse( localStorage.getItem("todo")).map( ( todo ) => {
            this.pendientes += todo.completado ? 0 : 1
            return Todo.parse( todo )
        } )  : []
    }

    get getPendientes() {
        return this.pendientes
    }
}