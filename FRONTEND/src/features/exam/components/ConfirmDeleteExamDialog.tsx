import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";

// Định nghĩa props cho component
interface ConfirmDeleteExamDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDeleteExamDialog = ({ open, onClose, onConfirm }: ConfirmDeleteExamDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: '100%',
                    maxWidth: '450px',
                    borderRadius: '8px',
                }
            }}
        >
            <DialogTitle sx={{ fontWeight: 'bold' }}>
                Xoá bài thi
            </DialogTitle>

            <DialogContent>
                <Typography>
                    Bạn có chắc chắn muốn xoá bài thi này không?
                </Typography>
            </DialogContent>

            <DialogActions sx={{ p: '16px 24px' }}>
                {/* Nút xác nhận xoá */}
                <Button
                    variant="contained"
                    color="error"
                    onClick={onConfirm}
                    sx={{
                        textTransform: 'none',
                        fontSize: '16px',
                        boxShadow: 'none',
                    }}
                >
                    Xoá
                </Button>

                {/* Nút huỷ */}
                <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{
                        textTransform: 'none',
                        fontSize: '16px',
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
    );
};

export default ConfirmDeleteExamDialog;
