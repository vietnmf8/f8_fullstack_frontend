import {createRoot} from 'react-dom/client'
import { RouterProvider } from 'react-router'
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from '@/theme';
import router from "@/router";
import store from "@/store";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";


createRoot(document.getElementById('root')!).render(
    <Provider store={store}> {/* Bọc ứng dụng trong Provider */}
        <ThemeProvider theme={theme}>
            <CssBaseline/> {/* Reset CSS */}
            <RouterProvider router={router}/>
            {/* Toastify */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </ThemeProvider>,
    </Provider>
)
