import {Avatar, Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router";

interface ExamSubmission {
    id: string,
    student: {
        name: string,
        email: string,
        avatar: string
    },
    timeTaken: string,
    completedQuestions: string,
    status: string
}

interface ExamSubmissionCardProps {
    submission: ExamSubmission
    classId: string
    examId: string
}

const ExamSubmissionCard = ({submission, classId, examId} : ExamSubmissionCardProps) => {

    const navigate = useNavigate();

    const onViewDetails = () => {
        navigate(`/class/${classId}/exam/${examId}/marking?student=${submission.id}`);
    }

    return (
        <Box sx={{
            padding: '20px',
            bgcolor: 'white',
            border: '1px dashed #31b5ee',
            borderRadius: '10px',
        }}>
            <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'orange', width: 48, height: 48, mr: 1.5 }}>
                        {submission.student.avatar}
                    </Avatar>

                    <Box>
                        <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                            {submission.student.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {submission.student.email}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '16px' }}>
                        Thời gian làm bài: {submission.timeTaken || ''}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '16px' }}>
                        Số đề đã hoàn thành: {submission.completedQuestions || ''}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '16px' }}>
                        Trạng thái: <Typography component="span" sx={{ color: 'red', fontSize: '16px' }}>{submission.status}</Typography>
                    </Typography>
                </Box>

                <Box display="flex" justifyContent="center">
                    <Button
                        variant="contained"
                        sx={{
                            mt: 2,
                            width: '100px',
                            bgcolor: '#28a745',
                            '&:hover': { bgcolor: '#218838' },
                            textTransform: 'none',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            boxShadow: 'none',
                        }}
                        onClick={onViewDetails}
                    >
                        Chi tiết
                    </Button>
                </Box>
            </Box>

        </Box>
    )
}

export default ExamSubmissionCard