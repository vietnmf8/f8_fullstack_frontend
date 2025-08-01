import {Box} from "@mui/material";
import {Outlet, useLocation, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import TabContainer from "../../../components/shared/TabContainer/TabContainer.tsx";
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import {mockClassData, mockMembers, mockRecentActivities} from '../../../data'

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
    const [activeTab, setActiveTab] = useState(0)       // Trạng thái hiện tại của các tab (Chỉ số index)

    /* ==========================================================================================
     * Logic
     * ========================================================================================== */

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








    // Nhấn vào các tab -> chuyển URL
    const onTabChange = (newTab: number) => {
        const newPath = tabs[newTab].path;
        navigate(`/class/${classId}/${newPath}`);
    }



    /* ==========================================================================================
     * Giao diện
     * ========================================================================================== */

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
                <Outlet context={{
                    classData: mockClassData,
                    members: mockMembers,
                    recentActivities: mockRecentActivities
                }} />
            </Box>
        </Box>
    )
}

export default ClassDetail