import {useNavigate} from "react-router";
import {useEffect, useMemo, useState} from "react";
import {Box, Button, CircularProgress, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClassCard from '../components/ClassCard.tsx'
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store/rootReducer.ts";
import type {AppDispatch} from "../../../store";
import {fetchClasses} from "../store/classThunks.ts";
import {useDebounce} from "../../../hooks/useDebounce.ts";


const ClassList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();


    // Lấy state từ Redux store
    const { user } = useSelector((state: RootState) => state.auth);
    const { classes, loading, error } = useSelector((state: RootState) => state.class);


    /* ==========================================================================================
     * useEffect
     * ========================================================================================== */

    useEffect(() => {
        dispatch(fetchClasses());
    }, [dispatch]);




    /* ==========================================================================================
     * State
     * ========================================================================================== */

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // Delay 500ms


    /* ==========================================================================================
     * Logic xử lý
     * ========================================================================================== */

    // Khi nhập vào ô tìm kiếm
    const onSearchChange = (value: string) => {
        setSearchTerm(value);
    }

    // Điều hướng đến trang thêm lớp học
    const onAddClass = () => {
        navigate("/class/add");
    }

    // Lọc danh sách theo searchTerm
    const filteredClasses = useMemo(() => (
        classes.filter((cls) =>
            cls.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            cls.code.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
    ), [classes, debouncedSearchTerm])

    return (
        <Box
            sx={{
                bgcolor: "#f7f7f9",
                width: "100%",
                minHeight: "100vh",
                padding: '40px'
            }}
        >
            <Box sx={{
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
                    Danh sách lớp học
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
                    value={searchTerm}
                    onChange={e => onSearchChange(e.target.value)}
                />

                {/* Thêm lớp học */}
                {
                    user?.role === 'teacher' && (
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
                            onClick={onAddClass}
                        >
                            Thêm lớp học
                        </Button>
                    )
                }
            </Box>


            {/* Hiển thị loading spinner */}
            {
                loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                        <CircularProgress />
                    </Box>
                )}


            {/* Hiển thị lỗi */}
            {
                error && !loading && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" color="error">
                            {error}
                        </Typography>
                    </Box>
                )}



            {/* Classes Grid */}
            <Grid container spacing={3} sx={{mt: 5}}>
                {
                    filteredClasses.map((classItem) => (
                        <Grid key={classItem.id} size={{xs: 12, sm: 6, md: 4 }}>
                            <ClassCard
                                id={classItem.id}
                                name={classItem.name}
                                memberCount={classItem.members_count || 1}
                                classId={classItem.code}
                            />
                        </Grid>
                    ))
                }
            </Grid>

            {/* Xử lý nếu chưa có lớp học */}
            {
                !loading && !error && filteredClasses.length === 0 && (
                    <Box sx={{
                        textAlign: 'center',
                        py: 8,
                    }}>
                        <Typography variant="h6">
                            {debouncedSearchTerm ? 'Không tìm thấy lớp học nào!' : 'Bạn chưa có lớp học nào.'}
                        </Typography>
                        <Typography variant="body2">
                            {debouncedSearchTerm ? 'Vui lòng thử lại với từ khóa khác.' : (user?.role === 'teacher' ? 'Hãy tạo lớp học đầu tiên của bạn!' : 'Hãy tham gia một lớp học!')}
                        </Typography>
                    </Box>
                )
            }
        </Box>
    );
};

export default ClassList;