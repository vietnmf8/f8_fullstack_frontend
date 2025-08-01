import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import MemberItem from "./MemberItem.tsx";

interface Member {
    id: string;
    name: string;
    role: string;
    avatar?: string;
}

interface MembersListProps {
    members: Member[];
    title?: string;
}


const MembersList = ({members, title="Danh sách thành viên"}: MembersListProps) => {
    return (
        <Box>
            <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                    fontWeight: "500",
                    fontSize: "18px",
                }}
            >
                {title}
            </Typography>


            <TableContainer>
                <Table sx={{
                    borderCollapse: 'collapse',
                    '& td, & th': { border: 'none', padding: '12px' } // bỏ toàn bộ border
                }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Họ và tên</TableCell>
                            <TableCell>Vị trí</TableCell>
                            <TableCell></TableCell>
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
                                    useChipForRole={true} // <-- Dùng Chip (mặc định)
                                    showKey={true}      // <-- Hiển thị key (mặc định)
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default MembersList