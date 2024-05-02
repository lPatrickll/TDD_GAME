class Commit {
    constructor(cantPruebas, cantLineas, cobertura) {
        this.cantPruebas = cantPruebas;
        this.cantLineas = cantLineas;
        this.cobertura = cobertura;
        this.cantPruebasAprob=0;
        this.cantLinCober=0;
        this.recomendacion="";
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
    setPruebasAprob(cantidad)
    {
        this.cantPruebasAprob=cantidad;
    }
    getCantPruebasAprob()
    {
        return this.cantPruebasAprob;
    }
    getcantLinCober()
    {
        return this.cantLinCober;
    }
    setCantLinCober(cantLineas2)
    {
        this.cantLinCober=cantLineas2;
    }
    calcularCobertura()
    {
        let porcentajeCober=0
        porcentajeCober=(this.cantLinCober/this.cantLineas)*100
        return porcentajeCober;
    }
    getCoberturaCalculada()
    {
        this.cobertura=this.calcularCobertura();
        return this.cobertura;
    }

    getRecomendacion()
    {
        return this.recomendacion;
    }
    generarRecomendacion()
    {
        let recomendacion = "";
        let puntaje_provisional = this.cantPruebasAprob / this.cantPruebas;
        if (puntaje_provisional == 1) {
            recomendacion += "Buen trabajo en las pruebas aprobadas. ";
        } else {
            if(puntaje_provisional >= 0.6){
                recomendacion += "Esta bien, pero podrias mejorar con la cantidad de pruebas aprobadas. ";
            } else {
                recomendacion += "Se recomienda mejorar la cantidad de pruebas aprobadas. ";
            }
        }

        if (this.cantLineas > 500) {
            recomendacion += "El commit tiene muchas líneas de código, considera refactorizar para mejorar la legibilidad.";
        } else {
            if(this.cantLineas > 100){
                recomendacion += "Buen manejo de la cantidad de líneas de código.";
            }
        }
        return recomendacion;
    }
    
}

export default Commit;