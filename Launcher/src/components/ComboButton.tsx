import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button, MenuItem, Tooltip } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import * as React from 'react';
import { forwardRef } from "react";
import { Fragment } from "react/jsx-runtime";

interface ComponentProps {
    tooltip?:string;
    font_size?: string;

    width: string;
    height?: string;

    onItemSelect?: (index: number,key:string) => void;
    selected?:number;
    options: string[];
}

type RefType = HTMLButtonElement;

const ComboButton = React.memo(
  forwardRef<RefType, ComponentProps>(
    (
      {
        selected=0,
        tooltip,
        font_size = "14px",

        width,
        height = "32px",

        onItemSelect,
        options,
      },
      _
    ) => {

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(selected);

    const handleMenuItemClick = (_event: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number,key:string) => {
        setSelectedIndex(index);
        setOpen(false);
        onItemSelect?.(index,key);
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

    React.useEffect(()=>{
        setSelectedIndex(selected);
    },[selected])
    return (
        <Fragment >
            <ButtonGroup variant="contained" ref={anchorRef}  >
            
                    <Button sx={{ width: width,height:height, cursor: 'not-allowed', pointerEvents: 'none',opacity:0.85 }} size="small" >{options[selectedIndex]}</Button>
                   <Tooltip title={tooltip} arrow placement="right" >
                        <Button sx={{height:height}} size="small" aria-controls={open ? 'split-button-menu' : undefined} aria-expanded={open ? 'true' : undefined} aria-haspopup="menu" onClick={handleToggle}>
                            <ArrowDropDownIcon />
                        </Button>
                    </Tooltip>
            </ButtonGroup>
            <Popper sx={{ zIndex: 1}}  open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal 
            modifiers={[
            {
                name: 'offset',
                options: {
                offset: [-22, 0], // [水平偏移, 垂直偏移]
                },
            }
            ]}>
                {({ TransitionProps, placement }) => (
                    <Grow 
                        {...TransitionProps}
                        style={{
                            
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper sx={{width:width,minWidth: width }} >
                            <ClickAwayListener onClickAway={handleClose} >
                                <MenuList id="split-button-menu" autoFocusItem >
                                    {options.map((option, index) => (
                                        <MenuItem

                                            sx={{fontSize:font_size}}
                                            key={option}
                                            //disabled={index === 2}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index,option)}
                                        >
                                      {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}

            </Popper>
        </Fragment >
    );
}));
export default ComboButton;