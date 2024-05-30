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

    rankingProyectos() {
        // Crear una copia del array original
        const proyectosCopia = [...this.proyectosArray];
        
        // Ordenar los proyectos en función de la puntuación general de forma descendente
        proyectosCopia.sort((a, b) => b.calcularPuntuacionGeneral() - a.calcularPuntuacionGeneral());
        
        return proyectosCopia;
    }

};

export default ArrayProyectos;