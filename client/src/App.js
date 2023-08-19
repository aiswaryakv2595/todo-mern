import { Button, Container, Typography } from "@mui/material";
import "./App.css";
import TextField from "@mui/material/TextField";
import Todo from "./components/Todo";
import { useEffect, useState } from "react";

import { addTodo, completeTodo, deleteTodo, getAllTodo, updateTodo } from "./utils/HandleApi";

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState("")

  useEffect(() => {
    getAllTodo(setTodo);
  }, []);
const updateMode = (_id,text)=>{
  setIsUpdating(true)
  setText(text)
  setTodoId(_id)
}
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
              ? () => updateTodo(todoId,text,setTodo,setText,setIsUpdating)
              : () => addTodo(text, setText, setTodo)
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
          deleteTodo = {()=>deleteTodo(item._id,setTodo)}
          completeTodo = {()=>completeTodo(item._id,setTodo)}/>
        ))}
      </div>
    </Container>
  );
}

export default App;
