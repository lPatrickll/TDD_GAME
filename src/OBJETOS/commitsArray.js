import Commit from "./commit";

class ArrayCommit {
    constructor() {
        this.arrayCommit = [];
    }

    aniadirCommit(cantPruebas, cantLineas, cobertura, complejidad, fecha, id) {
        const nuevoCommit = new Commit(cantPruebas, cantLineas, cobertura, complejidad,fecha, id);
        this.arrayCommit.push(nuevoCommit);
    }

    aniadirCommitObj(Commit) {
        this.arrayCommit.push(Commit);
    }


    mostrarCommitCompleto() {
        return this.arrayCommit.map(commit => ({
            idCommit: commit.getId(),
            fechaHora: commit.getFechaHora(),
            cantPruebas: commit.getCantPruebas(),
            cantLineas: commit.getCantLineas(),
            cobertura: commit.getCobertura(),
            complejidad: commit.getComplejidad(),
            recomendacion: commit.getRecomendacion(),
            frecuencia:commit.getFrecuencia(),
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
            let fechaActual = new Date(this.arrayCommit[i].getFechaHora());
            let fechaAnterior = new Date(this.arrayCommit[i - 1].getFechaHora());
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
