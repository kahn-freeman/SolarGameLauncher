// The updated Grid component is named Grid2


import { ThemeProvider } from "@emotion/react";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from 'react-i18next';
import App from "./App";
import i18n from './i18n/i18n';
import darkTheme from './theme/darkTheme';


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
 // <React.StrictMode>


    <I18nextProvider i18n={i18n}>
    <Suspense fallback={<div>Loading...</div>}>
    <ThemeProvider theme={darkTheme}>
        <App />
    </ThemeProvider>
        </Suspense>
    </I18nextProvider> 

  //</React.StrictMode>
);
