/* eslint-disable react/prop-types */
//import React from 'react'

const TodoItem = ({title,desc,isCompleted,updateHandler,deleteHandler,id}) => {



  return (
    <div className='todo'>
        <div>
            <h4>{title}</h4>
            <p>{desc}</p>
        </div>
        <div>
            <input onChange={()=>updateHandler(id)} type="checkbox" checked={isCompleted} />
            <button onClick={()=>deleteHandler(id)} className="btn">Delete</button>
        </div>
    </div>
  )
}

export default TodoItem