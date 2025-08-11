import {Outlet, useNavigate} from "react-router";
import {AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useState} from "react";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../features/auth/store";
import type {RootState} from "../features/auth/store/rootReducer.ts";
import {logout} from "../features/auth/store/authSlice.ts";
import {toast} from "react-toastify";


const MainLayout = () => {

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    /* ==========================================================================================
     * State
     * ========================================================================================== */

    // Quản ly dropdown
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    /* ==========================================================================================
     * Logic
     * ========================================================================================== */

    // Nhấn vào nút button tren thanh Menu
    const onMenuClick = (path: string) => {
        navigate(path)
    }

    // Nhấn vào avatar menu
    const onUserClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    }

    // Đóng user menu
    const onMenuClose = () => {
        setAnchorEl(null)
    }

    // Đăng xuất
    const onLogout = () => {
        onMenuClose()
        dispatch(logout());
        toast.success('Đăng xuất thành công!');
        navigate('/login');
    }


    return (
        <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            {/* Header */}
            <AppBar
                position="sticky"
                sx={{
                    bgcolor: "white",
                    boxShadow: "none",
                }}
            >
                <Toolbar disableGutters  // loại bỏ padding mặc định
                         sx={{padding: "0 40px", justifyContent: "space-between", alignItems: 'center'}}>
                    {/* LOGO */}
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        mt: 1,
                        '&: hover': {
                            cursor: "pointer",
                        }
                    }}
                         onClick={() => navigate('/classes')}
                    >
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
                    <Box sx={{display: "flex", gap: 3, alignItems: 'center'}}>
                        {/* Nút tạo lớp */}
                        {
                            user?.role === 'teacher' && (
                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon/>}
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '16px',
                                        height: 40,
                                    }}
                                    onClick={() => onMenuClick('/class/add')}
                                >
                                    Tạo lớp
                                </Button>
                            )
                        }


                        {/* Nút trang chủ */}
                        <Button
                            variant="text"
                            startIcon={<HomeIcon/>}
                            sx={{
                                textTransform: 'none',
                                fontSize: '16px',
                                height: 40,
                            }}
                            onClick={() => onMenuClick('/classes')}
                        >
                            Trang chủ
                        </Button>

                        {/* Thông tin tài khoản */}
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <IconButton
                                onClick={onUserClick}
                            >
                                <Avatar
                                    src="/src/assets/images/user.jpg"
                                    sx={{width: "32px", height: "32px", bgcolor: "#4299e1"}}
                                >
                                    {user?.name?.charAt(0).toUpperCase()}
                                </Avatar>
                            </IconButton>

                            <Box>
                                <Button
                                    variant="text"
                                    onClick={onUserClick}
                                    endIcon={<KeyboardArrowDownIcon/>}
                                    sx={{
                                        textTransform: 'none',
                                    }}
                                >
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: 'flex-start',
                                        flexDirection: 'column',
                                    }}>
                                        <Typography
                                            sx={{
                                                lineHeight: '1.5',
                                                fontWeight: 'bold',

                                            }}
                                        >
                                            {user?.name || 'User'}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontSize: '12px',
                                                lineHeight: '1.5',
                                                color: '#999',

                                            }}
                                        >
                                            {user?.role === 'teacher' ? 'Giáo viên' : 'Học viên'}
                                        </Typography>
                                    </Box>
                                </Button>


                                {/* Menu Dropdown */}
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={onMenuClose}
                                    PaperProps={{
                                        sx: {
                                            minWidth: 250,
                                            bgcolor: 'white',
                                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',

                                            mt: 2,
                                            '& .MuiMenuItem-root:not(:last-of-type)': {
                                                borderBottom: '1px solid #ddd',
                                            },
                                            '& .MuiMenuItem-root': {
                                                padding: '10px'
                                            },
                                        }
                                    }}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right', // Nơi menu neo vào ở bên phải anchor
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right', // Menu hiển thị sao cho mép phải khớp với anchor
                                    }}

                                >
                                    <MenuItem onClick={() => {
                                        onMenuClose()
                                        onMenuClick('/profile')
                                    }}>
                                        Thông tin cá nhân
                                    </MenuItem>

                                    <MenuItem onClick={onLogout}>
                                        Đăng xuất
                                    </MenuItem>

                                </Menu>
                            </Box>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{flex: 1}}>
                <Outlet/>
            </Box>
        </Box>
    )
}

export default MainLayout