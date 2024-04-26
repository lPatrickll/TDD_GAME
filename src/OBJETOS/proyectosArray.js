import Proyecto from "./proyecto";

class ArrayProyectos{
    constructor(){
        this.proyectosArray = [];
    }

    aniadirProyecto(tituloProyecto){
        const nuevoProyecto = new Proyecto(tituloProyecto);
        this.proyectosArray.push(nuevoProyecto);
    }

    getProyectos(){
        return this.proyectosArray.map(proyecto => proyecto.getTitulo());
    }
};

export default ArrayProyectos;