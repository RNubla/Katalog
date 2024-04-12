// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

use tauri::{generate_context, CustomMenuItem, Manager, Menu, Submenu};

fn create_submenu(title: &str, items: Vec<CustomMenuItem>) -> Submenu {
    let mut submenu = Menu::new();
    for item in items {
        submenu = submenu.add_item(item);
    }
    Submenu::new(title, submenu)
}

fn create_main_menu() -> Menu {
    let mut menu = Menu::new();
    #[cfg(target_os = "macos")]
    {
        let about_metadata = AboutMetadata::new().copyright("Alec Carter 2023");

        menu = menu.add_submenu(Submenu::new(
            "VVConvert",
            Menu::new()
                .add_native_item(MenuItem::About("VVConvert".to_string(), about_metadata))
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Services)
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Hide)
                .add_native_item(MenuItem::HideOthers)
                .add_native_item(MenuItem::ShowAll)
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Quit),
        ));
    }

    // Add other menus
    menu = menu.add_submenu(create_submenu(
        "File",
        vec![
            // CustomMenuItem::new("new".to_string(), "New"),
            CustomMenuItem::new("open".to_string(), "Open"),
            // CustomMenuItem::new("save".to_string(), "Save"),
            // CustomMenuItem::new("save_as".to_string(), "Save As"),
            // CustomMenuItem::new("export".to_string(), "Export"),
            CustomMenuItem::new("exit".to_string(), "Exit"),
        ],
    ));
    // .add_submenu(create_submenu(
    //     "View",
    //     vec![
    //         CustomMenuItem::new("zoom_in".to_string(), "Zoom In"),
    //         CustomMenuItem::new("zoom_out".to_string(), "Zoom Out"),
    //         CustomMenuItem::new("reset_zoom".to_string(), "Reset Zoom"),
    //     ],
    // ))
    // .add_submenu(create_submenu(
    //     "Tools",
    //     vec![
    //         CustomMenuItem::new("check_ffmpeg".to_string(), "Check FFmpeg"),
    //         CustomMenuItem::new("check_vvc".to_string(), "Check VVC"),
    //     ],
    // ))
    // .add_submenu(create_submenu(
    // "Help",
    // vec![
    // CustomMenuItem::new("about".to_string(), "About"),
    // CustomMenuItem::new("website".to_string(), "Official Website"),
    // CustomMenuItem::new("check_updates".to_string(), "Check for Updates"),
    // ],
    // ));

    menu
}
#[tauri::command]
fn greet(name: &str) -> String {
    Command::new("open").args(["-R", "/"]).spawn().unwrap();
    format!("Hello, {}! Thanks for downloading my program!", name)
}

async fn open_file(window: tauri::Window) {
    let _response = window.emit("filepicker", "");
}
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let menu = create_main_menu();
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_os::init())
        .menu(menu)
        .on_menu_event(|event| {
            let app_handle = event.window().app_handle();
            match event.menu_item_id() {
                "open" => {
                    tauri::async_runtime::spawn(async move {
                        let _response = open_file(event.window().clone()).await;
                    });
                }
                "exit" => {
                    std::process::exit(0);
                }
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while building tauri application");

    // app.run(move |_app_handle, event| {
    //     // let window = _app_handle.get_window("main").unwrap();
    //     match event {
    //         tauri::RunEvent::WindowEvent {
    //             event: tauri::WindowEvent::CloseRequested { api, .. },
    //             label,
    //             ..
    //         } => {
    //             println!("closing window");
    //             // run the window destroy manually just for fun :)
    //             // usually you'd show a dialog here to ask for confirmation or whatever
    //             api.prevent_close();
    //             _app_handle.exit(0)
    //         }
    //         _ => {}
    //     }
    // match event {
    //   // tauri::RunEvent::Updater(updater_event) => handle_updater_event(window, updater_event),
    //   tauri::RunEvent::WindowEvent(event) => ha
    //   _ => {}
    // }
    // });
    // .on_window_event(|event| => {
    //   match event.event(){
    //     tauri::WindowEvent::Focused((focused) => {

    //     })
    //   }
    // })
    // tauri::Builder::default()
    //   .run(tauri::generate_context!())
    //   .expect("error while running tauri application");
}
