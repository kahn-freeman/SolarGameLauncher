import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, IconButton, Slider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import * as React from 'react';
//import { useTranslation } from 'react-i18next';
function SampleNextArrow(props: any) {
  const { onClick } = props;
  return (
    <IconButton onClick={onClick} sx={{ position: 'absolute', right: 20, top: '50%', zIndex: 1 }}>
      <ArrowForward />
    </IconButton>
  );
}

function SamplePrevArrow(props: any) {
  const { onClick } = props;
  return (
    <IconButton onClick={onClick} sx={{ position: 'absolute', left: 20, top: '50%', zIndex: 1 }}>
      <ArrowBack />
    </IconButton>
  );
}

interface ComponentProps {
  className?: string;
}
const MainFrame = React.memo(React.forwardRef(({ className }: ComponentProps, _) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  //const { t,i18n } = useTranslation();

  return (
    <React.Fragment>
      <Grid container direction={"row"} className={className}>
        <Grid size={12}>
          <Box sx={{ maxWidth: 800, margin: 'auto' }}>
            <Slider {...settings}>
              <Box height={300} bgcolor="primary.main" color="white" display="flex" alignItems="center" justifyContent="center">
                Slide 1
              </Box>
              <Box height={300} bgcolor="secondary.main" color="white" display="flex" alignItems="center" justifyContent="center">
                Slide 2
              </Box>
            </Slider>
          </Box>
        </Grid>
        <Grid size={12}>sdfsfsdfsd</Grid>
        <Grid size={12}>sdfsdfsdf</Grid>
      </Grid>
    </React.Fragment>

  );
}));

export default MainFrame;