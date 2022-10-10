import { contextBridge, ipcRenderer } from "electron";

export const api = {
  sendMessage: (message: string) => {
    ipcRenderer.send("message", message);
  },

  sendStatus: () => {
    const status = navigator.onLine ? "online" : "offline";
    ipcRenderer.send("status ", status);
  },

  notificationApi: (message: string) => {
    ipcRenderer.send("notify", message);
  },

  batteryApi: {},
  fileApi: {},

  // eslint-disable-next-line @typescript-eslint/ban-types
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld("Main", api);
