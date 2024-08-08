// Constantes y variables
const repoOwner = 'atorcam102'; 
const repoName = 'gloryyy-info';
const branch = 'main'; // O la rama que estés usando
const localFolder = 'gloryyy-info'; // Nombre de la carpeta local

// Función para descargar un archivo desde GitHub
async function downloadFile(filePath) {
  const response = await fetch(`https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/${filePath}`);
  const content = await response.text();
  return content;
}

// Función para comparar archivos locales y remotos
async function compareAndReplaceFiles() {
  const files = ['index.html', 'style.css', 'script.js']; // Lista de archivos a sincronizar

  for (const file of files) {
    const localContent = await new Promise(resolve => {
      chrome.storage.local.get(file, result => resolve(result[file]));
    });
    const remoteContent = await downloadFile(file);

    if (localContent !== remoteContent) {
      chrome.storage.local.set({ [file]: remoteContent });
      console.log(`Archivo ${file} actualizado`);
    }
  }

  // Recargar la nueva pestaña para mostrar los cambios
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.reload(tabs[0].id);
  });
}

// Descargar archivos al iniciar Chrome
chrome.runtime.onStartup.addListener(async () => {
  for (const file of ['index.html', 'style.css', 'script.js']) {
    const content = await downloadFile(file);
    chrome.storage.local.set({ [file]: content });
  }
});

// Sincronización periódica (cada hora)
setInterval(compareAndReplaceFiles, 60 * 60 * 1000); 

// Escuchar cambios en el almacenamiento local
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    // Recargar la nueva pestaña si hay cambios en los archivos
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.reload(tabs[0].id);
    });
  }
});
