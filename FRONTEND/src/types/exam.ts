// Dữ liệu trả về từ API cho một nhóm bài thi (ExamGroup) -> nhóm bài thi
import type {ClassDetailData} from "../features/classroom/services/type.ts";

export interface ExamGroup {
    id: number;
    name: string;
    clas: number | ClassDetailData;
    start_time: string; // ISO date string, e.g. "2025-06-15"
    await_time: number; // in seconds
    created_at: string; // ISO datetime string --> '2025-06-18T02:37:26.830Z'
    is_once: boolean;
    is_save_local: boolean;
}