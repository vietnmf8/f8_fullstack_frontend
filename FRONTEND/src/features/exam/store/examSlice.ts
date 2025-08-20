import type {ExamGroup} from "@/types/exam.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createExamAction, fetchExamsByClass, updateExamAction} from "@/features/exam/store/examThunks.ts";

interface ExamState {
    exams: ExamGroup[];
    loading: boolean;
    error: string | null;
}

const initialState: ExamState = {
    exams: [],
    loading: false,
    error: null,
}

const examSlice = createSlice({
    name: "exam",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /* fetch */
            // pending
            .addCase(fetchExamsByClass.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // fulfilled
            .addCase(fetchExamsByClass.fulfilled, (state, action) => {
                state.loading = false;
                state.exams = action.payload;
            })
            // rejected
            .addCase(fetchExamsByClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })


            /* create */
            //pending
            .addCase(createExamAction.pending, (state) => {
                state.loading = true;
            })
            // fulfilled
            .addCase(createExamAction.fulfilled, (state, action) => {
                state.loading = false;
                state.exams.unshift(action.payload);
            })
            // rejected
            .addCase(createExamAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            /* update */
            //pending
            .addCase(updateExamAction.pending, (state) => {
                state.loading = true;
            })
            // fulfilled
            .addCase(updateExamAction.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.exams.findIndex(exam => exam.id === action.payload.id);
                if (index !== -1) {
                    state.exams[index] = action.payload
                }
            })
            //rejected
            .addCase(updateExamAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export default examSlice.reducer