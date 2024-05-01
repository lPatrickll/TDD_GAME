import ArrayCommit from "./commitsArray";
import Puntaje from "./puntaje";

class Proyecto {
    constructor(titulo) {
        this.titulo = titulo;
        this.arrayCommit = new ArrayCommit();
        this.puntaje = new Puntaje(); 
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

    eliminarUltimoCommit() {
        this.arrayCommit.eliminarUltimoCommit();
    }

    getPuntajePruebas() {
        return this.puntaje.puntajePruebas;
    }
}

export default Proyecto;
