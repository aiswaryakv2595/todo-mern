import React, { useState } from 'react'
import './todo.css';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import {BsCheckAll} from 'react-icons/bs'

import { Tooltip } from '@mui/material';
const Todo = ({text,status,completeTodo,updateMode,deleteTodo}) => {
  
  return (
    <div className='todo'>
           <div className="text" id={status ? 'list-item':''}>{text}</div> 
           <div className="icons">
            <BsCheckAll className="icon" onClick={completeTodo}/>
           <BiEdit className="icon" onClick={updateMode}/>
           <Tooltip title="Delete" placement="top">
           <AiFillDelete className="icon" onClick={deleteTodo}/>
           </Tooltip>
           </div>
  
    </div>
  )
}

export default Todo