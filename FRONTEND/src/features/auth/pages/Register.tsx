import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Box, Button, CircularProgress, IconButton, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../store";
import type {RootState} from "../store/rootReducer.ts";
import {registerUser} from "../store/authThunks.ts";
import {toast} from "react-toastify";
import {clearError} from "../store/authSlice.ts";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Register = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    // Lấy state [loading], [error] từ Redux
    const { loading, error } = useSelector((state: RootState) => state.auth);

    /* ==========================================================================================
     * State quản lý form
     * ========================================================================================== */
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    /* ==========================================================================================
     * Các hàm xử lý
     * ========================================================================================== */


    // Khi thay đổi input
    const onInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))

        // Xóa lỗi khi người dùng bắt đầu nhập lại
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    }

    // Validate form
    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors = {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }

        // Name
        if (!formData.name.trim()) {
            newErrors.name = "Tên không được để trống";
            isValid = false;
        }

        // Email
        if (!formData.email) {
            newErrors.email = "Tên không được để trống";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
            isValid = false;
        }

        // Password
        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
            isValid = false;
        }

        // Confirm Password
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu không khớp";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }


    // Nhấn nút đăng ký
    const onRegister = async () => {
        if (!validateForm()) {
            return
        }

        const resultAction = await dispatch(registerUser({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: "student",
            status: "confirming"
        }))

        if (registerUser.fulfilled.match(resultAction)) {
            toast.success("Đăng ký thành công!");
            navigate('/login');
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError()); // Xóa lỗi sau khi hiển thị
        }
    }, [error, dispatch]);

    // Nhấn nút huỷ
    const onCancel = () => {
        navigate("/login");
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
                        error={!!errors.name}
                        helperText={errors.name}
                        disabled={loading}
                        InputProps={{
                            sx: {
                                height: 45,
                                fontSize: '16px',
                                borderRadius: '8px',
                            }
                        }}
                        value={formData.name}
                        onChange={(e) =>
                            onInputChange('name', e.target.value
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
                        error={!!errors.email}
                        helperText={errors.email}
                        disabled={loading}
                        InputProps={{
                            sx: {
                                height: 45,
                                fontSize: '16px',
                                borderRadius: '8px',
                            },
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
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="off"
                        placeholder="Nhập mật khẩu"
                        error={!!errors.password}
                        helperText={errors.password}
                        disabled={loading}
                        InputProps={{
                            sx: {
                                height: 45,
                                fontSize: '16px',
                                borderRadius: '8px',
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
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
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="off"
                        placeholder="Nhập lại mật khẩu"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        disabled={loading}
                        InputProps={{
                            sx: {
                                height: 45,
                                fontSize: '16px',
                                borderRadius: '8px',
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            )
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
                        disabled={loading}
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
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng ký'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default Register