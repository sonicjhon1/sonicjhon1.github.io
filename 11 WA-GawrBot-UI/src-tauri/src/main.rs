// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
  api::process::{Command}
};

fn main() {
  tauri::Builder::default()
    .setup(|_| {
      tauri::async_runtime::spawn(async move {
        Command::new_sidecar("caxaDist")
          .expect("failed to setup `caxaDist` sidecar")
          .spawn()
          .expect("Failed to spawn sidecar");
      });
      
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
