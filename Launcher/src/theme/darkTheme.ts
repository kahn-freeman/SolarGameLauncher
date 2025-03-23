// src/theme/darkTheme.ts
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // 核心设置，启用暗黑模式
    primary: {
      main: '#dedede', // 自定义主色
    },
    secondary: {
      main: '#222244', // 自定义次级色
    },
    background: {
      default: '#222244', // 深色背景
      paper: '#1e1e1e',   // 组件背景
    },
    text: {
      primary: '#ffffff', // 主文本色
      secondary: '#b3b3b3', // 次级文本
      
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButtonBase: {
        defaultProps: {
          disableRipple: true, // 同时禁用基础组件
        },
      },
    MuiButton: {
      styleOverrides: {
        root: {
            '& .MuiTouchRipple-root': {
                opacity: '0 !important', // 视觉层隐藏
                animation: 'none !important',
              },
          borderRadius: 0,
          transition: 'none !important',
          '&:hover': {
            transition: 'none !important',
            color: 'white',
            backgroundColor: '#aeaeae',
          },
          '&:active': {
            backgroundColor: '#9e9e9e',
            color: 'white',
            transition: 'none !important',
            transform: 'scale(0.98) !important',
            
          },
          '&:focus': {
            transition: 'none !important'
          },
          
        },

      },
      defaultProps: {
        disableRipple: true // 同时关闭涟漪效果
      }
    }
  }
});

export default darkTheme;