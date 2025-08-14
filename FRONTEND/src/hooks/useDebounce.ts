import { useState, useEffect } from 'react';


export function useDebounce<T>(value: T, delay: number = 500): T {
    // State để lưu trữ giá trị đã debounce
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Thiết lập một timer để cập nhật giá trị debounce
        // sau khoảng thời gian `delay`
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Dọn dẹp timer khi component unmount hoặc khi `value` hoặc `delay` thay đổi.
        // Điều này đảm bảo rằng giá trị chỉ được cập nhật sau khi người dùng ngừng gõ.
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Chỉ chạy lại effect nếu `value` hoặc `delay` thay đổi

    return debouncedValue;
}
