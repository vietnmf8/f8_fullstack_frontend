import {createSlice} from "@reduxjs/toolkit";
import {changePassword, updateProfile} from "./profileThunks.ts";

interface ProfileState {
    loading: boolean;
    passwordLoading: boolean; // loading đổi mật khẩu
    error: string | null;
}

const initialState: ProfileState = {
    loading: false,
    passwordLoading: false,
    error: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        // xóa thông báo lỗi
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            /* Update Profile */
            // pending
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // fulfilled
            .addCase(updateProfile.fulfilled, (state) => {
                state.loading = false;
            })
            // rejected
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            /* Change Password */
            // pending
            .addCase(changePassword.pending, (state) => {
                state.passwordLoading = true;
                state.error = null;
            })
            // fulfilled
            .addCase(changePassword.fulfilled, (state) => {
                state.passwordLoading = false;
            })
            // rejected
            .addCase(changePassword.rejected, (state, action) => {
                state.passwordLoading = false;
                state.error = action.payload as string;
            })
    }
})

export const { clearError } = profileSlice.actions
export default profileSlice.reducer