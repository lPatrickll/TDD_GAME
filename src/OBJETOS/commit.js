class Commit {
    constructor (cantPruebas, cantLineas, cobertura){
        this.cantPruebas = cantPruebas;
        this.cantLineas = cantLineas;
        this.cobertura = cobertura;
    }

    getCantPruebas(){
        return this.cantPruebas;
    }

    getCantLineas(){
        return this.cantLineas;
    }

    getCobertura(){
        return this.cobertura;
    }
}

export default Commit;