import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { createTheme, alpha, getContrastRatio, ThemeProvider } from '@mui/material/styles'

export function Loading() {
    const theme = createTheme({
        palette: {
            loader: {
                main: '#ff385c'
            }
        }
    })
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ThemeProvider theme={theme}>
                <CircularProgress color= 'loader'/>
            </ThemeProvider>
        </Box>
    );
}


