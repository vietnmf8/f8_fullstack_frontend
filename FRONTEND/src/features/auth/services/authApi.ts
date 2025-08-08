import api from "../../../plugins/api.ts";
import type {AuthResponse, LoginPayLoad, RefreshTokenPayload, RegisterPayLoad} from "./type.ts";


/* Gọi API để đăng nhập */
export const loginApi = async (payload: LoginPayLoad) => {
    const { data } = await api.post<AuthResponse>('/login/', payload);
    return data;
}

/* Gọi API để đăng ký */
export const registerApi = async (payload: RegisterPayLoad) => {
    const { data } = await api.post('/master/user/', payload);
    return data;
}

/* Gọi API để làm mới token */
export const refreshTokenApi = async (payload: RefreshTokenPayload) => {
    const { data } = await api.post<AuthResponse>('/login/get_new_token/', payload);
    return data;
};