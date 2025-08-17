
// Định nghĩa kiểu dữ liệu cho thông tin đề bài
import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {mockExamDetail, mockExamParts, type Question} from "../../../data";
import {
    Box,
    Breadcrumbs,
    Button,
    FormControl,
    Grid,
    Link,
    MenuItem,
    Select, type SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import * as React from "react";
import AnswerOptions from "../components/AnswerOptions.tsx";

interface PartDetail {
    name: string;
    code: string;
    duration: string;
    questionCount: number;
}

const QuestionForm = () => {

    // Lấy params và xác định chế độ Chỉnh sửa?
    const { classId, examId, questionId } = useParams<{ classId: string, examId: string, questionId: string }>();
    const navigate = useNavigate();
    const isEditMode = questionId !== '0'


    /* ==========================================================================================
     * State
     * ========================================================================================== */
    const [partDetail, setPartDetail] = useState<PartDetail | null>(null); // Học phần
    const [questions, setQuestions] = useState<Question[]>([]); // Danh sách câu hỏi

    /* ==========================================================================================
     * useEffect
     * ========================================================================================== */

    useEffect(() => {
        if (isEditMode) {
            // Chế độ Edit -> Lấy dữ liệu từ mock
            const partData = mockExamParts.find(p => p.id === questionId);
            if (partData) {
                setPartDetail({
                    name: partData.name,
                    code: partData.code,
                    duration: partData.duration.split(' ')[0],
                    questionCount: partData.questionCount,
                });
            }
            // Lấy danh sách câu hỏi và đáp án
            setQuestions(partData?.questions as Question[]);
        }

        else {
            // Chế độ "Tạo mới"
            setPartDetail({
                name: '',
                code: '',
                duration: '',
                questionCount: 1,
            });
            // Bắt đầu với một câu hỏi mặc định
            setQuestions([{id: 1, answerType: 'single', correctAnswer: ''}]);
        }
    }, [questionId, isEditMode])


    /* ==========================================================================================
     * Logic
     * ========================================================================================== */

    // Thay đổi các trường trong Học phần
    const onInputChange = (field: keyof PartDetail, value: string | number) => {
        setPartDetail(prev => {
            if (!prev) return null
            return {
                ...prev,
                [field]: value
            }
        })
    }

    // Trường trường thời gian làm bài
    const onDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[0-9]*$/.test(value)) {
            onInputChange("duration", value);
        }
    }

    // Trường Số câu
    const onQuestionCountChange = (count: number) => {
        // Đếm số câu, nhỏ nhất là 1
        const validCount = Math.max(1, count || 1)
        onInputChange('questionCount', validCount);

        const newQuestions: Question[] = [];
        for (let i = 1; i <= validCount; i++) {
            const existingQuestion = questions[i - 1];
            newQuestions.push(existingQuestion || { id: i, answerType: 'single', correctAnswer: '' });
        }
        setQuestions(newQuestions);
    }

    // Trường loại câu trả lời
    const onAnswerTypeChange = (e: SelectChangeEvent<string>, index: number) => {
        const newQuestions: Question[] = [...questions];
        newQuestions[index].answerType = e.target.value as 'single' | 'multiple' | 'fill';
        // Reset correctAnswer khi chọn kiểu khác
        newQuestions[index].correctAnswer = newQuestions[index].answerType === 'multiple' ? [] : '';
        setQuestions(newQuestions);
    }

    // Trường chọn đáp án
    const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.ChangeEvent<{ name?: string; value: unknown }>, index: number) => {
        const newQuestions: Question[] = [...questions];
        const question = newQuestions[index];
        if (question.answerType === 'multiple') {
            const {name, checked} = e.target as HTMLInputElement;
            let currentAnswers = [...question.correctAnswer]
            // Nếu được checked -> thêm vào trươờng hiện tại đang chọn
            if (checked) {
                currentAnswers.push(name!);
            } else {    // Xoá đáp án trong mảng được chọn nếu đáp án đó không được checked
                currentAnswers = currentAnswers.filter(ans => ans !== name);
            }
            // Gán đáp án đúng = đáp án được chọn
            question.correctAnswer = currentAnswers;
        } else {
            question.correctAnswer = (e.target as HTMLInputElement).value;
        }

        setQuestions(newQuestions);
    }


    // on Submit
    const onSubmit = () => {
        if (isEditMode) {
            console.log("Lưu thay đổi:", { partDetail, questions });
        } else {
            console.log("Tạo đề bài:", { partDetail, questions });
        }
        // Sau khi submit -> điều hướng về trang chi tiết bài thi
        navigate(`/class/${classId}/exam/${examId}`);
    };




    /* ==========================================================================================
     * Breadcrumbs
     * ========================================================================================== */
    const breadcrumbs = [
        <Link
            underline="hover"
            key="1"
            color="inherit"
            href="#"
            onClick={(e) => {
                e.preventDefault();
                navigate(`/class/${classId}/exam`); // Quay lại danh sách bài thi của lớp
            }}
            sx={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#000"
            }}
        >
            Danh sách bài thi
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="#"
            onClick={(e) => {
                e.preventDefault();
                navigate(`/class/${classId}/exam/${examId}`); // Quay lại chi tiết bài thi
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
            {isEditMode ? partDetail?.name : 'Thêm đề bài'}
        </Typography>,
    ];

    // Hiển thị loading nếu dữ liệu chưa sẵn sàng
    if (!partDetail) {
        return <Box>Loading...</Box>;
    }
    /* ==========================================================================================
     * Giao diện
     * ========================================================================================== */
    return (
        <Box sx={{
            display: 'flex',
            p: 4,
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
        }}>
            <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{mb: 3}}
                    separator={<NavigateNextIcon fontSize="medium"/>}
                >
                    {breadcrumbs}
                </Breadcrumbs>

                {/* Main Content */}
                <Grid container spacing={4} sx={{flex: 1, height: '0', minHeight: '0'}}>
                    {/* Cột trái */}
                    <Grid size={{xs: 12, md: 6}}
                          sx={{width: '100%', padding: '20px', bgcolor: 'white', borderRadius: '8px'}}
                    >
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Button
                                variant="contained"
                                startIcon={<UploadFileIcon/>}
                                sx={{
                                    textTransform: 'none',
                                    bgcolor: '#edf2f7',
                                    '&:hover': {
                                        bgcolor: '#e5e9ef',
                                        boxShadow: 'none',
                                    },
                                    color: 'black',
                                    boxShadow: 'none',
                                }}
                            >
                                Tải lên từ máy
                            </Button>
                        </Box>
                    </Grid>

                    {/* Cột phải */}
                    <Grid size={{xs: 12, md: 6}}
                          sx={{
                              width: '100%',
                              height: '100%',
                              padding: '30px 20px',
                              bgcolor: 'white',
                              borderRadius: '8px',
                              overflow: 'auto',
                          }}
                    >
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                        }}>
                            <Grid container spacing={2.5} sx={{maxHeight: '100vh'}}>

                                {/* Trường tên đề */}
                                <Grid
                                    size={{xs: 12, md: 6}}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: '500',
                                            mb: 1,
                                            fontSize: '16px',
                                            color: '#2d3748',
                                        }}
                                    >
                                        Tên đề <span style={{color: '#e53e3e'}}>*</span>
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        required
                                        placeholder={"Nhập tên đề"}
                                        autoComplete="off"
                                        InputProps={{
                                            sx: {
                                                height: 40,
                                                fontSize: '16px',
                                                borderRadius: '5px',
                                            }
                                        }}
                                        value={partDetail.name}
                                        onChange={(e) => onInputChange('name', e.target.value)}
                                    />
                                </Grid>


                                {/* Trường mã đề */}
                                <Grid
                                    size={{xs: 12, md: 6}}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: '500',
                                            mb: 1,
                                            fontSize: '16px',
                                            color: '#2d3748',
                                        }}
                                    >
                                        Mã đề <span style={{color: '#e53e3e'}}>*</span>
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        required
                                        placeholder={"Nhập mã đề"}
                                        autoComplete="off"
                                        InputProps={{
                                            sx: {
                                                height: 40,
                                                fontSize: '16px',
                                                borderRadius: '5px',
                                            }
                                        }}
                                        value={partDetail.code}
                                        onChange={(e) => onInputChange('code', e.target.value)}
                                    />
                                </Grid>


                                {/* Trường thời gian làm bài */}
                                <Grid
                                    size={{xs: 12, md: 6}}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: '500',
                                            mb: 1,
                                            fontSize: '16px',
                                            color: '#2d3748',
                                        }}
                                    >
                                        Thời gian làm bài (phút) <span style={{color: '#e53e3e'}}>*</span>
                                    </Typography>

                                    <TextField
                                        id="exam-duration"
                                        fullWidth
                                        placeholder="Nhập thời gian"
                                        variant="outlined"
                                        size="small"
                                        type="text"
                                        required
                                        value={partDetail.duration}
                                        onChange={onDurationChange}
                                        inputProps={{
                                            inputMode: 'numeric', // Gợi ý bàn phím số trên mobile
                                            pattern: '[0-9]*'
                                        }}
                                    />
                                </Grid>


                                {/* Trường số câu */}
                                <Grid
                                    size={{xs: 12, md: 6}}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: '500',
                                            mb: 1,
                                            fontSize: '16px',
                                            color: '#2d3748',
                                        }}
                                    >
                                        Số câu <span style={{color: '#e53e3e'}}>*</span>
                                    </Typography>

                                    <TextField
                                        id="question-count"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        value={partDetail.questionCount}
                                        onChange={(e) => onQuestionCountChange(parseInt(e.target.value, 10))}
                                        inputProps={{ min: 1 }}
                                    />
                                </Grid>

                                {/* Danh sách câu hỏi */}
                                <Grid container spacing={0.5} sx={{width: '100%', overflowY: 'auto'}}>
                                    {
                                        questions.map((question, index) => (
                                            <Grid size={{xs: 12, md: 12}} key={question.id} sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}>
                                                <Typography sx={{
                                                    fontWeight: 'bold',
                                                    mr: 2,
                                                }}
                                                >
                                                    Câu {question.id}:
                                                </Typography>
                                                <FormControl size="small" sx={{m: 1, minWidth: 250}}>
                                                    <Select
                                                        value={question.answerType}
                                                        onChange={(e) => onAnswerTypeChange(e, index)}
                                                        defaultValue="single"
                                                    >
                                                        <MenuItem value="single">Chọn 1 đáp án</MenuItem>
                                                        <MenuItem value="multiple">Chọn nhiều đáp án</MenuItem>
                                                        <MenuItem value="fill">Điền vào chỗ trống</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <AnswerOptions
                                                    answerType={question.answerType}
                                                    questionId={question.id}
                                                    value={question.correctAnswer}
                                                    onChange={(e) => onAnswerChange(e, index)}
                                                />
                                            </Grid>
                                        ))
                                    }
                                </Grid>

                                <Grid size={{xs: 12, md: 12}} sx={{display: 'flex', justifyContent: 'center', mt: 2}}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            textTransform: 'none',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            bgcolor: '#3182ce',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                boxShadow: 'none',
                                                bgcolor: '#2b6cb0'
                                            },
                                            mb: 4
                                        }}
                                        onClick={onSubmit}
                                    >
                                        {isEditMode ? 'Lưu thay đổi' : 'Tạo đề bài'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </Box>
    )
}

export default QuestionForm