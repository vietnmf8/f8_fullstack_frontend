import {Box} from "@mui/material";
import {Outlet} from "react-router";

const AuthLayout = () => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                minHeight: "100vh",
                bgcolor: "#f5f5f9",

            }}>

            <Outlet/>
        </Box>
    )
}

export default AuthLayout