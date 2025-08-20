import {jwtDecode} from "jwt-decode";
import type {DecodedUser} from "@/features/auth/services/type.ts";

// Token đã hết hạn hay chưa?
// true -> Hết hạn | false -> Còn hạn

export const isTokenExpired = (token: string | null | undefined, bufferSeconds: number = 5 * 60): boolean => {
    if (!token) {
        return true;
    }
    try {
        // Giải mã thời gian hết hạn
        const decoded = jwtDecode<DecodedUser>(token);
        const currentTime = Date.now() / 1000;

        // Kiểm tra xem thời gian hết hạn (exp)
        return decoded.exp - bufferSeconds < currentTime;
    }
    catch (error) {
        console.error("Failed to decode token:", error);
        return true;
    }
}