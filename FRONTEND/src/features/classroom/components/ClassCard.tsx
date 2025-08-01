// Interface cho props của ClassCard
import {useNavigate} from "react-router";
import {Box, Button, Card, Typography} from "@mui/material";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


interface ClassCardProps {
    id: string;
    name: string;
    memberCount: number;
    classId: string;
}

const ClassCard = ({id, name, memberCount, classId}: ClassCardProps) => {

    const navigate = useNavigate()

    /* ==========================================================================================
     * Các hàm xử lý
     * ========================================================================================== */

    // Khi click vao "Vào lớp"
    const onEnterClass = () => {
        navigate(`/class/${id}`)
    }

    // Khi click vào nút chia sẻ
    const onShareClass = () => {
        // Logic chia sẻ lớp học
        console.log('Chia sẻ lớp:', classId);
    };

    return (
        <Card sx={{
            bgcolor: '#f3f8ff',
            height: '200px',
            border: '1px solid #31b5ee',
            boxShadow: 'none',
            display: 'flex',
            padding: '15px 15px',
            flexDirection: 'column',
            gap: '30px',
            justifyContent: 'space-between',
            cursor: 'pointer', // Thêm con trỏ để báo hiệu có thể click
            '&:hover': {
                borderColor: '#ff8e03', // Thêm hiệu ứng hover
                bgcolor: '#fffaf8'
            }
        }}
        onClick={() => navigate(`/class/${id}`)}
        >

            {/* Tên lớp & Vào lớp */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Typography
                    variant="h3"
                    component="span"
                    sx={{
                        all: 'unset',
                        fontWeight: 'bold',
                        fontSize: '18px',
                    }}
                >
                    {name}
                </Typography>

                <Button
                    startIcon={<LocalLibraryIcon/>}
                    variant="text"
                    sx={{
                        textTransform: 'none',
                        fontSize: '16px',
                        color: "#31b5ee",
                    }}
                    onClick={onEnterClass}
                >
                    Vào lớp
                </Button>
            </Box>


            {/* Highlight Số thành viên lớp */}
            <Box>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: '48px',
                        fontWeight: 'bold',
                        lineHeight: 1,
                        color: "#31b5ee"
                    }}
                >
                    {memberCount}
                </Typography>

                <Box sx={{display: 'flex', alignItems: 'center', padding: '10px 0'}}>
                   <Typography
                       variant="body2"
                       component="span"
                       sx={{
                           fontSize: '16px',
                       }}
                   >
                       Thành viên tham gia
                   </Typography>

                    <Typography
                        variant="body2"
                        component="span"
                        sx={{
                            fontSize: '16px',
                            ml: 'auto',
                            color: '#31b5ee',
                        }}
                    >
                        Mã lớp: {classId}
                    </Typography>

                    <Button
                        variant="outlined"
                        sx={
                            {
                                ml: 2,
                                textTransform: 'none',
                                fontSize: '12px',
                                boxShadow: 'none',
                                color: '#31b5ee',
                            }}
                        startIcon={<ContentCopyIcon/>}
                        onClick={onShareClass}
                    >
                        Chia sẻ
                    </Button>
                </Box>
            </Box>
        </Card>
    )
}


export default ClassCard