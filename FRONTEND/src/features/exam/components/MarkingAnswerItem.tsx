import {
    Box,
    FormControl,
    FormControlLabel,
    ListItem,
    ListItemText,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { type StudentAnswer } from "@/data";

interface MarkingAnswerProps {
    answer: StudentAnswer;
    index: number;
}

const MarkingAnswerItem = ({answer, index}: MarkingAnswerProps ) => {

// Biến xác định câu trả lời có trống không?
    const isUnanswered = answer.studentAnswer === 'chưa chọn đáp án'

    // Biến xác định màu sắc
    const statusColor = isUnanswered
        ? '#f59e0b' // Màu vàng cam cho câu chưa làm
        : answer.isCorrect
            ? 'green'   // Màu xanh cho câu đúng
            : 'red';    // Màu đỏ cho câu sai


    return (
        <ListItem
            sx={{
                borderBottom: '1px solid #eee',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 1.5
            }}
        >
            {/* STT */}
            <Typography sx={{ minWidth: '30px' }}>
                {index}
            </Typography>

            {/* Câu trả lời */}
            <ListItemText
                primary={`Câu ${answer.questionId}: ${answer.studentAnswer}`}
                sx={{
                    flex: 1,
                    color: statusColor // Áp dụng màu trạng thái
                }}
            />

            {/* Trạng thái */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: '200px' }}>
                {/*
                    - Nếu chưa trả lời -> Hiện Radio "Đúng"/"Sai" để giáo viên chấm.
                    - Nếu đã trả lời -> Hiện Icon Đúng (xanh) hoặc Sai (đỏ).
                */}
                {
                    isUnanswered ? (
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="marking-radio-buttons-group"
                                name="marking-radio-buttons"
                                // Vì chưa làm nên mặc định không chọn giá trị nào
                                value={null}
                            >
                                <FormControlLabel value="correct" control={<Radio />} label="Đúng" />
                                <FormControlLabel value="incorrect" control={<Radio />} label="Sai" />
                            </RadioGroup>
                        </FormControl>
                    ) : (
                        <>
                            {answer.isCorrect ?
                                <CheckCircleIcon sx={{ color: 'green' }} /> :
                                <CancelIcon sx={{ color: 'red' }} />
                            }
                        </>
                    )
                }
            </Box>
        </ListItem>
    )
};

export default MarkingAnswerItem;
