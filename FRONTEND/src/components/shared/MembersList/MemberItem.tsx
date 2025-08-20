import {Chip, TableCell, TableRow, Typography} from "@mui/material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {memo} from "react";
import type {User} from "@/features/classroom/services/type.ts";

interface MemberItemProps {
    index: number;
    name: string;
    role: User['role']; // Sử dụng kiểu 'teacher' | 'student'
    showKey?: boolean; // Prop để điều khiển hiển thị icon
    useChipForRole?: boolean;
}


const MemberItem = memo(
    ({index, role, name, showKey, useChipForRole}: MemberItemProps) => {

        // Xác định màu chip dựa trên roles
        const getRoleStyle = (role: User['role']) => {
            switch (role) {
                case 'teacher':
                    return {
                        label: 'Giáo viên',
                        style: {bgcolor: '#fbb6ae', color: 'white'} //
                    };
                case 'student':
                    return {
                        label: 'Học sinh',
                        style: {bgcolor: '#22c35e', color: 'white'} // Xanh lá
                    };
                default:
                    return {
                        label: 'Không xác định',
                        style: {bgcolor: '#9e9e9e', color: 'white'} // Xám
                    };
            }
        }

        const { label, style } = getRoleStyle(role);

        return (
            <TableRow
                sx={{
                    bgcolor: index % 2 === 0 ? '#fff' : '#edf2f7',

                }}>
                {/* Stt */}
                <TableCell>
                    <Typography>
                        {index}
                    </Typography>
                </TableCell>

                {/* Họ tên */}
                <TableCell>
                    <Typography>
                        {name}
                    </Typography>
                </TableCell>

                {/* Vị trí/Role */}
                <TableCell>
                    {
                        useChipForRole ? (
                            <Chip
                                label={role}
                                size="small"
                                sx={{
                                    ...style,
                                    fontSize: '14px',
                                    minWidth: 80
                                }}
                            />
                        ) : (
                            <Typography variant="body1">{label}</Typography>
                        )
                    }
                </TableCell>

                {/* Key */}
                <TableCell>
                    {
                        showKey
                        &&
                        role === "teacher"
                        &&
                        <VpnKeyIcon sx={{fontSize: '18px', color: '#e87117'}}/>
                    }
                </TableCell>
            </TableRow>
        )
    }
)

export default MemberItem