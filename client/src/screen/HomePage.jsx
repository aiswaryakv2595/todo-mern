import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { authApi } from '../utils/HandleApi';
import TodoOperation from '../components/TodoOperation';

const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [user, setUser] = useState({})
  useEffect(() => {
    const fetchUserDetails = async() => {
      const response = await authApi.dashboard()
      console.log(response.user)
      setUser(response.user)
    }
    if(isLoggedIn)
    fetchUserDetails();
  }, [isLoggedIn])
  
   
  return (
  <>
  <Navbar/>
  {isLoggedIn && (
    <>
        <div>
          Welcome, {user.username} 
        </div>
        <TodoOperation />
        </>
      )
     
      }
  </>
  )
}

export default HomePage