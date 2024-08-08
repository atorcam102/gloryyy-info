document.addEventListener('DOMContentLoaded', function() {

  if (chrome && chrome.storage && chrome.storage.local) {
    checkForUpdates();
    loadContent(); 
    updateClock();
    setInterval(updateClock, 1000); 
  } else {
    // Si chrome.storage no está disponible, intenta de nuevo después de un retraso
    setTimeout(() => {
      checkForUpdates();
      loadContent(); 
      updateClock();
      setInterval(updateClock, 1000); 
    }, 100); // Puedes ajustar el retraso si es necesario
  }
});



// Version-check y actualización
async function checkForUpdates() {
  try {
    const headers = {
      'Authorization': `token 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`
    };

    // Obtener la versión online
    const versionResponse = await fetch('https://api.github.com/repos/atorcam102/gloryyy-info/contents/version.txt', { headers });
    const versionData = await versionResponse.json();
    const onlineVersion = atob(versionData.content);

    // Obtener la versión local
    const localVersion = await chrome.storage.local.get('version');

    if (onlineVersion !== localVersion.version) {
      console.log('Actualización disponible. Descargando archivos...');

      // Descargar archivos actualizados
      const filesToUpdate = ['newtab.html', 'newtab.css', 'newtab.js'];
      const promises = filesToUpdate.map(file => 
        fetch(`https://api.github.com/repos/atorcam102/gloryyy-info/contents/${file}`, { headers })
          .then(res => res.json())
          .then(fileData => atob(fileData.content))
          .then(content => chrome.storage.local.set({ [file]: content }))
      );

      // Descargar el nuevo archivo de versión
      await fetch(`https://api.github.com/repos/atorcam102/gloryyy-info/contents/version.txt`, { headers })
        .then(res => res.json())
        .then(fileData => atob(fileData.content))
        .then(version => chrome.storage.local.set({ version }));

      Promise.all(promises).then(() => {
        console.log('Actualización completa. Recargando la nueva pestaña...');
        // Recargar la nueva pestaña para aplicar los cambios
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.reload(tabs[0].id);
        });
      });
    } else {
      console.log('No hay actualizaciones disponibles.');
    }
  } catch (error) {
    console.error('Error al verificar actualizaciones:', error);
  }
}


// Cargar contenido desde el almacenamiento local
async function loadContent() {
  const storedContent = await chrome.storage.local.get(['newtab.html', 'newtab.css', 'newtab.js']);
  document.head.innerHTML = `<style>${storedContent['newtab.css']}</style>`;
  document.body.innerHTML = storedContent['newtab.html'];
  eval(storedContent['newtab.js']); // Ejecutar el script descargado
}

// Funciones para la nueva pestaña
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById('clock-widget').textContent = timeString;
}

// Manejo del evento "keydown" en el textarea
document.getElementById('search-input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const searchQuery = this.value.trim();
    if (searchQuery) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      window.location.href = searchUrl;
    }
  }
});




// Verificar si chrome.storage está disponible antes de usarlo
if (chrome && chrome.storage && chrome.storage.local) {
  checkForUpdates(); // Llama a la función checkForUpdates solo si chrome.storage está disponible
} else {
  console.error('chrome.storage no está disponible todavía.');
  // Puedes intentar llamar a checkForUpdates de nuevo después de un retraso, si es necesario.
}



// Inicialización
checkForUpdates();
loadContent();
updateClock();
setInterval(updateClock, 1000); 
