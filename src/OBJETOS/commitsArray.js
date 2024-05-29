import Commit from "./commit";

class ArrayCommit {
    constructor() {
        this.arrayCommit = [];
    }

    aniadirCommit(cantPruebas, cantLineas, cobertura, complejidad) {
        const nuevoCommit = new Commit(cantPruebas, cantLineas, cobertura, complejidad);
        this.arrayCommit.push(nuevoCommit);
    }

    aniadirCommitObj(Commit) {
        this.arrayCommit.push(Commit);
    }


    mostrarCommitCompleto() {
        return this.arrayCommit.map(commit => ({
            cantPruebas: commit.getCantPruebas(),
            cantLineas: commit.getCantLineas(),
            cobertura: commit.getCobertura(),
            complejidad: commit.getComplejidad(),
            recomendacion: commit.getRecomendacion()
        }));
    }

    eliminarUltimoCommit() {
        if (this.arrayCommit.length > 0) {
            this.arrayCommit.pop();
        }
        return this.arrayCommit;
    }

    getCommits() {
        return this.arrayCommit;
    }
}
export default ArrayCommit;
