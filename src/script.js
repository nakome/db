import Database from "./db.js";

// Crear una instancia de la base de datos
const db = new Database();

// Datos de inicio
let dato = {
  nombre: "Juan",
  telefono: "234 234 234",
  imagen: "http://placeimg.com/512/512/people",
  email: "juan@gmail.com",
  ciudad: "La Coruña",
};

// Comprobamos si existe
if (!db.verificarExistencia(dato)) {
  db.agregar(dato);
}

// Leemos y creamos la plantilla html
const html = db
  .leer()
  .map(
    (obj) => `
    <div class="card">
        <img src="${obj.imagen}" alt="${obj.nombre}">
        <h2>${obj.nombre}</h2>
        <p>${obj.trabajo}</p>
        <p>${obj.telefono}</p>
        <p>${obj.email}</p>
        <p>${obj.ciudad}</p>
    </div>
`
  )
  .join("");

// Imprimimos en el container
document.querySelector("#datos").innerHTML = `Total usuarios ${
  db.estadisticas().numRegistros
}`;
document.querySelector("#container").innerHTML = html;

// Exportamos los datos a un archivo JSON
document.querySelector("#exportar").addEventListener("click", (evt) => {
  evt.preventDefault();
  db.exportarAJSON("usuarios.json");
});

//Importamos nuevos datos desde un archivo JSON
const btnImportar = document.getElementById("importar");
btnImportar.addEventListener("click", () => {
  const archivo = document.getElementById("archivo").files[0];
  db.importarDesdeJSON(archivo);
});
