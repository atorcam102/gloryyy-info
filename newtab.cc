/* Estilos generales */
body {
  font-family: sans-serif;
  margin: 0;
  background-color: #f0f0f0; /* Color de fondo claro */
}

#container {
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff; /* Fondo blanco para el contenido */
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra sutil */
}

h1, h2 {
  color: #333; /* Color de texto oscuro para los títulos */
}

/* Barra de búsqueda */
#search-bar {
  margin-bottom: 20px;
}

#search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Enlaces rápidos */
#links ul {
  list-style: none;
  padding: 0;
}

#links li {
  margin-bottom: 10px;
}

#links a {
  color: #007bff; /* Color azul para los enlaces */
  text-decoration: none;
}

/* Widgets */
#widgets {
  display: flex; /* Mostrar widgets en línea */
  justify-content: space-around; /* Distribuir espacio entre widgets */
}

#clock-widget,
#weather-widget {
  width: 45%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
