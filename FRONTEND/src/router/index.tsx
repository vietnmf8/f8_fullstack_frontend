import {createBrowserRouter} from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout.tsx";
import Landing from '../pages/landing/Landing'
import Register from "../features/auth/pages/Register.tsx";
import Login from "../features/auth/pages/Login.tsx";
import ClassList from "../features/classroom/pages/ClassList.tsx"
import AddClass from "../features/classroom/pages/AddClass.tsx";
import Profile from "../features/profile/pages/Profile.tsx"
import ClassDetail from "../features/classroom/pages/ClassDetail.tsx";
import ClassOverview from "../features/classroom/components/tabs/ClassOverview.tsx";
import ClassExams from "../features/classroom/components/tabs/ClassExams.tsx";
import ClassMembers from "../features/classroom/components/tabs/ClassMembers.tsx";
import ExamDetail from "../features/exam/pages/ExamDetail.tsx";
import QuestionForm from "../features/exam/pages/QuestionForm.tsx";
import ExamMarkingPage from "../features/exam/pages/ExamMarkingPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout/>,
        children: [
            {
                index: true,
                element: <Landing/>
            }
        ]
    },

    {
        path: "/",
        element: <AuthLayout/>,
        children: [
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            }
        ]
    },

    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: 'classes',
                element: <ClassList/>
            },
            {
                path: 'class/add',
                element: <AddClass/>
            },
            {
                path: 'class/:classId',
                element: <ClassDetail/>,
                children: [
                    {
                        index: true, // Route mặc định (tab Tổng quan) khi truy cập /class/:classId
                        element: <ClassOverview/>
                    },
                    {
                        path: 'exam',
                        element: <ClassExams/>
                    },
                    {
                        path: 'exam/:examId',
                        element: <ExamDetail />
                    },
                    {
                        path: 'exam/:examId/marking', // Route mới cho trang chấm bài
                        element: <ExamMarkingPage />
                    },
                    {
                        path: 'exam/:examId/:questionId',
                        element: <QuestionForm />
                    },
                    {
                        path: 'member',
                        element: <ClassMembers/>
                    }
                ]
            },



            {
                path: 'profile',
                element: <Profile/>
            }
        ]
    }

])

export default router;