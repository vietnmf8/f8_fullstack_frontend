import {useDispatch} from "react-redux";
import type {AppDispatch} from "@/store";
import {useEffect} from "react";
import {checkAuth} from "@/features/auth/store/authThunks.ts";
import { Outlet } from "react-router";


function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // Gọi action kiểm tra trạng thái đăng nhập một lần duy nhất
        dispatch(checkAuth());
    }, [dispatch]);

    return <Outlet />;
}

export default App
