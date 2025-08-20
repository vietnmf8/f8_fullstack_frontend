import type {ClassData, ClassDetailData, CreateClassPayload} from "./type.ts";
import api from "../../../plugins/api.ts";
import {API_ENDPOINTS} from "../../../constants/api_constant.ts";


/* Class List */

// API để lấy danh sách tất cả các lớp học của người dùng.
export const getClassListApi = async (): Promise<ClassData[]> => {
    const { data } = await api.get<ClassData[]>(API_ENDPOINTS.CLASSES);
    return data;
};


// API để tạo một lớp học mới.
export const createClassApi = async (payload: CreateClassPayload): Promise<ClassData> => {
    const { data } = await api.post(API_ENDPOINTS.CLASSES, payload)
    return data
}


/* Class Detail */

// Lấy thông tin chi tiết lớp học
export const getClassDetailApi = async (classId: string): Promise<ClassDetailData> => {
    const endpoint = `${API_ENDPOINTS.CLASSES}${classId}`;
    const { data } = await api.get<ClassDetailData>(endpoint)
    return data
}

// // lấy danh sách các bài thi (exam groups) của một lớp học.
// export const getExamsByClassApi = async (classId: string): Promise<ExamGroup[]> => {
//     const endpoint = `${API_ENDPOINTS.EXAM_GROUPS_BY_CLASS}`;
//     const { data } = await api.get<ExamGroup[]>(endpoint, {
//         params: {
//             class_id: classId
//         }
//     })
//
//     return data;
// } --> getExamsByClass