import { app, BrowserWindow, ipcMain, Notification } from "electron";
import { Operation } from './models/Operations';
import { User } from './models/User';
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
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  isDev && mainWindow.webContents.openDevTools();
};

async function registerListeners() {

  ipcMain.on("notify", (_, message) => {
    new Notification({ title: "Notification", body: message }).show();
  });

  ipcMain.handle("listUsers", async () => {
    const user = await User.findAll()
    return JSON.parse(JSON.stringify(user))
  })

  ipcMain.handle("createUser", async (_, user) => {
    const result = await User.create({
      name: user.name,
      local: user.local
    });
    return JSON.parse(JSON.stringify(result))
  })

  ipcMain.handle("createOperation", async (_, operation) => {
    const result = await Operation.create({
      cod: operation.cod,
      document: operation.document,
      team: operation.team,
      start_operation: operation.start_operation,
      county: operation.county,
      district: operation.district,
      place: operation.place,
      complement: operation.complement,
      open: 1,
      streaming: 0,
    });
    return JSON.parse(JSON.stringify(result))
  })

  ipcMain.handle("listOperationOpen", async (_, user) => {
    const operations = await Operation.findOne({
      where: [{
        document: user.document,
        open: true
      }],
      order: [
        ['createdAt', 'DESC']]
    })
    return JSON.parse(JSON.stringify(operations))
  })

  ipcMain.handle("listOperations", async (_, user) => {
    const operations = await Operation.findAll({
      where: {
        document: user.document
      },
      order: [
        ['createdAt', 'DESC']]
    })
    return JSON.parse(JSON.stringify(operations))
  })

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