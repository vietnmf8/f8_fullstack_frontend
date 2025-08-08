/*
* - Nếu có accessToken, cho phép truy cập.
* - Nếu không, chuyển hướng về trang /login.
* */

import {Navigate, Outlet} from "react-router";
import type {RootState} from "../features/auth/store/rootReducer.ts";
import {useSelector} from "react-redux";

const ProtectedRoute = () => {
    // Lấy accessToken
    const  { accessToken } = useSelector((state: RootState) => state.auth)

    // Nếu có token, render component con (Outlet)
    // Không có token, chuyển hướng đến trang login
    return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}


export default ProtectedRoute;