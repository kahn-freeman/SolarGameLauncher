// The updated Grid component is named Grid2


import { ThemeProvider } from "@emotion/react";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from 'react-i18next';
import App from "./App";
import i18n from './i18n/i18n';
import darkTheme from './theme/darkTheme';

/*
const darkTheme = createTheme({
  palette: {
    mode: "dark"
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          transition: 'none !important',
          '&:hover': {
            transition: 'none !important',
            backgroundColor: 'inherit' // 保持悬停时背景不变
          },
          '&:active': {
            backgroundColor: '#22225e',
            color: 'white',
            transition: 'none !important'
          },
          '&:focus': {
            transition: 'none !important'
          }
        }
      },
      defaultProps: {
        disableRipple: true // 同时关闭涟漪效果
      }
    }
  }
});
*/

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>


    <I18nextProvider i18n={i18n}>
    <Suspense fallback={<div>Loading...</div>}>
    <ThemeProvider theme={darkTheme}>
        <App />
    </ThemeProvider>
        </Suspense>
    </I18nextProvider> 

  </React.StrictMode>
);
