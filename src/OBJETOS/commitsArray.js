import Commit from "./commit";

class ArrayCommit {
    constructor() {
        this.arrayCommit = [];
    }

    aniadirCommit(cantPruebas, cantLineas, cobertura) {
        const nuevoCommit = new Commit(cantPruebas, cantLineas, cobertura);
        this.arrayCommit.push(nuevoCommit);
    }

    mostrarCommit() {
        return this.arrayCommit.map(commit => ({
            cantPruebas: commit.getCantPruebas(),
            cantLineas: commit.getCantLineas(),
            cobertura: commit.getCobertura()
        }));
    }

    eliminarUltimoCommit() {
        // Devolver el array después de eliminar el último commit o sin cambios si no hay commits
        return this.arrayCommit;
    }
}

export default ArrayCommit;