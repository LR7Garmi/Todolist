import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Todoprovider } from './Context/Todocontext'
import {Todoform,Todoitem} from './components/index'

function App() {
  const [todos,setTodos]=useState([])

  const addtodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo},...prev]);
  };

  const updatetodo = (id, todo) => {
    if (!todo || !todo.id) {
      console.error("Invalid todo object passed to updatetodo:", todo);
      return;
    }
  
    setTodos((prev) =>
      prev.map((prevtodo) => (prevtodo.id === todo.id ? todo : prevtodo))
    );
  };

  const deletetodo=(id,todo)=>{
    setTodos((prev)=>prev.filter((todo)=> todo.id!==id))
  }

  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevtodo)=>
      prevtodo.id===id ? {...prevtodo,completed:!prevtodo.completed} : prevtodo
    )
  )
  }

  useEffect(()=>{
      const todos=JSON.parse(localStorage.getItem("todos"))
      if(todos && todos.length>0)
      {
         setTodos(todos)
      }
      // setTodos(todos)
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])


  return (
    <Todoprovider value={{todos, addtodo, updatetodo, deletetodo, toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
              <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                  <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                  <div className="mb-4">
                      {/* Todo form goes here */} 
                      <Todoform />
                  </div>
                  <div className="flex flex-wrap gap-y-3">
                      {/*Loop and Add TodoItem here */}
                      {todos.map((todo) => (
                        <div key={todo.id}
                        className='w-full'
                        >
                          <Todoitem todo={todo} />
                        </div>
                      ))}
                  </div>
              </div>
          </div>
  </Todoprovider>   
  )
}

export default App
