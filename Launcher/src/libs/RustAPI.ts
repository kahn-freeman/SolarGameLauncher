import { invoke } from '@tauri-apps/api/core';
export class RustAPI{

    public static async GetConfigString(keyPath:string):Promise<string>{
        return await invoke("get_cfg_str",{keyPath:keyPath});
    }
    public static async GetConfigBool(keyPath:string):Promise<boolean>{
        return await invoke("get_cfg_bool",{keyPath:keyPath});
    }
    public static async GetConfigInt(keyPath:string):Promise<number>{
        return await invoke("get_cfg_int",{keyPath:keyPath});
    }
    public static async GetConfigTable(keyPath:string):Promise<{ [key: string]: number }>{
        return await invoke("get_cfg_table",{keyPath:keyPath});
    }
    public static async GetConfigArray(keyPath:string):Promise<[]>{
        return await invoke("get_cfg_array",{keyPath:keyPath});
    }
    public static async SetConfigInt(keyPath:string,value:number):Promise<boolean>{
        return await invoke("set_cfg_int",{keyPath:keyPath,value:value});
    }
    public static async SetConfigString(keyPath:string,value:string):Promise<boolean>{
        return await invoke("set_cfg_str",{keyPath:keyPath,value:value});
    }
    public static async SetConfigBool(keyPath:string,value:boolean):Promise<boolean>{
        return await invoke("set_cfg_bool",{keyPath:keyPath,value:value});
    }
    public static async SaveConfig():Promise<boolean>{
        return await invoke("save_cfg",{});
    }
};
