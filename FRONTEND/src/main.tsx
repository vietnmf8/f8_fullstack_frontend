import {createRoot} from 'react-dom/client'
import { RouterProvider } from 'react-router'
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from './theme';
import router from "./router";

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <CssBaseline/> {/* Reset CSS */}
    <RouterProvider router={router}/>
    </ThemeProvider>,
)
