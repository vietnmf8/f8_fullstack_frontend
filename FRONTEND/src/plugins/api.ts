import axios, {type InternalAxiosRequestConfig} from 'axios'
import Cookies from "js-cookie";
import type {FailedRequest} from "../features/auth/services/type.ts";
import {isTokenExpired} from "../features/auth/services/authService.ts";
import {logout, setToken} from "../features/auth/store/authSlice.ts";
import {toast} from "react-toastify";
import {refreshTokenApi} from "../features/auth/services/authApi.ts";
/* ==========================================================================================
 * Cấu hình Axios
 * ========================================================================================== */

const api = axios.create({
    baseURL: 'https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com',
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
export const setupInterceptors = (store: any) => {
    api.interceptors.request.use(
        async (config: InternalAxiosRequestConfig) => {
            // Lấy accessToken từ Cookies
            const accessToken = Cookies.get('accessToken');


            // Danh sách các đường dẫn không cần xác thực
            const publicPaths = ['/login/', '/master/user/', '/login/get_new_token/'];
            if (config.url && publicPaths.some(path => config.url?.includes(path))) {
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
                catch (error: any) {
                    // Nếu refresh thất bại, đăng xuất người dùng
                    store.dispatch(logout());
                    toast.error("Phiên đã hết hạn. Vui lòng đăng nhập lại.");
                    processQueue(error, null);
                    return Promise.reject(error);
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