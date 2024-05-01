class Puntaje {
    constructor() {
        this.puntajePruebas = 0;
        this.puntajeLineas = 0;
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
}

export default Puntaje;
