import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.ts";

const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false, // Tắt kiểm tra tuần tự hóa để tránh lỗi với một số dữ liệu
    //     }),
})



export type AppDispatch = typeof store.dispatch;
export default store;