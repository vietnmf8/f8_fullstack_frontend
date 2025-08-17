import {Box, CircularProgress, Typography} from "@mui/material";
import {Outlet, useLocation, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import TabContainer from "../../../components/shared/TabContainer/TabContainer.tsx";
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import type {AppDispatch} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store/rootReducer.ts";
import {fetchClassDetails} from "../store/classThunks.ts";
import {resetClassDetail} from "../store/classSlice.ts";

/* ==========================================================================================
   * Tabs
   * ========================================================================================== */

const tabs = [
    {label: 'Tổng quan', path: '', icon: <InfoIcon/>},
    {label: 'Bài thi', path: 'exam', icon: <AssessmentIcon/>},
    {label: 'Thành viên', path: 'member', icon: <PeopleIcon/>},
]



const ClassDetail = () => {

    /* ==========================================================================================
     * State
     * ========================================================================================== */
    const { classId } = useParams<{ classId: string }>();
    const location = useLocation();       // Lấy thông tin về URL hiện tại
    const navigate = useNavigate();     // Hàm để điều hướng đến các trang khác

    const dispatch: AppDispatch = useDispatch();
    const { isDetailLoading, detailError } = useSelector((state: RootState) => state.class) // Loading chi tiết lớp học
    const [activeTab, setActiveTab] = useState(0)       // Trạng thái hiện tại của các tab (Chỉ số index)


    /* ==========================================================================================
     * useEffect
     * ========================================================================================== */

    // Fetch dữ liệu chi tiết lớp học khi component được mount
    useEffect(() => {
        if (classId) {
            dispatch(fetchClassDetails(classId));
        }

        // Cleanup function: Reset state khi component unmount
        return () => {
            dispatch(resetClassDetail());
        }
    }, [classId, dispatch]);


    // Cập nhật activeTab dựa trên URL
    useEffect(() => {
        // Phân đoạn path
        const pathSegments = location.pathname.split("/").filter(Boolean)

        // Tìm chỉ mục index tương ứng
        const currentTabIndex = tabs.findIndex(tab => {
            if (tab.path === '') {
                return pathSegments.length === 2;
            }

            return pathSegments.includes(tab.path);
        })
        console.log("currentTabIndex →", currentTabIndex);

        if (currentTabIndex !== -1) {
            setActiveTab(currentTabIndex);
        }
    }, [location.pathname]);

    /* ==========================================================================================
     * Logic
     * ========================================================================================== */

    // Nhấn vào các tab -> chuyển URL
    const onTabChange = (newTab: number) => {
        const newPath = tabs[newTab].path;
        navigate(`/class/${classId}/${newPath}`);
    }


    /* ==========================================================================================
     * Giao diện
     * ========================================================================================== */


    // Loading
    if (isDetailLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
                <CircularProgress />
            </Box>
        )
    }

    // Thông báo lỗi
    if (detailError) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)' }}>
                <Typography color="error">{detailError}</Typography>
            </Box>
        )
    }

    return (
        <Box sx={{
            bgcolor: '#f7f7f9',
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
        }}>
            <TabContainer
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={onTabChange}
            />

            {/* Vùng nội dung cho các tab con, được quản lý bởi Router */}
            <Box sx={{ flex: 1, width: '100%' }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default ClassDetail