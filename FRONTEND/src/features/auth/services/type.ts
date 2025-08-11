/* Login Payload */
import type {AxiosError, InternalAxiosRequestConfig} from "axios";

export interface LoginPayLoad {
    email: string;
    password?: string;
    rememberMe?: boolean
}

/* Register Payload */
export interface RegisterPayLoad {
    name: string;
    email: string;
    role: 'student' | 'teacher';
    status: 'confirming';
    password?: string;
}

/* Refresh Token Payload */
export interface RefreshTokenPayload {
    refresh: string;
}

/* AuthResponse */
export interface AuthResponse {
    access: string;
    refresh: string;
}

/* Các request lỗi khi đang chờ token mới */
export interface FailedRequest {
    resolve: (config: InternalAxiosRequestConfig) => void;
    reject: (error: AxiosError | unknown) => void;
    config: InternalAxiosRequestConfig;
}

/* Decode Token */
export interface DecodedUser {
    id: number;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    parent_name: string | null;
    parent_phone: string | null;
    school: string | null;
    avatar: {
        id: number | null;
        url: string | null;
    };
    exp: number; // Thời gian hết hạn token
}