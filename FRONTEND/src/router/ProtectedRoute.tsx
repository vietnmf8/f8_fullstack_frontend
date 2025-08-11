/*
* - Nếu có accessToken, cho phép truy cập.
* - Nếu không, chuyển hướng về trang /login.
* */

import {Navigate, Outlet} from "react-router";
import type {RootState} from "../features/auth/store/rootReducer.ts";
import {useSelector} from "react-redux";
import {Box, CircularProgress} from "@mui/material";

const ProtectedRoute = () => {
    // Lấy accessToken
    const  { accessToken, isInitialized } = useSelector((state: RootState) => state.auth)


    // TH1: Đang chờ kiểm tra xác thực ban đầu
    if (!isInitialized) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // TH2: Đã kiểm tra xong và có token
    if (accessToken) {
        return <Outlet />;
    }


    // TH3: Đã kiểm tra xong và không có token
    return <Navigate to="/login" replace />;

}


export default ProtectedRoute;