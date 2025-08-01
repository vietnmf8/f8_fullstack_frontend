import {Box, Typography} from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {useNavigate, useParams} from "react-router";

interface ExamItemProps {
    exam?: {
        id?: string;
        title: string,
        startDate: string,
    }
}


const ExamItem = ({exam}: ExamItemProps) => {

    /* ==========================================================================================
     * State
     * ========================================================================================== */

    const navigate = useNavigate();
    const { classId } = useParams();
    console.log(classId);



    /* ==========================================================================================
     * Logic
     * ========================================================================================== */

    // Kiểm tra có bài kiểm tra không
    if (!exam) {
        console.log('Không có bài kiểm tra nào!')
        return null;
    }

    const onNavigate = () => {
        navigate(`/class/${classId}/exam/${exam.id}`);
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
                            {exam.title.toUpperCase()}
                        </Typography>

                        <Typography
                            sx={{fontSize: '14px', fontWeight: '500', color: '#718096', mt: 0.5}}
                        >
                            Ngày bắt đầu: {exam.startDate}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ExamItem;