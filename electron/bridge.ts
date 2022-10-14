import { contextBridge, ipcRenderer } from "electron";

export const api = {

  notificationApi: (message: string) => {
    ipcRenderer.send("notify", message);
  },

  fileApi: async () => {
    const response = await ipcRenderer.invoke('list');
    return response
  },

  createUser: async (user: object) => {
    const response = await ipcRenderer.invoke('create', user);
    return response
  },

  // eslint-disable-next-line @typescript-eslint/ban-types
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld("Main", api);
