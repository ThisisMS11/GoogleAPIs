'use client';
import { ThemeProvider, createTheme } from '../imports/MuiImports'
import Head from 'next/head';


const theme = createTheme({
    typography: {
        fontFamily: [
            'Ubuntu',
        ].join(','),
    }
});

const MuiThemeProvider = ({ children }) => {
    return (
        <>

            <ThemeProvider theme={theme}>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link href="https://fonts.googleapis.com/css2?family=Heebo&family=Narnoor&family=Raleway&family=Ubuntu&display=swap" rel="stylesheet" />
                </Head>
                {children}
            </ThemeProvider>
        </>
    )
}

export default MuiThemeProvider
