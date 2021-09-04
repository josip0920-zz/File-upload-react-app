import React from "react";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import "../assets/scss/index.scss";

const MaterialThemeProvider = ({ children }) => {
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default MaterialThemeProvider;