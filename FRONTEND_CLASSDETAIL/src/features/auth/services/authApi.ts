import api from "../../../plugins/api.ts";
import type {AuthResponse, LoginPayLoad, RefreshTokenPayload, RegisterPayLoad} from "./type.ts";
import {API_ENDPOINTS} from "../../../constants/api_constant.ts";


/* Gọi API để đăng nhập */
export const loginApi = async (payload: LoginPayLoad) => {
    const { data } = await api.post<AuthResponse>(API_ENDPOINTS.LOGIN, payload);
    return data;
}

/* Gọi API để đăng ký */
export const registerApi = async (payload: RegisterPayLoad) => {
    const { data } = await api.post(API_ENDPOINTS.REGISTER, payload);
    return data;
}

/* Gọi API để làm mới token */
export const refreshTokenApi = async (payload: RefreshTokenPayload) => {
    const { data } = await api.post<AuthResponse>(API_ENDPOINTS.REFRESH_TOKEN, payload);
    return data;
};