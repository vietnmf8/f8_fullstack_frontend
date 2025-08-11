import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Box, Button, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClassCard from '../components/ClassCard.tsx'
import { mockClasses } from '../../../data'
import {getClassListApi} from "../services/classApi.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../auth/store/rootReducer.ts";


const ClassList = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth)


    /* ==========================================================================================
     * useEffect
     * ========================================================================================== */

    useEffect(() => {
        getClassListApi()
    }, []);




    /* ==========================================================================================
     * State
     * ========================================================================================== */

    const [searchTerm, setSearchTerm] = useState("");


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
    const filteredClasses = mockClasses.filter((cls) =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.classId.toLowerCase().includes(searchTerm.toLowerCase())
    )

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


            {/* Classes Grid */}
            <Grid container spacing={3} sx={{mt: 5}}>
                {
                    filteredClasses.map((classItem) => (
                        <Grid key={classItem.id} size={{xs: 12, sm: 6, md: 4 }}>
                            <ClassCard
                                id={classItem.id}
                                name={classItem.name}
                                memberCount={classItem.memberCount}
                                classId={classItem.classId}
                            />
                        </Grid>
                    ))
                }
            </Grid>

            {/* Xử lý nếu chưa có lớp học */}
            {
                filteredClasses.length === 0 && (
                    <Box sx={{
                        textAlign: 'center',
                        py: 8,
                    }}>
                        <Typography variant="h6">
                            Không tìm thấy lớp học nào!
                        </Typography>
                        <Typography variant="body2">
                            Thử thay đổi từ khóa tìm kiếm
                        </Typography>
                    </Box>
                )
            }
        </Box>
    );
};

export default ClassList;