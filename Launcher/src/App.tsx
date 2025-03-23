import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { register, unregisterAll } from '@tauri-apps/plugin-global-shortcut';
import { openUrl } from '@tauri-apps/plugin-opener';
import { useTranslation } from 'react-i18next';
import "./App.css";
import FlatButton from './components/FlatButton';
import ShapeButton from './components/ShapeButton';
import "./configure.css";
import SettingsFrame from './frames/SettingsFrame';
import { RustAPI } from './libs/RustAPI';
function App() {
  const { t, i18n } = useTranslation();

  let bankeys = ['CommandOrControl+Shift+J', 'CommandOrControl+Shift+I', 'CommandOrControl+U', 'CommandOrControl+J', 'CommandOrControl+P', 'CommandOrControl+F', 'CommandOrControl+G'];
  let bankeys_js = [114, 116, 118];//123=f12,114=f3,116=f5,118=f7

  //import i18n from './i18n/i18n';
  // when using `"withGlobalTauri": true`, you may use
  //const { getCurrentWindow } = window.__TAURI__.window;

  const appWindow = getCurrentWindow();


  async function reghotkeys() {
    for (let i in bankeys) {
      try {
        await register(bankeys[i], (_event) => { console.log(_event) });//console.log(`Shortcut ${shortcut} triggered`);		
      } catch {

      }
    }
  }


  window.onkeydown = function (e) {
    console.log(e);
    var keyCode = e.keyCode || e.which || e.charCode;
    if (e["ctrlKey"] == true && (e.key == 'j' || e.key == 'J')) {
      e.preventDefault();
    }
    if (e["ctrlKey"] == true && (e.key == 'p' || e.key == 'P')) {
      e.preventDefault();
    }
    if (e["ctrlKey"] == true && (e.key == 'u' || e.key == 'U')) {
      e.preventDefault();
    }
    if (e["ctrlKey"] == true && (e.key == 'f' || e.key == 'F')) {
      e.preventDefault();
    }
    if (e["ctrlKey"] == true && (e.key == 'g' || e.key == 'G')) {
      e.preventDefault();
    }
    if ((e["ctrlKey"] == true && e["shiftKey"] == true) && (e.key === 'i' || e.key === 'I')) {
      e.preventDefault();
    }
    if (e["shiftKey"] == true && (e.key == 'i' || e.key == 'I')) {
      e.preventDefault();
    }
    if ((e["ctrlKey"] == true && e["shiftKey"] == true) && (e.key == 'j' || e.key == 'J')) {
      e.preventDefault();
    }
    if (bankeys_js.indexOf(keyCode) > -1) {
      e.preventDefault();
    }
  }

  async function unreghotkeys() {
    await unregisterAll();
  }


  appWindow.onFocusChanged(({ payload: focused }) => {
    if (focused) {
      reghotkeys();
    } else {
      unreghotkeys();
    }
  });


  appWindow.show();
  reghotkeys();
  return (
    <main className="container">
      <div data-tauri-drag-region className="titlebar">

        <Grid container spacing={0} className="w-[100%]">
          <Grid size={1} >
            <FlatButton text="8:13 UTC" font_bold={false} font_size='text-[14px]' height='h-[100%]' width='w-[100%]' text_color='text-gray-400' />
          </Grid>
          <Grid size={1} >
            <FlatButton background_hover={"hover:bg-red-500"} text={t("forum")} font_bold={true} font_size='text-xg' height='h-[100%]' width='w-[100%]' text_color='text-gray-400'
              onClick={async () => { await openUrl(await RustAPI.GetEnv("forum_url")) }} />
          </Grid>
          <Grid size={1} >
            <FlatButton background_hover='hover:bg-red-500' text={t("news")} font_bold={true} font_size='text-xg' height='h-[100%]' width='w-[100%]' text_color='text-gray-400'
              onClick={async () => { await openUrl(await RustAPI.GetEnv("news_url")) }} />
          </Grid>
          <Grid size={1}>
            <FlatButton background_hover='hover:bg-red-500' text={t("shop")} font_bold={true} font_size='text-xg' height='h-[100%]' width='w-[100%]' text_color='text-gray-400'
              onClick={async () => { await openUrl(await RustAPI.GetEnv("shop_url")) }} />
          </Grid>
          <Grid size={7}  >
            <Box data-tauri-drag-region className=" w-[100%] h-[100%]  select-none" />
          </Grid>
          <Grid size={1} className="flex justify-center items-end">

            <Grid container spacing={0} className="flex justify-center items-center w-[100%] h-[100%]" >
              <Grid size={4}  >

              </Grid>
              <Grid size={4}>
                <FlatButton text="-" font_bold={false} font_size='text-[24px]' height='h-[100%]' width='w-[100%]' text_color='text-gray-400' />
              </Grid>


              <Grid size={4}>
                {/*
        <div className="titlebar-button" onClick={() => {appWindow.close(); }}>
          X
        </div>
        */}
                <FlatButton text="X" font_bold={false} font_size='text-[16px]' height='h-[100%]' width='w-[100%]' text_color='text-gray-400' onClick={() => { appWindow.close(); }} />
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </div>
      {/*<Button  variant="contained">Hello world</Button>*/}
      <Grid container className={`w-[1020px] h-[600px] bg-[url(/images/background2.jpg)] bg-cover bg-center`}>
        <Grid size={1} className="w-[100%] h-[100%] bg-black opacity-95">
          <Grid container direction="column" className={`w-[100%] h-[100%] items-center`}>
            <Grid size={4} className={"pb-[380px]"}></Grid>

            <Grid size={4} className="pb-[16px]">
              <ShapeButton icon="/icons/button/barbute.png" font_size='text-[12px]' text={t('barbtn.account')} width="36px" height="36px" />
            </Grid>

            <Grid size={2} className="pb-[16px]">
              <ShapeButton icon="/icons/button/halt.png" font_size='text-[12px]' text={t('barbtn.support')} width="36px" height="36px" />
            </Grid>
            <Grid size={2}>
              <ShapeButton icon="/icons/button/cog.png" font_size='text-[12px]' text={t('barbtn.settings')} width="36px" height="36px" />
            </Grid>
          </Grid>
        </Grid>

        <Grid size={11} className="w-[100%] h-[100%]">
          <SettingsFrame></SettingsFrame>
        </Grid>
      </Grid>
    </main>
  );
}

export default App;
