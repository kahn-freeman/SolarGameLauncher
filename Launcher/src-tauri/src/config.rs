use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;
use std::sync::{Arc,  Mutex};
use lazy_static::lazy_static;
#[derive(Deserialize, Debug,Clone,Serialize)]
pub struct _Config {
    pub forum_url: String,
    pub shop_url: String,
    pub news_url: String,

}

impl _Config {
    /// Load the configuration from a TOML file
    fn from_file_internal<P: AsRef<Path>>(path: P) -> Result<Self, Box<dyn std::error::Error>> {
        let content = fs::read_to_string(path)?;
        let config = toml::from_str(&content)?;
        Ok(config)
    }

    /// Get a configuration value by key
    pub fn get_value(&self, key: &str) -> Option<String> {
        match key {
            "forum_url" => Some(self.forum_url.clone()),
            "shop_url" => Some(self.shop_url.clone()),
            "news_url" => Some(self.news_url.clone()),
            _ => None,
        }
    } 
}

pub struct Config {
    config: Mutex<Option<_Config>>,
}

impl Config {
    fn new() -> Self {
        Self {
            config: Mutex::new(None),
        }
    }

    /// Get the singleton instance of ConfigManager
    pub fn instance() -> &'static Arc<Config> {
        lazy_static! {
            static ref INSTANCE: Arc<Config> = Arc::new(Config::new());
        }
        &INSTANCE
    }

    /// Load configuration from a file into the singleton
    pub fn load_config<P: AsRef<Path>>(&self, path: P) -> Result<(), Box<dyn std::error::Error>> {
        let config = _Config::from_file_internal(path)?;
        let mut config_lock = self.config.lock().unwrap();
        *config_lock = Some(config);
        Ok(())
    }

    /// Get the loaded configuration
    pub fn get_config(&self) -> Arc<_Config> {
        let config_lock = self.config.lock().unwrap();
        Arc::new(config_lock.as_ref().unwrap().clone())
    }
}
