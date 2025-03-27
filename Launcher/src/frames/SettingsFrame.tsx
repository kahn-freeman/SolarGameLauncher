import { Button, Checkbox, FormControlLabel, FormHelperText, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import ComboButton from '../components/ComboButton';
import FlatButton from '../components/FlatButton';
import { RustAPI } from '../libs/RustAPI';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      // 保持组件挂载，用 CSS 隐藏
      style={{
        display: value === index ? 'block' : 'none',
        width: '100%',
        height: '100%'
      }}
      className="bg-[#222222]"
      {...other}
    >
      <Box sx={{ p: 3 }} className="w-[100%] h-[100%]">
        {children} {/* 始终渲染子组件 */}
      </Box>
    </div>
  );
}
/*
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div className="bg-[#222222] w-[100%] h-[100%]"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} className="w-[100%] h-[100%]">
          {children}
        </Box>
      )}
    </div>
  );
}
*/
function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
interface ComponentProps{
  show:boolean;
  onClose?:()=>void;
}
const SettingsFrame = React.memo( React.forwardRef(({show=false,onClose}:ComponentProps,_) => {
  const [showFrame, setShowFrame] = React.useState(true);
  const [is_clean_temporary_checked,set_clean_temporary_checked]=React.useState(true);
  const [resolution, setResolution] = React.useState<string[]>([""]);
  /* 
  const [displaymode, setDisplaymode] = React.useState<string[]>([""]);
  const [quality, setQuality] = React.useState<string[]>([""]);
  const [introvideo, setIntrovideo] = React.useState<string[]>([""]);
*/
const [displaymode_sel, setDisplaymode_sel] = React.useState(0);
const [quality_sel, setQuality_sel] = React.useState(0);
const [resolution_sel, setResolution_sel] = React.useState(0);
const [introvideo_sel, setIntrovideo_sel] = React.useState(0);
  const setIsCleanTemporaryChecked=async (e:boolean)=>{
    await RustAPI.SetConfigBool("settings.generate.clean_temporary",e);
    set_clean_temporary_checked(e);
  }
  const [value, setValue] = React.useState(0);

  const { t,i18n } = useTranslation();
  const langes=["en","zh","ja",];
  //const options = [t("languages.english"),t("languages.chinese"),t("languages.japanese"),];

  const [_open, setOpen] = React.useState(false);
  //const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const GenerateButtons=[{
                          desc:t("settings.repair_desc"),
                          text:t("settings.repair")
                        },{
                          desc:t("settings.reinstall_desc"),
                          text:t("settings.reinstall")
                        },{
                          desc:t("settings.game_folder_desc"),
                          text:t("settings.game_folder")
                        },{
                          desc:t("settings.launcher_logs_desc"),
                          text:t("settings.launcher_logs")
                        },{
                          desc:t("settings.game_logs_desc"),
                          text:t("settings.game_logs")
                        }];
  
  const GraphicButtons=[{
                          desc:t("settings.display_mode.desc"),
                          options:[t("settings.display_mode.options.0"),t("settings.display_mode.options.1"),t("settings.display_mode.options.2")],
                          selected:displaymode_sel,
                          onSelected:async (index:number)=>{
                            setDisplaymode_sel(index);
                            await RustAPI.SetConfigInt("settings.graphic.displaymode_sel",index)
                          }
                        },{
                          desc:t("settings.resolution.desc"),
                          options:resolution,
                          selected:resolution_sel,
                          onSelected:async (index:number)=>{
                            setResolution_sel(index);
                            await RustAPI.SetConfigInt("settings.graphic.resolution_sel",index)
                          }
                        },
                        {
                          desc:t("settings.intro_video.desc"),
                          options:[t("settings.intro_video.options.0"),t("settings.intro_video.options.1")],
                          selected:introvideo_sel,
                          onSelected:async (index:number)=>{
                            setIntrovideo_sel(index);
                            await RustAPI.SetConfigInt("settings.graphic.introvideo_sel",index)
                          }
                        },
                        {
                          desc:t("settings.quality.desc"),
                          options:[t("settings.quality.options.0"),t("settings.quality.options.1"),t("settings.quality.options.2"),t("settings.quality.options.3"),t("settings.quality.options.4")],
                          selected:quality_sel,
                          onSelected:async (index:number)=>{
                            setQuality_sel(index);
                            await RustAPI.SetConfigInt("settings.graphic.quality_sel",index)
                          }
                        }]

 // const [currentLang,setCurrLang]=React.useState(0);
 React.useEffect(() => {
  
  const fetchLanguage = async () => {

    try {
/*
      let _displaymode = await RustAPI.GetConfigArray("settings.graphic.displaymode");
      setDisplaymode(_displaymode as Array<string>);
      
      let _quality = await RustAPI.GetConfigArray("settings.graphic.quality");
      setQuality(_quality as Array<string>);
      
      let _introvideo = await RustAPI.GetConfigArray("settings.graphic.introvideo");
      setIntrovideo(_introvideo as Array<string>);
      */
      let _sel_index = await RustAPI.GetConfigInt("settings.graphic.displaymode_sel");
      setDisplaymode_sel(_sel_index);
      _sel_index = await RustAPI.GetConfigInt("settings.graphic.quality_sel");
      setQuality_sel(_sel_index);
      _sel_index = await RustAPI.GetConfigInt("settings.graphic.resolution_sel");
      setResolution_sel(_sel_index);
      _sel_index = await RustAPI.GetConfigInt("settings.graphic.introvideo_sel");
      setIntrovideo_sel(_sel_index);
      


      let _resolution = await RustAPI.GetConfigArray("settings.graphic.resolution");
      setResolution(_resolution as Array<string>);
      let valuei = await RustAPI.GetConfigInt("settings.generate.language");
      console.log('Failed to fetch language1:', valuei);
      //handleChangeLangClick(value,"");   // 额外的状态更新
      i18n.changeLanguage(langes[valuei]);
      setSelectedIndex(valuei);
      
      let valueb = await RustAPI.GetConfigBool("settings.generate.clean_temporary");
      console.log("clean_temporary:",valueb);
      set_clean_temporary_checked(valueb);
    } catch (error) {
      console.error('Failed to fetch language2:', error);
    }
  };
  fetchLanguage();
}, []); // 如果key是props/state需要加入依赖项


  React.useEffect(()=>{
    setShowFrame(show);
  },[show]);

  const handleChangeLangClick = async (index: number, _key:string):Promise<void> => {
    setSelectedIndex(index);
    setOpen(false);
    await RustAPI.SetConfigInt("settings.generate.language",index)
    i18n.changeLanguage(langes[index]);
  };
/*
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };
*/
  const handleLeftBarBtn = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const onCancelClick=()=>{

    onClose?.();
    setShowFrame(false);
  };
  const onApplyClick=async ()=>{
    await RustAPI.SaveConfig();
  };
  return (
    <Box className="pl-10 pt-10 pb-10 pr-10 bg-[#000000DD]" style={{ display: showFrame ? 'block' : 'none' }} >
      <Grid container className="w-[100%] h-[100%]" direction={"column"} spacing={0} >
        <Grid size={12} className="w-[100%]">
          <Box className="w-[100%] h-8 bg-gray-800 flex justify-center items-center opacity-95">
            <span className="flex justify-center items-center font-bold text-sm select-none">{t("settings.settings")}</span>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box sx={{ flexGrow: 1, display: 'flex' }} className="w-[100%] h-[456px] bg-black">

            <Tabs
              orientation="vertical"

              //variant="scrollable"

              value={value}
              onChange={handleLeftBarBtn}

              sx={{ borderRight: 0, borderColor: 'divider', paddingBottom: 1, paddingLeft: 1 }}
            >
              <Tab label={t("settings.generate")} disableRipple {...a11yProps(0)} sx={{
                color: '#aeaeae', minHeight: "32px", minWidth: "120px",
                '&.Mui-selected': {
                  backgroundColor: '#222222',
                  color: 'white'
                }
              }} />
              <Tab label={t("settings.graphic")} disableRipple {...a11yProps(1)} sx={{
                color: '#aeaeae', minHeight: "32px", minWidth: "120px",
                '&.Mui-selected': {
                  backgroundColor: '#222222',
                  color: 'white'
                }
              }} />

            </Tabs>

             {/** Tab 1 */}
            <TabPanel value={value} index={0} key="tab-0">
              {/** */}
              {/**    <Grid container spacing={0} direction={"row"} className="w-[100%] h-[100%]">
          <Grid size={2} className="bg-red-50"></Grid>
          <Grid size={10}>*/}
              <Grid container spacing={2} direction={"column"} className="w-[100%] h-[100%] justify-center items-center">
                <Grid size={12}>
                  <ComboButton width={'236px'}  options={[ t("languages.english"),t("languages.chinese"),t("languages.japanese")]} selected={selectedIndex} onItemSelect={(index:number,key:string)=>{handleChangeLangClick(index,key)}}></ComboButton>
                </Grid>

                <Grid size={12}>
                  {/**sx={{borderRadius:0,":active":{backgroundColor: '#22225e',color:'white'},transition: 'none !important',}} */}
                      <FormControlLabel  sx={{width:275,cursor:"default"}} control={<Checkbox checked={is_clean_temporary_checked} size="small" onChange={(e) => setIsCleanTemporaryChecked(e.target.checked)}/>} label={t("settings.clean_temporary_folder")}  />
                </Grid>
                {GenerateButtons.map((item,_index)=>(
                  <Grid size={12} key={item.text}>
                        <Tooltip title={item.desc} arrow placement="left"  >
                          <Button variant="contained" className="w-[280px]" size="small">{item.text}</Button>
                        </Tooltip>
                  </Grid>
                ))}
                

              </Grid>
              {/* </Grid>
        </Grid>*/}

            </TabPanel>



            {/** Tab 2 */}
            <TabPanel value={value} index={1} key="tab-1">
 {/** */}
              {/**    <Grid container spacing={0} direction={"row"} className="w-[100%] h-[100%]">
          <Grid size={2} className="bg-red-50"></Grid>
          <Grid size={10}>*/}
              <Grid container spacing={2} direction={"column"} className="w-[100%] h-[100%] justify-center items-center">
                {GraphicButtons.map((item,_index)=>(
                  <Grid size={12} key={item.desc}>
                    <Grid container spacing={4} >
                      <Grid size={4} className="flex justify-end items-center">
                        <FormHelperText id="component-helper-text">{item.desc}</FormHelperText>
                      </Grid>
                      <Grid size={8} className="flex justify-start items-center">
                      <ComboButton width={'265px'}  options={item.options} selected={item.selected} onItemSelect={(index:number,_key:string)=>{item.onSelected(index)}}></ComboButton>
                      </Grid>
                      </Grid>
                      
                  </Grid>
                ))}
               


              </Grid>
              {/* </Grid>
        </Grid>*/}

            </TabPanel>


          </Box>
        </Grid>
        <Grid size={12}>
          <Box className="w-[100%] h-8 bg-gray-800 opacity-95">
            <Grid container spacing={0} >
              <Grid size={6}>
                <FlatButton text={t("cancel")} font_size='text-[13px]' width={'w-[100%]'} height={'h-[32px]'} background_normal='bg-gray-800' background_hover='hover:bg-gray-700' onClick={()=>{onCancelClick()}}></FlatButton>
              </Grid>
              <Grid size={6}>
                <FlatButton text={t("apply")} font_size='text-[13px]' width={'w-[100%]'} height={'h-[32px]'} background_normal='bg-red-800' background_hover='hover:bg-red-700' onClick={()=>{onApplyClick()}}></FlatButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}));

export default SettingsFrame;