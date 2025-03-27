
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use std::{path::Path, sync::{Arc, Mutex, RwLock}, thread};

use lazy_static::lazy_static;
use serde_json::{json, Map, Number};
mod config;
const G_CONFIG_FILE:&str="./config.json";
lazy_static! {
    static ref  G_CONFIG: Arc<Mutex<config::Config>> = {
        Arc::new(Mutex::new(config::Config::load(&Path::new(G_CONFIG_FILE)).unwrap()))
    };
}

#[tauri::command]
fn get_cfg_str(key_path: &str) -> String {
    let cfg =G_CONFIG.lock().unwrap();
    if let Some(value) = cfg.get(key_path){
        return value.to_string();
    }
   "".to_string()
}
#[tauri::command]
fn get_cfg_int(key_path: &str) -> i64 {
    let cfg =G_CONFIG.lock().unwrap();
    if let Some(value) = cfg.get(key_path){
        if value.is_number(){
            return value.as_i64().unwrap();
        }
    }
   0
}
#[tauri::command]
fn get_cfg_bool(key_path: &str) -> bool {
    let cfg =G_CONFIG.lock().unwrap();
    if let Some(value) = cfg.get(key_path){
        if value.is_boolean(){
            return value.as_bool().unwrap();
        }
    }
   false
}
#[tauri::command]
fn get_cfg_array(key_path: &str) -> serde_json::Value {
    use serde_json::{Value, json};
    
    let cfg = G_CONFIG.lock().unwrap();
    
    cfg.get(key_path)
        .and_then(|v| v.as_array())
        .map(|arr| Value::Array(arr.clone()))
        .unwrap_or_else(|| json!([]))  // 返回JSON空数组
}
#[tauri::command]
fn get_cfg_table(key_path: &str) -> serde_json::Map<String, serde_json::Value> {

    let cfg = G_CONFIG.lock().unwrap();
    cfg.get(key_path)
        .and_then(|v| v.as_object())    // 确保是对象类型
        .map(|obj| obj.clone())         // 克隆Map数据
        .unwrap_or_else(Map::new)      // 返回空对象
}
#[tauri::command]
fn set_cfg_str(key_path: &str,value:&str)->bool {

    let c_value = serde_json::Value::String(value.to_string());
    let mut cfg = G_CONFIG.lock().unwrap();
    cfg.set(key_path,c_value).unwrap();
  
    match cfg.save(Path::new(G_CONFIG_FILE)) {
        Ok(_) => println!("保存成功1"),
        Err(e) => eprintln!("保存失败1: {}", e),
    }
    return true;
}
#[tauri::command]
fn set_cfg_int(key_path: &str, value:i32) -> bool {
    // 创建线程安全的克隆
    let key_path = key_path.to_string();
    

        // 获取锁并处理可能的污染
        let mut cfg = match G_CONFIG.lock() {
            Ok(guard) => guard,
            Err(poisoned) => {
                eprintln!("锁污染，使用恢复数据");
                poisoned.into_inner()
            }
        };

        // 更新配置值
        if let Err(e) = cfg.set(&key_path, serde_json::Value::Number(value.into())) {
            eprintln!("配置更新失败: {}", e);
            return false;
        }

       true

}
#[tauri::command]
fn set_cfg_bool(key_path: &str, value: bool) -> bool {
    // 创建线程安全的克隆
    let key_path = key_path.to_string();
        // 获取锁并处理可能的污染
        let mut cfg = match G_CONFIG.lock() {
            Ok(guard) => guard,
            Err(poisoned) => {
                eprintln!("锁污染，使用恢复数据");
                poisoned.into_inner()
            }
        };

        // 更新配置值
        if let Err(e) = cfg.set(&key_path, serde_json::Value::Bool(value)) {
            eprintln!("配置更新失败: {}", e);
            return false;
        }

       true

}
#[tauri::command]
fn save_cfg() -> bool {
        // 获取锁并处理可能的污染
        let  cfg = match G_CONFIG.lock() {
            Ok(guard) => guard,
            Err(poisoned) => {
                eprintln!("锁污染，使用恢复数据");
                poisoned.into_inner()
            }
        };

        // 保存到文件
        return match cfg.save(Path::new(G_CONFIG_FILE)) {
            Ok(_) => true,
            Err(e) => {
                eprintln!("文件保存失败: {}", e);
                false
            }
        }
}
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {

    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .setup(|_| Ok(()))
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
                                                get_cfg_str,
                                                get_cfg_int,
                                                get_cfg_table,
                                                get_cfg_array,
                                                get_cfg_bool,

                                                set_cfg_int,
                                                set_cfg_str,
                                                set_cfg_bool,

                                                save_cfg
                                                ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
