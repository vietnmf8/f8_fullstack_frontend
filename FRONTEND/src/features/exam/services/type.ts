
// Payload gửi đi khi tạo một bài thi mới
export interface CreateExamPayload {
    name: string;
    class_id: number;
    start_time: string;
    await_time: number;
    is_once?: boolean;
    is_save_local?: boolean;
}

// Payload gửi đi khi cập nhật bài thi
export interface UpdateExamActionPayload {
    id: number;
    data: CreateExamPayload
}