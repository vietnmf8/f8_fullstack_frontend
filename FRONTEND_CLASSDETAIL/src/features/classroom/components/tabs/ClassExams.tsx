import {Box, Button, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ExamItem from "../ExamItem.tsx";
import {ongoingExams, upcomingExams} from '../../../../data'

const ClassExams = () => {


    /* ==========================================================================================
     * Logic
     * ========================================================================================== */




    /* ==========================================================================================
     * Giao diện
     * ========================================================================================== */

    return (
        <Box sx={{
            display: 'flex',
            minHeight: 'calc(100vh - 64px)',
            p: 4,
        }}>

            <Box sx={{
                width: '100%',
            }}>
                {/* Header */}
                <Box sx={{
                    width: '100%',
                    display: "flex",
                    alignItems: "center"
                }}>
                    {/* Tiêu đề */}
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        Danh sách bài thi
                    </Typography>

                    <TextField
                        required
                        placeholder="Tìm kiếm"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{color: '#a0aec0'}}/>
                                </InputAdornment>
                            ),
                            sx: {
                                height: 40,
                                fontSize: '18px',
                                borderRadius: '8px',
                            }
                        }}
                        sx={{marginLeft: 'auto', width: '22%'}}
                    />

                    {/* Tạo bài thi */}
                    <Button
                        variant="text"
                        sx={
                            {
                                ml: 2,
                                minWidth: 150,
                                textTransform: 'none',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                bgcolor: '#ff8e05',
                                boxShadow: 'none',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: '#ffb300'
                                }
                            }}
                        startIcon={<AddIcon/>}
                    >
                        Tạo bài thi
                    </Button>
                </Box>



                {/* Bài thi đang diễn ra */}
                <Box sx={{
                    mt: 4,
                    width: '100%',
                }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            fontSize: '18px',
                            fontWeight: '500',
                            color: '#2b6cb0',
                            mb: 3
                        }}
                    >
                        Bài thi đang diễn ra
                    </Typography>

                    <Grid container spacing={5}>
                        {
                            ongoingExams.map((exam) => (
                                <Grid size={{xs: 12, sm: 6, md: 4}} key={exam.id}>
                                    <ExamItem exam={exam}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>



                {/* Bài thi chưa diễn ra */}
                <Box sx={{
                    mt: 4,
                    width: '100%',
                }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{
                            fontSize: '18px',
                            fontWeight: '500',
                            color: '#2b6cb0',
                            mb: 3
                        }}
                    >
                        Bài thi chưa diễn ra
                    </Typography>

                    <Grid container spacing={5}>
                        {
                            upcomingExams.map((exam) => (
                                <Grid size={{xs: 12, sm: 6, md: 4}} key={exam.id}>
                                    <ExamItem exam={exam}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Box>

        </Box>
    )
}

export default ClassExams

