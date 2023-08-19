import axiosClient from "./axiosClient";
export const authApi = {
  login:params => axiosClient.post('/login',params),
  signup:params => axiosClient.post('/signup',params),
  dashboard:()=>axiosClient.get('/dashboard')
}
export const todoApi = {
  addTodo:params => axiosClient.post('/save',params),
  getTodo:() => axiosClient.get('/todo'),
  updateTodo:(todoId,text) => axiosClient.patch('/update',todoId,text),
  completeTodo:(todoId) => axiosClient.patch('/complete',todoId),
  deleteTodo:(todoId) => axiosClient.post('/delete',todoId)
}