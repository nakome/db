# Database
Database es una clase que permite interactuar con una base de datos almacenada en el navegador utilizando localStorage.

## Uso

### Constructor

    const db = new Database();

Crea una nueva instancia de Database.

### Métodos

- *leer():* devuelve un arreglo con los registros almacenados en la base de datos. Si no hay registros, devuelve un arreglo vacío.

- *escribir(datos):* recibe un arreglo de objetos y sobrescribe la información almacenada en la base de datos con estos datos.

- *verificarExistencia(registro):* recibe un objeto y verifica si existe un registro en la base de datos con los mismos valores de todas las propiedades. Devuelve true si existe, false si no.

- *agregar(registro):* recibe un objeto y lo agrega a la base de datos. Si ya existe un registro con los mismos valores de todas las propiedades, se lanza un error.

- *actualizar(id, registro):* recibe un índice id y un objeto registro, y actualiza el registro en la base de datos con el índice especificado con las nuevas propiedades proporcionadas. Si ya existe un registro con los mismos valores de todas las propiedades, se lanza un error.

- *borrar(id):* recibe un índice id y borra el registro en la base de datos con el índice especificado.

- *ordenar(propiedad):* recibe una propiedad y ordena los registros en la base de datos en orden ascendente según el valor de la propiedad especificada. Devuelve un arreglo con los registros ordenados.

- *estadisticas():* devuelve un objeto con el número total de registros y un objeto que lista las propiedades únicas de los registros y el número de registros que tienen cada propiedad.

- *exportarAJSON(nombreArchivo):* recibe un nombre de archivo y exporta todos los registros de la base de datos a un archivo JSON con el nombre especificado. El archivo se descarga automáticamente.

- *importarDesdeJSON(archivo):* recibe un archivo JSON y agrega todos los registros del archivo a la base de datos.

- *numRegistros():* devuelve el número total de registros en la base de datos.

### Ejemplo de uso

Primero, crearemos una instancia de la clase 

    const db = new Database();

A continuación, agregaremos algunos registros a la base de datos:

    db.agregar({nombre: "Juan", edad: 25});
    db.agregar({nombre: "María", edad: 30});
    db.agregar({nombre: "Pedro", edad: 35});

Podemos verificar que los registros han sido agregados correctamente utilizando el método leer():

    console.log(db.leer());

Esto debería imprimir en la consola los tres registros que acabamos de agregar.

También podemos actualizar un registro existente en la base de datos utilizando el método actualizar(). Por ejemplo, si queremos actualizar el registro con índice 1 (es decir, el segundo registro) para cambiar el nombre a "Luisa", podemos hacer lo siguiente:

    db.actualizar(1, {nombre: "Luisa"});

Si verificamos nuevamente los registros con el método leer(), deberíamos ver que el segundo registro ahora tiene el nombre "Luisa".

Podemos ordenar los registros por una propiedad determinada utilizando el método ordenar(). Por ejemplo, si queremos ordenar los registros por edad, podemos hacer lo siguiente:

    console.log(db.ordenar("edad"));

Esto debería imprimir en la consola los registros ordenados por edad.

Finalmente, podemos exportar los registros a un archivo JSON utilizando el método exportarAJSON(). Por ejemplo, si queremos exportar los registros a un archivo llamado "registros.json", podemos hacer lo siguiente:

    db.exportarAJSON("registros.json");

Esto descargará un archivo JSON con los registros en el formato especificado.

Esto es un ejemplo con html:

    // Exportamos los datos a un archivo JSON
    // <button id="exportar">Esportar</button>
    document.querySelector('#exportar').addEventListener('click',evt => {
      evt.preventDefault()
      db.exportarAJSON('usuarios.csv')
    })

Imprimimos algunas estadísticas sobre la base de datos actualizada

    console.log("Número total de registros:", db.numRegistros());

Importamos nuevos datos desde un archivo JSON

    <input type="file" id="archivo">
    <button id="importar">Importar</button>

    const btnImportar = document.getElementById('importar');
    btnImportar.addEventListener('click', () => {
      const archivo = document.getElementById('archivo').files[0];
      const db = new Database('secreto');
      db.importarDesdeJSON(archivo)
    });