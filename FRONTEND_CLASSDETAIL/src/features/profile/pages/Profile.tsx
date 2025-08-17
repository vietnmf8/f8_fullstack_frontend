import {useEffect, useRef, useState} from "react";
import {Avatar, Box, Button, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import type { AppDispatch } from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store/rootReducer.ts";
import userPlaceholder from '../../../assets/images/user.jpg';
import * as React from "react";
import type {UpdateProfilePayload} from "../services/type.ts";
import { toast } from "react-toastify";
import {changePassword, updateProfile} from "../store/profileThunks.ts";


const Profile = () => {


    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { loading, passwordLoading } = useSelector((state: RootState) => state.profile);



    /* ==========================================================================================
     * State
     * ========================================================================================== */

    // State quản lý form thông tin cá nhân
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        school: "",
        parent_name: "",
        parent_phone: "",
    })

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarPayload, setAvatarPayload] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);


    // State quản lý form đổi mật khẩu
    const [passwordData, setPasswordData] = useState({
        old_password: "",
        new_password: "",
        confirm_password: "",
    })

    /* ==========================================================================================
     * useEffect
     * ========================================================================================== */

    // Tự động điền dữ liệu từ Redux store vào form khi component được mount hoặc user thay đổi
    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || "",
                email: user.email || "",
                school: user.school || "",
                parent_name: user.parent_name || "",
                parent_phone: user.parent_phone || "",
            });
            setAvatarPreview(user.avata?.url || userPlaceholder);
        }
    }, [user]);

    /* ==========================================================================================
     * Các hàm xử lý
     * ========================================================================================== */

    // Khi thay đổi input thông tin cá nhân
    const onProfileInputChange = (field: string, value: string) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value,
        }))
    }


    // Xử lý khi chọn file ảnh
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setAvatarPreview(base64String);
                // Chỉ lấy phần base64 sau dấu phẩy
                setAvatarPayload(base64String.split(',')[1]);
            };
            reader.readAsDataURL(file);
        }
    };


    // Khi thay đổi input mật khẩu
    const onPasswordInputChange = (field: string, value: string) => {
        setPasswordData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Khi nhấn nút "tải lên" avatar
    const onUploadAvatar = () => {
        fileInputRef.current?.click();
    }


    // Xử lý lưu thông tin
    const onSaveProfile = async () => {
        if (!user) return;
        if (!profileData.name.trim()) {
            toast.error('Tên của bạn không được để trống.');
            return;
        }

        const avatarData =
            avatarPayload !== null
                ? {
                    id: user.avata?.id || null,
                    url: user.avata?.url || null,
                    payload: avatarPayload,
                }
                : null;

        const payload: UpdateProfilePayload = {
            ...profileData,
            avata: avatarData,
        };

        try {
            await dispatch(updateProfile({ userId: user.id, payload })).unwrap();
            toast.success('Cập nhật thông tin thành công!');
            // Reset avatar payload sau khi thành công
            setAvatarPayload(null);
        } catch (err) {
            toast.error(err as string);
        }
    };

    // xử lý đổi mật khẩu
    const onChangePassword = async () => {
        const { old_password, new_password, confirm_password } = passwordData

        // Validate
        if (!old_password || !new_password || !confirm_password) {
            toast.error("Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        if (new_password !== confirm_password) {
            toast.error("Mật khẩu mới không khớp. Vui lòng nhập lại.");
            return;
        }
        if (new_password.length < 6) {
            toast.error("Mật khẩu mới phải có ít nhất 6 ký tự.");
            return;
        }

        try {
            await dispatch(changePassword({ oldPassword: old_password, newPassword: new_password })).unwrap();
            toast.success('Đổi mật khẩu thành công!');

            // Reset form
            setPasswordData({
                old_password: "",
                new_password: "",
                confirm_password: "",
            });
        }
        catch (err) {
            toast.error(err as string);
        }
    }




    /* ==========================================================================================
     * Giao diện
     * ========================================================================================== */

    return (
        <Box
            sx={{
                bgcolor: '#f7f7f9',
                width: '100%',
                minHeight: 'calc(100vh - 64px)',
                padding: '40px',
            }}
        >

            <input
                type="file"
                ref={fileInputRef}
                onChange={onFileChange}
                style={{ display: 'none' }}
                accept="image/png, image/jpeg"
            />


            {/* Header */}
            <Box>
                <Typography
                    component="h2"
                    variant="h1"
                    sx={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#2d3748',
                    }}
                >
                    Thông tin cá nhân
                </Typography>
            </Box>

            {/* Thông tin cơ bản */}
            <Box
                sx={{
                    bgcolor: 'white',
                    borderRadius: '12px',
                    padding: '30px 30px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    mt: 4,
                }}
            >
                <Box>
                    {/* Thông tin cơ bản & Lưu lại */}
                    <Box
                        sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                    >
                        <Typography
                            sx={{
                                fontSize: '18px',
                                color: '#3182ce',
                                fontWeight: '500',
                            }}
                        >
                            Thông tin cơ bản
                        </Typography>

                        <Button
                            variant="text"
                            sx={{
                                bgcolor: '#3182ce',
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: '500',
                                fontSize: '16px',
                                padding: '5px 20px',
                                borderRadius: '5px',
                                '&:hover': {
                                    bgcolor: '#2c5aa0'
                                }
                            }}
                            onClick={onSaveProfile}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Lưu lại'}
                        </Button>
                    </Box>
                </Box>

                {/* Avatar */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    my: 4,
                    flexDirection: 'column',
                    gap: '20px',
                }}>
                    <Avatar
                        sx={{
                            width: '160px',
                            height: '160px',
                            fontSize: '24px',
                            fontWeight: '500',
                            color: 'white',
                        }}
                        src={avatarPreview || userPlaceholder}
                    >
                        {profileData.name.charAt(0).toUpperCase()}
                    </Avatar>

                    <Button
                        variant={"outlined"}
                        startIcon={<CameraAltIcon/>}
                        sx={{
                            fontSize: '16px',
                            textTransform: 'none',
                            borderColor: '#3182ce',
                            color: '#3182ce',
                            '&:hover': {
                                borderColor: '#2c5aa0',
                                bgcolor: '#f7fafc'
                            },
                            borderRadius: '8px',
                            padding: '10px 20px'
                        }}
                        onClick={onUploadAvatar}
                    >
                        Tải lên
                    </Button>
                </Box>

                {/* Form */}
                <Box component="form">
                    <Grid container spacing={5}>

                        {/* Trường tên */}
                        <Grid size={{xs: 12, md: 6}}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: '500',
                                    mb: 1,
                                    fontSize: '16px',
                                    color: '#2d3748',
                                }}
                            >
                                Tên của bạn
                            </Typography>

                            <TextField
                                variant="outlined"
                                fullWidth
                                autoComplete="off"
                                InputProps={{
                                    sx: {
                                        height: 45,
                                        fontSize: '16px',
                                        borderRadius: '8px',
                                    }
                                }}
                                value={profileData.name}
                                onChange={(e) => onProfileInputChange('name', e.target.value)}
                            />
                        </Grid>

                        {/* Trường email */}
                        <Grid size={{xs: 12, md: 6}}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: '500',
                                    mb: 1,
                                    fontSize: '16px',
                                    color: '#2d3748',
                                }}
                            >
                                Email
                            </Typography>

                            <TextField
                                fullWidth
                                autoComplete="off"
                                InputProps={{
                                    sx: {
                                        height: 45,
                                        fontSize: '16px',
                                        borderRadius: '8px',
                                        bgcolor: '#f7f7f9',
                                        color: '#a0aec0',
                                        '&.Mui-disabled': {
                                            cursor: 'not-allowed',
                                        },
                                        '& input.Mui-disabled': {
                                            cursor: 'not-allowed',
                                        },
                                    }
                                }}
                                value={profileData.email}
                                disabled
                            />
                        </Grid>


                        {/* Trường School */}
                        <Grid size={{xs: 12, md: 6}}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: '500',
                                    mb: 1,
                                    fontSize: '16px',
                                    color: '#2d3748',
                                }}
                            >
                                Trường
                            </Typography>

                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Nhập tên trường bạn"
                                autoComplete="off"
                                InputProps={{
                                    sx: {
                                        height: 45,
                                        fontSize: '16px',
                                        borderRadius: '8px',
                                    }
                                }}
                                value={profileData.school}
                                onChange={(e) => onProfileInputChange('school', e.target.value)}
                            />
                        </Grid>


                        {/* Trường Tên Phụ huynh */}
                        <Grid size={{xs: 12, md: 6}}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: '500',
                                    mb: 1,
                                    fontSize: '16px',
                                    color: '#2d3748',
                                }}
                            >
                                Tên phụ huynh
                            </Typography>

                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Nhập tên phụ huynh"
                                autoComplete="off"
                                InputProps={{
                                    sx: {
                                        height: 45,
                                        fontSize: '16px',
                                        borderRadius: '8px',
                                    }
                                }}
                                value={profileData.parent_name}
                                onChange={(e) => onProfileInputChange('parent_name', e.target.value)}
                            />
                        </Grid>


                        {/* Trường SĐT phụ huynh */}
                        <Grid size={{xs: 12, md: 6}}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: '500',
                                    mb: 1,
                                    fontSize: '16px',
                                    color: '#2d3748',
                                }}
                            >
                                Số điện thoại phụ huynh
                            </Typography>

                            <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="Nhập SĐT phụ huynh"
                                autoComplete="off"
                                InputProps={{
                                    sx: {
                                        height: 45,
                                        fontSize: '16px',
                                        borderRadius: '8px',
                                    }
                                }}
                                value={profileData.parent_phone}
                                onChange={(e) => onProfileInputChange('parent_phone', e.target.value)}
                            />
                        </Grid>

                    </Grid>
                </Box>
            </Box>


            {/* Thay đổi mật khẩu */}
            <Box sx={{
                bgcolor: 'white',
                borderRadius: '12px',
                padding: '30px 30px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                mt: 4,
            }}>
                <Box>
                    {/* Text: Thay đổi mật khẩu */}
                    <Box
                        sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                    >
                        <Typography
                            sx={{
                                fontSize: '18px',
                                color: '#3182ce',
                                fontWeight: '500',
                            }}
                        >
                            Thay đổi mật khẩu
                        </Typography>
                    </Box>

                    {/* form */}
                    <Box component="form" sx={{mt: 5}}>
                        <Grid container spacing={2}>

                            {/* Trường mật khẩu hiện tại */}
                            <Grid size={{xs: 12, md: 6}}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: '500',
                                        mb: 1,
                                        fontSize: '16px',
                                        color: '#2d3748',
                                    }}
                                >
                                    Mật khẩu hiện tại
                                </Typography>

                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    autoComplete="off"
                                    InputProps={{
                                        sx: {
                                            height: 45,
                                            fontSize: '16px',
                                            borderRadius: '8px',
                                        }
                                    }}
                                    value={passwordData.old_password}
                                    onChange={(e) => onPasswordInputChange('old_password', e.target.value)}
                                />
                            </Grid>

                            <Grid size={{xs: 12, md: 6}}></Grid>


                            {/* Trường mật khẩu mới */}
                            <Grid size={{xs: 12, md: 6}}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: '500',
                                        mb: 1,
                                        fontSize: '16px',
                                        color: '#2d3748',
                                    }}
                                >
                                    Mật khẩu mới
                                </Typography>

                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    autoComplete="off"
                                    InputProps={{
                                        sx: {
                                            height: 45,
                                            fontSize: '16px',
                                            borderRadius: '8px',
                                        }
                                    }}
                                    value={passwordData.new_password}
                                    onChange={(e) => onPasswordInputChange('new_password', e.target.value)}
                                />
                            </Grid>

                            <Grid size={{xs: 12, md: 6}}></Grid>


                            {/* Trường: Nhập lại mật khẩu mới */}
                            <Grid size={{xs: 12, md: 6}}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: '500',
                                        mb: 1,
                                        fontSize: '16px',
                                        color: '#2d3748',
                                    }}
                                >
                                    Nhập lại mật khẩu mới
                                </Typography>

                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    autoComplete="off"
                                    InputProps={{
                                        sx: {
                                            height: 45,
                                            fontSize: '16px',
                                            borderRadius: '8px',
                                        }
                                    }}
                                    value={passwordData.confirm_password}
                                    onChange={(e) => onPasswordInputChange('confirm_password', e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Save Button */}
                    <Box>
                        <Button
                            variant="text"
                            sx={{
                                bgcolor: '#3182ce',
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: '500',
                                fontSize: '16px',
                                padding: '5px 20px',
                                borderRadius: '5px',
                                '&:hover': {
                                    bgcolor: '#2c5aa0'
                                },
                                mt: 3
                            }}
                            onClick={onChangePassword}
                            disabled={passwordLoading}
                        >
                            {passwordLoading ? <CircularProgress size={24} color="inherit" /> : 'Lưu lại'}
                        </Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default Profile