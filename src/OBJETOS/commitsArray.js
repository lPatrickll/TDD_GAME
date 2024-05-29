import Commit from "./commit";

class ArrayCommit {
    constructor() {
        this.arrayCommit = [];
    }

    aniadirCommit(cantPruebas, cantLineas, cobertura, complejidad,fecha) {
        const nuevoCommit = new Commit(cantPruebas, cantLineas, cobertura, complejidad,fecha);
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


    calcularFrecuenciaCommits() {
        if (this.arrayCommit.length < 2) {
            this.arrayCommit[0].setFrecuencia("Regular");
            return this.arrayCommit[0].getFrecuencia();
        }

        for (let i = 1; i < this.arrayCommit.length; i++) {
            let fechaActual = this.arrayCommit[i].getFecha();
            let fechaAnterior = this.arrayCommit[i - 1].getFecha();
            let diferenciaDias = (fechaActual - fechaAnterior) / (1000 * 60 * 60 * 24);

            let frecuencia="Regular";
            if (diferenciaDias < 2) {
                frecuencia = "Excelente";
            } else if (diferenciaDias < 3) {
                frecuencia = "Bueno";
            }else if (diferenciaDias < 7) {
                frecuencia = "Regular";
            } else {
                frecuencia = "Deficiente";
            }
            this.arrayCommit[i].setFrecuencia(frecuencia);
        }

        return this.arrayCommit[this.arrayCommit.length - 1].getFrecuencia();
    }

    
}
export default ArrayCommit;
