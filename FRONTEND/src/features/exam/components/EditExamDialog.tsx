import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useEffect, useState } from "react";

interface EditTestDialogProps {
    open: boolean;
    onClose: () => void;
    examData: {
        name: string,
        startDate: string,
        delayBetweenParts: string,
    }
}


const EditExamDialog = ({examData, onClose, open}: EditTestDialogProps) => {

    const [formData, setFormData] = useState({
        name: '',
        delay: '',
        startDate: '',
    });

    // useEffect để cập nhật state của form khi prop testData thay đổi (khi dialog được mở)
    useEffect(() => {
        if (examData) {
            setFormData({
                name: examData.name,
                delay: examData.delayBetweenParts.split(' ')[0],
                startDate: examData.startDate,
            });
        }
    }, [examData, open]); // Phụ thuộc vào testData và open để reset form mỗi khi mở lại


    /* ==========================================================================================
     * Login
     * ========================================================================================== */

    // Hàm xử lý khi người dùng thay đổi giá trị trong các trường input
    const onInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: '100%',
                    maxWidth: '500px',
                    borderRadius: '8px',
                }
            }}
        >
            <DialogTitle sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                Chỉnh sửa bài thi

                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: "#000",
                        padding: 0
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {/* Trường tên bài thi */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: '500',
                            mb: 1,
                            fontSize: '16px',
                            color: '#2d3748',
                        }}
                    >
                        Tên bài thi <span style={{color: '#e53e3e'}}>*</span>
                    </Typography>

                    <TextField
                        fullWidth
                        required
                        name="name"
                        type="text"
                        autoComplete="off"
                        InputProps={{
                            sx: {
                                height: 45,
                                fontSize: '16px',
                                borderRadius: '8px',
                            }
                        }}
                        value={formData.name}
                        onChange={(e) =>
                            onInputChange(e.target.name, e.target.value)
                        }
                    />
                </Box>

                {/* Trường Thời gian giữa các bài thi(phút) */}
                <Box sx={{mt: 3}}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: '500',
                            mb: 1,
                            fontSize: '16px',
                            color: '#2d3748',
                        }}
                    >
                        Thời gian giữa các bài thi(phút) <span style={{color: '#e53e3e'}}>*</span>
                    </Typography>

                    <TextField
                        fullWidth
                        required
                        name="delay"
                        type="number"
                        autoComplete="off"
                        InputProps={{
                            sx: {
                                height: 45,
                                fontSize: '16px',
                                borderRadius: '8px',
                            }
                        }}
                        value={formData.delay}
                        onChange={(e) =>
                            onInputChange(e.target.name, e.target.value)
                        }
                    />
                </Box>


                {/* Trường Thời gian bắt đầu* */}
                <Box sx={{mt: 3}}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: '500',
                            mb: 1,
                            fontSize: '16px',
                            color: '#2d3748',
                        }}
                    >
                        Thời gian bắt đầu <span style={{color: '#e53e3e'}}>*</span>
                    </Typography>

                    <TextField
                        fullWidth
                        required
                        type="date"
                        name="startDate"
                        autoComplete="off"
                        InputProps={{
                            sx: {
                                height: 45,
                                fontSize: '16px',
                                borderRadius: '8px',
                            }
                        }}
                        value={formData.startDate}
                        onChange={(e) =>
                            onInputChange(e.target.name, e.target.value)
                        }
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: '16px' }}>
                <Button
                    variant="text"
                    sx={{
                        padding: '8px 24px',
                        textTransform: 'none',
                        fontSize: '16px',
                        minWidth: '100px',
                        bgcolor: '#3182ce',
                        boxShadow: 'none',
                        color: 'white',
                        '&:hover': {
                            bgcolor: '#2b6cb0'
                        }
                    }}
                >
                    Chỉnh sửa
                </Button>

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
                >
                    Huỷ
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditExamDialog