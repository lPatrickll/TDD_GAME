class Commit {
    constructor(cantPruebas, cantLineas, cobertura) {
        this.cantPruebas = cantPruebas;
        this.cantLineas = cantLineas;
        this.cobertura = cobertura;
        this.cantPruebasAprob = 0;
        this.cantLinCober = 0;
        this.recomendacion = "";
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
    setPruebasAprob(cantidad) {
        this.cantPruebasAprob = cantidad;
    }
    getCantPruebasAprob() {
        return this.cantPruebasAprob;
    }
    getcantLinCober() {
        return this.cantLinCober;
    }
    setCantLinCober(cantLineas2) {
        this.cantLinCober = cantLineas2;
    }
    calcularCobertura() {
        let porcentajeCober = 0
        porcentajeCober = (this.cantLinCober / this.cantLineas) * 100
        return porcentajeCober;
    }
    getCoberturaCalculada() {
        this.cobertura = this.calcularCobertura();
        return this.cobertura;
    }

    getRecomendacion() {
        return this.recomendacion;
    }
    generarRecomendacion() {
        let _recomendacion = "";
        let puntaje_provisional = this.cantPruebasAprob / this.cantPruebas;
        if (puntaje_provisional == 1) {
            _recomendacion += "Buen trabajo en las pruebas aprobadas. ";
        } else {
            if (puntaje_provisional >= 0.6) {
                _recomendacion += "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. ";
            } else {
                _recomendacion += "Se recomienda mejorar la cantidad de pruebas aprobadas. ";
            }
        }

        if (this.cantLineas > 500) {
            _recomendacion += "El commit tiene muchas líneas de código, considera refactorizar para mejorar la legibilidad. ";
        } else {
            if (this.cantLineas > 100) {
                _recomendacion += "Buen manejo de la cantidad de líneas de código. ";
            }
        }

        if (this.cobertura < 70) {
            _recomendacion += "La cobertura de código es baja, considera añadir más pruebas.";
        }
        return _recomendacion;
    }
    // SEGUNDA ITERACION
    editarCantPruebas(newCantPruebas) {
        this.cantPruebas = newCantPruebas;
    }

    editarCantLineas(newCantLineas) {
        this.cantLineas = newCantLineas;
    }
}

export default Commit;