import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import MemberItem from "../../../../components/shared/MembersList/MemberItem.tsx";
import { useOutletContext } from "react-router";

interface Member {
    id: string;
    name: string;
    role: string;
    avatar?: string;
}

interface ClassMemberContext {
    members: Member[]
}


const ClassMembers = () => {

    // Lấy dữ liệu từ context
    const { members } = useOutletContext<ClassMemberContext>();

    return (
        <Box sx={{
            display: 'flex',
            minHeight: 'calc(100vh - 64px)',
            p: 4,
        }}
        >
            {/* Main content */}
            <Box sx={{width: '100%', height: '100%'}}>
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{fontWeight: 'bold', fontSize: '24px'}}
                >
                    Danh sách thành viên
                </Typography>

                <TableContainer component={Paper}
                                sx={{boxShadow: 'none', borderRadius: '12px', mt: 4, padding: '10px 20px 30px',}}>
                    <Table sx={{


                        borderCollapse: 'collapse',
                        '& td, & th': {border: 'none', padding: '18px', fontSize: '16px',} // bỏ toàn bộ border
                    }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Họ và tên</TableCell>
                                <TableCell>Vị trí</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                members.map((member: Member, index: number) => (
                                    <MemberItem
                                        key={member.id}
                                        index={index + 1}
                                        name={member.name}
                                        role={member.role}
                                        useChipForRole={false} // <-- Không dùng Chip
                                        showKey={false} // Không hiển thị key icon theo như ảnh
                                    />
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default ClassMembers