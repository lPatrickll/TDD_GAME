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

        let proyectoSeleccionado=this.proyectosArray.find(proyecto => proyecto.getTitulo() === titulo);
        let nombreProyecto;
        let mensajeNoEncontrado="EL PROYECTO TDD NO EXISTE";
        let variableDeRetorno;
        if(proyectoSeleccionado)
        {
            nombreProyecto=proyectoSeleccionado.getTitulo();
            variableDeRetorno=nombreProyecto;
        }
        else
        {
            variableDeRetorno=mensajeNoEncontrado;
        }
        return variableDeRetorno;
       
    }
};

export default ArrayProyectos;