import {Box, Button, Grid, Typography} from "@mui/material";
import { useNavigate } from "react-router";

const Landing = () => {
    const navigate = useNavigate();

    /* ==========================================================================================
     * Các hàm xử lý
     * ========================================================================================== */

    // Khi nhấn vào nút Đăng nhập
    const onLogin = () => {
        navigate("/login");
    }

    // Khi nhấn vào nút đăng ký
    const onRegister = () => {
        navigate("/register");
    }


    /* ==========================================================================================
     * Giao diện
     * ========================================================================================== */

    return (
        <Box sx={{width:'100%', height: "600px", bgcolor: '#f5f5f9'}}>
            <Grid container sx={{height:'90%'}}>

                {/* Content */}
                <Grid size={6} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Box sx={{width: 'fit-content'}}>
                        {/* Main Title */}
                        <Typography
                            variant="h6"
                            color="#5282CE"
                            component="p"
                            sx={{fontSize: '18px', fontWeight: 'bold', mb: 2}}

                        >
                            BKStar Classroom
                        </Typography>

                        {/* Hero Title */}
                        <Typography
                            variant="h3"
                            component="h1"
                            color="#2d3748"
                            sx={{fontSize: '26px', fontWeight: 'bold', mb: 2}}
                        >
                            Cung cấp giải pháp học tập một cách hiệu quả
                        </Typography>

                        {/* Description */}
                        <Typography
                            variant="body1"
                            color="#2d3748"
                            sx={{fontSize: '16px', mb: 2}}
                        >
                            Đa dạng bài tập và đề thi, quản lí theo lớp học. <br/>
                            Làm bài thi trực tuyến, hệ thống chấm bài tự động vào thông minh.
                        </Typography>


                        {/* Action Button */}
                        <Box>
                            <Button
                                variant="outlined"
                                sx={{
                                    padding: '0 16px',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    lineHeight: '40px',
                                    minWidth: "100px",
                                    mr: 1,
                                }}
                                onClick={onLogin}
                            >
                                Đăng nhập
                            </Button>

                            <Button
                                variant="outlined"
                                sx={{
                                    padding: '0 16px',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    lineHeight: '40px',
                                    bgcolor: '#ff8e03',
                                    boxShadow: 'none',
                                    minWidth: "100px",
                                    color: 'white',
                                    border: 'none',
                                }}
                                onClick={onRegister}
                            >
                                Đăng ký
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                {/* Image */}
                <Grid size={6}>
                    <Box sx={{width:'100%', display: 'flex', justifyContent: 'flex-end'}}>
                        <Box
                            component="img"
                            src="https://images.unsplash.com/photo-1669447895659-d7d101008082?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGNvZGVyfGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                            width="66%"
                            height="620px"
                            sx={{
                                objectFit: 'cover',
                                mt: 3,
                                borderTopLeftRadius: 50,
                                borderBottomLeftRadius: 50
                        }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Landing