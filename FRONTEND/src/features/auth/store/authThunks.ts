/* Xử lý đăng nhập */
import {createAsyncThunk} from "@reduxjs/toolkit";
import type {DecodedUser, LoginPayLoad, RegisterPayLoad} from "../services/type.ts";
import {loginApi, registerApi} from "../services/authApi.ts";
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import {AxiosError} from "axios";


// Hành động: Đăng nhập
export const loginUser = createAsyncThunk(
    'auth/login',
    async (payload: LoginPayLoad, { rejectWithValue }) => {
        try {
            const response = await loginApi(payload);
            console.log(response)

            // Cấu hình cookie
            // 7 ngày nếu rememberMe = true
            const cookieOptions = payload.rememberMe ? { expires: 7 } : undefined;

            // Lưu token vào cookie
            Cookies.set('accessToken', response.access, cookieOptions);
            Cookies.set('refreshToken', response.refresh, cookieOptions);

            // Giải mã accessToken -> lấy thông tin user
            const decodedUser: DecodedUser = jwtDecode(response.access);

            return {
                user: decodedUser,
                accessToken: response.access
            }
        }
        catch (error: unknown) {
            if (error instanceof AxiosError) {
                // Trả về lỗi để reducer xử lý
                return rejectWithValue(error.response?.data?.message || 'Email hoặc mật khẩu không đúng');
            }
            return rejectWithValue('Email hoặc mật khẩu không đúng');

        }
    }
)




// Xử lý XSS
const sanitizeInput = (input: string): string => {
    return String(input)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
};

// Hành động: Đăng ký
export const registerUser = createAsyncThunk(
    'auth/register',
    async (payload: RegisterPayLoad, { rejectWithValue }) => {

        // Làm sạch dữ liệu payload
        const sanitizedPayload: RegisterPayLoad = {
            ...payload,
            name: sanitizeInput(payload.name),
            email: sanitizeInput(payload.email),
            password: payload.password,
        }
        try {
            const response = await registerApi(sanitizedPayload);
            // Nếu thành công, API trả về message
            console.log("API Register Response:", response);
            return response
        }
        catch (error: unknown) {
            if (error instanceof AxiosError) {
                const errorData = error.response?.data;
                console.log(errorData)
                let errorMessage = 'Đăng ký không thành công. Vui lòng thử lại.';

                if (errorData && errorData.email && Array.isArray(errorData.email)) {
                    errorMessage = "Email này đã tồn tại.";
                }

                return rejectWithValue(errorMessage);
            }
            return rejectWithValue("Đăng ký không thành công. Vui lòng thử lại.");
        }
    }
)