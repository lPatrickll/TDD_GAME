import ArrayCommit from "./commitsArray";

class Proyecto {
    constructor(titulo) {
        this.titulo = titulo;
        this.arrayCommit = new ArrayCommit();
    }

    getTitulo() {
        return this.titulo;
    }

    aniadirCommit(cantPruebas, cantLineas, cobertura) {
        this.arrayCommit.aniadirCommit(cantPruebas, cantLineas, cobertura);
    }

    mostrarCommits() {
        return this.arrayCommit.mostrarCommit();
    }

    eliminarUltimoCommit(){
        this.arrayCommit.eliminarUltimoCommit();
    }
};

export default Proyecto;