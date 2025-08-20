import axios, {AxiosError, type InternalAxiosRequestConfig} from 'axios'
import Cookies from "js-cookie";
import type {FailedRequest} from "@/features/auth/services/type.ts";
import {isTokenExpired} from "@/features/auth/services/authService.ts";
import {logout, setToken} from "@/features/auth/store/authSlice.ts";
import {toast} from "react-toastify";
import {refreshTokenApi} from "@/features/auth/services/authApi.ts";
import type {Store} from "@reduxjs/toolkit";
import {API_BASE_URL, API_ENDPOINTS} from "@/constants/api_constant.ts";
/* ==========================================================================================
 * Cấu hình Axios
 * ========================================================================================== */

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 giây
    headers: {
        'Content-Type': 'application/json'
    }
})

// đang trong quá trình làm mới (token) phải không?
// -> dùng để tránh gửi nhiều request refresh cùng lúc.
let isRefreshing = false;

// Hàng đợi chứa các request bị tạm hoãn trong khi chờ token mới
let failedQueue: FailedRequest[] = []


// Xử lý các request trong hàng đợi
const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            // Gán token mới vào header và giải quyết promise để request được thực thi lại
            if (prom.config.headers) {
                prom.config.headers.Authorization = `Bearer ${token}`;
            }
            // Giải quyết promise với config đã được cập nhật
            prom.resolve(prom.config);
        }
    });
    failedQueue = [];
};


// Tự động đính kèm Access Token vào header của mỗi request.
export const setupInterceptors = (store: Store) => {
    api.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            // Lấy accessToken từ Cookies
            const accessToken = Cookies.get('accessToken');

            const publicEndpoints = [
                { method: 'post', path: API_ENDPOINTS.LOGIN },
                { method: 'post', path: API_ENDPOINTS.REGISTER },
                { method: 'post', path: API_ENDPOINTS.REFRESH_TOKEN }
            ];

            const isPublic = publicEndpoints.some(endpoint =>
                config.method?.toLowerCase() === endpoint.method && config.url === endpoint.path
            );

            // Nếu là public endpoint, không cần đính kèm token.
            if (isPublic) {
                return config;
            }


            // Nếu đang trong quá trình refresh token, đưa request vào hàng đợi
            if (isRefreshing) {
                return new Promise<InternalAxiosRequestConfig>((resolve, reject) => {
                    failedQueue.push({ resolve, reject, config });
                });
            }

            // Kiểm tra nếu token sắp hết hạn
            if (accessToken && isTokenExpired(accessToken, 14 * 60)) {
                isRefreshing = true;
                const refreshToken = Cookies.get('refreshToken');

                if (!refreshToken) {
                    store.dispatch(logout());
                    toast.error("Phiên đã hết hạn. Vui lòng đăng nhập lại.");
                    isRefreshing = false;
                    return Promise.reject(new Error("No refresh token available"));
                }

                try {
                    // Gọi API để lấy token mới
                    const response = await refreshTokenApi({ refresh: refreshToken });
                    const newAccessToken = response.access;
                    const newRefreshToken = response.refresh;

                    // Cập nhật token mới vào store và cookies
                    store.dispatch(setToken(newAccessToken));
                    Cookies.set('refreshToken', newRefreshToken);

                    // Gán token mới vào header của request hiện tại
                    if (config.headers) {
                        config.headers.Authorization = `Bearer ${newAccessToken}`;
                    }
                    // Xử lý hàng đợi với token mới
                    processQueue(null, newAccessToken);
                    return config;
                }
                catch (error: unknown) {
                    // Nếu refresh thất bại, đăng xuất người dùng
                    store.dispatch(logout());
                    toast.error("Phiên đã hết hạn. Vui lòng đăng nhập lại.");

                    if (error instanceof Error ||error instanceof AxiosError) {
                        processQueue(error, null);
                    } else {
                        processQueue(new Error('Loi rui!!!'), null);
                    }
                }
                finally {
                    isRefreshing = false;
                }
            }
            else if (accessToken) {
                // Nếu token còn hạn, đính kèm vào header
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )
}


export default api;