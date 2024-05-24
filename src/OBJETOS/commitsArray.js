import Commit from "./commit";

class ArrayCommit {
    constructor() {
        this.arrayCommit = [];
    }

    aniadirCommitFinal(cantPruebas,cantPruebasAprob,cantLineas,cobertura)
    {
        const nuevoCommit = new Commit(cantPruebas, cantLineas, cobertura);
        nuevoCommit.setPruebasAprob(cantPruebasAprob);
        this.arrayCommit.push(nuevoCommit);
    }
    aniadirCommit(cantPruebas, cantLineas, cobertura) {
        const nuevoCommit = new Commit(cantPruebas, cantLineas, cobertura);
        this.arrayCommit.push(nuevoCommit);
    }
    aniadirCommitObj(Commit)
    {
        this.arrayCommit.push(Commit);
    }


    mostrarCommit() {
        return this.arrayCommit.map(commit => ({
            cantPruebas: commit.getCantPruebas(),
            cantLineas: commit.getCantLineas(),
            cobertura: commit.getCobertura()
        }));
    }
    mostrarCommitCompleto()
    {
        return this.arrayCommit.map(commit => ({
            cantPruebas: commit.getCantPruebas(),
            cantPruebasAprob: commit.getCantPruebasAprob(),
            cantLineas: commit.getCantLineas(),
            cobertura: commit.getCobertura()
        }));
    }

    eliminarUltimoCommit() {
        if (this.arrayCommit.length > 0) {
            this.arrayCommit.pop();
        }
        // Devolver el array después de eliminar el último commit o sin cambios si no hay commits
        return this.arrayCommit;
    }

    getCommits()
    {
        return this.arrayCommit;
    }

}

export default ArrayCommit;