import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import {
    StyledEngineProvider,
    ThemeProvider,
    createTheme,
} from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";

import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

const theme = createTheme({
    components: {
        MuiPopover: {
            defaultProps: {
                container: rootElement,
            },
        },
        MuiPopper: {
            defaultProps: {
                container: rootElement,
            },
        },
    },
});

root.render(
    <React.StrictMode>
        <RecoilRoot>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </StyledEngineProvider>
        </RecoilRoot>
    </React.StrictMode>
);
