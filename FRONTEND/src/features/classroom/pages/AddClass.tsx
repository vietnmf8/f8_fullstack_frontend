import {useNavigate} from "react-router";
import {Box, Button, TextField, Typography} from "@mui/material";
import {useState} from "react";

const AddClass = () => {

    const navigate = useNavigate();


    /* ==========================================================================================
     * State quản lý form
     * ========================================================================================== */

    const [formData, setFormData] = useState({
        className: '',
        classCode: '',
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

    // Khi nhán nút tạo mới
    const onCreateClass = () => {
        // Xử lý logic tạo lớp học
        console.log('Tạo lớp học: ', formData)
        // Sau khi tạo thành công -> quay về danh sách lớp
        navigate('/classes');
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
                        >
                            Tạo mới
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AddClass