import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type {DecodedUser} from "../services/type.ts";
import {checkAuth, loginUser, registerUser} from "./authThunks.ts";
import {jwtDecode} from "jwt-decode";

// Kiểu dữ liệu cho state của auth
// null: Khi chưa đăng nhập, hoặc đã logout
interface AuthState {
    user: DecodedUser | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
    isInitialized: boolean;
}


// Lấy token từ cookie và giải mã để lấy thông tin user khi khởi tạo, F5
const getInitialUser = (): DecodedUser | null => {
    const token = Cookies.get('accessToken');
    if (token) {
        try {
            return jwtDecode<DecodedUser>(token);
        } catch {
            return null;
        }
    }
    return null;
}


// State khởi tạo
const initialState: AuthState = {
    user: getInitialUser(),
    accessToken: Cookies.get('accessToken') || null,
    loading: false,
    error: null,
    isInitialized: false,
};


/* ==========================================================================================
 * Slice: auth
 * ========================================================================================== */

const authSlice = createSlice({
    name: 'auth',
    initialState,
    /* Các action đồng bộ (sync) -> (không phải gọi API) */
    reducers: {
        // Reducer để đăng xuất
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            // Chỉ xóa token, không xóa email đã ghi nhớ
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
        },

        // Xóa lỗi
        clearError: (state) => {
            state.error = null
        },

        // Cập nhật token
        setToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.user = jwtDecode<DecodedUser>(action.payload);
            Cookies.set('accessToken', action.payload);
        },
    },

    /* Các action bất đồng bộ (async) -> từ createAsyncThunk */
    extraReducers: (builder) => {
        builder
            /* loginUser */
            // loginUser đang chạy:
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // loginUser thành công:
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user    // action.payload -> giá trị được return từ loginUser
                state.accessToken = action.payload.accessToken;
            })

            // loginUser thất bại:
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; // action.payload -> Nội dung trong rejectWithValue(...)
            })


            /* registerUser */
            // registerUser đang chạy:
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // registerUser thành công:
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })

            // registerUser thất bại:
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            /* checkAuth */
            // checkAuth đang chạy:
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })

            // checkAuth thành công:
            .addCase(checkAuth.fulfilled, (state, action) => {
                if (action.payload?.accessToken) {
                    state.accessToken = action.payload.accessToken
                    state.user = jwtDecode<DecodedUser>(action.payload.accessToken);
                }
                state.isInitialized = true;
                state.loading = false;
            })

            // checkAuth thất bại:
            .addCase(checkAuth.rejected, (state) => {
                state.user = null;
                state.accessToken = null;
                state.isInitialized = true;
                state.loading = false;
            })

    }
})

export const { logout, clearError, setToken } = authSlice.actions
export default authSlice.reducer