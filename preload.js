const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (content, filePath) => ipcRenderer.invoke('dialog:saveFile', content, filePath),
  newFile: () => ipcRenderer.invoke('editor:newFile'),

  onFileContent: (callback) => ipcRenderer.on('file:content', (event, content) => callback(content)),
  onSaveRequest: (callback) => ipcRenderer.on('file:save', callback),
  onSaveAsRequest: (callback) => ipcRenderer.on('file:saveAs', callback),
  onFilePath: (callback) => ipcRenderer.on('file:path', (event, path) => callback(path))
});
