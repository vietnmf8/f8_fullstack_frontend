import {useState} from "react";
import {Avatar, Box, Button, Grid, TextField, Typography} from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';


const Profile = () => {

    /* ==========================================================================================
     * State
     * ========================================================================================== */

    // State quản lý form thông tin cá nhân
    const [profileData, setProfileData] = useState({
        fullName: "Nguyễn Minh Việt",
        email: "nguyenminhviet2510@gmail.com",
        school: "",
        parentName: "",
        parentPhone: "0965 800 392",
    })

    // State quản lý form đổi mật khẩu
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

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


    // Khi thay đổi input mật khẩu
    const onPasswordInputChange = (field: string, value: string) => {
        setPasswordData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Khi nhấn nút tải lên avatar
    const onUploadAvatar = () => {
        console.log('Upload Avatar');
    }


    // Khi nhấn nút lưu lại
    const onSaveProfile = () => {
        console.log("Lưu thông tin cá nhân:", profileData);
        console.log("Lưu mật khẩu:", passwordData);
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
                        >
                            Lưu lại
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
                    >
                        J97
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
                                value={profileData.fullName}
                                onChange={(e) => onProfileInputChange('fullName', e.target.value)}
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
                                value={profileData.parentName}
                                onChange={(e) => onProfileInputChange('parentName', e.target.value)}
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
                                value={profileData.parentPhone}
                                onChange={(e) => onProfileInputChange('parentPhone', e.target.value)}
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
                                    value={passwordData.currentPassword}
                                    onChange={(e) => onPasswordInputChange('currentPassword', e.target.value)}
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
                                    value={passwordData.newPassword}
                                    onChange={(e) => onPasswordInputChange('newPassword', e.target.value)}
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
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => onPasswordInputChange('confirmPassword', e.target.value)}
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
                            onClick={onSaveProfile}
                        >
                            Lưu lại
                        </Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default Profile