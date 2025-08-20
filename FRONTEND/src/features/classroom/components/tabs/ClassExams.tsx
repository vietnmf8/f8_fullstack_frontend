import {Alert, Box, Button, CircularProgress, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ExamItem from "@/features/classroom/components/ExamItem.tsx";
import {useMemo, useState} from "react";
import ExamDialog from "@/features/exam/components/ExamDialog.tsx";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "@/store";
import {useDebounce} from "@/hooks/useDebounce.ts";
import type {RootState} from "@/store/rootReducer.ts";
import {createExamAction} from "@/features/exam/store/examThunks.ts";
import type {CreateExamPayload} from "@/features/exam/services/type.ts";
import {fetchClassDetails} from "@/features/classroom/store/classThunks.ts";

const ClassExams = () => {

    /* ==========================================================================================
     * State
     * ========================================================================================== */

    const { classId } = useParams<{ classId: string }>();
    const dispatch = useDispatch<AppDispatch>();

    // Lấy state từ Redux
    const { user } = useSelector((state: RootState) => state.auth);
    const { currentClassExams: exams, isDetailLoading: loading, detailError: error } = useSelector((state: RootState) => state.class);


    // State để quản lý việc mở/đóng dialog tạo bài thi
    const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);

    // State tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500)



    /* ==========================================================================================
     * Logic
     * ========================================================================================== */

    // lọc và phân loại bài thi
    const { ongoingExams, upcomingExams } = useMemo(() => {
        // Đảm bảo `exams` không phải là null hoặc undefined trước khi filter
        const filteredExams = (exams || []).filter(exam =>
            exam.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );

        const today = new Date();
        // Reset giờ về 00:00:00 để chỉ so sánh theo ngày, không tính giờ/phút/giây.
        today.setHours(0, 0, 0, 0);

        const ongoing: typeof exams = [];
        const upcoming: typeof exams = [];

        filteredExams.forEach(exam => {
            const startTime = new Date(exam.start_time)
            // Nếu startTime ≤ today → đưa vào ongoing.
            if (startTime <= today) {
                ongoing.push(exam);
            }
            // Nếu startTime > today → đưa vào upcoming.
            else {
                upcoming.push(exam);
            }
        })

        return { ongoingExams: ongoing, upcomingExams: upcoming }
    }, [exams, debouncedSearchTerm])


    // Mở dialog tạo mới
    const onOpenCreateDialog = () => {
        setCreateDialogOpen(true);
    };

    // Đóng dialog tạo mới
    const onCloseCreateDialog = () => {
        setCreateDialogOpen(false);
    }


    // tạo bài thi
    const onCreateExam = async (data: Omit<CreateExamPayload, 'class_id'>) => {
        if (!classId) return

        try {
            await dispatch(createExamAction({ ...data, class_id: Number(classId) })).unwrap()
            dispatch(fetchClassDetails(classId));
            onCloseCreateDialog()
        }
        catch (error) {
            console.error("Tạo bài thi thất bại:", error);
        }
    }

    /* ==========================================================================================
     * Giao diện
     * ========================================================================================== */

    return (
        <Box sx={{
            display: 'flex',
            minHeight: 'calc(100vh - 64px)',
            p: 4,
        }}>

            <Box sx={{
                width: '100%',
            }}>
                {/* Header */}
                <Box sx={{
                    width: '100%',
                    display: "flex",
                    alignItems: "center"
                }}>
                    {/* Tiêu đề */}
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        Danh sách bài thi
                    </Typography>

                    <TextField
                        required
                        placeholder="Tìm kiếm"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{color: '#a0aec0'}}/>
                                </InputAdornment>
                            ),
                            sx: {
                                height: 40,
                                fontSize: '18px',
                                borderRadius: '8px',
                            }
                        }}
                        sx={{marginLeft: 'auto', width: '22%'}}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Tạo bài thi */}
                    {
                        user?.role === 'teacher' && (
                            <Button
                                variant="text"
                                sx={
                                    {
                                        ml: 2,
                                        minWidth: 150,
                                        textTransform: 'none',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        bgcolor: '#ff8e05',
                                        boxShadow: 'none',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: '#ffb300'
                                        }
                                    }}
                                startIcon={<AddIcon/>}
                                onClick={onOpenCreateDialog}
                            >
                                Tạo bài thi
                            </Button>
                        )
                    }
                </Box>

                {/* Loading và Error */}
                {
                    loading &&
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}
                    >
                        <CircularProgress />
                    </Box>
                }

                {
                    error &&
                    <Alert severity="error" sx={{ mt: 4 }}>
                        {error}
                    </Alert>
                }


                {
                    !loading && !error && (
                        <>
                            {/* Bài thi đang diễn ra */}
                            <Box sx={{
                                mt: 4,
                                width: '100%',
                            }}>
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    sx={{
                                        fontSize: '18px',
                                        fontWeight: '500',
                                        color: '#2b6cb0',
                                        mb: 3
                                    }}
                                >
                                    Bài thi đang diễn ra
                                </Typography>

                                {
                                    ongoingExams.length > 0 ? (
                                        <Grid container spacing={5}>
                                            {
                                                ongoingExams.map((exam) => (
                                                    <Grid size={{xs: 12, sm: 6, md: 4}} key={exam.id}>
                                                        <ExamItem exam={exam}/>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    ) : (
                                        <Alert severity="info">Chưa có bài thi nào đang diễn ra.</Alert>
                                    )
                                }
                            </Box>



                            {/* Bài thi chưa diễn ra */}
                            <Box sx={{
                                mt: 4,
                                width: '100%',
                            }}>
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    sx={{
                                        fontSize: '18px',
                                        fontWeight: '500',
                                        color: '#2b6cb0',
                                        mb: 3
                                    }}
                                >
                                    Bài thi chưa diễn ra
                                </Typography>

                                {upcomingExams.length > 0 ? (
                                    <Grid container spacing={5}>
                                        {
                                            upcomingExams.map((exam) => (
                                                <Grid size={{xs: 12, sm: 6, md: 4}} key={exam.id}>
                                                    <ExamItem exam={exam}/>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                ) : (
                                    <Alert severity="info">Chưa có bài thi nào chờ bắt đầu.</Alert>
                                )}
                            </Box>

                            {/* Trường hợp không có bài thi nào cả */}
                            {exams.length === 0 && (
                                <Alert severity="info" sx={{mt: 4}}>Lớp học này chưa có bài thi nào.</Alert>
                            )}
                        </>
                    )
                }

            </Box>


            {/* Dialog tạo bài thi */}
            <ExamDialog
                open={isCreateDialogOpen}
                onClose={onCloseCreateDialog}
                mode="create"
                onSubmit = {onCreateExam}
            />

        </Box>
    )
}

export default ClassExams

