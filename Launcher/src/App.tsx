import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Grid from '@mui/material/Grid2';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { register, unregisterAll } from '@tauri-apps/plugin-global-shortcut';
import { useTranslation } from 'react-i18next';
import "./App.css";
import ShapeButton from './components/ShapeButton';
import "./configure.css";
function App() {
 const { t ,i18n} = useTranslation();
/*
  useEffect(() => {
    // ✅ 组件挂载时预加载
    i18n.loadNamespaces(['translation']).then(() => {
      i18n.changeLanguage('en');
    });
  }, []);*/
  const changeLanguage = (lng:string) => {
    i18n.changeLanguage(lng);
  };



  let bankeys=['CommandOrControl+Shift+J','CommandOrControl+Shift+I','CommandOrControl+U','CommandOrControl+J','CommandOrControl+P','CommandOrControl+F','CommandOrControl+G'];
  let bankeys_js=[ 114,116,118];//123=f12,114=f3,116=f5,118=f7
 
  //import i18n from './i18n/i18n';
  // when using `"withGlobalTauri": true`, you may use
  //const { getCurrentWindow } = window.__TAURI__.window;
  
  const appWindow = getCurrentWindow();
  

  async function reghotkeys(){
    for(let i in bankeys){
      try{
      await register(bankeys[i], (_event) => {console.log(_event)});//console.log(`Shortcut ${shortcut} triggered`);		
      }catch{
        
      }
    }
  }

  
  window.onkeydown = function (e) {
    console.log(e);
    var keyCode = e.keyCode || e.which || e.charCode;
    if(e["ctrlKey"]==true && (e.key=='j' || e.key=='J')){
      e.preventDefault();
    }
    if(e["ctrlKey"]==true && (e.key=='p' || e.key=='P')){
      e.preventDefault();
    }
    if(e["ctrlKey"]==true && (e.key=='u' || e.key=='U')){
      e.preventDefault();
    }
    if(e["ctrlKey"]==true && (e.key=='f' || e.key=='F')){
      e.preventDefault();
    }
    if(e["ctrlKey"]==true && (e.key=='g' || e.key=='G')){
      e.preventDefault();
    }
    if((e["ctrlKey"]==true && e["shiftKey"]==true) && (e.key==='i' || e.key==='I')){
      e.preventDefault();
    }
    if(e["shiftKey"]==true && (e.key=='i' || e.key=='I')){
      e.preventDefault();
    }
    if((e["ctrlKey"]==true && e["shiftKey"]==true) && (e.key=='j' || e.key=='J')){
      e.preventDefault();
    }
    if (bankeys_js.indexOf(keyCode) > -1) {
      e.preventDefault();
    }
  }
  
  async function unreghotkeys(){
    await unregisterAll();
  }
  

  
  i18n.changeLanguage('en');

	appWindow.onFocusChanged(({ payload: focused }) => {
			if(focused){
				reghotkeys();
			}else{
				unreghotkeys();
			}
		});

  
  appWindow.show();
  reghotkeys();
  return (
    <main className="container">

      {/*<Button  variant="contained">Hello world</Button>*/}
      <Grid container className={`w-[1020px] h-[600px] bg-[url(/images/background2.jpg)] bg-cover bg-center`}>
        <Grid size={1} className="w-[100%] h-[100%] bg-gray-950 opacity-90">
          <Grid container direction="column" className={`w-[100%] h-[100%] items-center`}>
            <Grid size={4} className={"pb-[380px]"}></Grid>

            <Grid size={4} className="pb-[16px]">
              <ShapeButton icon="/icons/button/barbute.png" font_size='text-[12px]' text={t('settings.account')} width="36px" height="36px"/>
            </Grid>

            <Grid size={2}  className="pb-[16px]">
              <ShapeButton icon="/icons/button/halt.png" font_size='text-[12px]' text={t('settings.support')} width="36px" height="36px"/>
            </Grid>
            <Grid size={2}>
              <ShapeButton icon="/icons/button/cog.png"  font_size='text-[12px]' text={t('settings.settings')} width="36px" height="36px"/>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid size={11} className="w-[100%]"/>
      </Grid>
    </main>
  );
}

export default App;
