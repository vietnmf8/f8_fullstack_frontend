import {useNavigate} from "react-router";
import {Box, Button, CircularProgress, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type { AppDispatch } from "../../../store";
import type { RootState } from "../../../store/rootReducer";
import {toast} from "react-toastify";
import {createClass} from "../store/classThunks.ts";

const AddClass = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { user } = useSelector((state: RootState) => state.auth);
    const { loading } = useSelector((state: RootState) => state.class);


    /* ==========================================================================================
     * State quản lý form
     * ========================================================================================== */

    const [formData, setFormData] = useState({
        className: '',
        classCode: '',
    })

    const [errors, setErrors] = useState({
        className: '',
        classCode: '',
    });


    /* ==========================================================================================
    * useEffect: Kiểm tra quyền truy cập
    * ========================================================================================== */
    useEffect(() => {
        if (user && user.role !== 'teacher') {
            toast.error("Bạn không có quyền truy cập trang này.");
            navigate('/classes');
        }
    }, [user, navigate]);



    /* ==========================================================================================
     * Các hàm xử lý
     * ========================================================================================== */

    // Khi thay đổi input
    const onInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))

        // Xóa lỗi khi người dùng bắt đầu nhập
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    }


    // Validate form
    const validateForm = (): boolean => {
        const newErrors = {className: '', classCode: ''};
        let isValid = true;

        if (!formData.className.trim()) {
            newErrors.className = 'Tên lớp học không được để trống.'
            isValid = false;
        }
        if (!formData.classCode.trim()) {
            newErrors.classCode = 'Mã bảo vệ không được để trống.'
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }


    // Khi nhán nút tạo mới
    const onCreateClass = async () => {
        if (!validateForm()) return;

        try {
            await dispatch(createClass({
                name: formData.className,
                code: formData.classCode
            })).unwrap();

            // Sau khi tạo thành công -> quay về danh sách lớp
            navigate('/classes');
        }
        catch (error) {
            // Lỗi đã được xử lý và hiển thị toast trong thunk
            console.error("Failed to create class:", error);
        }

    }

    // Khi nhấn Huỷ
    const onCancel = () => {
        navigate('/classes')
    }



    return (
        <Box
            sx={{
                bgcolor: '#f7f7f9',
                width: '100%',
                minHeight: 'calc(100vh - 64px)',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >

            {/* Tiêu đề */}
            <Typography
                variant="h2"
                component="h1"
                sx={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#2d3748',
                    mb: 8,
                    alignSelf: 'flex-start', // ghi đè thuộc tính alignItem

                }}
            >
                Thêm lớp học mới
            </Typography>

            {/* Form */}
            <Box
                sx={{
                    bgcolor: 'white',
                    borderRadius: '12px',
                    padding: '40px',
                    width: '100%',
                    maxWidth: '500px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    {/* Trường tên lớp học */}
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 'bold',
                                mb: 1,
                                fontSize: '16px',
                                color: '#2d3748',
                            }}
                        >
                            Tên lớp học <span style={{color: '#e53e3e'}}>*</span>
                        </Typography>

                        <TextField
                            fullWidth
                            required
                            autoComplete="off"
                            placeholder="Nhập tên lớp học"
                            InputProps={{
                                sx: {
                                    height: 45,
                                    fontSize: '16px',
                                    borderRadius: '8px',
                                }
                            }}
                            value={formData.className}
                            onChange={(e) =>
                                onInputChange('className', e.target.value)
                            }
                            error={!!errors.className}
                            helperText={errors.className}
                        />
                    </Box>


                    {/* Trường mã bảo vệ */}
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 'bold',
                                mb: 1,
                                fontSize: '16px',
                                color: '#2d3748',
                            }}
                        >
                            Mã bảo vệ <span style={{color: '#e53e3e'}}>*</span>
                        </Typography>

                        <TextField
                            fullWidth
                            required
                            autoComplete="off"
                            placeholder="Nhập mã bảo vệ"
                            InputProps={{
                                sx: {
                                    height: 45,
                                    fontSize: '16px',
                                    borderRadius: '8px',
                                }
                            }}
                            value={formData.classCode}
                            onChange={(e) =>
                                onInputChange('classCode', e.target.value)
                            }
                            error={!!errors.classCode}
                            helperText={errors.classCode}
                        />
                    </Box>



                    {/* Action các nút */}
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'center',
                    }}>
                        <Button
                            variant="outlined"
                            sx={{
                                padding: '8px 24px',
                                textTransform: 'none',
                                fontSize: '16px',
                                minWidth: '100px',
                                color: '#718096',
                                borderColor: '#e2e8f0',
                                '&:hover': {
                                    borderColor: '#cbd5e0',
                                    bgcolor: '#f7fafc'
                                }
                            }}
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Huỷ
                        </Button>

                        <Button
                            variant="text"
                            sx={{
                                padding: '8px 24px',
                                textTransform: 'none',
                                fontSize: '16px',
                                minWidth: '100px',
                                bgcolor: '#ff8e03',
                                color: '#fff'
                            }}
                            onClick={onCreateClass}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Tạo mới'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AddClass