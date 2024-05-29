class Commit {
    constructor(cantPruebas, cantLineas, cobertura, complejidad,fecha) {
        this.cantPruebas = cantPruebas;
        this.cantLineas = cantLineas;
        this.cobertura = cobertura;
        this.complejidad = complejidad;
        this.cantPruebasAprob = 0;
        this.recomendacion = "";
        this.fecha=new Date(fecha);
        this.frecuenciaCommit="";
    }

    getCantPruebas() {
        return this.cantPruebas;
    }

    getCantLineas() {
        return this.cantLineas;
    }

    getCobertura() {
        return this.cobertura;
    }
    
    getComplejidad() {
        return this.complejidad;
    }
    
    setPruebasAprob(cantidad) {
        this.cantPruebasAprob = cantidad;
    }
    
    getCantPruebasAprob() {
        return this.cantPruebasAprob;
    }

    getRecomendacion() {
        return this.generarRecomendacion();
    }
    getFecha(){
        return this.fecha;
    }
    setFecha(fecha)
    {
        this.fecha=new Date(fecha);
    }

    generarRecomendacion() {
        let puntaje_provisional = this.cantPruebasAprob / this.cantPruebas;
        if (puntaje_provisional == 1) {
            this.recomendacion += "Buen trabajo en las pruebas aprobadas. ";
        } else {
            if (puntaje_provisional >= 0.6) {
                this.recomendacion += "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. ";
            } else {
                this.recomendacion += "Se recomienda mejorar la cantidad de pruebas aprobadas. ";
            }
        }

        if (this.cantLineas > 500) {
            this.recomendacion += "El commit tiene muchas líneas de código, considera refactorizar para mejorar la legibilidad. ";
        } else {
            if (this.cantLineas > 100) {
                this.recomendacion += "Buen manejo de la cantidad de líneas de código. ";
            }
        }

        if (this.cobertura < 70) {
            this.recomendacion += "La cobertura de código es baja, considera añadir más pruebas.";
        }

        return this.recomendacion;
    }

    editarCantPruebas(newCantPruebas) {
        this.cantPruebas = newCantPruebas;
    }

    editarCantLineas(newCantLineas) {
        this.cantLineas = newCantLineas;
    }

    setFrecuencia(frecuencia) {
        this.frecuenciaCommit = frecuencia;
    }

    getFrecuencia() {
        return this.frecuenciaCommit;
    }



}
export default Commit;
