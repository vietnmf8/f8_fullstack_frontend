// Định nghĩa kiểu dữ liệu cho một câu trả lời của học sinh
export interface StudentAnswer {
    questionId: number;
    studentAnswer: string;
    isCorrect: boolean;
    teacherComment?: string;
}

// Định nghĩa kiểu dữ liệu cho bài làm của một học sinh cho một phần thi
export interface StudentSubmissionPart {
    partId: string;
    partName: string;
    answers: StudentAnswer[];
}

// Định nghĩa kiểu dữ liệu cho toàn bộ bài làm của học sinh
export interface StudentSubmission {
    studentId: string;
    examId: string;
    submissionTime: string;
    parts: StudentSubmissionPart[];
}

// Dữ liệu mẫu
export const mockMarkingData: StudentSubmission = {
    studentId: "1",
    examId: "1",
    submissionTime: "10:49:36 23/01/2024",
    parts: [
        {
            partId: "1",
            partName: "Đề 1",
            answers: [
                { questionId: 1, studentAnswer: "A", isCorrect: true },
                { questionId: 2, studentAnswer: "A", isCorrect: true },
                { questionId: 3, studentAnswer: "3.5-D", isCorrect: true, teacherComment: "Đúng" },
                { questionId: 4, studentAnswer: "2pi.căn(l+hpi", isCorrect: false, teacherComment: "Sai" },
                { questionId: 5, studentAnswer: "D", isCorrect: true },
                { questionId: 6, studentAnswer: "D", isCorrect: true },
                { questionId: 7, studentAnswer: "B", isCorrect: true },
                { questionId: 8, studentAnswer: "D", isCorrect: true },
                { questionId: 9, studentAnswer: "30.803", isCorrect: false, teacherComment: "Sai" },
                { questionId: 10, studentAnswer: "chưa chọn đáp án", isCorrect: false },
                { questionId: 11, studentAnswer: "C", isCorrect: true },
                { questionId: 12, studentAnswer: "chưa chọn đáp án", isCorrect: false },
                { questionId: 13, studentAnswer: "B", isCorrect: true },
                { questionId: 14, studentAnswer: "D", isCorrect: true },
                { questionId: 15, studentAnswer: "B.B", isCorrect: false, teacherComment: "Sai" },
                { questionId: 16, studentAnswer: "A", isCorrect: true },
                { questionId: 17, studentAnswer: "D", isCorrect: true },
                { questionId: 18, studentAnswer: "48.240.480", isCorrect: true, teacherComment: "Đúng" },
                { questionId: 19, studentAnswer: "C", isCorrect: true },
                { questionId: 20, studentAnswer: "C", isCorrect: true },
                { questionId: 21, studentAnswer: "chưa chọn đáp án", isCorrect: false },
                { questionId: 22, studentAnswer: "A", isCorrect: true },
            ],
        },
        {
            partId: "2",
            partName: "Đề 2",
            answers: [
                { questionId: 1, studentAnswer: "A", isCorrect: true },
                { questionId: 2, studentAnswer: "Sai rồi", isCorrect: false },
                { questionId: 3, studentAnswer: "C", isCorrect: true },
            ],
        },
        {
            partId: "3",
            partName: "Đề 3",
            answers: [
                { questionId: 1, studentAnswer: "A", isCorrect: true },
                { questionId: 2, studentAnswer: "Đúng rồi", isCorrect: true },
            ],
        },
    ],
};
