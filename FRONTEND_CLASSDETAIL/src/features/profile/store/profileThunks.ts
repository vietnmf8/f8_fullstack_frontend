import {createAsyncThunk} from "@reduxjs/toolkit";
import type {ChangePasswordPayload, UpdateProfilePayload} from "../services/type.ts";
import type {RootState} from "../../../store/rootReducer.ts";
import {changePasswordApi, updateProfileApi} from "../services/profileApi.ts";
import {setToken} from "../../auth/store/authSlice.ts";
import {AxiosError} from "axios";


// Hành động update profile
export const updateProfile = createAsyncThunk(
    'profile/update',
    async ({userId, payload}: {userId: number, payload: UpdateProfilePayload}, { dispatch, rejectWithValue, getState }) => {
        const { auth } = getState() as RootState

        // Đảm bảo email luôn được gửi đi
        const finalPayload = {
            ...payload,
            email: auth.user?.email || payload.email
        }

        try {
            // Gọi API và nhận về token mới
            const response = await updateProfileApi(userId, finalPayload);

            // ghi đè token mới vào cookie
            // cập nhật token trong Redux state
            if (response.access) {
                dispatch(setToken(response.access));
            }

            return response;
        }
        catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data?.message || 'Cập nhật thông tin thất bại.');
            }
            return rejectWithValue('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.');
        }
    }
)


// Hành động change password
export const changePassword = createAsyncThunk(
    'profile/changePassword',
    async ({ oldPassword, newPassword }: { oldPassword: string, newPassword: string }, { getState, rejectWithValue }) => {
        const { auth } = getState() as RootState

        if (!auth.user?.id) {
            return rejectWithValue('Không tìm thấy thông tin người dùng.');
        }

        const payload: ChangePasswordPayload = {
            id: auth.user.id,
            // Mã hóa Base64 trước khi gửi đi
            old_password: btoa(oldPassword),
            new_password: btoa(newPassword),
        }

        try {
            const response = await changePasswordApi(payload);
            console.log(response)
            return response;
        }
        catch (error: unknown) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.old_password?.[0] || error.response?.data?.message || 'Đổi mật khẩu thất bại.';
                return rejectWithValue(errorMessage);
            }
            return rejectWithValue('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.');
        }
    }
)