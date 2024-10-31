import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = () => {

    const current_location = useLocation();
    console.log(current_location);

    const token = sessionStorage.getItem("token");
    console.log(token);
    if(token) {
        return <Outlet />
    }
    else {
        return <Navigate to={'/login'} state={{from: {pathname:current_location.pathname}}} />
    }

   
}

export default ProtectRoute