import { Button, Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import ComboButton from '../components/ComboButton';
import FlatButton from '../components/FlatButton';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function SettingsFrame() {
  const [value, setValue] = React.useState(0);

  const { t,i18n } = useTranslation();
  const langes=[
    "en",
    "zh",
    "ja",
  ]
  const options = [    t("languages.english"),
    t("languages.chinese"),
    t("languages.japanese"),];

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
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
                          options:[t("settings.display_mode.options.0"),t("settings.display_mode.options.1"),t("settings.display_mode.options.2")]
                        },{
                          desc:t("settings.resolution.desc"),
                          options:[t("settings.resolution.options.0"),t("settings.resolution.options.1"),t("settings.resolution.options.2")]
                        },
                        {
                          desc:t("settings.intro_video.desc"),
                          options:[t("settings.intro_video.options.0"),t("settings.intro_video.options.1")]
                        },
                        {
                          desc:t("settings.quality.desc"),
                          options:[t("settings.quality.options.0"),t("settings.quality.options.1"),t("settings.quality.options.2"),t("settings.quality.options.3")]
                        }]
  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleChangeLangClick = (index: number, key:string):void => {
    setSelectedIndex(index);
    setOpen(false);
    i18n.changeLanguage(langes[index]);
  };

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

  const handleLeftBarBtn = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className="pl-10 pt-10 pb-10 pr-10 bg-[#000000DD]">
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
            <TabPanel value={value} index={0} >
              {/** */}
              {/**    <Grid container spacing={0} direction={"row"} className="w-[100%] h-[100%]">
          <Grid size={2} className="bg-red-50"></Grid>
          <Grid size={10}>*/}
              <Grid container spacing={2} direction={"column"} className="w-[100%] h-[100%] justify-center items-center">
                <Grid size={12}>
                  <ComboButton width={'236px'}  options={[ t("languages.english"),t("languages.chinese"),t("languages.japanese")]} onItemSelect={(index:number,key:string)=>{handleChangeLangClick(index,key)}}></ComboButton>
                </Grid>

                <Grid size={12}>
                  {/**sx={{borderRadius:0,":active":{backgroundColor: '#22225e',color:'white'},transition: 'none !important',}} */}
                      <FormControlLabel className="w-[275px]" control={<Checkbox defaultChecked size="small" />} label={t("settings.clean_temporary_folder")} />
                </Grid>
                {GenerateButtons.map((item,index)=>(
                  <Grid size={12}>
                        <Tooltip title={item.desc} arrow placement="left" key={item.text} >
                          <Button variant="contained" className="w-[280px]" size="small">{item.text}</Button>
                        </Tooltip>
                  </Grid>
                ))}
                

              </Grid>
              {/* </Grid>
        </Grid>*/}

            </TabPanel>



            {/** Tab 2 */}
            <TabPanel value={value} index={1}>
 {/** */}
              {/**    <Grid container spacing={0} direction={"row"} className="w-[100%] h-[100%]">
          <Grid size={2} className="bg-red-50"></Grid>
          <Grid size={10}>*/}
              <Grid container spacing={2} direction={"column"} className="w-[100%] h-[100%] justify-center items-center">
                {GraphicButtons.map((item,index)=>(
                  <Grid size={12}>
                    
                      <ComboButton width={'236px'}  options={item.options} tooltip={item.desc} onItemSelect={(index:number,key:string)=>{handleChangeLangClick(index,key)}}></ComboButton>
                      
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
                <FlatButton text={t("cancel")} font_size='text-[13px]' width={'w-[100%]'} height={'h-[32px]'} background_normal='bg-gray-800' background_hover='hover:bg-gray-700'></FlatButton>
              </Grid>
              <Grid size={6}>
                <FlatButton text={t("apply")} font_size='text-[13px]' width={'w-[100%]'} height={'h-[32px]'} background_normal='bg-red-800' background_hover='hover:bg-red-700'></FlatButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
