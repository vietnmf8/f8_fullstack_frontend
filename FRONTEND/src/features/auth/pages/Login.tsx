import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {
    Box,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Typography,
    Checkbox,
    FormControlLabel,
    TextField, CircularProgress,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import type {AppDispatch} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store/rootReducer.ts";
import {loginUser} from "../store/authThunks.ts";
import {toast} from "react-toastify";
import Cookies from "js-cookie";


const Login = () => {

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch()

    // Lấy state [loading], [error] từ Redux
    const { loading, error } = useSelector((state: RootState) => state.auth)

    /* ==========================================================================================
     * State
     * ========================================================================================== */

    
    // State quản lý form
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })

    // State ẩn/hiện mật khẩu
    const [showPassword, setShowPassword] = useState(false)
    // State thông báo validate
    const [errors, setErrors] = useState({ email: '', password: '' });




/* ==========================================================================================
 * useEffect
 * ========================================================================================== */

    // Hiển thị Toast nếu có lỗi
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);


    // Tự động điền email nếu có trong cookie
    useEffect(() => {
        const rememberedEmail = Cookies.get('rememberedEmail');
        if (rememberedEmail) {
            setFormData(prev => ({
                ...prev,
                email: rememberedEmail,
                rememberMe: true
            }));
        }
    }, []);

    

    /* ==========================================================================================
     * Logic
     * ========================================================================================== */

    // Khi thay đổi input
    // boolean -> có thể là checkbox
    const onInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Xóa lỗi khi người dùng bắt đầu nhập lại
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    }

    // VALIDATE:
    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors = {
            email: '',
            password: ''
        };

        // Email
        if (!formData.email) {
            newErrors.email = 'Email không được để trống';
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
            isValid = false
        }

        // Password
        if (!formData.password) {
            newErrors.password = 'Mật khẩu không được để trống';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
            isValid = false
        }

        setErrors(newErrors);
        return isValid
    }

    // Nhấn nút đăng nhập
    const onLogin = async () => {
       if (!validateForm()) {
           return;
       }

       const resultAction = await dispatch(loginUser({
           email: formData.email,
           password: formData.password,
           rememberMe: formData.rememberMe,
       }))

        // Đăng nhập thành công -> sang trang ('/classes)
        if (loginUser.fulfilled.match(resultAction)) {

            if (formData.rememberMe) {
                // Lưu email trong 30 ngày
                Cookies.set('rememberedEmail', formData.email, { expires: 30 })
            }
            // Xóa email nếu không check
            else {
                Cookies.remove('rememberedEmail')
            }

            toast.success('Đăng nhập thành công!');
            navigate('/classes');
        }
    }

    


    // Nhấn link đăng ký
    const onRegister = () => {
        navigate('/register')
    }

    // Ẩn/hiện mật khẩu
    const onShowPassword = () => {
        setShowPassword(prev => !prev)
    }


    /* ==========================================================================================
     * Giao diện
     * ========================================================================================== */

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: '100vh',
            bgcolor: "#f5f5f9",
        }}>
            {/* LOGIN BOX */}
            <Grid container sx={{
                width: '950px',
                height: '700px',
                borderRadius: '20px',

            }}>
                {/* Banner - Left */}
                <Grid size={6}>
                    <Box sx={{
                        height: '100%',
                        bgcolor: '#3182ce',
                        borderTopLeftRadius: '20px',
                        borderBottomLeftRadius: '20px',
                        padding: "30px"
                    }}>

                        <Box
                            component="img"
                            sx={{
                                width: '100%',
                                height: '70%',
                                objectFit: 'contain',
                            }}
                            src="src/assets/images/loginbg.jpg"
                            alt="Login"
                        />


                        <Box sx={{padding: '40px'}}>
                            <Typography
                                component="h3"
                                variant="h1"
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    mb: 2,
                                    color: 'white',
                                }}
                            >
                                GIEO MẦM SÁNG TẠO...
                            </Typography>

                            <Typography
                                component="h3"
                                variant="h1"
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    mb: 2,
                                    color: 'white',
                                    textAlign: 'right',
                                }}
                            >
                                ... DẪN HƯỚNG ĐAM MÊ
                            </Typography>
                        </Box>

                    </Box>
                </Grid>

                {/* Form đăng nhập - Right */}
                <Grid size={6}>
                    <Box sx={{
                        height: '100%',
                        bgcolor: 'white',
                        borderTopRightRadius: '20px',
                        borderBottomRightRadius: '20px',
                        padding: "60px 40px",
                    }}>
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            {/* Logo */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    mb: 2,
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

                            {/* Tiêu đề */}
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#2d3748',
                                    mb: 2,
                                    textAlign: 'center',
                                }}
                            >
                                Đăng nhập
                            </Typography>

                            {/* Mô tả */}
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: '14px',
                                    color: '#A0AEC0',
                                    padding: '0 100px',
                                    textAlign: 'center',
                                    mb: 5
                                }}
                            >
                                Cung cấp giải pháp toàn diện cho lớp học thông minh
                            </Typography>

                            {/* Form đăng nhập */}
                            <Box
                                component="form"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2.5
                                }}
                            >
                                {/* Trường Email */}
                                <TextField
                                    fullWidth
                                    required
                                    type="email"
                                    placeholder="Nhập email"
                                    autoComplete="email"
                                    error={!!errors.email} // -> !! chuyển giá trị đó thành kiểu boolean
                                    helperText={errors.email}   // ->  Hiển thị thông báo lỗi hoặc gợi ý bên dưới ô input.
                                    disabled={loading}
                                    InputProps={{
                                        sx: {
                                            height: 50,
                                            fontSize: '18px',
                                            borderRadius: '5px',
                                        }
                                    }}
                                    value={formData.email}
                                    onChange={(e) =>
                                        onInputChange('email', e.target.value)
                                    }
                                />

                               <Box>
                                   {/* Trường Password */}
                                   <TextField
                                       fullWidth
                                       required
                                       type={showPassword ? 'text' : 'password'}
                                       placeholder="Nhập mật khẩu"
                                       autoComplete="current-password" //Trường mật khẩu hiện tại (khi đăng nhập).
                                       error={!!errors.password}
                                       helperText={errors.password}
                                       disabled={loading}
                                       InputProps={{
                                           sx: {
                                               height: 50,
                                               fontSize: '18px',
                                               borderRadius: '5px',
                                           },
                                           endAdornment: (
                                               <InputAdornment position="end">
                                                   <IconButton
                                                       onClick={onShowPassword}
                                                       edge="end"
                                                       sx={{color: '#a0aec0'}}
                                                   >
                                                       {
                                                           showPassword
                                                               ? <VisibilityOffIcon/>
                                                               : <VisibilityIcon/>
                                                       }
                                                   </IconButton>
                                               </InputAdornment>
                                           )
                                       }}
                                       value={formData.password}
                                       onChange={(e) =>
                                           onInputChange('password', e.target.value
                                           )}
                                   />

                                   {/* Remember me! */}
                                   <FormControlLabel
                                       control={
                                           <Checkbox
                                               checked={formData.rememberMe}
                                               onChange={(e) =>
                                                   onInputChange('rememberMe', e.target.checked
                                                   )}
                                               disabled={loading}
                                           />
                                       }
                                       label={
                                           <Typography sx={{
                                               fontSize: '14px'
                                           }}>
                                               Ghi nhớ tôi
                                           </Typography>
                                       }
                                   >
                                   </FormControlLabel>
                               </Box>

                                {/* Login Button */}
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        height: 50,
                                        bgcolor: "#3182ce",
                                        boxShadow: 'none',
                                        textTransform: 'none',
                                        fontSize: '16px',
                                        borderRadius: '5px',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            bgcolor: '#3182ce',
                                            boxShadow: 'none'
                                        }
                                    }}
                                    onClick={onLogin}
                                    disabled={loading}
                                >
                                    {
                                        loading
                                        ? <CircularProgress size={24} color="inherit" />
                                        : 'Đăng nhập'
                                    }
                                </Button>
                            </Box>

                            {/* Register Link */}
                            <Box sx={{
                                textAlign: 'center',
                                mt: 'auto'
                            }}>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        fontSize: '16px',
                                        color: '#A0AEC0',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    <Link
                                        component="button" // bắt sự kiện onClick như button
                                        onClick={onRegister}
                                        sx={{
                                            color: '#3182ce',
                                            textDecoration: 'none',
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        Đăng ký
                                    </Link>
                                    {` `} tài khoản cho học viên
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                </Grid>
            </Grid>

        </Box>
    )
}

export default Login