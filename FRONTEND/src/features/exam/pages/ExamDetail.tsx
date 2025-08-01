import {Box, Breadcrumbs, Button, Grid, Link, Typography} from "@mui/material"
import {useNavigate, useParams} from "react-router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {mockExamDetail, mockExamParts, mockExamSubmissions} from "../../../data";
import AddIcon from "@mui/icons-material/Add";
import ExamPartCard from "../components/ExamPartCard.tsx";
import ExamSubmissionCard from "../components/ExamSubmissionCard.tsx";
import {useState} from "react";
import EditExamDialog from "../components/EditExamDialog.tsx";
import ConfirmDeleteExamDialog from "../components/ConfirmDeleteExamDialog";

const ExamDetail = () => {

    const { classId, examId } = useParams<{ classId: string, examId: string }>();
    const navigate = useNavigate();

    /* ==========================================================================================
     * State
     * ========================================================================================== */

    // Trạng thái mở Dialog Edit
    const [openEditDialog, setOpenEditDialog] = useState(false);

    // Trạng thái mở Dialog Delete
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


    /* ==========================================================================================
     * Logic
     * ========================================================================================== */

    // Mở và đóng dialog chỉnh sửa
    const onOpenEditDialog = () => {
        console.log('open edit');
        setOpenEditDialog(true);
    };

    const onCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    // Mở và đóng dialog xoá
    const onOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const onCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    // Xử lý khi xác nhận xoá
    const onConfirmDelete = () => {
        console.log(`Deleting exam with ID: ${examId}`);
        onCloseDeleteDialog(); // Đóng dialog sau khi xử lý
    };


    /* Breadcrumbs */
    const breadcrumbs = [
        <Link
            underline="hover"
            color="inherit"
            href="#"
            onClick={(e) => {
                e.preventDefault();
                navigate(`/class/${classId}/exam`); // Quay lại trang danh sách bài thi
            }}
            sx={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#000"
            }}
        >
            Danh sách bài thi
        </Link>,
        <Typography
            color="text.primary"
            sx={{
                fontSize: "20px",
                fontWeight: "bold",
            }}
        >
            Chi tiết bài thi
        </Typography>
    ];


    /* ==========================================================================================
     * Giao diện
     * ========================================================================================== */
    return (
        <Box sx={{
            display: 'flex',
            p: 4,
            minHeight: 'calc(100vh - 64px)',
        }}>
            <Box sx={{width: '100%', height: '100%'}}>
                {/* Breadcrumbs */}
                <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{mb: 3}}
                    separator={<NavigateNextIcon fontSize="medium"/>}
                >
                    {breadcrumbs}
                </Breadcrumbs>

                {/* Hộp thông tin chung của bài thi */}
                <Box sx={{
                    width: '100%',
                    border: '1px solid #31b5ee',
                    bgcolor: 'white',
                    borderRadius: '10px',
                    padding: '25px 20px'
                }}>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                    }}>
                        {/* Left */}
                        <Box>
                            <Typography sx={{fontSize: '16px', fontWeight: '500'}}>
                                Ten bài thi: {mockExamDetail.name}
                            </Typography>

                            <Typography sx={{fontSize: '16px', fontWeight: '500'}}>
                                Ngày bắt đầu: {mockExamDetail.startDate}
                            </Typography>

                            <Typography sx={{fontSize: '16px', fontWeight: '500'}}>
                                Thời gian chờ giữa các đề bài: {mockExamDetail.delayBetweenParts}
                            </Typography>
                        </Box>

                        {/* Right */}
                        <Box>
                            <Button
                                variant="contained"
                                sx={{
                                    mr: 1,
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    boxShadow: 'none',
                                    bgcolor: '#2f855a',
                                    width: '110px',
                                }}
                                onClick={onOpenEditDialog}
                            >
                                Chỉnh sửa
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    boxShadow: 'none',
                                    width: '110px',
                                }}
                                onClick={onOpenDeleteDialog}
                            >
                                Xoá bỏ
                            </Button>
                        </Box>
                    </Box>
                </Box>


                <Box>
                    {/* Danh sách đề bài & Thêm đề bài */}
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        my: 3
                    }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                fontSize: '18px',
                                fontWeight: '500',
                                color: '#2b6cb0',
                            }}
                        >
                            Danh sách đề bài
                        </Typography>

                        {/* Tạo bài thi */}
                        <Button
                            variant="text"
                            sx={
                                {
                                    ml: 2,
                                    minWidth: 150,
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    bgcolor: '#3182ce',
                                    boxShadow: 'none',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: '#2b6cb0'
                                    }
                                }}
                            onClick={() => navigate(`/class/${classId}/exam/${examId}/0`)}
                            startIcon={<AddIcon/>}
                        >
                            Thêm đề bài
                        </Button>
                    </Box>

                    {/*/!* Các đề bài *!/*/}
                    <Grid container spacing={5}>
                        {
                            mockExamParts.map((part) => (
                                <Grid size={{xs: 12, md: 6, lg: 3}} key={part.id}>
                                    <ExamPartCard
                                        part={part}
                                        classId={classId!}
                                        examId={examId!}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>


                <Box sx={{mt: 5}}>
                    {/* Danh sách bai lam */}
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        my: 3
                    }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                fontSize: '18px',
                                fontWeight: '500',
                                color: '#2b6cb0',
                            }}
                        >
                            Danh sách bài làm
                        </Typography>
                    </Box>

                    {/*/!* Các đề bài *!/*/}
                    <Grid container spacing={5}>
                        {
                            mockExamSubmissions.map((submission) => (
                                <Grid size={{xs: 12, md: 6, lg: 3}} key={submission.id}>
                                    <ExamSubmissionCard
                                        submission={submission}
                                        classId={classId!}
                                        examId={examId!}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Box>


            {/* Dialog chỉnh sửa */}
            <EditExamDialog
                open={openEditDialog}
                onClose={onCloseEditDialog}
                examData={mockExamDetail}
            />

            {/* Dialog xác nhận xoá */}
            <ConfirmDeleteExamDialog
                open={openDeleteDialog}
                onClose={onCloseDeleteDialog}
                onConfirm={onConfirmDelete}
            />
        </Box>
    )
}

export default ExamDetail

