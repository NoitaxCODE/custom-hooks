import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const init = ()=>{
  // El operador || significa que si lo que esta en el local storage es null va a retornar un arreglo vacio
  return JSON.parse( localStorage.getItem('todos') ) || [];
}

export const useTodos = () => {

  const [todos, dispatch] = useReducer( todoReducer, [], init )

  useEffect(() => {
    localStorage.setItem( 'todos', JSON.stringify( todos ) )  
  }, [ todos ])
  

  const handleNewTodo = ( todo ) =>{
    const action = {
      type: '[TODO] Add todo',
      payload: todo
    }

    dispatch( action );
  }

  const handleDeleteTodo = ( id ) => {

    dispatch({
      type: '[TODO] Remove Todo',
      payload: id
    })
  }

  const handleToggleTodo = (id)=>{

    dispatch({
      type: '[TODO] Togle Todo',
      payload: id
    })
  }

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter( todo=> !todo.done).length, 
    handleDeleteTodo,
    handleToggleTodo,
    handleNewTodo,
    
  }
}
