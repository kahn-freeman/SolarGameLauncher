
const jp = {
  barbtn: {
    account: "アカウント",
    support: "サポート",
    settings: "設定"
  },
  settings: {
    settings: "設定",
    generate: "一般",
    graphic: "グラフィック",
    repair_desc: "ゲームファイルを修復",
    repair: "修復",
    reinstall_desc: "ゲームを再インストール",
    reinstall: "再インストール",
    game_folder_desc: "ゲームフォルダを開く",
    game_folder: "ゲームフォルダ",
    launcher_logs_desc: "ランチャーのログフォルダを開く",
    launcher_logs: "ランチャーログ",
    game_logs_desc: "ゲームのログフォルダを開く",
    game_logs: "ゲームログ",
    clean_temporary_folder: "終了時に一時フォルダをクリーンアップ",
    display_mode: {
      desc: "表示モード",
      options: ["フルスクリーン", "ウィンドウモード", "ボーダーレスフルスクリーンウィンドウ"]
    },
    resolution: {
      desc: "解像度",
      options: ["1280 x 720", "1440 x 900", "1920 x 1080"]
    },
    intro_video: {
      desc: "イントロ動画をスキップ",
      options: ["はい", "いいえ"]
    },
    quality: {
      desc: "品質プリセット",
      options: ["低", "中", "高", "ウルトラ", "カスタム"]
    },
  },
  cancel: "キャンセル",
  apply: "適用",
  forum: "コミュニティ",
  news: "ニュース",
  shop: "ショップ",
  language: "言語",
  languages: {
    english: "English",
    chinese: "简体中文",
    japanese: "日本語",
  }
} as const;

  export default jp;