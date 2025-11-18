import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";

export const NavigationToolbar: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <Box className={'container'}>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <Typography
                        variant="h6"
                        color="inherit"
                        component="div"
                        onClick={() => navigate('/images')}
                        style={{ cursor: 'pointer' }}
                    >
                        Photo Browser
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}