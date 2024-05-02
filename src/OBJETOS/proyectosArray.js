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

    buscarProyectoPorNombre(titulo_buscado){
        titulo = this.proyectosArray.map(proyecto => proyecto.getTitulo());
        if(titulo_buscado === titulo){
            return "este es el titulo que estuviste buscando";
        }
    }
};

export default ArrayProyectos;