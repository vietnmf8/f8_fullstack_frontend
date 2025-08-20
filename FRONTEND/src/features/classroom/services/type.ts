/* Class List */

// định nghĩa type cho một đối tượng lớp học từ API
export interface ClassData {
    id: string;
    name: string;
    code: string;              // mã lớp
    users: number[];           // mảng chứa ID của các user (hiện tại chỉ chứa ID của GV tạo lớp)
    members_count: number;     // tổng số thành viên trong lớp
}

// định nghĩa type payload khi tạo lớp học mới
export interface CreateClassPayload {
    name: string;
    code: string;
    users: number[]
}


/* Class Detail */

// định nghĩa type -> thành viên trong lớp học
export interface User {
    id: number;
    name: string;
    status: 'confirmed' | 'pending' | 'rejected';
    role: 'teacher' | 'student';
}

// định nghĩa type -> chi tiết dữ liệu của một lớp học
export interface ClassDetailData {
    id: number;
    code: string;
    name: string;
    users: User[];
}