import Proyecto from "./proyecto";

class ArrayProyectos {
    constructor() {
        this.proyectosArray = [];
    }

    aniadirProyecto(tituloProyecto) {
        const nuevoProyecto = new Proyecto(tituloProyecto);
        this.proyectosArray.push(nuevoProyecto);
    }

    getProyectos() {
        return this.proyectosArray.map(proyecto => proyecto.getTitulo());
    }

    borrarProyecto(tituloProyecto) {
        this.proyectosArray = this.proyectosArray.filter(proyecto => proyecto.getTitulo() !== tituloProyecto);
        return this.proyectosArray;
    }
    buscarProyecto(titulo)
    {
        return "EL PROYECTO TDD NO EXISTE";
    }
};

export default ArrayProyectos;