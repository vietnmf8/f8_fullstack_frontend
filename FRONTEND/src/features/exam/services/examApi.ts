import api from "@/plugins/api.ts";
import type {ExamGroup} from "@/types/exam.ts";
import {API_ENDPOINTS} from "@/constants/api_constant.ts";
import type {CreateExamPayload, UpdateExamActionPayload} from "@/features/exam/services/type.ts";


// API để lấy danh sách bài thi của một lớp học
export const getExamsByClass = async (classId: string): Promise<ExamGroup[]> => {
    try {
        const response = await api.get<ExamGroup[]>(
            `${API_ENDPOINTS.EXAM_GROUPS_BY_CLASS}?class_id=${classId}`
        );
        return response.data;
    }
    catch (error) {
        console.error("Lỗi khi lấy danh sách bài thi:", error);
        throw error;
    }
}


// API để tạo một bài thi mới
export const createExam = async (payload: CreateExamPayload): Promise<ExamGroup> => {
    try {
        const response = await api.post<ExamGroup>(
            API_ENDPOINTS.EXAM_GROUPS_BY_CLASS,
            payload
        );
        return response.data
    }
    catch (error) {
        console.error("Lỗi khi tạo bài thi:", error);
        throw error;
    }
}


// API để cập nhật một bài thi
export const updateExam = async ({ id, data }: UpdateExamActionPayload) => {
    try {
        const response = await api.put<ExamGroup>(
            `${API_ENDPOINTS.EXAM_GROUPS_BY_CLASS}${id}`,
            data
        );
        return response.data
    }
    catch (error) {
        console.error("Lỗi khi cập nhật bài thi:", error);
        throw error;
    }
}