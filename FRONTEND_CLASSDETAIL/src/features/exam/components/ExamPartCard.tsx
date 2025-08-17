import {Box, Link, Typography} from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {useNavigate} from "react-router";
import * as React from "react";


interface ExamPart {
    id: string;
    name: string;
    code: string;
    duration: string;
    questionCount: number;
}

interface ExamPartCardProps {
    part: ExamPart;
    classId: string;
    examId: string;
}

const ExamPartCard = ({part, examId, classId}: ExamPartCardProps) => {

    const navigate = useNavigate();

    const onEditClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // Điều hướng đến trang chỉnh sửa
        navigate(`/class/${classId}/exam/${examId}/${part.id}`);
    }


    return (
        <Box sx={{
            padding: '15px',
            bgcolor: 'white',
            border: '1px dashed #31b5ee',
            borderRadius: '10px',
        }}>
            {/* Main content */}
            <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}>

                {/* Đề bài & nút Edit */}
                <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 0.5}}>
                    <Typography
                        variant="h5"
                        component="h3"
                        sx={{fontSize: '16px', fontWeight: '500'}}
                    >
                        Đề bài: {part.name}
                    </Typography>

                    <Link
                        href="#"
                        onClick={onEditClick}
                        underline="hover"
                        sx={{
                            textDecoration: 'none',
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                            color: '#2b6cb0',

                    }}>
                        <BorderColorIcon sx={{fontSize: '16px', color: '#2b6cb0'}}/>
                        Edit
                    </Link>
                </Box>

                <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '16px' }}>
                        Mã đề: {part.code}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '16px' }}>
                        Thời gian làm bài: {part.duration}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '16px' }}>
                        Số câu hỏi: {part.questionCount}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default ExamPartCard;