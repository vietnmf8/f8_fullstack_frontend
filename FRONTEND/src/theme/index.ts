import {createTheme} from "@mui/material";


/* ==========================================================================================
 * Tạo Theme cho toàn bộ dự án
 * ========================================================================================== */

const theme = createTheme({
    palette: {
        primary: {
            main: "#113249",
        },
        secondary: {
            main: "#ff8e03",
        }
    },
    typography: {
        fontFamily: [
            'Roboto',
            'Arial',
            'sans-serif',
        ].join(','), // Chuyển thành chuỗi
    }
})

export default theme;