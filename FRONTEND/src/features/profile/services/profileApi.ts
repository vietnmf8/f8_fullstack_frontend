import type {ChangePasswordPayload, UpdateProfilePayload} from "./type.ts";
import {API_ENDPOINTS} from "../../../constants/api.ts";
import api from "../../../plugins/api.ts";
import type {AuthResponse} from "../../auth/services/type.ts";


// Gọi API để cập nhật thông tin người dùng
export const updateProfileApi = async (userId: number, payload: UpdateProfilePayload) => {
    // Thay thế :id trong URL bằng userId
    const url = API_ENDPOINTS.UPDATE_PROFILE.replace(':id', String(userId));

    // API trả về token mới
    const { data } = await api.put<AuthResponse>(url, payload)
    return data
}

// gọi API đổi mật khẩu
export const changePasswordApi = async (payload: ChangePasswordPayload) => {
    const { data } = await api.post(API_ENDPOINTS.CHANGE_PASSWORD, payload)
    return data;
}