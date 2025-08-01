import {Avatar, AvatarGroup, Box, Button, Card, Grid, Typography} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MembersList from "../../../../components/shared/MembersList/MembersList.tsx";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useOutletContext } from 'react-router';

/* ==========================================================================================
 * Interface
 * ========================================================================================== */

interface ClassOverViewContext {
    classData: {
        id: string;
        name: string;
        teacher: string;
        memberCount: number;
        testCount: number;
        classId: string;
    };
    members: Array<{
        id: string;
        name: string;
        role: string;
        avatar?: string;
    }>;
    recentActivities: Array<{
        id: string;
        title: string;
        time: string;
        user: string;
    }>;

}

const ClassOverview = () => {

    // Lấy dữ liệu từ context được cung cấp bởi <Outlet />
    const { classData, members, recentActivities } = useOutletContext<ClassOverViewContext>();

    /* ==========================================================================================
     * Logic
     * ========================================================================================== */

    const onCopyClassId = () => {
        // Logic copy mã lớp
        console.log('Copy mã lớp:', classData.classId);
    }

    /* ==========================================================================================
     * Giao diện
     * ========================================================================================== */

    return (
        <Box sx={{
            display: 'flex',
            height: 'calc(100vh - 64px)',
            p: 4,
        }}>
            {/* Main Content */}
            <Box sx={{width: '100%', height: '100%', maxHeight: '100vh', overflowY: 'auto'}}>
                <Grid container spacing={4} sx={{height: '100%'}}>
                    <Grid
                        size={8}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        {/* Banner thông tin lớp học */}
                        <Card sx={{
                            width: '100%',
                            background: "linear-gradient(85deg, rgba(48, 167, 219, 1) 0%, rgba(142, 204, 243, 1) 89%)",
                            borderRadius: '20px',
                            boxShadow: "10px 17px 26px -5px rgba(0,0,0,0.1)",
                            padding: '20px 25px',
                        }}>
                            <Box>
                                {/* Title */}
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <DashboardIcon
                                        sx={{color: 'white'}}
                                    />
                                    <Typography
                                        variant="body2"
                                        component="div"
                                        sx={{
                                            fontSize: '24px',
                                            fontWeight: '500',
                                            color: 'white',
                                        }}

                                    >
                                        {classData.name}
                                    </Typography>
                                </Box>

                                {/* Giáo viên */}
                                <Typography
                                    sx={{color: 'white', fontSize: '16px'}}
                                >
                                    Giáo viên: {classData.teacher}
                                </Typography>
                            </Box>


                            {/* Chia sẻ lớp học & Avatar */}
                            <Box sx={{width: '100%', mt: 2.5, display: 'flex', alignItems: 'center', gap: 1}}>
                                <Typography sx={{color: 'white', fontSize: '16px'}}>
                                    Chia sẻ lớp học
                                </Typography>

                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<ContentCopyIcon/>}
                                    onClick={onCopyClassId}
                                    sx={{
                                        color: 'white',
                                        borderColor: 'white',
                                        textTransform: 'none',
                                        borderRadius: '8px',
                                        '&:hover': {
                                            bgcolor: 'rgba(255,255,255,0.1)',
                                            borderColor: 'white'
                                        }
                                    }}
                                >
                                    Sao chép liên kết
                                </Button>

                                <AvatarGroup max={4} sx={{ml: 'auto'}}>
                                    {
                                        members.map((member, index) => (
                                            <Avatar
                                                key={member.id}
                                                sx={{
                                                    bgcolor: ['#e91e63', '#9c27b0', '#673ab7', '#3f51b5'][index % 4]
                                                }}
                                            >
                                                {member.name.charAt(0)}
                                            </Avatar>
                                        ))
                                    }
                                </AvatarGroup>
                            </Box>
                        </Card>


                        {/* Thống kê */}
                        <Box sx={{width: '100%', mt: 3}}>
                            <Grid container spacing={3}>
                                <Grid size={6}>
                                    <Card
                                        sx={{
                                            width: '100%',
                                            minHeight: '120px',
                                            borderRadius: '20px',
                                            boxShadow: "10px 17px 26px -5px rgba(0,0,0,0.1)",
                                            padding: '20px 25px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <PeopleAltIcon sx={{fontSize: 80, color: '#31b5ee'}}/>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: '500',
                                                fontSize: '24px',
                                                alignSelf: 'flex-end',
                                                position: 'relative',
                                                top: '-9px',
                                                marginLeft: 2

                                            }}>
                                            {classData.memberCount} thành viên
                                        </Typography>
                                    </Card>
                                </Grid>

                                <Grid size={6}>
                                    <Card
                                        sx={{
                                            width: '100%',
                                            minHeight: '120px',
                                            borderRadius: '20px',
                                            boxShadow: "10px 17px 26px -5px rgba(0,0,0,0.1)",
                                            padding: '20px 25px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <FileCopyIcon sx={{fontSize: 70, color: '#31b5ee'}}/>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight: '500',
                                                fontSize: '24px',
                                                alignSelf: 'flex-end',
                                                position: 'relative',
                                                top: '-9px',
                                                marginLeft: 2

                                            }}>
                                            {classData.testCount} bài kiểm tra
                                        </Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>


                        {/* Danh sách thành viên */}
                        <Card
                            sx={{
                                width: '100%',
                                borderRadius: '20px',
                                boxShadow: "10px 17px 26px -5px rgba(0,0,0,0.1)",
                                padding: '20px 25px',
                                mt: 3,
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                overflowY: 'auto',
                                height: '100px'
                            }}
                        >
                            <MembersList members={members}/>
                        </Card>

                    </Grid>


                    <Grid size={4}
                          sx={{
                              borderRadius: '20px',
                              boxShadow: "10px 17px 26px -5px rgba(0,0,0,0.1)",
                              bgcolor: 'white',
                              maxHeight: '100%',
                              overflowY: 'auto',
                          }}>

                        <Box sx={{
                            width: '100%',
                            bgcolor: 'white',
                            padding: '20px 25px',
                            position: 'sticky',
                            top: 0,
                            left: 0,
                            zIndex: 999,
                        }}>
                            {/* Title */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}>
                                <DashboardIcon
                                    sx={{color: 'inherit'}}
                                />
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{
                                        fontSize: '20px',
                                        fontWeight: '500',
                                        color: 'inherit',
                                    }}

                                >
                                    Hoạt động gần đây
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            width: '100%',
                            padding: '20px 0px',
                            // padding: '20px 25px',
                        }}>


                            {/* Hoạt động */}
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                {recentActivities.map((activity, index) => (
                                    <Box key={index} sx={{
                                        padding: '15px 20px',
                                        '&: hover': {
                                            bgcolor: '#edf2f7',
                                            cursor: 'pointer'
                                        }
                                    }}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                            <Avatar sx={{width: 48, height: 48, bgcolor: '#31b5ee'}}>
                                                {activity.user.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body2" sx={{fontWeight: 'medium', fontSize: '16px'}}>
                                                    Bài thi <strong style={{color: '#3182ce'}}>{activity.title}</strong> vừa được tải lên
                                                </Typography>

                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
                                                    <CalendarTodayIcon sx={{fontSize: '14px'}}/>
                                                    <Typography variant="caption" color="text.secondary" sx={{fontSize: '14px'}}>
                                                        {activity.time}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>


                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ClassOverview