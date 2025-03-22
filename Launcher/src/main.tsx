import Box from '@mui/material/Box';
// The updated Grid component is named Grid2
import Grid from '@mui/material/Grid2';


import { getCurrentWindow } from '@tauri-apps/api/window';
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from 'react-i18next';
import App from "./App";
import FlatButton from './components/FlatButton';
import i18n from './i18n/i18n';
const appWindow = getCurrentWindow();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div data-tauri-drag-region className="titlebar">

      <Grid container spacing={0} className="w-[100%]">
      <Grid size={1} >
          <FlatButton  text="8:13 UTC" font_bold={false} font_size='text-[14px]' height='h-[100%]' width='w-[100%]' text_color='text-gray-400'/>
        </Grid>
        <Grid size={1} >
          <FlatButton background_hover={"hover:bg-red-500"} text="FORUM" font_bold={true} font_size='text-xg' height='h-[100%]' width='w-[100%]' text_color='text-gray-400'/>
        </Grid>
        <Grid size={1} >
          <FlatButton background_hover='hover:bg-red-500' text="NEWS" font_bold={true} font_size='text-xg' height='h-[100%]' width='w-[100%]' text_color='text-gray-400'/>
        </Grid>
        <Grid size={1}>
          <FlatButton background_hover='hover:bg-red-500' text="SHOP" font_bold={true} font_size='text-xg' height='h-[100%]' width='w-[100%]' text_color='text-gray-400'/>
        </Grid>
        <Grid size={7}  >
         <Box data-tauri-drag-region className=" w-[100%] h-[100%]  select-none" />
        </Grid>
        <Grid size={1} className="flex justify-center items-end">

          <Grid container spacing={0} className="flex justify-center items-center w-[100%] h-[100%]" >
          <Grid size={4}  >
              
            </Grid>
          <Grid size={4}>
              <FlatButton  text="-" font_bold={false} font_size='text-[24px]' height='h-[100%]' width='w-[100%]' text_color='text-gray-400'/>
            </Grid>


            <Grid size={4}>
              {/*
              <div className="titlebar-button" onClick={() => {appWindow.close(); }}>
                X
              </div>
              */}
              <FlatButton   text="X" font_bold={false} font_size='text-[16px]' height='h-[100%]' width='w-[100%]' text_color='text-gray-400' onClick={() => {appWindow.close(); }}/>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </div>

    <I18nextProvider i18n={i18n}>
    <Suspense fallback={<div>Loading...</div>}>
        <App />
        </Suspense>
    </I18nextProvider> 

  </React.StrictMode>
);
