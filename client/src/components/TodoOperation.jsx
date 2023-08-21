import { Button, Container, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { todoApi } from '../utils/HandleApi';
import { useSelector } from 'react-redux';
import Todo from './Todo'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TodoOperation = () => {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState("")
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const updateMode = (_id,text)=>{
    setIsUpdating(true)
    setText(text)
    setTodoId(_id)
  }
  const fetchTodo = async () =>{
    const response = await todoApi.getTodo()
    setTodo(response.todo)
  }
  useEffect(() => {
    if(isLoggedIn){
      fetchTodo();
    }
  }, [isLoggedIn])
  
  const handleAdd = async (text) => {
    try {
      
      const response = await todoApi.addTodo({ text }); 
  
      console.log('Response from addTodo:', response); 
      if (response) {
        toast.success('todo added')
        fetchTodo();
        setText('');
      }
    } catch (error) {
      toast.error(error)
      console.error('Error adding todo:', error);
    }
  };
  const handleComplete = async (todoId) => {
    try {
      
      const response = await todoApi.completeTodo({ todoId }); 
  
      console.log('Response from complete:', response); 
      if (response) {
        toast.success('updated successfully')
        fetchTodo();
      }
    } catch (error) {
      toast.error(error)
      console.error('Error adding todo:', error);
    }
  };
  const handleUpdate = async (todoId,text) => {
    try {
      
      const response = await todoApi.updateTodo({ todoId,text }); 
  
      console.log('Response from update:', response); 
      if (response) {
        setText("");
        setIsUpdating(false);
        fetchTodo();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  const handleDelete = async (todoId,text) => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete the todo: "${text}"?`);
      if(confirmed){
        const response = await todoApi.deleteTodo({ todoId }); 
  
        console.log('Response from update:', response); 
        if (response) {
         toast.success('Deleted successfully')
          fetchTodo();
        }
      }
     
    } catch (error) {
      toast.error(error)
      console.error('Error adding todo:', error);
    }
  };
  
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Todo List 
      </Typography>
      
      <div className="top">
        <TextField
          id="standard-basic"
          label="Add Todo"
          variant="standard"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          size="small"
          onClick={
            isUpdating
              ? () => handleUpdate(todoId,text)
              : () => handleAdd(text)
          }
        >
          {isUpdating ? "Update" : "Add"}
        </Button>
      </div>
   
      <div className="list">
      {todo.map((item) => (
          <Todo key={item._id} 
          text={item.text}
          status ={item.status} 
          updateMode={()=>updateMode(item._id,item.text)}
          deleteTodo = {()=>handleDelete(item._id,item.text)}
          completeTodo = {()=>handleComplete(item._id)}
          />
        ))}
      </div>
    </Container>
  )
}

export default TodoOperation