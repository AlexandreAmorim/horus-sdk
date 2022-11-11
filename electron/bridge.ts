import { contextBridge, ipcRenderer } from "electron";

export const api = {

  notificationApi: (message: string) => {
    ipcRenderer.send("notify", message);
  },

  listUsers: async () => {
    const response = await ipcRenderer.invoke('listUsers');
    return response
  },

  createUser: async (user: object) => {
    const response = await ipcRenderer.invoke('createUser', user);
    return response
  },

  createOperation: async (operation: object) => {
    const response = await ipcRenderer.invoke('createOperation', operation);
    return response
  },

  listOperations: async (user: object) => {
    const response = await ipcRenderer.invoke('listOperations', user);
    return response
  },

  listOperationOpen: async (user: object) => {
    const response = await ipcRenderer.invoke('listOperationOpen', user);
    return response
  },

  // eslint-disable-next-line @typescript-eslint/ban-types
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld("Main", api);
