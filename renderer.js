window.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  let currentFilePath = null;

  // Оновлюємо текст в editor
  window.electronAPI.onFileContent((content) => {
    editor.value = content;
  });

  // Оновлюємо шлях файлу
  window.electronAPI.onFilePath((path) => {
    currentFilePath = path;
  });

  window.electronAPI.onSaveRequest?.(async () => {
    const content = editor.value;
    const filePath = await window.electronAPI.saveFile(content, currentFilePath);
    if (filePath) currentFilePath = filePath;
  });

  window.electronAPI.onSaveAsRequest?.(async () => {
    const content = editor.value;
    const filePath = await window.electronAPI.saveFile(content, null);
    if (filePath) currentFilePath = filePath;
  });
});
