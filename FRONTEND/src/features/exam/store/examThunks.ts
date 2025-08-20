import {createAsyncThunk} from "@reduxjs/toolkit";
import {createExam, getExamsByClass, updateExam} from "@/features/exam/services/examApi.ts";
import {AxiosError} from "axios";
import {toast} from "react-toastify";
import type {CreateExamPayload, UpdateExamActionPayload} from "@/features/exam/services/type.ts";


// lấy danh sách bài thi
export const fetchExamsByClass = createAsyncThunk(
    "exam/fetchByClass",
    async (classId: string, { rejectWithValue }) => {
        try {
            return await getExamsByClass(classId);
        }
        catch (error: unknown) {
            let errorMessage = "Lấy danh sách bài thi thất bại";
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || "Lấy danh sách bài thi thất bại";
            }
            toast.error(errorMessage)
            return rejectWithValue(errorMessage);
        }
    }
)



// tạo bài thi mới
export const createExamAction = createAsyncThunk(
    "exam/create",
    async (payload: CreateExamPayload, { rejectWithValue }) => {
        try {
            const data = await createExam(payload);
            toast.success("Tạo bài thi thành công!");
            return data
        }
        catch (error: unknown) {
            let errorMessage = "Tạo bài thi thất bại";
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || "Tạo bài thi thất bại";
            }
            toast.error(errorMessage)
            return rejectWithValue(errorMessage);
        }
    }
)



// cập nhật bài thi
export const updateExamAction = createAsyncThunk(
    "exam/update",
    async (payload: UpdateExamActionPayload, { rejectWithValue }) => {
        try {
            const data = await updateExam(payload);
            toast.success("Cập nhật bài thi thành công!");
            return data
        }
        catch (error: unknown) {
            let errorMessage = "Cập nhật bài thi thất bại";
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || "Cập nhật bài thi thất bại";
            }
            toast.error(errorMessage)
            return rejectWithValue(errorMessage);
        }
    }
)