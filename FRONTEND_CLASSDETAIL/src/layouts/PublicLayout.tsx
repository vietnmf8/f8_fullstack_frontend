import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";


/* Layout chung cho các trang:
* - Landing
*  */
const PublicLayout = () => {
    const navigate = useNavigate();

    /* ==========================================================================================
     * Các hàm xử lý
     * ========================================================================================== */

    const onMenuClick = (path: string) => {
        navigate(path);
    }


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Header */}
            <AppBar
                position="sticky"
                sx={{
                    bgcolor: "#f5f5f9",
                    boxShadow: "none",
                }}
            >
                <Toolbar sx={{padding: "20px 24px", justifyContent: "space-between"}}>
                    {/* LOGO */}
                    <Box sx={{display: "flex", alignItems: "flex-start"}}>
                        {/* Image */}
                        <Box
                            component="img"
                            src="/src/assets/images/logo.png"
                            width="40px"
                            height="31px"
                            alt="BKStar"
                            sx={{mr: 1}}
                        />

                        {/* BK Classroom */}
                        <Box display="flex" flexDirection="column">
                            <Typography
                                variant="h6"
                                component="span"
                                sx={{
                                    color: '#113249',
                                    fontWeight: 'bold',
                                    fontSize: '24px',
                                    lineHeight: '0.8',
                                }}

                            >
                                BK
                                <strong style={{color: '#ff8e03'}}>Star</strong>
                            </Typography>

                            <Typography
                                variant="h6"
                                component="span"
                                sx={{
                                    color: '#113249',
                                    fontWeight: 'bold',
                                    fontSize: '12px',
                                }}

                            >
                                Classroom
                            </Typography>
                        </Box>
                    </Box>


                    {/* Menu Navigation */}
                    <Box sx={{display: "flex", gap: 2}}>
                        <Button
                            sx={{textTransform: 'none', fontSize: '17px', color: '#4299e1'}}
                            onClick={() => onMenuClick('/about')}
                        >
                            Giới thiệu
                        </Button>

                        <Button
                            sx={{textTransform: 'none', fontSize: '17px', color: '#4299e1'}}
                            onClick={() => onMenuClick('/features')}
                        >
                            Tính năng
                        </Button>

                        <Button
                            sx={{textTransform: 'none', fontSize: '17px', color: '#4299e1'}}
                            onClick={() => onMenuClick('/partner')}
                        >
                            Đối tác
                        </Button>

                        <Button
                            sx={{textTransform: 'none', fontSize: '17px', color: '#4299e1'}}
                            onClick={() => onMenuClick('/contact')}
                        >
                            Liên hệ
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ flex: 1 }}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default PublicLayout;