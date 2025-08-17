
//type: payload avatar
export interface AvatarPayload {
    id: number | null;
    url: string | null;
    payload: string | null; // base64 string
}


// type: payload update payload
export interface UpdateProfilePayload {
    name: string;
    email: string; // Vẫn được gửi đi, nhưng không cho phép sửa
    school: string | null;
    parent_name: string | null;
    parent_phone: string | null;
    avata: AvatarPayload | null;
}


// type: payload đổi mật khẩu
export interface ChangePasswordPayload {
    id: number;
    old_password: string; // mã hóa Base64
    new_password: string; // mã hóa Base64
}
