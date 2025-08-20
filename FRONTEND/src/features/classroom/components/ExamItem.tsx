import {Box, Typography} from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {useNavigate, useParams} from "react-router";
import type {ExamGroup} from "@/types/exam.ts";

interface ExamItemProps {
    exam: ExamGroup
}

// Hàm định dạng ngày từ YYYY-MM-DD sang DD/MM/YYYY
const formatDate = (dataString: string) => {
    const [year, month, day] = dataString.split('-');
    return `${day}/${month}/${year}`
};

const ExamItem = ({ exam }: ExamItemProps) => {

    /* ==========================================================================================
     * State
     * ========================================================================================== */

    const navigate = useNavigate();
    const { classId } = useParams<{ classId: string }>();



    /* ==========================================================================================
     * Logic
     * ========================================================================================== */

    // Kiểm tra có bài kiểm tra không
    if (!exam) {
        console.log('Không có bài kiểm tra nào!')
        return null;
    }

    // Xử lý điều hướng đến trang chi tiết bài thi
    const onNavigate = () => {
        if (classId && exam.id) {
            navigate(`/class/${classId}/exam/${exam.id}`);
        }
    }

    /* ==========================================================================================
     * Giao diện
     * ========================================================================================== */

    return (
        <Box
            onClick={onNavigate}
            sx={{
                bgcolor: '#fff',
                height: '90px',
                boxShadow: 'none',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                justifyContent: 'space-between',
                cursor: 'pointer', // Thêm con trỏ để báo hiệu có thể click
                '&:hover': {
                    borderColor: '#ebf8ff', // Thêm hiệu ứng hover
                    bgcolor: '#ebf8ff'
                },
                position: 'relative',
            }}
        >
            <Box sx={{height: '100%', width: '4px', bgcolor: '#31b5ee', position: 'absolute'}}></Box>
            <Box sx={{
                width: '100%',
                height: '100%',
                padding: '15px 15px',
            }}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <InsertDriveFileIcon sx={{
                        width: '60px',
                        height: '60px',
                        color: '#31b5ee',
                    }}/>

                    <Box sx={{ml: 1.5}}>
                        <Typography
                            variant="body2"
                            component="h3"
                            sx={{fontSize: '18px', fontWeight: '500'}}
                        >
                            {exam.name.toUpperCase()}
                        </Typography>

                        <Typography
                            sx={{fontSize: '14px', fontWeight: '500', color: '#718096', mt: 0.5}}
                        >
                            Ngày bắt đầu: {formatDate(exam.start_time)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ExamItem;