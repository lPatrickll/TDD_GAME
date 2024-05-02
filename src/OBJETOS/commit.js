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

    /*getPuntajePruebas()
    {
        this.puntaje.setPuntajePruebas(this.calcularPuntajePruebas());
        return this.puntaje.getPuntajePruebas();
    }
    calcularPuntajePruebas()
    {
        return (this.cantPruebasAprob/this.cantPruebas)*100;
    }*/
    getRecomendacion()
    {
        return this.recomendacion;
    }
    generarRecomendacion()
    {
        
        let recomendacion = "";
        if (this.cantPruebasAprob / this.cantPruebas < 1) {
            recomendacion = "Se recomienda mejorar la cantidad de pruebas aprobadas.";
        } else {
            recomendacion = "Buen trabajo en las pruebas aprobadas.";
        }
        return recomendacion;
    }
    
}

export default Commit;