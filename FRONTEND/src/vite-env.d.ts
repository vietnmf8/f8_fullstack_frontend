/// <reference types="vite/client" />


interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    // Khai báo thêm biến môi trường khác nếu có
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

