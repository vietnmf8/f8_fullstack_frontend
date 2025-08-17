import type {ReactElement} from 'react';
import {Box, Tab, Tabs} from "@mui/material";

interface TabData {
    label: string;
    path: string;
    icon?: ReactElement;
}

interface TabContainerProps {
    tabs: TabData[];
    activeTab: number;
    onTabChange: (value: number) => void;
}

const TabContainer = ({tabs, onTabChange, activeTab}: TabContainerProps) => {
    return (
        <Box sx={{
            bgcolor: 'white',
            pt: 3,
        }}>
            <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={(_, newValue) => onTabChange(newValue)}
                sx={{
                    height: '100%',
                    '& .MuiTab-root': {
                        bgcolor: 'white',
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: '500',
                        padding: "15px 40px",
                        my: '5px',
                        minHeight: '100%',
                        minWidth: '250px',
                        '&.Mui-selected': {
                            color: '#31b5ee',
                            fontWeight: '500',
                            bgcolor: '#f0f9ff'
                        },
                        '&: hover': {
                            color: '#31b5ee',
                        }
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#31b5ee',
                        width: 4,
                    }
                }}
            >
                {
                    tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            icon={tab.icon}
                            iconPosition='start'
                        />
                    ))
                }
            </Tabs>
        </Box>
    )
}

export default TabContainer