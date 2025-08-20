
import type {ClassData, ClassDetailData} from "../services/type.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {createClass, fetchClassDetails, fetchClasses} from "./classThunks.ts";
import type {ExamGroup} from "../../../types/exam.ts";


// Kiểu dữ liệu cho state của classroom
interface ClassState {
    classes: ClassData[];
    loading: boolean;
    error: string | null;

    // State mới cho chi tiết lớp học
    currentClassDetail: ClassDetailData | null; // Lớp học hiện tại
    currentClassExams: ExamGroup[];             // Các bài thi trong lớp đó
    isDetailLoading: boolean;                   // Loading chi tiết lớp
    detailError: string | null;
    currentClassName: string | null;            // Hiển thị tên trên Main Layout

}

// State khởi tạo
const initialState: ClassState = {
    classes: [],
    loading: false,
    error: null,

    currentClassDetail: null,
    currentClassExams: [],
    isDetailLoading: false,
    detailError: null,
    currentClassName: null,
};

/* ==========================================================================================
 * Slice: Class
 * ========================================================================================== */


const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        // cập nhật tên lớp học hiện tại -> Main Layout
        setCurrentClassName: (state, action: PayloadAction<string | null>) => {
            state.currentClassName = action.payload;
        },

        // Reset state khi rời trang chi tiết lớp học
        resetClassDetail: (state) => {
            state.currentClassDetail = null;
            state.currentClassExams = [];
            state.isDetailLoading = false;
            state.detailError = null;
            state.currentClassName = null;
        }
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



            /* Lấy chi tiết lớp học */
            // Khi fetchClassDetails đang chạy
            .addCase(fetchClassDetails.pending, (state) => {
                state.isDetailLoading = true;
                state.detailError = null;
            })

            // Khi fetchClassDetails thành công
            .addCase(fetchClassDetails.fulfilled, (state, action) => {
                state.isDetailLoading = false;
                state.currentClassDetail = action.payload.classDetail
                state.currentClassExams = action.payload.exams
                state.currentClassName = action.payload.classDetail.name
            })

            // Khi fetchClassDetails thất bại
            .addCase(fetchClassDetails.rejected, (state, action) => {
                state.isDetailLoading = false;
                state.detailError = action.payload as string;
            })
    }
})

export const { setCurrentClassName, resetClassDetail } = classSlice.actions
export default classSlice.reducer