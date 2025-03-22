import Box from "@mui/material/Box/Box";
import { forwardRef } from "react";
import { Fragment } from "react/jsx-runtime";
interface ComponentProps{

    text_color?:string;
    text:string;
    font_size?:string;
    font_bold?:boolean;
    width:string;
    height:string;
    id?:string;
    icon?:string;
    onClick?:(name:string | undefined)=>void;
}
const ShapeButton = forwardRef(({
    icon,
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
              <Box id={id} className={`group w-[100%] h-[100%] flex  justify-center items-center flex-col hover:brightness-150 active:brightness-200 active:scale-95`} onClick={()=>{onClick?.(id)}}>
              <img 
                loading="lazy"
                src={icon} 
                className="object-contain select-none brightness-50 max-w-full max-h-full" // 关键修改
                style={{ 
                minWidth: width, 
                width: width, 
                minHeight: height, 
                height: height 
                }}

            />
                <span className={`select-none brightness-50 whitespace-nowrap flex justify-center items-center ${font_bold==true?"font-bold":""} ${text_color} ${font_size} max-w-full max-h-full`}>{text}</span>
              </Box>
        </Fragment >
        );
});
export default ShapeButton;