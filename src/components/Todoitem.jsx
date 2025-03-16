// import React from 'react'
import { useState } from 'react'   
import {usetodo} from '../Context/Todocontext'
// import { todo } from 'node:test'

function Todoitem({todo}) {

    const [isTodoeditable,setTodoEditable]=useState(false)
    const[todomsg,settodomsg]=useState(todo.todo)
    const {updatetodo,deletetodo,toggleComplete}=usetodo()

    const edittodo=(id)=>{
        updatetodo(todo,id,{...todo, todo:todomsg})
        setTodoEditable(false)
    }

    const toggleCompleted=()=>{
        toggleComplete(todo.id)
    }
  return (
    <div
    className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}>
        <input type="checkbox" className='cursor-pointer' checked={todo.completed} onChange={toggleCompleted} />
        <input type="text" className={`border outline-none w-full bg-transparent rounded-lg ${isTodoeditable ? "border-black/10 px-2" : "border-transparent"}`} onChange={(e)=>settodomsg(e.target.value)} value={todomsg} readOnly={!isTodoeditable} />
        <button className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
        onClick={()=>{
                if(todo.completed)
                    return;
                if(isTodoeditable)
                    edittodo()
                else
                    setTodoEditable((prev)=>!prev)
        }}
        disabled={todo.completed}>
        {isTodoeditable ? "💾":"📝"}
        </button>
        <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deletetodo(todo.id)}
        >❌</button>
    </div>
  )
}

export default Todoitem