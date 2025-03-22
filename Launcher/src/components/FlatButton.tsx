import Box from "@mui/material/Box/Box";
import { forwardRef } from "react";
import { Fragment } from "react/jsx-runtime";
interface ComponentProps{
    background_normal?:string;
    background_hover?:string;
    text_color?:string;
    text:string;
    font_size?:string;
    font_bold?:boolean;
    width:string;
    height:string;
    id?:string;
    onClick?:(name:string | undefined)=>void;
}
const FlatButton = forwardRef(({
    background_normal,
    background_hover,
    text_color,
    text,
    font_size,
    font_bold,
    width,
    height,
    id,
    onClick
  }: ComponentProps,_) => {
    
    return(
        <Fragment >
            <Box
                className={`
                    group
                    active:scale-[98%] m-0 p-0 border-0
                    ${width} ${height} ${background_normal}
                    ${background_hover ? `${background_hover}` : ''}
                `}
                onClick={() => onClick?.(id)}
                >
            <span className={`${font_bold==true?"font-bold":""} ${text_color} ${font_size==""?"text-lg":font_size} flex items-center justify-center group-hover:brightness-150 group-active:brightness-200  w-[100%] h-[100%]`}>
            {text}
            </span>
            </Box>
        </Fragment >
        );
});
export default FlatButton;