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
        let mensajeNoEncontrado="EL PROYECTO TDD NO EXISTE";
        let NombresProyectosArray = [];
        let variableDeRetorno;

        let contadorTitulo=0;
        let nroLetrasCoincidentes=0;

        for (let proyecto of this.proyectosArray) {
            for (let letraProyecto of proyecto.getTitulo()) {
                if(titulo[contadorTitulo]==letraProyecto)
                {
                    nroLetrasCoincidentes+=1;
                }
                contadorTitulo=contadorTitulo+1;
            }
            if(nroLetrasCoincidentes>0)
            {
                NombresProyectosArray.push(proyecto.getTitulo());
            }
        }
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