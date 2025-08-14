
import type {ClassData} from "../services/type.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createClass, fetchClasses} from "./classThunks.ts";


// Kiểu dữ liệu cho state của classroom
interface ClassState {
    classes: ClassData[];
    loading: boolean;
    error: string | null;
}

// State khởi tạo
const initialState: ClassState = {
    classes: [],
    loading: false,
    error: null,
};

/* ==========================================================================================
 * Slice: Class
 * ========================================================================================== */


const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        // Chưa có!
    },
    extraReducers: (builder) => {
        builder
            /* Lấy danh sách lớp */
            // Khi fetchClasses đang chạy
            .addCase(fetchClasses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // Khi fetchClasses thành công
            .addCase(fetchClasses.fulfilled, (state, action) => {
                state.loading = false;
                state.classes = action.payload
            })

            // Khi fetchClasses thất bại
            .addCase(fetchClasses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })


            /* Tạo lớp học */
            // Khi createClass đang chạy
            .addCase(createClass.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // Khi createClass thành công
            .addCase(createClass.fulfilled, (state, action) => {
                state.loading = false;
                // Thêm lớp học mới vào đầu danh sách
                state.classes.unshift(action.payload);
            })

            // Khi createClass thất bại
            .addCase(createClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})


export default classSlice.reducer