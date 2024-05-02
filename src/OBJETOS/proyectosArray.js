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
    buscarProyectos(tituloProyecto) {
        let proyectoEncontrado = this.proyectosArray.find(proyecto => proyecto.getTitulo() === tituloProyecto);
        if (!proyectoEncontrado)
            return "El proyecto no existe";
        else
            return proyectoEncontrado.getTitulo();
    }
};

export default ArrayProyectos;