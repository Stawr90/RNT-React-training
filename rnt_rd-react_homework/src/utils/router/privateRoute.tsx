import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { useLog } from "components/loginForm/loginSlice";

const PrivateRoute = () => {
    // const isAuthenticated = localStorage.getItem('isAuthenticated');
    // console.log(isAuthenticated);

    const signIn = useSelector(useLog);
    console.log(signIn)

    return (
        signIn ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;