import {useNavigate} from "react-router";
import {useState} from "react";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";

const Register = () => {
    const navigate = useNavigate();

    /* ==========================================================================================
     * State quản lý form
     * ========================================================================================== */
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    /* ==========================================================================================
     * Các hàm xử lý
     * ========================================================================================== */

    // Khi thay đổi input
    const onInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    // Nhấn nút đăng ký
    const onRegister = () => {
        // Xử lý logic đăng ký
        console.log('Đăng ký dữ liệu: ', formData)
    }

    // Nhấn nút huỷ
    const onCancel = () => {
        navigate("/");
    }


    /* ==========================================================================================
     * Giao diện
     * ========================================================================================== */

    return (
        <Paper
            elevation={3} // độ bóng đổ
            sx={{
                width: "500px",
                padding: "40px",
                borderRadius: "15px",
            }}
        >
            {/* Logo & Tiêu đề */}
            <Box>
                {/* Logo */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: 'center',
                        mb: 3,
                    }}>
                    {/* Image */}
                    <Box
                        component="img"
                        src="/src/assets/images/logo.png"
                        width="65px"
                        height="50px"
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
                                fontSize: '48px',
                                lineHeight: '0.8',
                            }}

                        >
                            BK
                            <strong style={{color: '#ff8e03'}}>Star</strong>
                        </Typography>
                    </Box>
                </Box>

                <Typography
                    component="h1"
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '24px',
                        textAlign: 'center',
                        mb: 5,
                    }}
                >
                    Đăng ký học viên
                </Typography>
            </Box>

            {/* Form Đăng ký */}
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                }}
            >
                {/* Trường tên */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            fontSize: "16px"
                        }}
                    >
                        Tên của bạn
                    </Typography>

                    <TextField
                        fullWidth
                        required
                        autoComplete="off"
                        placeholder="Nhập tên của bạn"
                        InputProps={{
                            sx: {
                                height: 45,
                                fontSize: '16px',
                                borderRadius: '8px',
                            }
                        }}
                        value={formData.fullName}
                        onChange={(e) =>
                            onInputChange('fullName', e.target.value
                            )}
                    />
                </Box>


                {/* Trường Email */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            fontSize: "16px"
                        }}
                    >
                        Địa chỉ email
                    </Typography>

                    <TextField
                        fullWidth
                        required
                        type="email"
                        autoComplete="off"
                        placeholder="Nhập địa chỉ email"
                        InputProps={{
                            sx: {
                                height: 45,
                                fontSize: '16px',
                                borderRadius: '8px',
                            }
                        }}
                        value={formData.email}
                        onChange={(e) =>
                            onInputChange('email', e.target.value
                            )}
                    />
                </Box>



                {/* Trường mật khẩu */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            fontSize: "16px"
                        }}
                    >
                        Mật khẩu
                    </Typography>

                    <TextField
                        fullWidth
                        required
                        type="password"
                        autoComplete="off"
                        placeholder="Nhập mật khẩu"
                        InputProps={{
                            sx: {
                                height: 45,
                                fontSize: '16px',
                                borderRadius: '8px',
                            }
                        }}
                        value={formData.password}
                        onChange={(e) =>
                            onInputChange('password', e.target.value
                            )}
                    />
                </Box>


                {/* Trường confirm mật khẩu */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            fontSize: "16px"
                        }}
                    >
                        Nhập lại mật khẩu
                    </Typography>

                    <TextField
                        fullWidth
                        required
                        type="password"
                        autoComplete="off"
                        placeholder="Nhập lại mật khẩu"
                        InputProps={{
                            sx: {
                                height: 45,
                                fontSize: '16px',
                                borderRadius: '8px',
                            }
                        }}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            onInputChange('confirmPassword', e.target.value
                            )}
                    />
                </Box>


                {/* Các nút action */}
                <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
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
                        onClick={onCancel}
                    >
                        Huỷ
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
        </Paper>
    )
}

export default Register