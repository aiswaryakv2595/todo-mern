import axios from "axios";
import querySting from "query-string";

// const baseUrl = 'https://todo-mern-bxuo.onrender.com';
const baseUrl = 'http://localhost:5000';

const getToken = () => localStorage.getItem('token');

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: params => querySting.stringify({ params }),
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosClient.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
 
    
    return config;
  });
axiosClient.interceptors.response.use(response=>{
    if(response && response.data) 
    return response.data
    return response
    
}, err => {
    if(!err.response){
        return alert(err)
    }
    throw err.response
})
export default axiosClient 