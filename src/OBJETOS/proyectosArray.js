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
        if(titulo_buscado === titulo){
            this.proyectosArray = this.proyectosArray.filter(proyecto => proyecto.getTitulo() === titulo_buscado);
            // Estos son los proyectos que estuviste buscando
            this.proyectosArray;
        } 
    }
};

export default ArrayProyectos;