import type {ClassData, CreateClassPayload} from "./type.ts";
import api from "../../../plugins/api.ts";
import {API_ENDPOINTS} from "../../../constants/api.ts";


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