import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = "http://localhost:5000";
const getAllTodo = (setTodo) => {
  axios.get(baseURL).then(({ data }) => {
    console.log(data);
    setTodo(data);
  });
};
const addTodo = (text, setText, setTodo) => {
  axios
    .post(`${baseURL}/save`, { text })
    .then((data) => {
      console.log(data);
      toast.success("added successfully")
      setText("");
      getAllTodo(setTodo);
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message || err.message);
      setText("");
    }
    
    
    );
};
const updateTodo = (todoId, text, setTodo, setText, setIsUpdating) => {
  axios
    .patch(`${baseURL}/update`, { id: todoId, text })
    .then((data) => {
      console.log(data);
      setText("");
      setIsUpdating(false);
      getAllTodo(setTodo);
    })
    .catch((error) => console.log(error));
};
const deleteTodo = (todoId, setTodo) => {
    axios
      .post(`${baseURL}/delete`, { id: todoId })
      .then((data) => {
        console.log(data);
      
        getAllTodo(setTodo);
      })
      .catch((error) => console.log(error));
  };
  const completeTodo = (todoId, setTodo) => {
    axios
      .patch(`${baseURL}/complete`, { id: todoId })
      .then((data) => {
        console.log(data);
      
        getAllTodo(setTodo);
      })
      .catch((error) => console.log(error));
  };
export { getAllTodo, addTodo, updateTodo,deleteTodo,completeTodo };
