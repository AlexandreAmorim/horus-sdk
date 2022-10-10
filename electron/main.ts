import { app, BrowserWindow, ipcMain, Notification } from "electron";
const isDev = !app.isPackaged;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: "#191622",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  isDev && mainWindow.webContents.openDevTools();
};

async function registerListeners() {
  ipcMain.on("message", (_, message) => {
    console.log(message);
  });

  ipcMain.on("notify", (_, message) => {
    new Notification({ title: "Notification", body: message }).show();
  });
}

app
  .on("ready", createWindow)
  .whenReady()
  .then(registerListeners)
  .catch((e) => console.error(e));

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
