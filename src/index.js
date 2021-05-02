import "@babel/polyfill";
import './styles.css';

import { Todo, TodoList } from './classes'
import { crearTodoHtml, updatePendientes } from './js/componentes'

export const todoList = new TodoList()

updatePendientes()
todoList.todos.forEach( todo => crearTodoHtml( todo ) );