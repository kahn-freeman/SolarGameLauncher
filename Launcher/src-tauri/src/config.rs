use serde::{Deserialize, Serialize};
use serde_json::{Value, Map};
use std::fs::{self, File};
use std::ops::DerefMut;
use std::path::Path;

#[derive(Deserialize,Serialize,Clone)]
pub struct Config {
    data: Value, // 存储动态 JSON 数据
}

impl Config {
    // 从文件加载配置
    pub fn load(path: &Path) -> Result<Self, Box<dyn std::error::Error>> {
        let file = File::open(path)?;
        let data: Value = serde_json::from_reader(file)?;
        Ok(Config { data })
    }

    // 保存配置到文件
    pub fn save(&self, path: &Path) -> Result<(), Box<dyn std::error::Error>> {

        // 创建父目录（如果不存在）
        if let Some(parent) = path.parent() {
            fs::create_dir_all(parent)?;
        }
        
        let file = File::create(path)?;
        println!("尝试保存配置到: {:?}", path);
        let json = serde_json::to_string_pretty(&self.data)?;
        println!("序列化内容:\n{}", json);
        serde_json::to_writer_pretty(file, &self.data)?;
        println!("序列化内容 22222:\n{}", json);
        Ok(())
    }

    // 获取值（支持点分路径如 "database.host"）
    pub fn get(&self, key: &str) -> Option<&Value> {
        let mut current = &self.data;
        for part in key.split('.') {
            current = match current.get(part) {
                Some(v) => v,
                None => return None,
            };
        }
        Some(current)
    }

    // 设置值（自动创建嵌套结构）
    pub fn set(&mut self, key: &str, value: Value) -> Result<(), String> {
        let parts: Vec<&str> = key.split('.').collect();
        let mut current = &mut self.data;

        // 遍历路径并构建嵌套结构
        for (i, part) in parts.iter().enumerate() {
            if i == parts.len() - 1 {
                // 到达最后一级，直接设置值
                if let Some(obj) = current.as_object_mut() {
                    obj.insert(part.to_string(), value.clone());
                } else {
                    return Err("Cannot set value on non-object".to_string());
                }
            } else {
                // 确保中间路径是对象
                if !current.is_object() {
                    return Err(format!("Path '{}' is not an object", part));
                }

                let obj = current.as_object_mut().unwrap();
                current = obj.entry(part.to_string()).or_insert(Value::Object(Map::new()));
            }
        }
        Ok(())
    }
}
