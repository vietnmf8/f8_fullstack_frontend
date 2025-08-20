import {useNavigate, useParams} from "react-router";
import {useMemo, useState} from "react";
import {Box, Breadcrumbs, Button, CircularProgress, Link, List, Tab, Tabs, Typography} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {mockExamDetail, mockMarkingData} from "@/data";
import * as React from "react";
import MarkingAnswerItem from "@/features/exam/components/MarkingAnswerItem.tsx";




const ExamMarkingPage = () => {

    const navigate = useNavigate();
    const {classId, examId} = useParams<{ classId: string, examId: string }>()

    // const [searchParams] = useSearchParams();
    // const studentId = searchParams.get('student');

    // Theo dõi đề thi
    const [activeTab, setActiveTab] = useState(0);


    // Tính toán kết quả:
    const summary = useMemo(() => {
        const currentPart = mockMarkingData.parts[activeTab];
        // Nếu không có đề nào!
        if (!currentPart) {
            return { total: 0, correct: 0, incorrect: 0, pending: 0 };
        }

        // Tổng số câu
        const total = currentPart.answers.length;

        // Số câu đúng
        const correct = currentPart.answers.filter(a => a.isCorrect).length;

        // Số câu sai
        const incorrect = currentPart.answers.filter(a => !a.isCorrect && a.studentAnswer !== 'chưa chọn đáp án').length;

        // Số câu chưa chọn đáp án
        const pending = currentPart.answers.filter(a => a.studentAnswer === 'chưa chọn đáp án').length

        return { total, correct, incorrect, pending };
    },[activeTab])


    /* ==========================================================================================
     * Logic
     * ========================================================================================== */

    // Với Tabs, mặc định truyền 2 đối số là event, newValue -> giá trị tab mới được chọn
    const onTabChange = (_e: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    }


    /* ==========================================================================================
     * Breadcrumbs
     * ========================================================================================== */
    const breadcrumbs = [
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="#"
            onClick={(e) => {
                e.preventDefault();
                navigate(`/class/${classId}/exam/${examId}`);
            }}
            sx={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#000"
            }}
        >
            {mockExamDetail.name}
        </Link>,
        <Typography
            key="3"
            color="text.primary"
            sx={{
                fontSize: "20px",
                fontWeight: "bold",
            }}
        >
            Chấm bài
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

                <Box sx={{
                    width: '100%',
                    border: '1px solid #31b5ee',
                    bgcolor: 'white',
                    borderRadius: '10px',
                    padding: '25px 20px'
                }}>
                    <Tabs
                        value={activeTab}
                        onChange={onTabChange}
                        aria-label="exam parts tabs"
                        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
                    >
                        {mockMarkingData.parts.map(part => (
                            <Tab
                                sx={{
                                    fontSize: "16px",
                                    textTransform: "none",
                                    minWidth: 0,
                                    fontWeight: "medium",


                                }}
                                label={part.partName}
                                key={part.partId}
                            />
                        ))}
                    </Tabs>

                    {/* PHẦN CÒN LẠI */}
                    <Box sx={{width: '100%', padding: '0 12px'}}>
                        <Box sx={{width: '100%'}}>
                            {/* Thông tin bài thi và nút Lưu */}
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Box>
                                    <Typography variant="body1">
                                        Tên đề bài: {mockMarkingData.parts[activeTab].partName}
                                    </Typography>
                                    <Typography variant="body1">
                                        Thời gian nộp bài: {mockMarkingData.submissionTime}
                                    </Typography>
                                </Box>

                                <Button
                                    variant="contained"
                                    sx={
                                        {
                                            ml: 2,
                                            textTransform: 'none',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            bgcolor: '#3182ce',
                                            boxShadow: 'none',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: '#2b6cb0',
                                                boxShadow: 'none',
                                            },
                                            height: 40,
                                        }}
                                >
                                    Lưu lại
                                </Button>
                            </Box>

                            {/* Khối tóm tắt kết quả và biểu đồ tròn */}
                            <Box sx={{width: '100%',
                                borderRadius: '15px',
                                border: '1px solid #ccc',
                                padding: '25px',
                                mt: 3,
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                {/* Thông tin tóm tắt */}
                                <Box>
                                    <Typography>Tổng số câu: {summary.total}</Typography>
                                    <Typography>Số câu đúng: {summary.correct}</Typography>
                                    <Typography>Số câu sai: {summary.incorrect}</Typography>
                                    <Typography>Số câu chưa chấm: {summary.pending}</Typography>
                                </Box>

                                {/* Biểu đồ tròn tiến độ */}
                                <Box sx={{ position: 'relative', display: 'inline-flex', ml: 'auto', mr: 25 }}>
                                    <CircularProgress
                                        variant="determinate" // Loại biểu đồ có giá trị xác định
                                        value={(summary.correct / summary.total) * 100 || 0} // Tính toán phần trăm câu đúng
                                        size={100}
                                        thickness={4}
                                        sx={{ color: 'green' }}
                                    />
                                    {/* Box để hiển thị text ở giữa biểu đồ */}
                                    <Box
                                        sx={{
                                            top: 0, left: 0, bottom: 0, right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography variant="h6" component="div" color="text.secondary">
                                            {`${summary.correct}/${summary.total}`}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>


                            {/* Danh sách chi tiết các câu trả lời */}
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{ mt: 3, fontSize: '16px', textDecoration: 'underline', color: '#3182ce' }}
                                >
                                    Câu trả lời:
                                </Typography>

                                <List>
                                    {/* Lặp qua danh sách câu trả lời và render component MarkingAnswerItem */}
                                    {mockMarkingData.parts[activeTab].answers.map((ans, index) => (
                                        <MarkingAnswerItem
                                            key={ans.questionId}
                                            answer={ans}
                                            index={index}
                                        />
                                    ))}
                                </List>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ExamMarkingPage