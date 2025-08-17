import {createAsyncThunk} from "@reduxjs/toolkit";
import {createClassApi, getClassDetailApi, getClassListApi, getExamsByClassApi} from "../services/classApi.ts";
import {AxiosError} from "axios";
import {toast} from "react-toastify";
import type {RootState} from "../../../store/rootReducer.ts";
import type {CreateClassPayload} from "../services/type.ts";

/* Class List */

// lấy danh sách lớp học
export const fetchClasses = createAsyncThunk(
    'class/fetchClasses',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getClassListApi()
            return data
        }
        catch (error: unknown) {
            let errorMessage = "Không thể tải danh sách lớp học";
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || "Không thể tải danh sách lớp học";
            }
            toast.error(errorMessage)
            return rejectWithValue(errorMessage);
        }
    }
)


// tạo một lớp học mới
export const createClass = createAsyncThunk(
    'class/createClass',
    async (classData: {name: string, code: string}, {getState, rejectWithValue}) => {
        const state = getState() as RootState
        const userId = state.auth.user?.id

        if (!userId) {
            toast.error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
            return rejectWithValue("User not found");
        }

        const payload: CreateClassPayload = {
            ...classData,
            users: [userId]
        }

        try {
            const data = await createClassApi(payload)
            toast.success("Tạo lớp học thành công!");
            return data;
        }
        catch (error: unknown) {
            let errorMessage = "Không thể tạo lớp học";
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.";
            }
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
)


/* Class Detail */

// lấy dữ liệu cho trang chi tiết lớp học.
export const fetchClassDetails = createAsyncThunk(
    'class/fetchClassDetails',
    async (classId: string, { rejectWithValue }) => {
        try {
            // Gọi đồng thời cả hai API -> tối ưu tốc độ
            const [classDetail, exams] = await Promise.all([
                getClassDetailApi(classId),
                getExamsByClassApi(classId)
            ]);
            return { classDetail, exams }
        }
        catch (error: unknown) {
            const errorMessage = "Không tải được dữ liệu lớp học";
            toast.error(errorMessage);
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data?.message || errorMessage);
            }
            return rejectWithValue(errorMessage);
        }
    }
)
