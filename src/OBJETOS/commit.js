class Commit {
    constructor (cantPruebas, cantLineas, cobertura){
        this.cantPruebas = cantPruebas;
        this.cantLineas = cantLineas;
        this.cobertura = cobertura;
    }

    getCantPruebas(){
        return this.cantPruebas;
    }
}

export default Commit;