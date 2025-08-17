// Định nghĩa kiểu dữ liệu cho câu hỏi
export interface Question {
    id: number;
    answerType: 'single' | 'multiple' | 'fill';
    correctAnswer: string | string[];
}

// Định nghĩa kiểu cho một phần thi
export interface ExamPart {
    id: string;
    name: string;
    code: string;
    duration: string;
    questionCount: number;
    questions: Question[]; // Mảng các câu hỏi
}


// Tên phần
export const mockExamParts = [
    {
        id: '1',
        name: 'PHẦN 1: TƯ DUY TOÁN HỌC',
        code: '01',
        duration: '60 phút',
        questionCount: 5,
        questions: [
            { id: 1, answerType: 'single', correctAnswer: 'B' },
            { id: 2, answerType: 'multiple', correctAnswer: ['A', 'C'] },
            { id: 3, answerType: 'fill', correctAnswer: 'Jack - J97' },
            { id: 4, answerType: 'single', correctAnswer: 'D' },
            { id: 5, answerType: 'multiple', correctAnswer: ['B', 'D'] },
        ]
    },
    {
        id: '2',
        name: 'PHẦN 3: TƯ DUY KHOA HỌC/ GIẢI QUYẾT VẤN ĐỀ',
        code: '01',
        duration: '60 phút',
        questionCount: 3,
        questions: [
            { id: 1, answerType: 'single', correctAnswer: 'A' },
            { id: 2, answerType: 'fill', correctAnswer: 'Trịnh Trần Phương Tuấn' },
            { id: 3, answerType: 'multiple', correctAnswer: ['A', 'B', 'C'] },
        ]
    },
    {
        id: '3',
        name: 'PHẦN 2: TƯ DUY ĐỌC HIỂU',
        code: '01',
        duration: '30 phút',
        questionCount: 2,
        questions: [
            { id: 1, answerType: 'single', correctAnswer: 'C' },
            { id: 2, answerType: 'fill', correctAnswer: 'Meo Meo 🌻' },
        ]
    },
];
