const { app, BrowserWindow, dialog, ipcMain, Menu } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;
let currentFilePath = null; // Шлях до поточного файлу

function updateWindowTitle() {
  const fileName = currentFilePath ? path.basename(currentFilePath) : 'untitled.txt';
  mainWindow.setTitle(`Notepad - ${fileName}`); // Оновлюємо заголовок з ім'ям файлу
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('dialog:openFile', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      filters: [{ name: 'Text Files', extensions: ['txt'] }],
      properties: ['openFile']
    });
    if (!canceled && filePaths.length > 0) {
      const content = fs.readFileSync(filePaths[0], 'utf8');
      currentFilePath = filePaths[0]; // Зберігаємо шлях до файлу
      updateWindowTitle(); // Оновлюємо заголовок
      return { filePath: filePaths[0], content };
    }
  });

  ipcMain.handle('dialog:saveFile', async (event, content, filePath) => {
    if (!filePath) { // Якщо файл не має шляху
      const { canceled, filePath: newPath } = await dialog.showSaveDialog({
        defaultPath: 'untitled.txt',
        filters: [{ name: 'Text Files', extensions: ['txt'] }]
      });
      if (canceled || !newPath) return null; // Якщо збереження не відбулося
      filePath = newPath; // Встановлюємо новий шлях
    }
    fs.writeFileSync(filePath, content, 'utf8');
    currentFilePath = filePath; // Зберігаємо новий шлях
    updateWindowTitle(); // Оновлюємо заголовок
    return filePath;
  });

  ipcMain.handle('editor:newFile', () => {
    mainWindow.webContents.send('file:content', '');
    currentFilePath = null; // Коли створюємо новий файл, очищаємо шлях
    updateWindowTitle(); // Оновлюємо заголовок
  });

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New',
          click: () => {
            mainWindow.webContents.send('file:content', '');
            currentFilePath = null; // Очищаємо шлях при створенні нового файлу
            updateWindowTitle(); // Оновлюємо заголовок
          }
        },
        {
          label: 'Open',
          click: async () => {
            const result = await mainWindow.webContents.executeJavaScript(`window.electronAPI.openFile();`);
            if (result && result.content) {
              mainWindow.webContents.send('file:content', result.content);
              mainWindow.webContents.send('file:path', result.filePath);
            }
          }
        },
        {
          label: 'Save',
          click: () => {
            if (!currentFilePath) {
              // Якщо файл ще не збережений, відкриваємо діалог Save As
              mainWindow.webContents.send('file:saveAs');
            } else {
              // Якщо файл вже збережений, просто зберігаємо
              mainWindow.webContents.send('file:save');
            }
          }
        },
        {
          label: 'Save As',
          click: () => mainWindow.webContents.send('file:saveAs')
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    { role: 'editMenu' }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
