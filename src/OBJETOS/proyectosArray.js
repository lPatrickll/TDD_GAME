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


        let nombreProyecto;
        let mensajeNoEncontrado="EL PROYECTO TDD NO EXISTE";
        let NombresProyectosArray = [];
        let variableDeRetorno;

        let contador=0;
        let nroLetrasCoincidentes=0;

        for (let proyecto of this.proyectosArray) {
            for (let letra of proyecto.getTitulo()) {
                if(titulo[contador]==letra)
                {
                    nroLetrasCoincidentes+=1;
                }
                contador=contador+1;
            }
            if(nroLetrasCoincidentes>2)
            {
                NombresProyectosArray.push(proyecto.getTitulo());
            }
        }

        //let proyectoSeleccionado=this.proyectosArray.find(proyecto => proyecto.getTitulo() === titulo);
        if(NombresProyectosArray.length>0)
        {
            variableDeRetorno=NombresProyectosArray;
        }
        else
        {
            variableDeRetorno=mensajeNoEncontrado;
        }
        return variableDeRetorno;
       
    }
};

export default ArrayProyectos;