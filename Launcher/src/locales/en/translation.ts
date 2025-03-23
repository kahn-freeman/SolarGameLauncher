
const en = {
  barbtn: {
    account: "Account",
    support: "Support",
    settings: "Settings"
  },
  settings: {
    settings: "Settings",
    generate: "Generate",
    graphic: "Graphic",
    repair_desc: "Repairs game files",
    repair: "Repair",
    reinstall_desc: "Reinstalls Game",
    reinstall: "Reinstall",
    game_folder_desc: "Open game folder",
    game_folder: "Game Folder",
    launcher_logs_desc: "Open launcher logfiles folder",
    launcher_logs: "Launcher Logs",
    game_logs_desc: "Open game logfiles folder",
    game_logs: "Game Logs",
    clean_temporary_folder: "Clean temporary folder on close",
    display_mode: {
      desc: "Display Mode",
      options: ["Fullscreen", "Windowed", "Borderless Fullscreen Window"]
    },
    resolution: {
      desc: "Resolution",
      options: ["1280 x 720", "1440 x 900", "1920 x 1080"]
    },
    intro_video: {
      desc: "Skip Intro Video",
      options: ["Yes", "No"]
    },
    quality: {
      desc: "Quality",
      options: ["Low", "Normal", "High", "Ultra", "Custom"]
    },
  },
  cancel: "CANCEL",
  apply: "APPLY",
  forum: "FORUM",
  news: "NEWS",
  shop: "SHOP",
  language: "LANGUAGE",
  languages: {
    english: "English",
    chinese: "简体中文",
    japanese: "日本语",
  }
} as const;

export default en;