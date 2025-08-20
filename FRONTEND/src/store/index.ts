import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "@/store/rootReducer.ts";
import { setupInterceptors } from "@/plugins/api.ts";

const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false, // Tắt kiểm tra tuần tự hóa để tránh lỗi với một số dữ liệu
    //     }),
})

// Thiết lập interceptors cho axios sau khi store đã được tạo
setupInterceptors(store);

export type AppDispatch = typeof store.dispatch;
export default store;