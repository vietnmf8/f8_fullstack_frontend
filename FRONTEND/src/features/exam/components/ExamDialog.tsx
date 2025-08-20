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
import type { CreateExamPayload } from "../services/type";

interface FormData {
    name: string;
    await_time: string;
    start_time: string;
}

interface ExamDialogProps {
    open: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';    // Chế độ của dialog: tạo mới hoặc chỉnh sửa
    onSubmit: (data: Omit<CreateExamPayload, 'class_id'>) => void;
    initialData?: Partial<FormData>;
}

const today = new Date().toISOString().split('T')[0];

// State ban đầu cho form
const createInitialState: FormData = {
    name: '',
    await_time: '',
    start_time: today,
};



const ExamDialog = ({onClose, open, mode, onSubmit, initialData}: ExamDialogProps) => {

    const [formData, setFormData] = useState<FormData>(createInitialState);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    /* ==========================================================================================
     * useEffect
     * ========================================================================================== */

    // Cập nhật useEffect để điền form khi ở chế độ 'edit'
    useEffect(() => {

        // Nếu dialog đang mở
        if (open) {
            // Nếu là chế độ 'chỉnh sửa' và có dữ liệu, thì điền form
            if (mode === 'edit' && initialData) {
                setFormData({
                    name: initialData.name || '',
                    await_time: initialData.await_time || '',
                    start_time: initialData.start_time || today,
                });
            }
            // chế độ 'tạo mới'
            else {
                setFormData(createInitialState);
            }
            setErrors({})
        }

    }, [open]); // [initialData, open, mode]);


    /* ==========================================================================================
     * Logic
     * ========================================================================================== */

    // Hàm xử lý khi người dùng thay đổi giá trị trong các trường input
    const onInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };


    // Validate form
    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name.trim()) newErrors.name = "Tên bài thi là bắt buộc.";
        if (!formData.start_time) newErrors.start_time = "Ngày bắt đầu là bắt buộc.";
        if (mode === 'create' && new Date(formData.start_time) < new Date(today)) {
            newErrors.start_time = "Ngày bắt đầu không được ở trong quá khứ.";
        }
        if (!formData.await_time || isNaN(Number(formData.await_time)) || Number(formData.await_time) <= 0) {
            newErrors.await_time = "Thời gian chờ phải là một số dương.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // Xử lý submit
    const handleSubmit = () => {
        if (validateForm()) {
            onSubmit({
                name: formData.name,
                await_time: Number(formData.await_time),
                start_time: formData.start_time,
                is_once: true,
                is_save_local: true,
            });
        }
    };


    // Xác định tiêu đề và nút bấm dựa vào mode
    const dialogTitle = mode === 'edit' ? 'Chỉnh sửa bài thi' : 'Tạo bài thi';
    const submitButtonText = mode === 'edit' ? 'Lưu thay đổi' : 'Tạo mới';



    /* ==========================================================================================
     * Giao dien
     * ========================================================================================== */

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
                {dialogTitle}

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
                            onInputChange('name', e.target.value)
                        }
                        error={!!errors.name}
                        helperText={errors.name}
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
                        name="await_time"
                        type="number"
                        autoComplete="off"
                        InputProps={{
                            sx: {
                                height: 45,
                                fontSize: '16px',
                                borderRadius: '8px',
                            }
                        }}
                        value={formData.await_time}
                        onChange={(e) =>
                            onInputChange('await_time', e.target.value)
                        }
                        error={!!errors.await_time}
                        helperText={errors.await_time}
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
                        name="start_time"
                        autoComplete="off"
                        InputProps={{
                            sx: {
                                height: 45,
                                fontSize: '16px',
                                borderRadius: '8px',
                            },
                            inputProps: {
                                // min: mode === 'create' ? today : undefined
                                min: today
                            }
                        }}
                        value={formData.start_time}
                        onChange={(e) =>
                            onInputChange('start_time', e.target.value)
                        }
                        error={!!errors.start_time}
                        helperText={errors.start_time}
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
                    onClick={handleSubmit}
                >
                    {submitButtonText}
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
                    onClick={onClose}
                >
                    Huỷ
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ExamDialog