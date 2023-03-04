
export default class Database {
    // Leer los datos de la base de datos
    leer() {
        const datos = JSON.parse(localStorage.getItem("datos"));
        return datos ? datos : [];
    }
    // Escribir los datos en la base de datos
    escribir(datos) {
        localStorage.setItem("datos", JSON.stringify(datos));
    }
    // Verificar si ya existe un registro con los mismos datos
    verificarExistencia(registro) {
        const datos = this.leer();
        let existe = false;
        for (let i = 0; i < datos.length; i++) {
            const existente = datos[i];
            let iguales = true;
            for (let propiedad in existente) {
                if (
                    existente.hasOwnProperty(propiedad) &&
                    registro.hasOwnProperty(propiedad)
                ) {
                    if (existente[propiedad] !== registro[propiedad]) {
                        iguales = false;
                        break;
                    }
                }
            }
            if (iguales) {
                existe = true;
                continue;
            }
        }
        return existe;
    }
    // Agregar un nuevo registro a la base de datos
    agregar(registro) {
        if (this.verificarExistencia(registro)) {
            throw new Error("El registro ya existe en la base de datos");
        }
        const datos = this.leer();
        datos.push(registro);
        this.escribir(datos);
    }
    // Actualizar un registro existente en la base de datos
    actualizar(id, registro) {
        const datos = this.leer();
        const registroActualizado = {
            ...datos[id],
            ...registro,
        };
        if (this.verificarExistencia(registroActualizado)) {
            throw new Error("El registro ya existe en la base de datos");
        }
        datos[id] = registroActualizado;
        this.escribir(datos);
    }
    // Borrar un registro de la base de datos
    borrar(id) {
        const datos = this.leer();
        datos.splice(id, 1);
        this.escribir(datos);
    }
    // Ordenar los registros de la base de datos por una propiedad determinada
    ordenar(propiedad) {
        const datos = this.leer();
        if (datos.length <= 1) {
            return datos;
        }
        return datos.sort((registroA, registroB) => {
            if (registroA[propiedad] < registroB[propiedad]) {
                return -1;
            }
            if (registroA[propiedad] > registroB[propiedad]) {
                return 1;
            }
            return 0;
        });
    }
    // Obtener estadísticas de la base de datos
    estadisticas() {
        const datos = this.leer();
        const numRegistros = datos.length;
        const propiedades = {};
        datos.forEach((registro) => {
            for (let propiedad in registro) {
                if (!propiedades.hasOwnProperty(propiedad)) {
                    propiedades[propiedad] = 1;
                } else {
                    propiedades[propiedad]++;
                }
            }
        });
        return { numRegistros, propiedades };
    }
    // Exportar registros a un archivo JSON
    exportarAJSON(nombreArchivo) {
        const registros = this.leer();
        const json = JSON.stringify(registros);
        const blob = new Blob([json], { type: "application/json" });
        if (navigator.msSaveBlob) {
            // Para Internet Explorer
            navigator.msSaveBlob(blob, nombreArchivo);
        } else {
            const link = document.createElement("a");
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", nombreArchivo);
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
    // Importar registros desde un objeto JSON
    importarDesdeJSON(archivo) {
        const lector = new FileReader();
        lector.onload = () => {
            const datos = JSON.parse(lector.result);
            datos.map((item) => this.agregar(item));
        };
        lector.readAsText(archivo);
    }
    // Obtener el número de registros en la base de datos
    numRegistros() {
        const datos = this.leer();
        return datos.length;
    }
}
