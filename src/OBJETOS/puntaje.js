class Puntaje {
    constructor() {
        this.puntajePruebas = 0;
        this.puntajeLineas = 100;
    }

    getPuntajePruebas()
    {
        return this.puntajePruebas;
    }
    setPuntajePruebas(puntaje)
    {
        this.puntajePruebas=puntaje;
    }
    getPuntajeLineasCodigo() {
        return this.puntajeLineas;
    }
    setPuntajeLineasCodigo(puntajel) {
        this.puntajeLineas=puntajel;
    }
}

export default Puntaje;
