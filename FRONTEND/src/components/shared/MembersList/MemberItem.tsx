import {Chip, TableCell, TableRow, Typography} from "@mui/material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';

interface MemberItemProps {
    index: number;
    name: string;
    role: string;
    showKey?: boolean; // Prop để điều khiển hiển thị icon
    useChipForRole?: boolean;
}


const MemberItem = ({index, role, name, showKey, useChipForRole}: MemberItemProps) => {

    // Xác định màu chip dựa trên roles
    const getChipColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'giáo viên':
                return {bgcolor: '#fbb6ae', color: 'white'}; // Vàng
            case 'học sinh':
                return {bgcolor: '#22c35e', color: 'white'}; // Xanh lá
            default:
                return {bgcolor: '#9e9e9e', color: 'white'}; // Xám
        }
    }

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
                                ...getChipColor(role),
                                fontSize: '14px',
                                minWidth: 80
                            }}
                        />
                    ) : (
                        <Typography variant="body1">{role}</Typography>
                    )
                }
            </TableCell>

            {/* Key */}
            <TableCell>
                {
                    showKey
                    &&
                    role.toLowerCase() === "giáo viên"
                    &&
                    <VpnKeyIcon sx={{fontSize: '18px', color: '#e87117'}}/>
                }
            </TableCell>
        </TableRow>
    )
}

export default MemberItem