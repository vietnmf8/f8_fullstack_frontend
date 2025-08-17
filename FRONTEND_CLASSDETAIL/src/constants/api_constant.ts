export const API_ENDPOINTS = {
    // Auth endpoints
    LOGIN: "/login/",
    REGISTER: "/master/user/",
    REFRESH_TOKEN: "/login/get_new_token/",

    // User endpoints
    USER_PROFILE: "/user/profile/",
    UPDATE_PROFILE: "/master/user/:id",
    CHANGE_PASSWORD: "/master/user/change_password",

    // Class endpoints
    CLASSES: "/master/class/",
    // CLASS_DETAIL: "/master/class/:id/", --> Sử dụng "id" động
    // CLASS_MEMBERS: "/master/class/:id/members/",
    // CLASS_UPDATE: "/master/class/:id/",
    // CLASS_DELETE: "/master/class/:id/",

    // Exam endpoints
    EXAMS: "/exams/",
    EXAM_GROUPS_BY_CLASS: "/exam_group/",
    EXAM_DETAIL: "/exams/:id/",
    EXAM_QUESTIONS: "/exams/:id/questions/",
    EXAM_RESULTS: "/exams/:id/results/",
} as const;

export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com";
