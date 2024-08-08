// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Obtener los archivos desde el almacenamiento local
    chrome.storage.local.get(['index.html', 'style.css'], result => {
        // Actualizar el contenido del cuerpo con el HTML almacenado
        document.body.innerHTML = result['index.html'];

        // Crear un elemento de estilo y añadir el CSS almacenado
        const styleElement = document.createElement('style');
        styleElement.textContent = result['style.css'];
        document.head.appendChild(styleElement);

        // Resto de tu lógica JavaScript aquí (eventos, interacciones, etc.)
        // ...
    });
});
