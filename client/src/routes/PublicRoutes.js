import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    console.log('islogged',isLoggedIn)
    return !isLoggedIn ? <Outlet /> : <Navigate to='/dashboard' replace />;
}

export default PublicRoutes