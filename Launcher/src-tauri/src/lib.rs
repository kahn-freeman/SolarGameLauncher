use config::Config;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod config;
#[tauri::command]
fn get_env(keyname: &str) -> String {
    if let Some(value)=Config::instance().get_config().get_value(keyname){
        return value;
    }
    return "".to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Config::instance().load_config("./config.toml").unwrap();
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .setup(|_app| Ok(()))
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_env])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
